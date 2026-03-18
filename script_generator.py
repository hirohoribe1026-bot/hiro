"""
台本生成モジュール
OpenAI API または Anthropic API を使って YouTube 台本を生成する
"""
import logging

import config
from prompts import SYSTEM_PROMPT, build_user_prompt

logger = logging.getLogger(__name__)


def generate_script(
    topic_category: str,
    topic_title: str,
    today_str: str,
    recent_topics: list[str],
) -> str:
    """
    AIを使って台本を生成する。
    config.AI_PROVIDER の値に応じて OpenAI or Anthropic を切り替える。
    """
    user_prompt = build_user_prompt(
        topic_category=topic_category,
        topic_title=topic_title,
        today_str=today_str,
        recent_topics=recent_topics,
    )

    if config.AI_PROVIDER == "openai":
        return _generate_with_openai(user_prompt)
    elif config.AI_PROVIDER == "anthropic":
        return _generate_with_anthropic(user_prompt)
    else:
        raise ValueError(
            f"AI_PROVIDER が不正です: {config.AI_PROVIDER}\n"
            "  → 'openai' または 'anthropic' を設定してください。"
        )


def _generate_with_openai(user_prompt: str) -> str:
    """OpenAI API で台本を生成する"""
    from openai import OpenAI

    logger.info(f"OpenAI API で台本生成中... (モデル: {config.OPENAI_MODEL})")
    client = OpenAI(api_key=config.OPENAI_API_KEY)

    response = client.chat.completions.create(
        model=config.OPENAI_MODEL,
        messages=[
            {"role": "system", "content": SYSTEM_PROMPT},
            {"role": "user", "content": user_prompt},
        ],
        temperature=0.8,
        max_tokens=4096,
    )

    content = response.choices[0].message.content
    logger.info("台本生成完了 (OpenAI)")
    return content


def _generate_with_anthropic(user_prompt: str) -> str:
    """Anthropic (Claude) API で台本を生成する"""
    import anthropic

    logger.info(f"Anthropic API で台本生成中... (モデル: {config.ANTHROPIC_MODEL})")
    client = anthropic.Anthropic(api_key=config.ANTHROPIC_API_KEY)

    response = client.messages.create(
        model=config.ANTHROPIC_MODEL,
        max_tokens=4096,
        system=SYSTEM_PROMPT,
        messages=[
            {"role": "user", "content": user_prompt},
        ],
        temperature=0.8,
    )

    content = response.content[0].text
    logger.info("台本生成完了 (Anthropic)")
    return content
