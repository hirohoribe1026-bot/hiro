# YouTube台本自動生成システム

**穂利辺ヒロ AIに稼がせるCEOの成功法則** チャンネル向けの
YouTube台本を毎日AIで自動生成し、Gmailで送信するシステムです。

---

## できること

- 毎日AIが10分台本を自動生成
- テーマのカテゴリローテーション（AI活用 / 経営 / 才能 / 自由 / スピリチュアル経営）
- 直近7日のテーマ重複を自動回避
- 同じ日の二重送信を防止
- Gmail で指定アドレスに自動送信
- GitHub Actions で毎朝7時（JST）に自動実行

## ディレクトリ構成

```
hiro/
├── main.py                  # メイン実行スクリプト
├── config.py                # 設定管理（環境変数の読み込み）
├── prompts.py               # AIへのプロンプトテンプレート
├── script_generator.py      # AI台本生成（OpenAI / Claude 切替可）
├── gmail_sender.py          # メール送信（Gmail API / SMTP）
├── topic_manager.py         # テーマ選定（ローテーション管理）
├── storage.py               # 履歴・送信ログの保存
├── requirements.txt         # Python依存パッケージ
├── .env.example             # 環境変数テンプレート
├── .gitignore               # Git除外設定
├── data/                    # テーマ履歴・送信ログ（自動生成）
│   ├── topic_history.json
│   └── sent_log.json
└── .github/
    └── workflows/
        └── daily_youtube_script.yml  # GitHub Actions設定
```

---

## セットアップ手順（初心者向け・ステップバイステップ）

### ステップ1：Python をインストール

1. https://www.python.org/downloads/ にアクセス
2. Python 3.11 以上をダウンロードしてインストール
3. ターミナル（Macはターミナル、Windowsはコマンドプロンプト）で確認：
   ```bash
   python --version
   ```
   `Python 3.11.x` のように表示されればOK

### ステップ2：このプロジェクトをダウンロード

```bash
git clone https://github.com/YOUR_USERNAME/hiro.git
cd hiro
```

### ステップ3：依存パッケージをインストール

```bash
pip install -r requirements.txt
```

### ステップ4：環境変数を設定

```bash
cp .env.example .env
```

`.env` ファイルを開いて、以下を設定してください：

| 変数名 | 説明 | 例 |
|--------|------|-----|
| `AI_PROVIDER` | 使うAI | `openai` または `anthropic` |
| `OPENAI_API_KEY` | OpenAI APIキー | `sk-...` |
| `RECIPIENT_EMAIL` | 台本の送信先 | `you@example.com` |
| `SENDER_EMAIL` | 送信元Gmail | `you@gmail.com` |
| `EMAIL_METHOD` | 送信方法 | `gmail_api` または `smtp` |

### ステップ5：OpenAI API キーを取得

1. https://platform.openai.com/ にアクセス
2. ログイン → 左メニュー「API keys」
3. 「Create new secret key」をクリック
4. 表示されたキーをコピーして `.env` の `OPENAI_API_KEY` に貼り付け

> **Claude APIを使いたい場合：**
> 1. https://console.anthropic.com/ でAPIキーを取得
> 2. `.env` で `AI_PROVIDER=anthropic` に変更
> 3. `ANTHROPIC_API_KEY` にキーを設定

---

## Gmail API 設定手順

### 方法A：Gmail API（推奨）

#### 1. Google Cloud プロジェクトを作成

1. https://console.cloud.google.com/ にアクセス
2. 上部の「プロジェクトを選択」→「新しいプロジェクト」
3. プロジェクト名：`youtube-script-sender`（任意）
4. 「作成」をクリック

#### 2. Gmail API を有効化

1. 左メニュー「APIとサービス」→「ライブラリ」
2. 「Gmail API」を検索してクリック
3. 「有効にする」をクリック

#### 3. OAuth 同意画面を設定

1. 左メニュー「APIとサービス」→「OAuth 同意画面」
2. ユーザータイプ：「外部」を選択（個人Googleアカウントの場合）
3. アプリ名：`YouTube台本送信`（任意）
4. ユーザーサポートメール：自分のメールアドレス
5. デベロッパーの連絡先情報：自分のメールアドレス
6. 「保存して次へ」

