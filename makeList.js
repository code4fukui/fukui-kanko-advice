import { dir2array } from "https://js.sabae.cc/dir2array.js";

const ss = await dir2array("data");
const list = [];
for (const fn of ss) {
  if (!fn.endsWith(".json")) continue;
  const data = JSON.parse(await Deno.readTextFile("data/" + fn));
  const d = data[0];
  list.push({
    fn: "data/" + fn,
    startday: d.startday,
    endday: d.endday,
  });
}
list.sort((a, b) => a.startday.localeCompare(b.startday));
await Deno.writeTextFile("advice-list.json", JSON.stringify(list, null, 2));
