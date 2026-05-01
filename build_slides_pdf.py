"""
ミラコレ向けスピリチュアルビジネスセミナー 第1弾1回目
スライド資料PDFジェネレータ

26枚のスライドを16:9形式で生成する。
レイアウトA（扉）、B（見出し+本文）、C（余白多め）の3種類を使い分ける。
"""

from reportlab.lib.pagesizes import landscape
from reportlab.pdfgen import canvas
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.lib.colors import HexColor

PAGE_W = 13.33 * 72
PAGE_H = 7.5 * 72
PAGE_SIZE = (PAGE_W, PAGE_H)

BG = HexColor("#FAFAF7")
INK = HexColor("#1A2B4A")
MUTED = HexColor("#6B7388")
ACCENT = HexColor("#C9A961")
HAIRLINE = HexColor("#D4D4CE")

pdfmetrics.registerFont(TTFont("JP", "/usr/share/fonts/opentype/ipafont-gothic/ipag.ttf"))
pdfmetrics.registerFont(TTFont("JP-P", "/usr/share/fonts/opentype/ipafont-gothic/ipagp.ttf"))


def fill_bg(c):
    c.setFillColor(BG)
    c.rect(0, 0, PAGE_W, PAGE_H, fill=1, stroke=0)


def draw_centered_lines(c, lines, font, size, leading, y_center, color=INK):
    c.setFont(font, size)
    c.setFillColor(color)
    total_h = leading * (len(lines) - 1)
    y = y_center + total_h / 2
    for line in lines:
        c.drawCentredString(PAGE_W / 2, y, line)
        y -= leading


def draw_left_lines(c, lines, font, size, leading, x, y_top, color=INK):
    c.setFont(font, size)
    c.setFillColor(color)
    y = y_top
    for line in lines:
        c.drawString(x, y, line)
        y -= leading


def draw_page_number(c, n, total):
    c.setFont("JP", 9)
    c.setFillColor(MUTED)
    c.drawRightString(PAGE_W - 30, 22, f"{n} / {total}")


def layout_A(c, title_lines, subtitle_lines=None):
    fill_bg(c)
    c.setStrokeColor(ACCENT)
    c.setLineWidth(0.8)
    c.line(PAGE_W / 2 - 60, PAGE_H - 80, PAGE_W / 2 + 60, PAGE_H - 80)
    draw_centered_lines(c, title_lines, "JP", 44, 60, PAGE_H / 2 + 30)
    if subtitle_lines:
        draw_centered_lines(c, subtitle_lines, "JP", 18, 30, PAGE_H / 2 - 90, color=MUTED)


def layout_B(c, title, body_lines):
    fill_bg(c)
    c.setFont("JP", 26)
    c.setFillColor(INK)
    c.drawString(80, PAGE_H - 90, title)
    c.setStrokeColor(ACCENT)
    c.setLineWidth(1.2)
    c.line(80, PAGE_H - 110, 180, PAGE_H - 110)
    draw_left_lines(c, body_lines, "JP", 22, 40, 80, PAGE_H - 180)


def layout_B_centered(c, title, body_lines):
    fill_bg(c)
    c.setFont("JP", 26)
    c.setFillColor(INK)
    c.drawString(80, PAGE_H - 90, title)
    c.setStrokeColor(ACCENT)
    c.setLineWidth(1.2)
    c.line(80, PAGE_H - 110, 180, PAGE_H - 110)
    body_y_center = (PAGE_H - 130) / 2 + 40
    draw_centered_lines(c, body_lines, "JP", 22, 40, body_y_center)


def layout_C(c, body_lines, big=False):
    fill_bg(c)
    size = 30 if big else 24
    leading = 50 if big else 42
    draw_centered_lines(c, body_lines, "JP", size, leading, PAGE_H / 2)


