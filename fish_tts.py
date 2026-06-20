#!/usr/bin/env python3
"""Fish Audio TTS CLI — テキストを音声ファイルに変換する。

使い方:
    python fish_tts.py "こんにちは、世界" -o hello.mp3

環境変数 FISH_AUDIO_API_KEY が必要です（.env からも読み込みます）。
"""
import argparse
import os
import sys

from dotenv import load_dotenv
from fish_audio_sdk import Session, TTSRequest


def main() -> int:
    load_dotenv()

    parser = argparse.ArgumentParser(
        description="Fish Audio でテキストを音声に変換します",
    )
    parser.add_argument("text", help="読み上げるテキスト")
    parser.add_argument(
        "-o", "--output", default="output.mp3", help="出力ファイル (既定: output.mp3)"
    )
    parser.add_argument(
        "-f",
        "--format",
        default="mp3",
        choices=["mp3", "wav", "pcm"],
        help="音声フォーマット (既定: mp3)",
    )
    parser.add_argument(
        "-r",
        "--reference-id",
        help="音声モデルID（fish.audio で公開/作成したクローン音声を使う場合）",
    )
    parser.add_argument(
        "-m",
        "--model",
        default="s1",
        help="使用モデル (例: s1, speech-1.6)。既定: s1",
    )
    args = parser.parse_args()

    api_key = os.environ.get("FISH_AUDIO_API_KEY")
    if not api_key:
        print(
            "エラー: 環境変数 FISH_AUDIO_API_KEY が設定されていません。\n"
            ".env.example を .env にコピーしてキーを設定してください。",
            file=sys.stderr,
        )
        return 1

    session = Session(api_key)
    request = TTSRequest(
        text=args.text,
        format=args.format,
        reference_id=args.reference_id,
    )

    try:
        with open(args.output, "wb") as f:
            for chunk in session.tts(request, backend=args.model):
                f.write(chunk)
    except Exception as exc:  # noqa: BLE001 - CLI なので分かりやすく表示する
        print(f"音声生成に失敗しました: {exc}", file=sys.stderr)
        return 1

    print(f"音声を書き出しました: {args.output}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
