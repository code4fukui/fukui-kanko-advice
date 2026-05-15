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
const offset = undefined; // for startday && endday

//const days = 7;
const days = 14;

// use if offset == undefnied
const startday = "2026-04-01";
const endday = "2026-04-30";

const areas0 = await CSV.fetchJSON("https://code4fukui.github.io/fukui-kanko-survey/area.csv");
const areas = areas0.filter(a => a.通し番号).sort((a, b) => a.通し番号 - b.通し番号);
const areasById = new Map(areas.map(area => [String(area.id), area]));
const areasByName = new Map(areas.map(area => [area.エリア名, area]));
//console.log(areas);

const normalizeAdviceList = (list) => {
  const listById = new Map();
  for (const d of list) {
    const area = areasById.get(String(d.area_id)) || areasByName.get(d.area);
    if (!area) {
      console.log("remove old area " + d.area);
      continue;
    }
    const area_id = String(area.id);
    const item = {
      ...d,
      area_id,
      area: area.エリア名,
    };
    const current = listById.get(area_id);
    if (!current || item.n_data > current.n_data || (!current.advice && item.advice)) {
      listById.set(area_id, item);
    }
  }
  return [...listById.values()];
};

const data0 = await CSV.fetchJSON("https://code4fukui.github.io/fukui-kanko-survey/all.csv");
const start = offset !== undefined ? new Day().dayBefore(days + offset) : new Day(startday); // 1週間 or 2週間
const end = offset !== undefined ? new Day().dayBefore(1 + offset).toString() : new Day(endday);
const fnadvice = "data/advice-" + end.toString() + ".json";

const writeAdviceList = async () => {
  const json = JSON.stringify(list, null, 2);
  await Deno.writeTextFile("advice.json", json);
  await Deno.writeTextFile(fnadvice, json);
  await import("./makeList.js");
};

let list = [];
try {
  const list0 = JSON.parse(await Deno.readTextFile(fnadvice));
  list = normalizeAdviceList(list0);
  if (JSON.stringify(list) != JSON.stringify(list0)) {
    await writeAdviceList();
  }
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
  const area_id = String(area.id);
  if (list.find(d => String(d.area_id) == area_id)) {
    console.log("skip " + area.エリア名);
    continue;
  }
  console.log("make an advice for ", area.エリア名, data.length);
  //Deno.exit();

  if (data.length == 0) {
    list.push({
      area_id,
      area: area.エリア名,
      n_data: data.length,
      startday: start.toString(),
      endday: end.toString(),
      advice: "",
    });

  } else {
    const res = await fetchKankoAdvice(data);
    list.push({
      area_id,
      area: area.エリア名,
      n_data: data.length,
      startday: start.toString(),
      endday: end.toString(),
      advice: res,
    });
  }
  await writeAdviceList();
}
await import("./makeHTML.js");
