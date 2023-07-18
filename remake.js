import { CSV } from "https://js.sabae.cc/CSV.js";
import { fetchKankoAdvice } from "./fetchKankoAdvice.js";
import { Day } from "https://js.sabae.cc/DateTime.js";

const list = JSON.parse(await Deno.readTextFile("advice.json"));

const data0 = await CSV.fetchJSON("https://code4fukui.github.io/fukui-kanko-survey/all.csv");
const start = new Day().dayBefore(7);

const data1 = data0.filter(d => new Day(d.回答日時).isAfter(start));
for (const l of list) {
  if (l.advice.startsWith("error: ")) { // 大きすぎ
    const data = data1.filter(d => d.回答エリア == l.area);
    console.log(l.area, data.length);
    data.splice(0, data.length / 2);
    const res = await fetchKankoAdvice(data);
    l.advice = res;
    console.log(res);
  }
}
await Deno.writeTextFile("advice2.json", JSON.stringify(list, null, 2));
