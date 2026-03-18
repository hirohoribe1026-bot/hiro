"""
設定管理モジュール
環境変数の読み込みと検証を行う
"""
import os
import sys
import logging
from pathlib import Path

# ログ設定
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [%(levelname)s] %(message)s",
    datefmt="%Y-%m-%d %H:%M:%S",
)
logger = logging.getLogger(__name__)

# プロジェクトルート
BASE_DIR = Path(__file__).resolve().parent

# データ保存ディレクトリ
DATA_DIR = BASE_DIR / "data"
DATA_DIR.mkdir(exist_ok=True)

# ── AI API 設定 ──────────────────────────────────────────
# "openai" または "anthropic" を指定
AI_PROVIDER = os.getenv("AI_PROVIDER", "openai")

# OpenAI
OPENAI_API_KEY = os.getenv("OPENAI_API_KEY", "")
OPENAI_MODEL = os.getenv("OPENAI_MODEL", "gpt-4o")

# Anthropic (Claude)
ANTHROPIC_API_KEY = os.getenv("ANTHROPIC_API_KEY", "")
ANTHROPIC_MODEL = os.getenv("ANTHROPIC_MODEL", "claude-sonnet-4-20250514")

# ── Gmail 設定 ─────────────────────────────────────────
# "gmail_api" または "smtp" を指定
EMAIL_METHOD = os.getenv("EMAIL_METHOD", "gmail_api")

# 送信先メールアドレス
RECIPIENT_EMAIL = os.getenv("RECIPIENT_EMAIL", "")

# Gmail API 用：サービスアカウントの JSON キーまたは OAuth credentials
# GitHub Actions では Secrets に JSON 文字列を保存し、
# ワークフロー内でファイルに書き出す
GMAIL_CREDENTIALS_FILE = os.getenv(
    "GMAIL_CREDENTIALS_FILE",
    str(BASE_DIR / "credentials.json"),
)
GMAIL_TOKEN_FILE = os.getenv(
    "GMAIL_TOKEN_FILE",
    str(BASE_DIR / "token.json"),
)
# Gmail API で送信元として使用するアドレス
SENDER_EMAIL = os.getenv("SENDER_EMAIL", "")

# SMTP 設定（補助案）
SMTP_SERVER = os.getenv("SMTP_SERVER", "smtp.gmail.com")
SMTP_PORT = int(os.getenv("SMTP_PORT", "587"))
SMTP_USER = os.getenv("SMTP_USER", "")
SMTP_PASSWORD = os.getenv("SMTP_PASSWORD", "")

# ── テーマ履歴 ──────────────────────────────────────────
HISTORY_FILE = str(DATA_DIR / "topic_history.json")
SENT_LOG_FILE = str(DATA_DIR / "sent_log.json")

# 直近何日分のテーマを重複チェック対象にするか
TOPIC_LOOKBACK_DAYS = int(os.getenv("TOPIC_LOOKBACK_DAYS", "7"))


def validate() -> bool:
    """必須環境変数が揃っているかチェックし、不足があれば分かりやすく表示する"""
    errors: list[str] = []

    # AI Provider チェック
    if AI_PROVIDER == "openai" and not OPENAI_API_KEY:
        errors.append(
            "OPENAI_API_KEY が設定されていません。\n"
            "  → OpenAI のダッシュボードで API キーを取得し、\n"
            "    環境変数 OPENAI_API_KEY に設定してください。"
        )
    elif AI_PROVIDER == "anthropic" and not ANTHROPIC_API_KEY:
        errors.append(
            "ANTHROPIC_API_KEY が設定されていません。\n"
            "  → Anthropic のコンソールで API キーを取得し、\n"
            "    環境変数 ANTHROPIC_API_KEY に設定してください。"
        )

    # メール送信先
    if not RECIPIENT_EMAIL:
        errors.append(
            "RECIPIENT_EMAIL が設定されていません。\n"
            "  → 台本を送りたいメールアドレスを環境変数に設定してください。"
        )

    # メール送信方法チェック
    if EMAIL_METHOD == "gmail_api":
        if not SENDER_EMAIL:
            errors.append(
                "SENDER_EMAIL が設定されていません。\n"
                "  → Gmail API で送信元にするアドレスを設定してください。"
            )
    elif EMAIL_METHOD == "smtp":
        if not SMTP_USER or not SMTP_PASSWORD:
            errors.append(
                "SMTP_USER / SMTP_PASSWORD が設定されていません。\n"
                "  → SMTP 送信に必要なユーザー名とアプリパスワードを設定してください。"
            )

    if errors:
        logger.error("=" * 60)
        logger.error("環境変数の設定に不足があります")
        logger.error("=" * 60)
        for i, e in enumerate(errors, 1):
            logger.error(f"\n【エラー {i}】\n{e}")
        logger.error("\n" + "=" * 60)
        return False

    return True