#### 4. スコープを追加

1. 「スコープを追加または削除」をクリック
2. `https://www.googleapis.com/auth/gmail.send` を検索して選択
3. 「更新」→「保存して次へ」

#### 5. テストユーザーを追加

1. 「Add users」をクリック
2. 自分のGmailアドレスを追加
3. 「保存して次へ」

#### 6. OAuth クライアント ID を作成

1. 左メニュー「APIとサービス」→「認証情報」
2. 「認証情報を作成」→「OAuth クライアント ID」
3. アプリケーションの種類：「デスクトップ アプリ」
4. 名前：`youtube-script`（任意）
5. 「作成」をクリック
6. 「JSONをダウンロード」をクリック
7. ダウンロードしたファイルを `credentials.json` としてプロジェクトルートに置く

#### 7. 初回認証（ローカルで1回だけ実行）

```bash
python main.py
```

- ブラウザが自動で開き、Googleアカウントのログイン画面が表示されます
- ログインして「許可」をクリック
- `token.json` が自動的に作成されます
- この `token.json` は GitHub Actions でも使います

### 方法B：SMTP（簡易版）

Gmail API の設定が難しい場合は、SMTP で送信できます。

1. Googleアカウントの2段階認証を有効化
2. https://myaccount.google.com/apppasswords でアプリパスワードを生成
3. `.env` を以下のように設定：

```
EMAIL_METHOD=smtp
SMTP_USER=your-gmail@gmail.com
SMTP_PASSWORD=xxxx-xxxx-xxxx-xxxx
RECIPIENT_EMAIL=your-email@example.com
```

---

## ローカルで実行する

```bash
# .env を読み込んで実行（Linux/Mac）
export $(cat .env | grep -v '^#' | xargs) && python main.py

# Windows (PowerShell)
Get-Content .env | ForEach-Object { if ($_ -match '^([^#].+?)=(.*)$') { [Environment]::SetEnvironmentVariable($matches[1], $matches[2]) } }; python main.py
```

---

## GitHub Actions で毎日自動実行する

### 1. リポジトリの Secrets を設定

GitHubリポジトリの「Settings」→「Secrets and variables」→「Actions」で、
以下の Secrets を追加してください：

| Secret名 | 内容 |
|----------|------|
| `OPENAI_API_KEY` | OpenAI のAPIキー |
| `RECIPIENT_EMAIL` | 台本の送信先メールアドレス |
| `SENDER_EMAIL` | 送信元のGmailアドレス |
| `GMAIL_CREDENTIALS_JSON` | `credentials.json` の中身をそのままコピペ |
| `GMAIL_TOKEN_JSON` | `token.json` の中身をそのままコピペ |

> **ファイルの中身をコピーする方法：**
> ```bash
> cat credentials.json   # この出力をコピー
> cat token.json          # この出力をコピー
> ```

### 2. テーマ履歴を引き継ぐ場合（オプション）

ローカルで実行済みの場合、履歴を Secrets に保存できます：

| Secret名 | 内容 |
|----------|------|
| `TOPIC_HISTORY_JSON` | `data/topic_history.json` の中身 |
| `SENT_LOG_JSON` | `data/sent_log.json` の中身 |

### 3. 手動テスト実行

1. GitHubリポジトリの「Actions」タブを開く
2. 左メニューの「Daily YouTube Script Generator」をクリック
3. 「Run workflow」→「Run workflow」をクリック
4. 実行結果を確認

### 4. 自動実行の確認

- ワークフローは毎日 UTC 22:00（= JST 翌日 7:00）に自動実行されます
- 「Actions」タブで実行履歴を確認できます

---

## テスト手順

### 1. 環境変数のチェック

```bash
python -c "import config; print('OK' if config.validate() else 'NG')"
```

### 2. テーマ選定のテスト

```bash
python -c "
import topic_manager
cat, topic = topic_manager.select_topic('2025-01-01')
print(f'カテゴリ: {cat}')
print(f'テーマ: {topic}')
"
```

### 3. 台本生成のテスト（APIキーが必要）

