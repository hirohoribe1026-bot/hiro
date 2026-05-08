export type ProductGroupKey = "A" | "B" | "C" | "D";

export interface SoulType {
  id: string;
  name: string;
  subtitle: string;
  essence: string;
  description: string;
  strengths: string[];
  shadow: string;
  mission: string;
  productGroup: ProductGroupKey;
}

export const SOUL_TYPES: SoulType[] = [
  {
    id: "creator",
    name: "創造主型",
    subtitle: "クリエイター",
    essence: "0→1で新しい世界を生み出す魂",
    description:
      "あなたは何もないところから世界を創り出す存在。アイデアが湧き出すのが止まらず、形にしないと苦しくなる。社会の枠ではなく自分の宇宙を作る使命を持つ。",
    strengths: ["独創性", "ビジョン化能力", "情熱の純度"],
    shadow: "完成前に飽きる、孤独になりすぎる",
    mission: "誰も見たことのない世界を物質化する",
    productGroup: "A",
  },
  {
    id: "leader",
    name: "統率者型",
    subtitle: "リーダー",
    essence: "人を集め大きな流れを生む魂",
    description:
      "あなたの周りには自然と人が集まる。エネルギーの磁場が強く、進む方向を示すと集団が動き出す。一人で完結せず、人を率いる時に最も輝く。",
    strengths: ["磁場形成力", "決断力", "求心力"],
    shadow: "背負いすぎる、休めない",
    mission: "覚醒のムーブメントを率いる",
    productGroup: "A",
  },
  {
    id: "messenger",
    name: "伝導師型",
    subtitle: "メッセンジャー",
    essence: "真実を言葉で広げる魂",
    description:
      "あなたは言葉に魂を乗せる人。書く・話す・伝えることで、聞いた人の意識が変わる。沈黙していると本来の力が落ちる。",
    strengths: ["言語化力", "共鳴を起こす声", "翻訳能力"],
    shadow: "言いすぎて疲れる、誤解されやすい",
    mission: "封じられた真実を世界に開示する",
    productGroup: "A",
  },
  {
    id: "healer",
    name: "治癒者型",
    subtitle: "ヒーラー",
    essence: "エネルギーで魂を還す存在",
    description:
      "あなたの存在自体が癒やし。手・声・気配だけで人を整える力がある。技法より「あなた自身」が薬になる稀有な魂。",
    strengths: ["共感力", "エネルギー伝達", "包容力"],
    shadow: "他人の感情を吸いすぎる",
    mission: "傷ついた魂を本来の振動に戻す",
    productGroup: "B",
  },
  {
    id: "guide",
    name: "案内人型",
    subtitle: "ガイド",
    essence: "迷う人に道を示す魂",
    description:
      "人生で何度も「答えを聞かれる」体験をしてきた。あなたは見えている。本人より先にその人の道が見える人。",
    strengths: ["俯瞰力", "比喩力", "信頼を預けられる存在感"],
    shadow: "自分の道は迷いがち",
    mission: "迷う魂に方角を渡す",
    productGroup: "B",
  },
  {
    id: "artist",
    name: "表現者型",
    subtitle: "アーティスト",
    essence: "美で人を覚醒させる魂",
    description:
      "あなたの作品・佇まい・選ぶ色は、見た人の魂を震わせる。理屈ではなく感覚で世界を変える側の存在。",
    strengths: ["美意識", "感性", "象徴化力"],
    shadow: "気分の波が大きい、評価で揺れる",
    mission: "美を通して次元を上げる",
    productGroup: "D",
  },
  {
    id: "teacher",
    name: "教導者型",
    subtitle: "ティーチャー",
    essence: "智慧を体系化して授ける魂",
    description:
      "あなたは複雑なものをシンプルに教える才能がある。学びを惜しまず、知った瞬間に「誰かに伝えたい」になる人。",
    strengths: ["体系化", "再現性ある伝授", "誠実さ"],
    shadow: "完璧主義で抱え込む",
    mission: "失われた智慧を次世代に渡す",
    productGroup: "D",
  },
  {
    id: "oracle",
    name: "観照者型",
    subtitle: "オラクル",
    essence: "見えないものを視て伝える魂",
    description:
      "予感・直感・夢が現実化する経験を何度もしている。静けさの中にいる時、最も深い情報が降りてくるタイプ。",
    strengths: ["直感", "見えない領域への接続", "静寂の力"],
    shadow: "受信過多で疲れる",
    mission: "目に見えない次元と人間界を繋ぐ",
    productGroup: "C",
  },
  {
    id: "weaver",
    name: "紡ぎ手型",
    subtitle: "ウィーバー",
    essence: "人と人の縁を結ぶ魂",
    description:
      "あなたが繋いだ人同士からプロジェクトや家族が生まれる。本人は中心に立たず、しかし全てを動かしている存在。",
    strengths: ["縁を見抜く目", "場づくり", "中庸さ"],
    shadow: "自分の願いを後回しにする",
    mission: "分断された世界を縁で再構築する",
    productGroup: "B",
  },
  {
    id: "guardian",
    name: "護り手型",
    subtitle: "ガーディアン",
    essence: "場とエネルギーを守る魂",
    description:
      "あなたがいる場所は浄化されている。守護存在と縁が深く、土地・組織・コミュニティの「土台」になる役割。",
    strengths: ["安定感", "結界力", "忠誠心"],
    shadow: "変化が苦手、抱え込む",
    mission: "聖なる場を守り続ける",
    productGroup: "C",
  },
  {
    id: "alchemist",
    name: "変容者型",
    subtitle: "アルケミスト",
    essence: "古い自分を脱皮させ続ける魂",
    description:
      "あなたは何度も「人生をリセット」してきた。痛みを通って変容する経験そのものが、他者への贈り物になる。",
    strengths: ["再生力", "深い洞察", "覚悟"],
    shadow: "破壊と再生のサイクルが激しすぎる",
    mission: "自らを変容させ、変容の道を示す",
    productGroup: "C",
  },
  {
    id: "architect",
    name: "設計者型",
    subtitle: "アーキテクト",
    essence: "未来を構造化して創る魂",
    description:
      "あなたは見えない未来を「仕組み」に翻訳できる。スピリチュアルなビジョンと現実の構造、両方を扱える稀有な存在。",
    strengths: ["俯瞰設計", "システム思考", "実装力"],
    shadow: "感情を後回しにしがち",
    mission: "新しい文明の設計図を引く",
    productGroup: "A",
  },
];

export const PRODUCT_MAP: Record<
  ProductGroupKey,
  { name: string; products: string[]; description: string }
> = {
  A: {
    name: "発信・拡張系",
    description: "あなたの言葉とビジョンを世界へ広げる扉",
    products: ["スピリチュアルビジネスアカデミー", "ハイチケットプログラム"],
  },
  B: {
    name: "癒やし・つなぎ系",
    description: "魂と魂の間に橋を架ける学び",
    products: ["Soul Crystal Concierge養成講座"],
  },
  C: {
    name: "受信・深掘り系",
    description: "見えない領域を深く受け取る道",
    products: ["ハイヤーセルフ覚醒プログラム", "多次元ヒプノ", "リトリート"],
  },
  D: {
    name: "表現・教育系",
    description: "美と智慧を形に変えて手渡す道",
    products: ["才能覚醒プログラム", "ジュエリー・アート系商品"],
  },
};

export function getSoulType(id: string): SoulType | undefined {
  return SOUL_TYPES.find((t) => t.id === id);
}
