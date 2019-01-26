import * as d3 from 'd3';

export default class TemplateChartImpl{
    constructor(node, sizeSettings, data) {
        this.node = node;
        this.sizeSettings = sizeSettings;
        this.data = data;

        this.init();
    }

    init() {
        const {width, height} = this.sizeSettings;

        this.svg = d3.select(this.node).append('svg')
                    .attr('class', 'svgChart')
                    .attr('preserveAspectRatio', 'xMinYMin meet')
                    .attr("width", width)
                    .attr("height", height)
                    .attr('viewBox', `0 0 ${width} ${height}`);

        this.updateScalesToData();
        this.render();
    }

    /**
     * Define custom chartSettings here - make sure to set some good default values
     * Ideally, the chart should be usable without setting any properties
     */
    getDefaultChartSettings() {
        const templateChartSpecificChartSettings = 
        {
            customSetting1: "Template",
            customSetting2: d3.rgb("red"),
        };

        return Object.assign(super.getDefaultChartSettings(), templateChartSpecificChartSettings);
    }

    /**
     * Called when component updates with new data. Update axis scales, etc... here
     */ 
    updateChart(data, sizeSettings) {
        this.sizeSettings = sizeSettings;
        this.data = data;

        this.updateScalesToData();
        
        this.svg
            .transition(d3.transition().duration(100))
            .attr("width", this.sizeSettings.width)
            .attr("height", this.sizeSettings.height)
            .attr('viewBox', `0 0 ${this.sizeSettings.width} ${this.sizeSettings.height}`);
    }

    /**
     * Called after init & updateData (before render() )
     */
    updateScalesToData(){
      
    }

    render() {
        // Render chart here

        this.svg.append("rect")
            .attr("class", "background")
            .attr("height", "100%")
            .attr("width", "100%")
            .attr("fill", this.data[0]);
    }

}