```bash
python -c "
import config
import script_generator
result = script_generator.generate_script('AI活用', 'AIで自由を作る経営', '2025-01-01', [])
print(result[:500])
"
```

### 4. 全体テスト

```bash
python main.py
```

---

## エラー発生時の確認ポイント

### 「OPENAI_API_KEY が設定されていません」

→ `.env` ファイルに `OPENAI_API_KEY` を設定しているか確認
→ GitHub Actions の場合は Secrets に設定しているか確認

### 「RECIPIENT_EMAIL が設定されていません」

→ `.env` ファイルに `RECIPIENT_EMAIL` を設定しているか確認

### 「Gmail API トークンの更新に失敗」

→ `token.json` が古くなっている可能性があります
→ `token.json` を削除して、ローカルで `python main.py` を再実行し、
   再認証してから新しい `token.json` を Secrets に登録し直してください

### 「openai.AuthenticationError」

→ OpenAI APIキーが正しいか確認
→ APIキーに有効なクレジットがあるか確認
→ https://platform.openai.com/usage で利用状況を確認

### 「ModuleNotFoundError」

→ `pip install -r requirements.txt` を再実行

### 二重送信された？

→ `data/sent_log.json` を確認。同じ日付のエントリがあるか確認
→ GitHub Actions ではアーティファクトとして保存されます

---

## スケジュール実行方式の比較

| 方式 | 難易度 | コスト | 特徴 |
|------|--------|--------|------|
| **GitHub Actions（主案）** | ★★☆ | 無料枠あり | 設定が比較的簡単。Secretsで安全に管理 |
| ローカル cron | ★☆☆ | 無料 | PCが起動している必要あり |
| Cloud Run + Scheduler | ★★★ | 従量課金 | 本格運用向け。スケーリング可能 |

### 補足：ローカル cron で実行する場合

```bash
# crontab を編集
crontab -e

# 以下の行を追加（毎日7:00 JST に実行）
0 7 * * * cd /path/to/hiro && export $(cat .env | grep -v '^#' | xargs) && /usr/bin/python3 main.py >> /tmp/youtube-script.log 2>&1
```

### 補足：Google Cloud Run + Cloud Scheduler の場合

1. Dockerfile を作成して Cloud Run にデプロイ
2. Cloud Scheduler で毎日 7:00 JST に HTTP トリガー
3. Secret Manager で API キーを管理
4. 詳細は Google Cloud Run のドキュメントを参照

---

## 将来の拡張メモ

### LINE 送信に対応する場合

1. `line_sender.py` を新規作成
2. LINE Notify API または LINE Messaging API を使用
3. `config.py` に `LINE_TOKEN` を追加
4. `main.py` で `gmail_sender` と同様に呼び出す

```python
# line_sender.py のイメージ
import requests

def send_line(message: str, token: str) -> None:
    requests.post(
        "https://notify-api.line.me/api/notify",
        headers={"Authorization": f"Bearer {token}"},
        data={"message": message},
    )
```

### Google ドキュメントに保存する場合

1. `gdocs_saver.py` を新規作成
2. Google Docs API を有効化
3. `credentials.json` に Docs API のスコープを追加
4. 毎日の台本を自動でドキュメントに追記

```python
# gdocs_saver.py のイメージ
from googleapiclient.discovery import build

def save_to_doc(doc_id: str, content: str, creds) -> None:
    service = build("docs", "v1", credentials=creds)
    requests_body = [{"insertText": {"location": {"index": 1}, "text": content}}]
    service.documents().batchUpdate(
        documentId=doc_id, body={"requests": requests_body}
    ).execute()
```

### Notion に保存する場合

1. `notion_saver.py` を新規作成
2. Notion Integration を作成してトークンを取得
3. データベースに毎日の台本をページとして追加

### その他の拡張アイデア

- 台本の品質をAIでレビューする二段階生成
- 過去の台本からパフォーマンスデータを分析
- 視聴者コメントの自動分析とテーマへの反映
- サムネイル画像の自動生成（DALL-E連携）

---

## ライセンス

このプロジェクトはプライベート利用を想定しています。
