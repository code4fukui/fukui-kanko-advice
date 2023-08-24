import { CSV } from "https://js.sabae.cc/CSV.js";
import { fetchKankoAdvice } from "./fetchKankoAdvice.js";
import { Day } from "https://js.sabae.cc/DateTime.js";

const offset = 2; // run on Friday
//const offset = 1; // run on Thusday
//const offset = 0; // run on Wednesday

const areas0 = await CSV.fetchJSON("https://code4fukui.github.io/fukui-kanko-survey/area.csv");
const areas = areas0.filter(a => a.通し番号).sort((a, b) => a.通し番号 - b.通し番号);
console.log(areas);

const data0 = await CSV.fetchJSON("https://code4fukui.github.io/fukui-kanko-survey/all.csv");
const start = new Day().dayBefore(7 + offset);
const endday = new Day().dayBefore(1 + offset).toString();

const data1 = data0.filter(d => new Day(d.回答日時).isAfter(start));
console.log(data0[0]);
const list = [];
for (const area of areas) {
  const data = data1.filter(d => d.回答エリア == area.エリア名);
  console.log(area.エリア名, data.length);
  if (data.length == 0) {
    list.push({
      area: area.エリア名,
      n_data: data.length,
      startday: start.toString(),
      endday,
      advice: "",
    });

  } else {
    const res = await fetchKankoAdvice(data);
    list.push({
      area: area.エリア名,
      n_data: data.length,
      startday: start.toString(),
      endday,
      advice: res,
    });
  }
  const json = JSON.stringify(list, null, 2);
  await Deno.writeTextFile("advice.json", json);
  await Deno.writeTextFile("data/advice-" + endday.toString() + ".json", json);
  await import("./makeList.js");
}
await import("./makeHTML.js");
