function _intro(md){return(
md`
# CS485 Trivariate and Geographic Transforms: NBA Statistics Across 2014-2015 Season
## Rahil Thanawala
### Data Source: https://www.kaggle.com/datasets/drgilermo/nba-players-stats-20142015
**Hypothesis:** *The top 350 players in the NBA will have largely gone to the same programs, demonstrating that there are programs which produce more successful basketball players. Therefore, the ability to get drafted is not random.*`
)}

function _data(FileAttachment){return(
FileAttachment("players_stats@1.csv").csv({typed: true})
)}

function _3(lookup){return(
lookup
)}

function _colleges(){return(
new Map()
)}

function _colleges2(colleges){return(
new Map([...colleges.entries()].sort((a, b) => b[1] - a[1]))
)}

function _arr(){return(
[0]
)}

function _7(colleges2,arr){return(
colleges2.forEach((k,v) =>{
  arr[0] += k;
})
)}

function _collegeArray(colleges2){return(
Array.from(colleges2).slice(0, 9)
)}

function _9(collegeArray){return(
collegeArray[2][0] = "University of California Los Angeles"
)}

function _csv(collegeArray)
{
  const rows = Array.from(collegeArray, ([college, count]) => `${college},${count}`);
  return 'college,count\n' + rows.join('\n');
}


function _collegeData(d3,csv){return(
d3.csvParse(csv)
)}

function _12(Plot,collegeData){return(
Plot.plot({
  marginBottom: 190,
  x: {tickRotate: -90, label: "Alma Mater"},
  y: {label: "Percent Represented"},
  title: "Top 9 Schools Represented in the NBA Among top 350 Players",
  marks: [
    Plot.barY(collegeData, {x: "college", y: d => (100* d.count/238), fill: "steelblue", sort: {x: "-y"}, tip: "x"}),
    Plot.ruleY([0]),
    Plot.gridY()
  ]
})
)}

function _13(lookup,colleges){return(
lookup.forEach(data => {
  if (colleges.has(data.Collage)){
    const currCount = colleges.get(data.Collage);
    colleges.set(data.Collage, currCount + 1);
  }else{
    colleges.set(data.Collage, 0);
  }
})
)}

function _lookup(__query,FileAttachment,invalidation){return(
__query(FileAttachment("lookup.csv"),{from:{table:"lookup"},sort:[],slice:{to:null,from:null},filter:[],select:{columns:null}},invalidation)
)}

function _table2(Inputs,collegeData){return(
Inputs.table(collegeData)
)}

function _16(Plot,lookup,statemesh,nation){return(
Plot.plot({
  title: "Density Distribution of Alma Maters Among Top 350 NBA Players",
  width: 960,
  height: 600,
  projection: "albers",
  color: {
    scheme: "puor",
    legend: true
  },
  marks: [
    Plot.density(lookup, {
      x: "Longitude",
      y: "Latitude",
      bandwidth: 12,
      fill: "density"
    }),
    Plot.dot(lookup, {
      x: "Longitude",
      y: "Latitude",
      r: 1,
      fill: "currentColor",
      tip: "x",
      title: "Collage"
    }),
    Plot.geo(statemesh, { strokeOpacity: 0.3 }),
    Plot.geo(nation)
  ]
})
)}

function _us(FileAttachment){return(
FileAttachment("us-counties-10m.json").json()
)}

function _nation(topojson,us){return(
topojson.feature(us, us.objects.nation)
)}

function _states(topojson,us){return(
topojson.feature(us, us.objects.states)
)}

function _statemesh(topojson,us){return(
topojson.mesh(us, us.objects.states, (a, b) => a !== b)
)}

function _counties(topojson,us){return(
topojson.feature(us, us.objects.counties)
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  function toString() { return this.url; }
  const fileAttachments = new Map([
    ["players_stats@1.csv", {url: new URL("./files/11d4771ba6810012ff94d59f0eda68e0bbf183750c248bd6d15c9b94ffb973ec817457e35e2268cb212b9c46783c166c1b33c54c12e212d9e7861ea7473c309e.csv", import.meta.url), mimeType: "text/csv", toString}],
    ["lookup.csv", {url: new URL("./files/a5af5166bc4c7bdad3d66d6df211d6c129db279e280c9d0aac81fadea11c9f2fc1d49a316da10a0a46959e4277014a5ed85a1a0d8ac88064e79702ce6765d9b5.csv", import.meta.url), mimeType: "text/csv", toString}],
    ["us-counties-10m.json", {url: new URL("./files/ff73290f3fccc5db55f09031bb845e639a07e444ca9fbcf83f2dbb4600a38bf4baccb2a85df3c24dba57a4ed64c230dcf1a87604453969495db835c5f3cbebf2.json", import.meta.url), mimeType: "application/json", toString}]
  ]);
  main.builtin("FileAttachment", runtime.fileAttachments(name => fileAttachments.get(name)));
  main.variable(observer("intro")).define("intro", ["md"], _intro);
  main.variable(observer("data")).define("data", ["FileAttachment"], _data);
  main.variable(observer()).define(["lookup"], _3);
  main.variable(observer("colleges")).define("colleges", _colleges);
  main.variable(observer("colleges2")).define("colleges2", ["colleges"], _colleges2);
  main.variable(observer("arr")).define("arr", _arr);
  main.variable(observer()).define(["colleges2","arr"], _7);
  main.variable(observer("collegeArray")).define("collegeArray", ["colleges2"], _collegeArray);
  main.variable(observer()).define(["collegeArray"], _9);
  main.variable(observer("csv")).define("csv", ["collegeArray"], _csv);
  main.variable(observer("collegeData")).define("collegeData", ["d3","csv"], _collegeData);
  main.variable(observer()).define(["Plot","collegeData"], _12);
  main.variable(observer()).define(["lookup","colleges"], _13);
  main.variable(observer("lookup")).define("lookup", ["__query","FileAttachment","invalidation"], _lookup);
  main.variable(observer("table2")).define("table2", ["Inputs","collegeData"], _table2);
  main.variable(observer()).define(["Plot","lookup","statemesh","nation"], _16);
  main.variable(observer("us")).define("us", ["FileAttachment"], _us);
  main.variable(observer("nation")).define("nation", ["topojson","us"], _nation);
  main.variable(observer("states")).define("states", ["topojson","us"], _states);
  main.variable(observer("statemesh")).define("statemesh", ["topojson","us"], _statemesh);
  main.variable(observer("counties")).define("counties", ["topojson","us"], _counties);
  return main;
}
