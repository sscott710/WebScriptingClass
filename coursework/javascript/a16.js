/* data from https://opendata.maryland.gov/education/Maryland-Public-School-Enrollment-Trends-Pre-Kinde/9ju3-j8k6 
it is the number of students in each grade in Wicomico County, MD*/
let data = [
  {year: 2010, prek: 572, elementarySchool: 6810, middleSchool: 2998, highSchool: 4002 },
  {year: 2011, prek: 654, elementarySchool: 6806, middleSchool: 3046, highSchool: 4014 },
  {year: 2012, prek: 611, elementarySchool: 6911, middleSchool: 3031, highSchool: 3936 },
  {year: 2013, prek: 591, elementarySchool: 6925, middleSchool: 2974, highSchool: 3941 },
  {year: 2014, prek: 574, elementarySchool: 7003, middleSchool: 2980, highSchool: 3988 },
  {year: 2015, prek: 587, elementarySchool: 7105, middleSchool: 3014, highSchool: 4084 },
  {year: 2016, prek: 599, elementarySchool: 7102, middleSchool: 3046, highSchool: 4142 },
  {year: 2017, prek: 665, elementarySchool: 7080, middleSchool: 2985, highSchool: 4223 },
  {year: 2018, prek: 646, elementarySchool: 7021, middleSchool: 3078, highSchool: 4204 },
  {year: 2019, prek: 734, elementarySchool: 7036, middleSchool: 3222, highSchool: 4211 },
  {year: 2020, prek: 470, elementarySchool: 6492, middleSchool: 3264, highSchool: 4128 },
  {year: 2021, prek: 716, elementarySchool: 6525, middleSchool: 3248, highSchool: 4175 },

]

//set dimensions
const svgWidth = 900
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

//title
svg.append("g")
    .append("text")
    .attr("transform", `translate(250, ${paddingTopBottom - 15})`)
    .style("text-align", "center")
    .attr("fill", "white")
    .text("Public School Enrollement in Wicomico County, MD by Grade")
    .style("font", "30px")

//format the year 
let parseTime = d3.timeParse("%Y");

data.forEach(function (d) {
    d.year = parseTime(d.year);
});

//scale xAxis 
var xExtent = d3.extent(data, d => d.year);
xScale = d3.scaleTime()
  .domain(xExtent)
  .range([0, graphWidth])

//draw x axis
let bottomAxis = d3.axisBottom(xScale).tickSizeOuter(0)
    
let xAxis = svg.append("g")
    .attr("transform", `translate(${paddingLeftRight}, ${svgHeight-50})`)
    .call(bottomAxis)


xAxis.select("path")
    .style("stroke", "white")

xAxis.selectAll("text")
    .style("stroke", "white")
    .style("text-anchor", "middle")
    .style("font-size", "smaller")

xAxis.selectAll("line")
    .style("stroke", "white")

svg.append("g")
    .append("text")
    .attr("transform", `translate(450, ${svgHeight-10})`)
    .style("text-align", "center")
    .attr("fill", "white")
    .text("Year")

//yscale 
let yScale = d3.scaleLinear()
    .domain([0, 7500])
    .range([graphHeight, 0])

//create graph
let graph = svg.append("g")
    .attr("transform", `translate(${paddingLeftRight}, ${paddingTopBottom})`)

//create  yaxis
let leftAxis = d3.axisLeft(yScale)
    .tickSize([5])

let yAxis = svg.append("g")
    .attr("transform", `translate(${paddingLeftRight}, ${paddingTopBottom})`)
    .call(leftAxis)

yAxis.select("path")
    .style("stroke", "white")

yAxis.selectAll("text")
    .style("stroke", "white")


yAxis.selectAll("line")
    .style("stroke", "white")

svg.append("text")
    .attr("text-anchor", "end")
    .attr("y", 25)
    .attr("x", -200)
    .attr("dy", ".75em")
    .attr("fill", "white")
    .attr("transform", "rotate(-90)")
    .text("Number of Students")


//bind data to graph and create the lines 
svg.append('g')
        .selectAll("dot")
        .data(data)
        .enter()
        .append("circle")
        .attr("cx", function (d) { return xScale(d.year); } )
        .attr("cy", function (d) { return yScale(d.prek); } )
        .attr("r", 2)
        .attr("transform", `translate(${paddingLeftRight}, ${paddingTopBottom})`)
        .style("fill", "#CC0000");
