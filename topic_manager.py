"""
テーマ選定モジュール
カテゴリのローテーションと具体テーマの選定を行う
"""
import random
import logging

import storage

logger = logging.getLogger(__name__)

# カテゴリ定義と候補テーマ
CATEGORIES: dict[str, list[str]] = {
    "AI活用": [
        "AIに任せるべき仕事、任せてはいけない仕事",
        "AIで自由を作る経営",
        "AI時代に伸びる社長の考え方",
        "AIを使っても売れない人の共通点",
        "AIに丸投げして失敗する人の特徴",
        "ChatGPTを経営に使う本当のコツ",
        "AI時代に生き残る経営者と消える経営者",
        "AIが得意なことと人間がやるべきこと",
        "AIで月100時間を取り戻す方法",
        "AIを使いこなす人が最初にやったこと",
        "中小企業こそAIを使うべき本当の理由",
        "AIに任せて売上が上がった実例",
        "AI導入で失敗する社長の思考パターン",
        "AIを怖がる経営者に伝えたいこと",
        "AIで組織を変える最初の一手",
    ],
    "経営と仕組み化": [
        "年商が増えても自由になれない理由",
        "頑張る社長ほど手放せない罠",
        "売上を伸ばす前に整えるべき設計",
        "属人経営から抜ける方法",
        "社長が現場を離れるための3ステップ",
        "仕組みで回る会社の作り方",
        "売上1億と10億で変えるべきこと",
        "経営者が最初に手放すべき仕事",
        "利益率を上げる仕組みの考え方",
        "社長の時間を奪う犯人の正体",
        "伸びる会社がやっている設計思考",
        "マニュアル化より大事な仕組み化のコツ",
        "経営者の孤独を解消する方法",
        "儲かっているのに苦しい会社の特徴",
        "右腕が育たない本当の理由",
    ],
    "才能開花と収益化": [
        "才能があるのに売れない人の問題",
        "才能は見つけるより設計が大事",
        "商品が売れないのは能力不足ではない",
        "自分の強みをお金に変える視点",
        "好きなことで食べていくための設計図",
        "才能を商品にする3つのステップ",
        "埋もれている才能の見つけ方",
        "売れる才能と売れない才能の違い",
        "自分の価値を安売りしない方法",
        "コンテンツビジネスの始め方",
        "知識や経験を収益に変える設計",
        "才能がないと思い込んでいる人へ",
        "強みを尖らせるポジショニング",
        "あなたの経験が誰かの救いになる理由",
        "単価を上げても選ばれる人の共通点",
    ],
    "自由な生き方と豊かさ": [
        "豊かさは頑張った先ではなく設計で作る",
        "自由な人ほど管理しているもの",
        "時間がない人がまず捨てるべきこと",
        "人生の主導権を取り戻す考え方",
        "お金の不安から自由になる思考法",
        "忙しさを美徳にしない生き方",
        "経営者こそ遊びが必要な理由",
        "人生を変えたければ環境を変えろ",
        "自由とわがままの決定的な違い",
        "稼いでも幸せになれない人の特徴",
        "人生後半戦の生き方設計",
        "旅をしながら経営する方法",
        "お金より時間を優先する経営",
        "50代からの人生の再設計",
        "豊かさのステージが変わるサイン",
    ],
    "直感とスピリチュアル経営": [
        "直感で決める人がやっている準備",
        "スピリチュアルとビジネスを分けると弱くなる理由",
        "感覚派が売上を作るための現実的な設計",
        "見えない価値を現実に変える方法",
        "直感経営で年商10億を作った話",
        "エネルギーが高い経営者の習慣",
        "引き寄せではなく引き受けの法則",
        "流れに乗る経営判断のコツ",
        "波動とビジネスの関係",
        "違和感を信じる経営判断",
        "運が良い経営者がやっていること",
        "覚醒と経営成果は両立する",
        "目に見えない資産の作り方",
        "直感を磨くための日常習慣",
        "感性で選ぶと間違えない理由",
    ],
}

CATEGORY_ORDER = list(CATEGORIES.keys())


def select_topic(today_str: str) -> tuple[str, str]:
    """
    今日のカテゴリとテーマを選定する。

    ルール：
    - 前日と同じカテゴリは避ける
    - 直近7日で使ったテーマは避ける
    - カテゴリが偏らないようにローテーションする

    Returns:
        (category, topic_title) のタプル
    """
    recent_topics = storage.get_recent_topics()
    recent_categories = [t.get("category", "") for t in recent_topics]
    recent_titles = [t.get("topic", "") for t in recent_topics]

    # カテゴリ選定：最も最近使っていないカテゴリを優先
    category_scores: dict[str, int] = {}
    for cat in CATEGORY_ORDER:
        if cat in recent_categories:
            # 最後に使った位置（0が直近）
            idx = recent_categories.index(cat)
            category_scores[cat] = idx
        else:
            # 未使用カテゴリは最優先
            category_scores[cat] = 100

    # 前日と同じカテゴリはスコアを大幅に下げる
    if recent_categories:
        yesterday_cat = recent_categories[0]
        category_scores[yesterday_cat] = -10

    # スコアの高い順にソートし、上位からランダムに選ぶ
    sorted_cats = sorted(category_scores.items(), key=lambda x: x[1], reverse=True)
    top_score = sorted_cats[0][1]
    top_cats = [cat for cat, score in sorted_cats if score >= top_score - 1]
    selected_category = random.choice(top_cats)

    # テーマ選定：直近で使っていないものから選ぶ
    candidates = [
        t for t in CATEGORIES[selected_category]
        if t not in recent_titles
    ]
    if not candidates:
        # すべて使い切った場合はリセット
        candidates = CATEGORIES[selected_category]
        logger.info(f"カテゴリ「{selected_category}」の全テーマを使用済み。リセットします。")

    selected_topic = random.choice(candidates)
    logger.info(f"テーマ選定完了: [{selected_category}] {selected_topic}")
    return selected_category, selected_topic
