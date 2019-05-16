
var svgWidth = 960;
var svgHeight = 500;

var margin = {
  top: 20,
  right: 40,
  bottom: 80,
  left: 100
};

var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;

// Create an SVG wrapper, append an SVG group that will hold our chart,
// and shift the latter by left and top margins.
var svg = d3
  .select("#scatter")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight);

  var chartGroup = svg.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);

// Import Data
d3.csv("assets/data/data.csv")
  .then(function(data) {
      

// Parse Data/Cast as numbers

data.forEach(function(Pdata) {
    
    Pdata.poverty = +Pdata.poverty;
    Pdata.healthcare = +Pdata.healthcare;
    Pdata.dds = +Pdata.abbr;
  });
// Create scale functions
    
    var xLinearScale = d3.scaleLinear()
      .domain([d3.min(data, d => d.poverty)-1, d3.max(data, d => d.poverty)])
      .range([0, width]);
      console.log(d3.max(data, d => d.poverty));

    var yLinearScale = d3.scaleLinear()
      .domain([d3.min(data, d => d.healthcare)-1, d3.max(data, d => d.healthcare)])
      .range([height, 0]);

// Create axis functions
    var bottomAxis = d3.axisBottom(xLinearScale);
    var leftAxis = d3.axisLeft(yLinearScale);


// Append Axes to the chart

    chartGroup.append("g")
        .attr("transform", `translate(0, ${height})`)
        .call(bottomAxis);

    chartGroup.append("g")
        .call(leftAxis);


        console.log("Appending circle")
 
// Create base element
        var elementer = chartGroup.selectAll("circle")
    .data(data)
    .enter()
  
// Create Circles
    var circlesGroup = elementer
    .append("circle")
    .attr("cx", d => xLinearScale(d.poverty))
    .attr("cy", d => yLinearScale(d.healthcare))
    .attr("r","15")
    .attr("fill", "lightblue")
    .attr("opacity", ".4")
   
  //Add the SVG Text Labels to the container
  
   var textLabels = elementer
   .append("text")
  .attr("dx", function(d){return -10})
                 .attr("x", d =>  xLinearScale(d.poverty) )
                 .attr("y", d =>  yLinearScale(d.healthcare) )
                 .text( d=> d.abbr )
               .attr("font-family", "sans-serif")
                 .attr("font-size", "10px")
                  .attr("fill", "black  ");

                             
   
    //Initialize tool tip
    var toolTip = d3.tip()
      .attr("class", "tooltip")
      .offset([80, -60])
      .html(function(d) {
        return (`${d.abbr}<br> poverty: ${d.poverty}<br>healthcare: ${d.healthcare} <br> State: ${d.state}`);
      });

    // Create tooltip in the chart

    chartGroup.call(toolTip);

    // Create event listeners to display and hide the tooltip

    circlesGroup.on("click", function(data) {
      toolTip.show(data, this);
    })
      // onmouseout event
      .on("mouseout", function(data, index) {
        toolTip.hide(data);
      });

    // Create axes labels
    chartGroup.append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 0 - margin.left + 40)
      .attr("x", 0 - (height / 2))
      .attr("dy", "1em")
      .attr("class", "axisText")
      .text("Healthcare");

    chartGroup.append("text")
      .attr("transform", `translate(${width / 2}, ${height + margin.top + 30})`)
      .attr("class", "axisText")
      .text("Poverty");
    console.log("done")  
  
  
    });











