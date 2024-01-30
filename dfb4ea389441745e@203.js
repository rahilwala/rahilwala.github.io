function _1(md){return(
md`# CS485 Univariate and Bivariate Data: NBA Statistics Across 2014-2015 Season
## Rahil Thanawala
### Data Source: https://www.kaggle.com/datasets/drgilermo/nba-players-stats-20142015
**Hypothesis:** *A higher player height in the NBA will result in a higher career performance, indicated by average points per game.*
`
)}

function _data(FileAttachment){return(
FileAttachment("players_stats@1.csv").csv({typed: true})
)}

function _3(Plot,data){return(
Plot.plot({
  y: {grid: true},
  color: {legend: true},
  marks: [
    Plot.rectY(data, Plot.binX({y: "count"}, {x: "Height", interval: 3, stroke: "yellow", fill: "grey"})),
    Plot.ruleY([0])
  ],
  title: "Distribution of Height (cm) in Players"
})
)}

function _mappedData(data){return(
data.map(d => ({
    "Height": d.Height,
    "Points Per Game": d.PTS/d["Games Played"]
  }))
)}

function _5(Plot,mappedData){return(
Plot.plot({
  color: {scheme: "YlGnBu", legend: true},
  y: {grid: true},
  x: {grid: true},
  marks: [
    Plot.rectY(mappedData, Plot.bin({fill:"sum"},{x: "Height", y: "Points Per Game", interval: 3}))
  ],
  title: "Height (cm) Compared to Points Per Game",
  legend: true
})
)}

function _6(Inputs,data){return(
Inputs.table(data.map(d => ({
    "Name": d.Name,
    "Height (cm)": d.Height,
    "Total Points Scored": d.PTS,
    "Games Played": d["Games Played"],
    "Points Per Game": d.PTS/d["Games Played"]
  })))
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  function toString() { return this.url; }
  const fileAttachments = new Map([
    ["players_stats@1.csv", {url: new URL("./files/11d4771ba6810012ff94d59f0eda68e0bbf183750c248bd6d15c9b94ffb973ec817457e35e2268cb212b9c46783c166c1b33c54c12e212d9e7861ea7473c309e.csv", import.meta.url), mimeType: "text/csv", toString}]
  ]);
  main.builtin("FileAttachment", runtime.fileAttachments(name => fileAttachments.get(name)));
  main.variable(observer()).define(["md"], _1);
  main.variable(observer("data")).define("data", ["FileAttachment"], _data);
  main.variable(observer()).define(["Plot","data"], _3);
  main.variable(observer("mappedData")).define("mappedData", ["data"], _mappedData);
  main.variable(observer()).define(["Plot","mappedData"], _5);
  main.variable(observer()).define(["Inputs","data"], _6);
  return main;
}
