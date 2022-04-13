export class ContainmentClass {
    constructor(selector) {
        this.selector = selector
        this.width = 350
        this.height = 50
        this.margin = {top: 0, right: 10, bottom: 20, left: 10}
        this.fill = "#EE2724";
    }

    // Build the initial visualization
    draw(data, date) {

        this.svg = d3.select("#containment")
            .append("svg")
            .attr("viewBox", `0 0 ${this.width} ${this.height}`)
            .attr("preserveAspectRatio", "xMidYMid meet");

        let xScale = d3.scaleLinear()
            .domain([0, 100])
            .range([this.margin.left, this.width - this.margin.right]);

        this.createAxes(xScale);

        this.filterData(data, date);

        this.svg
            .selectAll("rect")
            .data(this.filteredData)
            .enter()
            .append("rect")
                .attr("x", xScale(0))
                .attr("y", 5)
                .attr("width", xScale(0))
                .attr("height", 20)
                .attr("fill", this.fill);
    }

    filterData(data, date) {
        this.filteredData = data.filter(function(d) {
            return d.date === date;
        });
    }

    createAxes(xScale) {
        this.xAxis = this.svg
            .append("g")
            .attr("class","axis")
            .attr("transform",`translate(0, ${this.height-this.margin.bottom})`)
            .call(d3.axisBottom().scale(xScale).ticks(2));
    }

    // Update the visualization with a new date
    update(data, date) {

        this.filterData(data, date);

        // console.log(this.filteredData[0].containment)

        // let b = this.svg
        //     .selectAll("rect")
        //     .data(this.filteredData, function(d) { return d.date; });

        // let xScale = d3.scaleLinear()
        //     .domain([0, 100])
        //     .range([this.margin.left, this.width - this.margin.right]);

        this.svg.append("rect")
            // .attr("x", function(d) {return xScale(d.containment); })
        //     .attr("y", 5)
        //     .attr("width", xScale(0))
        //     .attr("height", 20)
        //     .attr("fill", this.fill)
        // .merge(b)   
            // .transition()
            // .attr("x", function(d) {return xScale(d.containment_previous); })
            // .attr("width", function(d) {return xScale(d.containment); })

        // b.exit().remove();
    }
}
