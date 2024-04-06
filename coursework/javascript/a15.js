/* data from https://msa.maryland.gov/msa/mdmanual/01glance/html/pop.html#county */

let arr = [
    { county: "Allegany County", population: 68106, countyCode: "ALLE" },
    { county: "Anne Arundel County", population: 588261, countyCode: "ANAR" },
    { county: "Baltimore County", population: 854535, countyCode: "BALT" },
    { county: "Calvert County", population: 92783, countyCode: "CALV" },
    { county: "Caroline County", population: 33293, countyCode: "CARO" },
    { county: "Carroll County", population: 172891, countyCode: "CARR" },
    { county: "Cecil County", population: 103725, countyCode: "CECI" },
    { county: "Charles County", population: 166617, countyCode: "CHAR" },
    { county: "Dorchester County", population: 32531, countyCode: "DORC" },
    { county: "Frederick County", population: 271717, countyCode: "FRED" },
    { county: "Garrett County", population: 28806, countyCode: "GARR" },
    { county: "Hartford County", population: 260924, countyCode: "HART" },
    { county: "Howard County", population: 332317, countyCode: "HOWA" },
    { county: "Kent County", population: 19198, countyCode: "KENT" },
    { county: "Montgomery County", population: 1062061, countyCode: "MONT" },
    { county: "Prince George's County", population: 967201, countyCode: "PGEO" },
    { county: "Queen Anne's County", population: 49874, countyCode: "QANN" },
    { county: "St. Mary's County", population: 113777, countyCode: "SMAR" },
    { county: "Somerset County", population: 24620, countyCode: "SOME" },
    { county: "Talbot County", population: 37526, countyCode: "TALB" },
    { county: "Washington County", population: 154705, countyCode: "WASH" },
    { county: "Wicomico County", population: 103588, countyCode: "WICO" },
    { county: "Worchester County", population: 52460, countyCode: "WORC" }
]

const svgWidth = 800
const svgHeight = 550

const paddingTopBottom = 50
const paddingLeftRight = 90

const graphWidth = svgWidth - (paddingLeftRight * 2)
const graphHeight = svgHeight - (paddingTopBottom * 2)

//add SVG to main
let svg = d3.select("main")
    .append("svg")
    .attr("width", svgWidth)
    .attr("height", svgHeight)
    .style("background-color", "black")

//make a title for the graph
svg.append("g")
    .append("text")
    .attr("transform", `translate(300, ${paddingTopBottom - 15})`)
    .style("text-align", "center")
    .attr("fill", "white")
    .text("Population of Maryland Counties")

//create scales
let yScale = d3.scaleLinear()
    .domain([0, 1100000])
    .range([graphHeight, 0])

let cScale = d3.scaleLinear()
    .domain([0, 1062061])
    .range(["yellow", "red"])

//create graph
let graph = svg.append("g")
    .attr("transform", `translate(${paddingLeftRight}, ${paddingTopBottom})`)

//bind data to graph
let update = graph.selectAll("rect")
    .data(arr)

update.enter()
    .append("rect")
    .attr("x", (d, i) => i * 30)
    .attr("y", (d) => yScale(d.population))
    .attr("width", 20)
    .attr("height", (d) => graphHeight - yScale(d.population))
    .attr("fill", (d) => cScale(d.population))

//create  yaxis
let leftAxis = d3.axisLeft(yScale)
    .tickSize([5])

let yAxis = svg.append("g")
    .attr("transform", `translate(${paddingLeftRight - 10}, ${paddingTopBottom})`)
    .call(leftAxis)

yAxis.select("path")
    .style("stroke", "white")

yAxis.selectAll("text")
    .style("stroke", "white")

yAxis.selectAll("line")
    .style("stroke", "white")

//create x axis
let countyCodes = arr.map((d) => { return d.countyCode })

let xScale = d3.scaleBand()
    .domain(countyCodes)
    .range([0, 680])

let bottomAxis = d3.axisBottom(xScale).tickSizeOuter(0)
    
let xAxis = svg.append("g")
    .attr("transform", `translate(${paddingLeftRight}, ${svgHeight - 45})`)
    .call(bottomAxis)

xAxis.select("path")
    .style("stroke", "white")

xAxis.selectAll("text")
    .style("stroke", "white")
    .style("text-anchor", "middle")
    .style("font-size", "smaller")

xAxis.selectAll("line")
    .style("stroke", "white")


