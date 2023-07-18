import { CSV } from "https://js.sabae.cc/CSV.js";
import { fetchConversation } from "https://code4fukui.github.io/ai_chat/fetchConversation.js";

const data = `性別,年齢,感想\n男,30,トイレが汚い\n女,25,お土産が少ない`;

const messages = [
  { "role": "system", "content": "あなたはプロフェッショナルな観光コンサルです。下記のCSVデータを元にその観光地事業者に対するアドバイスを作成します。\n" + data },
  { "role": "user", "content": "すぐに解決できる重要な改善点は何ですか？" },
];

const res = await fetchConversation(messages);
console.log(res);

/* result by GPT-4

1. トイレの清掃: 30歳の男性からのフィードバックによると、トイレの清掃が十分に行われていない可能性があります。トイレの清潔さは観光施設の品質を大きく左右します。適切なメンテナンスと定期的な清掃を行い、清潔で快適なトイレ環境を提供してください。

2. お土産の品揃え: 25歳の女性からのフィードバックは、お土産の選択肢が少ないというものです。観光地として、訪問者にはその場所の思い出を持ち帰ることができる多種多様な商品を提供することが重要です。もし可能であれば、地元の製品や特産品を取り扱い、訪問者がその地域の文化や特性を感じられるような商品ラインナップを検討しましょう。

*/