SLIDES = [
    {
        "n": 1,
        "layout": "A",
        "title": ["スピリチュアルを仕事にする", "現在地Q&Aライブ"],
        "subtitle": [
            "あなたの「次の一歩」を一緒に見つける90分",
            "",
            "ミラクルコレクション メンバー限定",
            "2026年5月〇日",
        ],
    },
    {
        "n": 2,
        "layout": "B-centered",
        "title": "今日のゴール",
        "body": [
            "「自分が今どこにいて",
            " 次に何をすればいいのか」",
            "",
            "これがふんわり見えていれば",
            "今日は大成功です。",
        ],
    },
    {
        "n": 3,
        "layout": "B-centered",
        "title": "こんにちは",
        "body": [
            "[名前]",
            "",
            "スピリチュアルを大切にしながら",
            "それを仕事にしてきた人として",
            "今日は皆さんと一緒に進めます。",
        ],
    },
    {
        "n": 4,
        "layout": "B",
        "title": "5月〜8月の流れ",
        "body": [
            "5月   現在地を知り、最初の有料1件へ",
            "",
            "6月   メニューと価格を整える",
            "",
            "7月   発信と告知を整える",
            "",
            "8月   続けていける形をつくる",
        ],
    },
    {
        "n": 5,
        "layout": "A",
        "title": ["皆さんから集まった声"],
        "subtitle": ["事前アンケート結果"],
    },
    {
        "n": 6,
        "layout": "B",
        "title": "一番多かった悩み",
        "body": [
            "1位   何を提供すればいいか分からない    〇%",
            "",
            "2位   価格を決められない             〇%",
            "",
            "3位   告知や発信が苦手              〇%",
            "",
            "4位   申込み導線がない              〇%",
        ],
    },
    {
        "n": 7,
        "layout": "B",
        "title": "直近3ヶ月の有料セッション申込み数",
        "body": [
            "0件      〇%",
            "1〜2件   〇%",
            "3件以上  〇%",
            "",
            "",
            "止まっているのは、才能ではなく",
            "「順番」が分からないだけ。",
        ],
    },
    {
        "n": 8,
        "layout": "A",
        "title": ["現在地の4タイプ"],
        "subtitle": ["自分はどこにいるかを見つけてください。"],
    },
    {
        "n": 9,
        "layout": "B-centered",
        "title": "4つのタイプ",
        "body": [
            "A   才能迷子タイプ",
            "",
            "B   無料止まりタイプ",
            "",
            "C   メニューはあるが申込みがないタイプ",
            "",
            "D   有料実績はあるが安定しないタイプ",
        ],
    },
    {
        "n": 10,
        "layout": "B",
        "title": "A   才能迷子タイプ",
        "body": [
            "「自分の強みが分からない」",
            "「何を提供したらいいか分からない」",
            "",
            "→ お客さんが欲しいのは「資格」ではなく",
            "  あなたと話して起きた「変化」",
            "",
            "明日からできること",
            "過去に誰かが「楽になった」「動けた」",
            "そういう瞬間を、3つ思い出す。",
        ],
    },
    {
        "n": 11,
        "layout": "B",
        "title": "B   無料止まりタイプ",
        "body": [
            "「無料ならできるけど、有料が怖い」",
            "",
            "→ お金を払った人ほど、本気で取り組む。",
            "  有料化は「相手のため」でもある。",
            "",
            "明日からできること",
            "3,000〜5,000円でいい。",
            "「お金を受け取る経験」を1回だけ作る。",
        ],
    },
    {
        "n": 12,
        "layout": "B",
        "title": "C   メニューはあるが申込みがないタイプ",
        "body": [
            "「発信もしている。でも申込みが来ない」",
            "",
            "→ 原因の多くは「誰のためか」が",
            "  伝わっていないこと。",
            "",
            "明日からできること",
            "メニュー文の冒頭に",
            "「こういう方へ」を一行足す。",
        ],
    },
    {
        "n": 13,
        "layout": "B",
        "title": "D   有料実績はあるが安定しないタイプ",
        "body": [
            "「来る月もあれば、来ない月もある」",
            "",
            "→ 必要なのは新規集客ではなく",
            "  「もう一度迎える仕組み」",
            "",
            "明日からできること",
            "過去に来てくれた1人に",
            "「最近どうですか」と連絡してみる。",
        ],
    },
    {
        "n": 14,
        "layout": "C",
        "body": [
            "あなたは",
            "A〜D、どれに近いですか？",
            "",
            "",
            "チャットに書いてください。",
        ],
        "big": True,
    },
    {
        "n": 15,
        "layout": "A",
        "title": ["Q&A"],
        "subtitle": None,
    },
    {
        "n": 16,
        "layout": "B-centered",
        "title": "今、答えている質問",
        "body": [
            "[ここに質問内容をその場で表示]",
        ],
    },
    {
        "n": 17,
        "layout": "C",
        "body": [
            "ひといき。",
            "",
            "頭がぐるぐるしてきたら",
            "深呼吸を一回。",
            "",
            "今日のうちに「これだけはやろう」を",
            "ひとつ持って帰れたら、それで十分です。",
        ],
    },
    {
        "n": 18,
        "layout": "C",
        "body": [
            "ここからは",
            "",
            "今、チャットに書いてくれた質問を",
            "拾っていきます。",
        ],
        "big": True,
    },
    {
        "n": 19,
        "layout": "A",
        "title": ["最後に", "持って帰ってほしいこと"],
        "subtitle": None,
    },
    {
        "n": 20,
        "layout": "C",
        "body": [
            "今日のメッセージ",
            "",
            "",
            "自分は、思ってたより",
            "できる場所にいる。",
        ],
        "big": True,
    },
    {
        "n": 21,
        "layout": "B",
        "title": "次回予告",
        "body": [
            "個人セッションメニュー作成会",
            "",
            "「自分は何を提供したらいいか分からない」",
            "「メニューが作れない」「価格が決められない」",
            "",
            "→ 次回でほぼ全員、形ができます。",
            "",
            "事前にワークシートをお送りします。",
        ],
    },
    {
        "n": 22,
        "layout": "B",
        "title": "今月の宿題",
        "body": [
            "誰か1人に",
            "「自分のセッションを受けてもらえないか」",
            "と声をかけてみる。",
            "",
            "家族・友達・SNSフォロワー、誰でもOK。",
            "無料でも有料でもOK。",
            "",
            "大事なのは「声をかける」という行動を",
            "1回すること。",
        ],
    },
    {
        "n": 23,
        "layout": "C",
        "body": [
            "スピリチュアルな力は",
            "持っている本人が一番",
            "その価値に気づきにくい。",
            "",
            "でも、それを必要としている人は",
            "今この瞬間にも、どこかで困っています。",
            "",
            "その人に、ちゃんと届くように。",
            "そして、あなた自身も、ちゃんと豊かに。",
        ],
    },
    {
        "n": 24,
        "layout": "C",
        "body": [
            "今日はありがとうございました。",
            "",
            "",
            "次回もお待ちしています。",
        ],
        "big": True,
    },
    {
        "n": 25,
        "layout": "B-centered",
        "title": "本日の録画について",
        "body": [
            "ミラコレメンバー限定で",
            "1週間配信します。",
            "",
            "復習用にどうぞ。",
            "振り返りたい部分だけでも大丈夫です。",
        ],
    },
    {
        "n": 26,
        "layout": "C",
        "body": [
            "あなたのスピリチュアルな力を",
            "必要な人に届けるために",
        ],
        "big": True,
    },
]


def build_pdf(out_path):
    c = canvas.Canvas(out_path, pagesize=PAGE_SIZE)
    c.setTitle("スピリチュアルを仕事にする 現在地Q&Aライブ")
    c.setAuthor("ミラクルコレクション")
    total = len(SLIDES)

    for s in SLIDES:
        layout = s["layout"]
        if layout == "A":
            layout_A(c, s["title"], s.get("subtitle"))
        elif layout == "B":
            layout_B(c, s["title"], s["body"])
        elif layout == "B-centered":
            layout_B_centered(c, s["title"], s["body"])
        elif layout == "C":
            layout_C(c, s["body"], big=s.get("big", False))
        draw_page_number(c, s["n"], total)
        c.showPage()

    c.save()


if __name__ == "__main__":
    out = "/home/user/hiro/スライド資料.pdf"
    build_pdf(out)
    print(f"PDF generated: {out}")
