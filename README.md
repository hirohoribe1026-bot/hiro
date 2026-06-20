# hiro

[Fish Audio](https://fish.audio/) のテキスト読み上げ（TTS）を使うための連携ツール。

## セットアップ

```bash
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt

# APIキーを設定
cp .env.example .env
# .env を開いて FISH_AUDIO_API_KEY を設定する
```

## 使い方

```bash
# テキストを音声ファイルに変換
python fish_tts.py "こんにちは、世界" -o hello.mp3

# フォーマット指定 (mp3 / wav / pcm)
python fish_tts.py "Hello" -o hello.wav -f wav

# クローン音声を使う（fish.audio の音声モデルID）
python fish_tts.py "テスト" -r <reference_id>
```

### オプション

| オプション | 説明 | 既定値 |
| --- | --- | --- |
| `text` | 読み上げるテキスト（必須） | — |
| `-o, --output` | 出力ファイル | `output.mp3` |
| `-f, --format` | 音声フォーマット (`mp3`/`wav`/`pcm`) | `mp3` |
| `-r, --reference-id` | 音声モデルID（クローン音声） | なし |
| `-m, --model` | 使用モデル (`s1`, `speech-1.6` など) | `s1` |

## メモ

- APIキーは `.env` に保存し、Git にはコミットされません（`.gitignore` 済み）。
- API仕様: <https://docs.fish.audio>
