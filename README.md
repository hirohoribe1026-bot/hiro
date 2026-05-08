# ソウルミッション診断 — Soul Mission Diagnostic

穴口恵子のSNS流入用、5問で12タイプに分類するソウルミッション診断 Web アプリ。

- **動線**: SNS投稿 → 診断LP (`/`) → 5問 (`/question/1` 〜 `/question/5`) → LINE登録ゲート (`/register`) → 結果ページ (`/result/[typeId]`)
- **目的**: LINE公式アカウントへの登録誘導と、7日間ステップ配信への接続

## 技術スタック

- Next.js 14 (App Router) + TypeScript
- Tailwind CSS
- Framer Motion（フェード / 光のリプル / フロート）
- localStorage（回答状態と登録フラグの保持）
- html2canvas（結果画像のSNSシェア用ダウンロード）
- `next/og` ImageResponse（OGP動的生成、Edge Runtime）

## クイックスタート

```bash
# 1. 依存関係をインストール
npm install

# 2. 環境変数を準備
cp .env.local.example .env.local
# .env.local を編集し、NEXT_PUBLIC_LINE_URL と NEXT_PUBLIC_SITE_URL を設定

# 3. 開発サーバを起動
npm run dev
# → http://localhost:3000

# 4. テスト（スコアリングロジックの全分岐検証 / 1024パターン）
npm test

# 5. 本番ビルド
npm run build
npm start
```

## 環境変数

| キー | 用途 | 例 |
|------|------|------|
| `NEXT_PUBLIC_LINE_URL` | LINE公式アカウント友だち追加URL | `https://line.me/R/ti/p/@your-line-id` |
| `NEXT_PUBLIC_SITE_URL` | 本番公開URL（OGP の絶対URL生成に使用） | `https://soul-mission.example.com` |

## ファイル構成

```
app/
  page.tsx                  # 診断LP
  question/[id]/page.tsx    # 5問の質問ページ
  register/page.tsx         # LINE登録ゲート
  result/[type]/page.tsx    # 12種の結果ページ
  share/[typeId]/page.tsx   # SNS用OGメタ専用ページ → /result へリダイレクト
  api/og/[type]/route.tsx   # OGP画像 (1200x630) 動的生成
  layout.tsx                # フォント & metadata
  globals.css               # Tailwind + テーマ
  loading.tsx / error.tsx / not-found.tsx
components/
  Starfield.tsx             # 装飾用 SVG 星空
  SymbolSvg.tsx             # 12タイプそれぞれの象徴シンボル (SVG)
  QuestionCard.tsx          # 質問1問分の UI
  OptionButton.tsx          # 選択肢（光のリプル）
  ProgressBar.tsx           # 上部進捗バー
  ResultHero.tsx            # 結果ヒーロー（タイプ名 / エッセンス / シンボル）
  ShareButtons.tsx          # X / Threads / LINE / 画像 DL / コピー
data/
  soulTypes.ts              # 12タイプ定義 + 商品マッピング
  questions.ts              # 5問の質問データ
lib/
  scoring.ts                # スコアリング（同点時 Q5 優先）
  scoring.test.mjs          # node:test ベース、1024 全パターン検証
  storage.ts                # localStorage ラッパー
```

## スコアリング仕様

- 各設問の選択肢には複数タイプへのスコアが設定されている
- 5問の合計でタイプ別スコアを計算し、最大値のタイプを採用
- 同点の場合は Q5 の選択肢に登録されているタイプを優先
- それでも同点なら、最初に並ぶタイプを採用（決定論的）

## デプロイ（Vercel 想定）

1. このリポジトリを GitHub に push
2. [Vercel](https://vercel.com) に Import
3. Environment Variables に `NEXT_PUBLIC_LINE_URL` と `NEXT_PUBLIC_SITE_URL` を登録
4. Deploy
5. 公開URLを SNS の固定投稿・bio リンクに設置

## デザインガイド

| 役割 | カラー |
|------|--------|
| 主 | `#1E1B4B` 深藍 |
| 副 | `#6B46C1` 紫 |
| 強 | `#D4AF37` ゴールド |
| 背景 | `#FAF7F2` オフホワイト（カード）/ `#0c0a2a` 深宇宙（背面） |

- 見出し: Noto Serif JP / 本文: Noto Sans JP
- 雰囲気: 神秘的・高級感・覚醒・宇宙
- アニメーション: フェード、光のリプル、シンボルの回転登場

## SNSシェア仕様

- 結果ページ下部にX / Threads / LINE / 画像DL / テキストコピー
- 自動生成テキスト: `私のソウルミッションは「◯◯」でした。\n[essence]\n#ソウルミッション診断 #穴口恵子`
- OGP は `/api/og/[typeId]` で 1200x630 を動的生成
- `/share/[typeId]` は SNS 上で OGP を提示しつつ、人間アクセスは `/result/[typeId]` へリダイレクト

## ライセンス

© 穴口恵子 — 内部利用
