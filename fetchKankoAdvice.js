import { fetchConversation } from "https://code4fukui.github.io/ai_chat/fetchConversation.js";
import { CSV } from "https://js.sabae.cc/CSV.js";

export const fetchKankoAdvice = async (data) => {
  for (;;) {
    const csv = CSV.stringify(data);
    const messages = [
      { "role": "system", "content": "あなたはプロフェッショナルな観光コンサルです。下記のCSVデータを元にその観光地事業者に対するアドバイスを作成します。\n" + csv },
      { "role": "user", "content": "すぐに解決できる重要な改善点は何ですか？" },
    ];
    console.log(data.length);
    const res = await fetchConversation(messages); // GPT-4
    //const res = await fetchConversation(messages, null, true); // GPT-3.5
    //const res = await fetchConversation({ messages, model: "gpt-4-1106-preview" }, null, true); // use model
    console.log(res);
    //if (res.startsWith("error: This model's maximum context length")) {
    if (res.startsWith("error: ")) {
      data.splice(0, data.length / 2);
      console.log(data.length);
      if (data.length == 0) {
        return "error: no data";
      }
      continue;
    }
    //console.log(res);
    return res;  
  }
};
