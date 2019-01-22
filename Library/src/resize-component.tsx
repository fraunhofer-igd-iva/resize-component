/*
 * Fraunhofer Institute for Computer Graphics Research (IGD)
 * Competence Center for Information Visualization and Visual Analytics
 *
 * Copyright (c) 2018 Fraunhofer IGD. All rights reserved.
 *
 * This source code is property of the Fraunhofer IGD and underlies
 * copyright restrictions. It may only be used with explicit
 * permission from the respective owner.
 */

import React from 'react';

export interface InputSizeSettings {
  height?: number | string;
  minHeight?: number;
  updateHeight?: boolean;
};

export interface Props {
  sizeSettings: InputSizeSettings;
}

type SizeSettings = {
  startHeight: number | string;
  minHeight: number;
  updateHeight: boolean;
};

type State = SizeSettings & {
  defaultHeight: number;
  width: number | null;
  height: number | null;
}

export default (WrappedComponent: any) => (
  class ResizeComponent extends React.Component<Props, State> {
    private chartContainer: HTMLDivElement;

    constructor(props: Props) {
      super(props);

      this.state = Object.assign(
        this._getDefaultState(this.props.sizeSettings),
        {
          defaultHeight: 400,
          width: null,
          height: null
        }
      );
      this.calculateContainerSize = this.calculateContainerSize.bind(this);
    }

    _getDefaultState(sizeSettings: InputSizeSettings): SizeSettings {
      return {
        startHeight: sizeSettings.height ? sizeSettings.height : 400,
        minHeight: sizeSettings.minHeight ? sizeSettings.minHeight : 100,
        updateHeight: sizeSettings.updateHeight ? sizeSettings.updateHeight : true,
      }
    }

    componentDidUpdate(prevProps: Props) {
      // if any prop changed update it
      if (this.props.sizeSettings.height !== prevProps.sizeSettings.height ||
        this.props.sizeSettings.minHeight !== prevProps.sizeSettings.minHeight ||
        this.props.sizeSettings.updateHeight !== prevProps.sizeSettings.updateHeight) {
        this.setState(this._getDefaultState(this.props.sizeSettings),
          () => this.calculateContainerSize());
      }
    }

    componentDidMount() {
      this.calculateContainerSize();
      window.addEventListener('resize', this.calculateContainerSize);
    }

    componentWillUnmount() {
      window.removeEventListener('resize', this.calculateContainerSize);
    }

    calculateContainerSize() {
      const { width, height, startHeight, minHeight, updateHeight, defaultHeight } = this.state;
      const chartWidth = this.chartContainer.getBoundingClientRect().width;
      let chartHeight = height;

      // on initial call or when updateHeight is set
      if (!chartHeight || updateHeight) {
        chartHeight = this.parseValue(startHeight);

        // when parsing failed
        if (chartHeight === null) {
          chartHeight = defaultHeight;
        }
        chartHeight = Math.max(chartHeight, minHeight);
      }

      if (width !== chartWidth || height !== chartHeight) {
        this.setState({
          width: chartWidth,
          height: chartHeight
        });
      }
    }

    renderChart() {
      const { width, height } = this.state;

      // merge the sizeSettings with our width and height. sizeSetting can
      // contain padding, fontsize etc which we don't want to overwrite
      let sizeSettings = Object.assign({ width: width, height: height }, this.props.sizeSettings);

      // fix: when variable is "" its not overwritten by our value
      if (height) {
        sizeSettings.height = height;
      }

      // fix: when width is given as "" we overwrite it
      if (!sizeSettings.width) {
        sizeSettings.width = width;
      }

      // fix: sometimes given width can be string
      sizeSettings.width = Number(sizeSettings.width);

      // overwrite the sizeSettings with our sizeSetting version and render the chart
      return (
        <WrappedComponent {...this.props} sizeSettings={sizeSettings} />
      );
    }

    render() {
      const { width, height } = this.state;
      const shouldRenderChart = width !== null && height !== null;

      // with ref we bind the chartContainer to get the width
      // we only render the chart when we have values for width and height
      return (
        <div
          ref={(e) => { this.chartContainer = e as HTMLDivElement }}
          className="responsive-wrapper">
          {shouldRenderChart && this.renderChart()}
        </div>
      )
    }

    /**
    * Parses strings and numbers and returns their pixel value as a number.
    * Will return null when parsing fails.
    * Works with numbers and strings ending in px, vh and %. Few examples:
    *
    * 500 -> 500
    * "500" -> 500
    * "500px" -> 500
    * "50vh" -> 4735
    * "50%" -> 6620
    * "test" -> null
    **/
    parseValue(value: number | string): number | null {
      let result = value;
      if (typeof (value) === "string") {
        value = value.trim().toLowerCase();
        let scale = 1.0;
        let cut = 0;
        let twoCharacters = value.substring(value.length - 2);
        let oneCharacter = value.substring(value.length - 1);

        if (oneCharacter === "%") {
          scale = document.body.clientHeight / 100.0;
          cut = 1;
        } else if (twoCharacters === "vh") {
          scale = window.innerHeight / 100.0;
          cut = 2;
        } else if (twoCharacters === "px") {
          cut = 2;
        }

        result = Number(value.substring(0, value.length - cut)) * scale;
      }
      if (typeof (result) === "number") {
        return result;
      }
      return null;
    }
  }
)