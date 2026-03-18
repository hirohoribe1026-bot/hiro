"""
メール送信モジュール
Gmail API（主案）または SMTP（代替案）でメールを送信する
"""
import base64
import logging
import smtplib
from email.mime.text import MIMEText

import config

logger = logging.getLogger(__name__)


def send_email(subject: str, body: str) -> None:
    """設定に応じたメール送信方法で送信する"""
    if config.EMAIL_METHOD == "gmail_api":
        _send_with_gmail_api(subject, body)
    elif config.EMAIL_METHOD == "smtp":
        _send_with_smtp(subject, body)
    else:
        raise ValueError(
            f"EMAIL_METHOD が不正です: {config.EMAIL_METHOD}\n"
            "  → 'gmail_api' または 'smtp' を設定してください。"
        )


def _send_with_gmail_api(subject: str, body: str) -> None:
    """Gmail API でメールを送信する"""
    import os
    import json
    from google.oauth2.credentials import Credentials
    from google.auth.transport.requests import Request
    from google_auth_oauthlib.flow import InstalledAppFlow
    from googleapiclient.discovery import build

    SCOPES = ["https://www.googleapis.com/auth/gmail.send"]

    creds = None
    token_file = config.GMAIL_TOKEN_FILE
    credentials_file = config.GMAIL_CREDENTIALS_FILE

    # トークンファイルが存在すれば読み込む
    if os.path.exists(token_file):
        creds = Credentials.from_authorized_user_file(token_file, SCOPES)

    # トークンが無効 or 期限切れなら更新
    if not creds or not creds.valid:
        if creds and creds.expired and creds.refresh_token:
            logger.info("Gmail API トークンを更新中...")
            creds.refresh(Request())
        else:
            logger.info("Gmail API の認証フローを開始します...")
            flow = InstalledAppFlow.from_client_secrets_file(
                credentials_file, SCOPES
            )
            creds = flow.run_local_server(port=0)

        # トークンを保存
        with open(token_file, "w") as token:
            token.write(creds.to_json())
        logger.info("Gmail API トークンを保存しました。")

    service = build("gmail", "v1", credentials=creds)

    # メール作成
    message = MIMEText(body, "plain", "utf-8")
    message["to"] = config.RECIPIENT_EMAIL
    message["from"] = config.SENDER_EMAIL
    message["subject"] = subject

    raw = base64.urlsafe_b64encode(message.as_bytes()).decode("utf-8")
    send_message = service.users().messages().send(
        userId="me",
        body={"raw": raw},
    ).execute()

    logger.info(
        f"Gmail API でメール送信完了: Message Id = {send_message.get('id')}"
    )


def _send_with_smtp(subject: str, body: str) -> None:
    """SMTP でメールを送信する（代替案）"""
    message = MIMEText(body, "plain", "utf-8")
    message["Subject"] = subject
    message["From"] = config.SMTP_USER
    message["To"] = config.RECIPIENT_EMAIL

    logger.info(f"SMTP でメール送信中... ({config.SMTP_SERVER}:{config.SMTP_PORT})")

    with smtplib.SMTP(config.SMTP_SERVER, config.SMTP_PORT) as server:
        server.starttls()
        server.login(config.SMTP_USER, config.SMTP_PASSWORD)
        server.send_message(message)

    logger.info("SMTP でメール送信完了")
