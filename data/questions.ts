export interface QuestionOption {
  label: string;
  scores: Record<string, number>;
  priority?: boolean;
}

export interface Question {
  id: number;
  text: string;
  caption?: string;
  options: QuestionOption[];
}

export const QUESTIONS: Question[] = [
  {
    id: 1,
    text: "子ども時代、時間を忘れて没頭したことは？",
    caption: "魂は、無心の遊びの中に最初の手がかりを残します。",
    options: [
      { label: "物語・絵・音楽を生み出すこと", scores: { creator: 2, artist: 2, messenger: 1 } },
      { label: "友達の悩みを聞くこと", scores: { healer: 2, guide: 2, weaver: 1 } },
      { label: "リーダー役・遊びの企画", scores: { leader: 2, architect: 2, teacher: 1 } },
      { label: "ひとりで空・自然・本に没頭", scores: { oracle: 2, alchemist: 2, guardian: 1 } },
    ],
  },
  {
    id: 2,
    text: "今、人生で一番強く感じている違和感は？",
    caption: "違和感は、本来のあなたが帰るべき場所からのサインです。",
    options: [
      { label: "本当の役割がまだ見えない", scores: { oracle: 2, weaver: 2, guide: 1 } },
      { label: "才能はあるのに形にならない", scores: { creator: 2, artist: 2, architect: 1 } },
      { label: "周囲との温度差で孤独", scores: { messenger: 2, leader: 2, alchemist: 1 } },
      { label: "もっと深い意味を知りたい", scores: { healer: 2, alchemist: 2, teacher: 1 } },
    ],
  },
  {
    id: 3,
    text: "あなたが譲れない価値観は？",
    caption: "譲れない一語に、魂のコアが宿ります。",
    options: [
      { label: "真実", scores: { messenger: 2, oracle: 2, teacher: 1 } },
      { label: "美と表現", scores: { artist: 2, creator: 2 } },
      { label: "自由と変容", scores: { alchemist: 2, leader: 1, creator: 1 } },
      { label: "愛とつながり", scores: { healer: 2, weaver: 2, guardian: 2 } },
    ],
  },
  {
    id: 4,
    text: "人に与えたい影響は？",
    caption: "誰かを動かす衝動こそ、あなたの使命の輪郭です。",
    options: [
      { label: "目覚めさせたい", scores: { messenger: 2, leader: 2, alchemist: 1 } },
      { label: "癒やしたい", scores: { healer: 2, guardian: 2, weaver: 1 } },
      { label: "新しいものを見せたい", scores: { creator: 2, artist: 1, architect: 2 } },
      { label: "道を示したい", scores: { guide: 2, teacher: 2, oracle: 1 } },
    ],
  },
  {
    id: 5,
    text: "5年後、起こしたい変化は？",
    caption: "未来の宣言は、いま魂が一番強く願っていること。同点時はこの問いが優先されます。",
    options: [
      { label: "多くの人を覚醒させる", scores: { leader: 3, messenger: 3 }, priority: true },
      { label: "一人ひとりを深く癒やす", scores: { healer: 3, guide: 3 }, priority: true },
      { label: "美と作品を世界に残す", scores: { artist: 3, creator: 3 }, priority: true },
      { label: "新しい仕組み・文明を作る", scores: { architect: 3, alchemist: 3, teacher: 2 }, priority: true },
    ],
  },
];
