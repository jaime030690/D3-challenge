var svgWidth = 960;
var svgHeight = 500;

var margin = {
  top: 20,
  right: 40,
  bottom: 60,
  left: 100
};

var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;

var svg = d3.select("#scatter")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight);

var chartGroup = svg.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);

var csv_file = "assets/data/data.csv";

// read in csv file
d3.csv(csv_file).then(function(data) {
    console.log(data);

    // parse data as integer
    data.forEach(function(item) {
        item.age = +item.age;
        item.smokes = +item.smokes;
    });

    // scale functions
    var xLinearScale = d3.scaleLinear()
        .domain(d3.extent(data, d => d.age))
        .range([0, width]);

    var yLinearScale = d3.scaleLinear()
        .domain(d3.extent(data, d => d.smokes))
        .range([height, 0]);

    // create axis functions
    var bottomAxis = d3.axisBottom(xLinearScale);
    var leftAxis = d3.axisLeft(yLinearScale);

    // add axes to chart
    chartGroup.append("g")
        .attr("transform", `translate(0, ${height})`)
        .call(bottomAxis);

    chartGroup.append("g")
        .call(leftAxis);

    // circles!!!
    var circlesGroup = chartGroup.selectAll("circle")
        .data(data)
        .enter()
        .append("circle")
        .attr("cx", d => xLinearScale(d.age))
        .attr("cy", d => yLinearScale(d.smokes))
        .attr("r", "15")
        .attr("fill", "#2BA0C0")
        .attr("opacity", ".5");

}).catch(error => console.log(error));