let line = d3.line()
        .x(function(d) { return xScale(d.year); }) 
        .y(function(d) { return yScale(d.prek); }) 
        .curve(d3.curveMonotoneX)
        
        svg.append("path")
        .datum(data) 
        .attr("class", "line") 
        .attr("transform", `translate(${paddingLeftRight}, ${paddingTopBottom})`)
        .attr("d", line)
        .style("fill", "none")
        .style("stroke", "#CC0000")
        .style("stroke-width", "2");

svg.append('g')
        .selectAll("dot")
        .data(data)
        .enter()
        .append("circle")
        .attr("cx", function (d) { return xScale(d.year); } )
        .attr("cy", function (d) { return yScale(d.elementarySchool); } )
        .attr("r", 2)
        .attr("transform", `translate(${paddingLeftRight}, ${paddingTopBottom})`)
        .style("fill", "#FFFF00");
let line2 = d3.line()
        .x(function(d) { return xScale(d.year); }) 
        .y(function(d) { return yScale(d.elementarySchool); }) 
        .curve(d3.curveMonotoneX)
        
        svg.append("path")
        .datum(data) 
        .attr("class", "line") 
        .attr("transform", `translate(${paddingLeftRight}, ${paddingTopBottom})`)
        .attr("d", line2)
        .style("fill", "none")
        .style("stroke", "#FFFF00")
        .style("stroke-width", "2"); 

svg.append('g')
        .selectAll("dot")
        .data(data)
        .enter()
        .append("circle")
        .attr("cx", function (d) { return xScale(d.year); } )
        .attr("cy", function (d) { return yScale(d.middleSchool); } )
        .attr("r", 2)
        .attr("transform", `translate(${paddingLeftRight}, ${paddingTopBottom})`)
        .style("fill", "#0000FF");
let line3 = d3.line()
        .x(function(d) { return xScale(d.year); }) 
        .y(function(d) { return yScale(d.middleSchool); }) 
        .curve(d3.curveMonotoneX)
        
        svg.append("path")
        .datum(data) 
        .attr("class", "line") 
        .attr("transform", `translate(${paddingLeftRight}, ${paddingTopBottom})`)
        .attr("d", line3)
        .style("fill", "none")
        .style("stroke", "#0000FF")
        .style("stroke-width", "2"); 
svg.append('g')
        .selectAll("dot")
        .data(data)
        .enter()
        .append("circle")
        .attr("cx", function (d) { return xScale(d.year); } )
        .attr("cy", function (d) { return yScale(d.highSchool); } )
        .attr("r", 2)
        .attr("transform", `translate(${paddingLeftRight}, ${paddingTopBottom})`)
        .style("fill", "#00FF00");
let line4 = d3.line()
        .x(function(d) { return xScale(d.year); }) 
        .y(function(d) { return yScale(d.highSchool); }) 
        .curve(d3.curveMonotoneX)
        
        svg.append("path")
        .datum(data) 
        .attr("class", "line") 
        .attr("transform", `translate(${paddingLeftRight}, ${paddingTopBottom})`)
        .attr("d", line4)
        .style("fill", "none")
        .style("stroke", "#00FF00")
        .style("stroke-width", "2"); 

//legend
let names = ["Pre-K", "K-5", "6-8", "9-12"]
let colors = ['#CC0000', '#FFFF00', '#0000FF', '#00FF00']
let color = d3.scaleOrdinal().domain(names).range(colors)

svg.selectAll("mydots")
  .data(names)
  .enter()
  .append("circle")
    .attr("cx", 800)
    .attr("cy", function(d,i){ return 130 + i*25}) // 100 is where the first dot appears. 25 is the distance between dots
    .attr("r", 7)
    .style("fill", function(d){ return color(d)})

// Add one dot in the legend for each name.
svg.selectAll("mylabels")
  .data(names)
  .enter()
  .append("text")
    .attr("x", 820)
    .attr("y", function(d,i){ return 130 + i*25}) // 100 is where the first dot appears. 25 is the distance between dots
    .style("fill", function(d){ return color(d)})
    .text(function(d){ return d})
    .attr("text-anchor", "left")
    .style("alignment-baseline", "middle")




