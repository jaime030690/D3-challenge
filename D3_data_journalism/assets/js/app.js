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
      item.poverty = +item.poverty;
      item.healthcare = +item.healthcare;
    });

    // scale functions
    var xLinearScale = d3.scaleLinear()
      .domain([8, d3.max(data, d => d.poverty)])
      .range([0, width]);

    var yLinearScale = d3.scaleLinear()
      .domain([3, d3.max(data, d => d.healthcare)])
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

    // text inside circles
    chartGroup.selectAll("text")
      .data(data)
      .enter()
      .append("text")
      .attr("x", d => xLinearScale(d.poverty) - 12)
      .attr("y", d => yLinearScale(d.healthcare) + 8)
      .text(function(d) {
        var text = d.abbr;
        console.log(text);
        return text
      });

    // circles!!!
    chartGroup.selectAll("circle")
      .data(data)
      .enter()
      .append("circle")
      .attr("cx", d => xLinearScale(d.poverty))
      .attr("cy", d => yLinearScale(d.healthcare))
      .attr("r", "15")
      .attr("fill", "#2BA0C0")
      .attr("opacity", ".5");

    


}).catch(error => console.log(error));