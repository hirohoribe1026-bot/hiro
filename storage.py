"""
ストレージモジュール
テーマ履歴と送信ログをJSONファイルで管理する
"""
import json
import logging
from datetime import datetime
from pathlib import Path

import config

logger = logging.getLogger(__name__)


def _load_json(filepath: str) -> list[dict]:
    """JSONファイルを読み込む。ファイルがなければ空リストを返す"""
    p = Path(filepath)
    if not p.exists():
        return []
    try:
        with open(p, "r", encoding="utf-8") as f:
            return json.load(f)
    except (json.JSONDecodeError, ValueError):
        logger.warning(f"{filepath} の読み込みに失敗。空リストとして扱います。")
        return []


def _save_json(filepath: str, data: list[dict]) -> None:
    """JSONファイルに書き込む"""
    Path(filepath).parent.mkdir(parents=True, exist_ok=True)
    with open(filepath, "w", encoding="utf-8") as f:
        json.dump(data, f, ensure_ascii=False, indent=2)


# ── テーマ履歴 ──────────────────────────────────────────

def get_recent_topics(days: int | None = None) -> list[dict]:
    """直近 N 日分のテーマ履歴を取得する"""
    if days is None:
        days = config.TOPIC_LOOKBACK_DAYS
    history = _load_json(config.HISTORY_FILE)
    if not history:
        return []
    cutoff = datetime.now().strftime("%Y-%m-%d")
    # 直近 days 件を返す（日付降順）
    sorted_hist = sorted(history, key=lambda x: x.get("date", ""), reverse=True)
    return sorted_hist[:days]


def get_recent_topic_titles(days: int | None = None) -> list[str]:
    """直近のテーマタイトルだけをリストで返す"""
    return [t.get("topic", "") for t in get_recent_topics(days)]


def get_recent_categories(days: int | None = None) -> list[str]:
    """直近のカテゴリだけをリストで返す"""
    return [t.get("category", "") for t in get_recent_topics(days)]


def save_topic(date_str: str, category: str, topic: str) -> None:
    """テーマ履歴に追記する"""
    history = _load_json(config.HISTORY_FILE)
    history.append({
        "date": date_str,
        "category": category,
        "topic": topic,
    })
    # 最大90日分だけ保持
    if len(history) > 90:
        history = history[-90:]
    _save_json(config.HISTORY_FILE, history)
    logger.info(f"テーマ履歴を保存: {date_str} / {category} / {topic}")


# ── 送信ログ（二重送信防止） ───────────────────────────────

def is_already_sent(date_str: str) -> bool:
    """指定日の台本が既に送信済みかチェックする"""
    log = _load_json(config.SENT_LOG_FILE)
    return any(entry.get("date") == date_str for entry in log)


def mark_as_sent(date_str: str) -> None:
    """送信済みとして記録する"""
    log = _load_json(config.SENT_LOG_FILE)
    log.append({
        "date": date_str,
        "sent_at": datetime.now().isoformat(),
    })
    # 最大90日分だけ保持
    if len(log) > 90:
        log = log[-90:]
    _save_json(config.SENT_LOG_FILE, log)
    logger.info(f"送信ログを記録: {date_str}")
