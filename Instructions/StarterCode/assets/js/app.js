// @TODO: YOUR CODE HERE!
var svgWidth = 1600;
var svgHeight = 900;

var margin = {
    top: 60,
    right: 60,
    bottom: 60,
    left: 60
};

var chartWidth = svgWidth - margin.left - margin.right;
var chartHeight = svgHeight - margin.top - margin.bottom;

var svg = d3
    .select("body")
    .append("svg")
    .attr("width", svgWidth)
    .attr("height", svgHeight);

var chartGroup = svg
    .append('g')
    .attr("transform", `translate(${margin.left}, ${margin.top})`);  


d3.csv("./assets/data/data.csv").then(function(data) {
    console.log(data);

    data.forEach(function(x) {
        x.id = +x.id;
        x.poverty = +x.poverty;
        x.healthcare = +x.healthcare;
        x.obesity = +x.obesity;
        x.income = +x.income;
        x.smokes = +x.smokes;
    });

    console.log(data);
    var xPovScale = d3.scaleLinear()
        .range([0, chartWidth])
        .domain(d3.extent(data, x => x.poverty));

    var yHealthScale = d3.scaleLinear()
        .range([chartHeight, 0])
        .domain([0, d3.max(data, x => x.healthcare)]);

    var bottomAxis = d3.axisBottom(xPovScale);
    var leftAxis = d3.axisLeft(yHealthScale);
    // var drawline = d3.line()
    //         .x(x => xPovScale(data.poverty))
    //         .y(data => yHealthScale(data.healthcare));
    
    // chartGroup.append("path")
    //     .attr("d", drawline(data))
    //     .classed("line",true);

    chartGroup.append("g")
        .classed("axis", true)
        .call(leftAxis);
    
    console.log(data.poverty);
    console.log(data, p => p.poverty);

    chartGroup.append("g")
        .classed("axis", true)
        .attr("transform",`translate(0, ${chartHeight} )`)
        .call(bottomAxis);

    svg.append('g')
        .selectAll("dot")
        .data(data)
        .enter()
        .append("circle")
        .attr("cx", function(p) { return xPovScale(p.poverty); })
        .attr("cy", function(p) { return yHealthScale(p.healthcare); })
        .attr("r", 16)
        .style("fill", "#69b3a2");

    svg.append("g")
        .selectAll("text")
        .data(data)
        .enter()
        .append("text")
        .attr("x", function(p) { return xPovScale(p.poverty) -10 ; })
        .attr("y", function(p) { return yHealthScale(p.healthcare) + 8; })       
        .text(function(p) {return (p.abbr);})
        .attr("fill", "black");

    svg.append("text")
        .attr("text-anchor", "middle") 
        .attr("transform", "translate("+ (50/2) +","+(chartHeight/2)+")rotate(-90)")
        .text("Lacks Healthcare (%)");

    svg.append("text")
        .attr("text-anchor", "middle") 
        .attr("transform", "translate("+ (chartWidth/2) +","+ chartHeight +")")
        .text("In Poverty (%)");
});
// .catch(function(error) {
//     console.log(error);
// });