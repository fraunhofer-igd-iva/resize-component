/**
 * Fraunhofer Institute for Computer Graphics Research (IGD)
 * Competence Center for Information Visualization and Visual Analytics
 *
 * Copyright (c) 2018 Fraunhofer IGD. All rights reserved.
 *
 * This source code is property of the Fraunhofer IGD and underlies
 * copyright restrictions. It may only be used with explicit
 * permission from the respective owner.
 */

import React, { Component } from 'react';
import MyAwesomeChartImpl from './chart-example';
//import {ResizeComponent} from "@iva/resize-component";
import ResizeComponent from "./resize-component";

/**
 * React-Wrapper around a D3 component
 */
class MyAwesomeChart extends Component {
    constructor(props) {
        super(props);

        this.container = null;
    }

    componentDidMount() {
        this._chart = new MyAwesomeChartImpl(this.container, this.props.sizeSettings, this.props.data);
    }

    componentDidUpdate() {
        console.log(this.props.sizeSettings);
        this._chart.updateChart(this.props.data, this.props.sizeSettings);
    }

    render() {
        return (
            <div ref={inst => {
                this.container = inst
            }} />
        );
    }
}

export default ResizeComponent(MyAwesomeChart);
