import { CSV } from "https://js.sabae.cc/CSV.js";
import { fetchKankoAdvice } from "./fetchKankoAdvice.js";
import { Day } from "https://js.sabae.cc/DateTime.js";

//const offset = 6; // run on Tuesday
//const offset = 5; // run on Monday
//const offset = 4; // run on Sunday
//const offset = 3; // run on Saturday
//const offset = 2; // run on Friday
//const offset = 1; // run on Thusday
//const offset = 0; // run on Wednesday
const offset = undefined;

// use if offset == undefnied
const startday = "2025-04-26";
const endday = "2025-05-06";

const areas0 = await CSV.fetchJSON("https://code4fukui.github.io/fukui-kanko-survey/area.csv");
const areas = areas0.filter(a => a.通し番号).sort((a, b) => a.通し番号 - b.通し番号);
//console.log(areas);

const data0 = await CSV.fetchJSON("https://code4fukui.github.io/fukui-kanko-survey/all.csv");
const start = offset !== undefined ? new Day().dayBefore(7 + offset) : new Day(startday);
const end = offset !== undefined ? new Day().dayBefore(1 + offset).toString() : new Day(endday);

let list = [];
try {
  list = JSON.parse(await Deno.readTextFile("data/advice-" + end.toString() + ".json"));
  //console.log(list);
} catch (e) {
  console.log("not found");
}

const data1 = data0.filter(d => {
  try {
    return new Day(d.回答日時).isAfter(start);
  } catch (e) {
    console.log(`illegal date: "${d.回答日時}"`);
    return false;
  }
});
//console.log(data0[0]);
for (const area of areas) {
  const data = data1.filter(d => d.回答エリア == area.エリア名);
  if (list.find(d => d.area == area.エリア名)) {
    console.log("skip " + area.エリア名);
    continue;
  }
  console.log("make an advice for ", area.エリア名, data.length);
  //Deno.exit();

  if (data.length == 0) {
    list.push({
      area: area.エリア名,
      n_data: data.length,
      startday: start.toString(),
      endday: end.toString(),
      advice: "",
    });

  } else {
    const res = await fetchKankoAdvice(data);
    list.push({
      area: area.エリア名,
      n_data: data.length,
      startday: start.toString(),
      endday: end.toString(),
      advice: res,
    });
  }
  const json = JSON.stringify(list, null, 2);
  await Deno.writeTextFile("advice.json", json);
  await Deno.writeTextFile("data/advice-" + end.toString() + ".json", json);
  await import("./makeList.js");
}
await import("./makeHTML.js");
