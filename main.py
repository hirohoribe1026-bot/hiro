"""
YouTube台本自動生成 & メール送信 メインスクリプト

毎日実行して、AIで台本を生成し、Gmailで送信する。
同じ日の二重送信を防止し、テーマの重複を減らす。
"""
import sys
import logging
from datetime import datetime, timezone, timedelta

import config
import storage
import topic_manager
import script_generator
import gmail_sender

logger = logging.getLogger(__name__)

# 日本時間のタイムゾーン
JST = timezone(timedelta(hours=9))


def main() -> None:
    """メイン処理"""
    logger.info("=" * 60)
    logger.info("YouTube台本自動生成システム 開始")
    logger.info("=" * 60)

    # 1. 環境変数チェック
    if not config.validate():
        logger.error("環境変数の検証に失敗しました。処理を中断します。")
        sys.exit(1)

    # 2. 今日の日付（日本時間）
    now_jst = datetime.now(JST)
    today_str = now_jst.strftime("%Y-%m-%d")
    logger.info(f"実行日時（JST）: {now_jst.strftime('%Y-%m-%d %H:%M:%S')}")

    # 3. 二重送信チェック
    if storage.is_already_sent(today_str):
        logger.info(f"{today_str} の台本は既に送信済みです。スキップします。")
        return

    # 4. テーマ選定
    category, topic = topic_manager.select_topic(today_str)
    recent_titles = storage.get_recent_topic_titles()

    # 5. 台本生成
    logger.info("台本を生成しています...")
    script_content = script_generator.generate_script(
        topic_category=category,
        topic_title=topic,
        today_str=today_str,
        recent_topics=recent_titles,
    )

    # 6. メール件名と本文を組み立て
    subject = f"【YouTube台本】{today_str} 今日の台本"
    body = _build_email_body(today_str, category, topic, script_content)

    # 7. メール送信
    logger.info("メールを送信しています...")
    gmail_sender.send_email(subject=subject, body=body)

    # 8. 履歴・ログ保存
    storage.save_topic(today_str, category, topic)
    storage.mark_as_sent(today_str)

    logger.info("=" * 60)
    logger.info("すべての処理が完了しました！")
    logger.info("=" * 60)


def _build_email_body(
    today_str: str,
    category: str,
    topic: str,
    script_content: str,
) -> str:
    """メール本文を組み立てる"""
    header = f"""\
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
YouTube台本 ─ {today_str}
穂利辺ヒロ AIに稼がせるCEOの成功法則
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

【カテゴリ】{category}
【テーマ】{topic}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

"""
    return header + script_content


if __name__ == "__main__":
    main()
