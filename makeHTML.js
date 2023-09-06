import { CSV } from "https://js.sabae.cc/CSV.js";

const list = await (await fetch(new URL("./advice-list.json", import.meta.url))).json();
list.reverse();
for (const item of list) {
  item.data = await (await fetch(new URL(item.fn, import.meta.url))).json();
}

const areas0 = await CSV.fetchJSON("https://code4fukui.github.io/fukui-kanko-survey/area.csv");
const areas = areas0.filter(a => a.通し番号).sort((a, b) => a.通し番号 - b.通し番号);
console.log(areas);
for (const area of areas) {
  const res = [];
  res.push(`<h2>${area.市町名 + " / " + area.エリア名}</h2>`);

  for (const item of list) {
    const d = item.data.find(d => d.area == area.エリア名);
    if (d) {
      res.push(`<h3>${d.startday}〜${d.endday}</h3>`);
      res.push(`<a href=https://code4fukui.github.io/fukui-kanko-stat/comment.html#${area.id},0,0,0>アンケート回答件数: ${d.n_data}</a><br>
      <div class=advice>${d.advice}</div>`);
    }
  }
  const title = "福井県AI観光アドバイス"; //  - " + area.エリア名;
  const template = `<!DOCTYPE html><html lang="ja"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width"><link rel="icon" href="data:">
  <title>${title}</title>
  </head><body>
  <h1><a href=../>${title}</a></h1>

  <main id=main>${res.join("\n")}</main>
  <hr>
  Data: <a href=https://github.com/code4fukui/fukui-kanko-survey>FTASオープンデータ CC BY 福井県観光連盟</a><br>
  API: <a href=https://openai.com/>OpenAI API</a><br>
  <a href=https://github.com/code4fukui/fukui-kanko-advice/>src on GitHub<br>
  
  <style>
  body {
    background-color: #f8faf8;
    margin: .5em;
  }
  main h2 {
    x-display: inline-block;
    padding-bottom: .3em;
    padding-right: 1em;
  }
  h3 {
    display: inline-block;
  }
  main > div {
    margin: .5em;
    padding: .9em;
    background-color: #e8efe8;
  }
  .advice {
    white-space: pre-wrap;
  }
  a {
    color: black !important;
  }
  </style>
  </body></html>
  `;
  
  await Deno.writeTextFile("area/" + area.id + ".html", template);  
}
