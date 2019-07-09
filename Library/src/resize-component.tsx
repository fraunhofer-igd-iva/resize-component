import * as React from 'react'
import { Subtract } from 'utility-types';

// Props for the HOC wrapper
export interface WrapperProps {
  sizeSettings: SizeSettings;
}

// Props the HOC adds to the wrapped component
export interface InjectedProps {
  sizeSettings: Size;
}

// Size injected by the HOC into the wrapped component
export type Size = {
  outputWidth: number;
  outputHeight: number;
}

// Size settings provided by the caller
export type SizeSettings = {
  [key in keyof CompleteSizeSettings]?: CompleteSizeSettings[key];
};

// Size settings with complete setup
type CompleteSizeSettings = {
  height: number | string;
  minHeight: number;
  updateHeight: boolean;
};

// Internal state
type State = CompleteSizeSettings & Size;

// Defaults
const defaultHeight = 400;
const defaultSizeSettings: CompleteSizeSettings = {
  height: defaultHeight,
  minHeight: 0,
  updateHeight: true,
}

const ResizeComponent = <WrappedComponentProps extends InjectedProps>(WrappedComponent: React.ComponentType<WrappedComponentProps>) =>
  class ResizeHOC extends React.Component<Subtract<WrappedComponentProps, InjectedProps> & WrapperProps, State> {
    chartContainer: HTMLDivElement;

    constructor(props: Subtract<WrappedComponentProps, InjectedProps> & WrapperProps) {
      super(props);

      this.state = Object.assign(
        this.getCompletedState(this.props.sizeSettings),
        {
          outputWidth: 0,
          outputHeight: 0
        }
      );
      this.updateStateToContainerSize = this.updateStateToContainerSize.bind(this);
    }

    getCompletedState(sizeSettings: SizeSettings): CompleteSizeSettings {
      return Object.assign({}, defaultSizeSettings, sizeSettings);
    }

    componentDidUpdate(prevProps: WrapperProps) {
      // if any prop changed update it
      if (this.props.sizeSettings.height !== prevProps.sizeSettings.height ||
        this.props.sizeSettings.minHeight !== prevProps.sizeSettings.minHeight ||
        this.props.sizeSettings.updateHeight !== prevProps.sizeSettings.updateHeight) {
        this.setState(this.getCompletedState(this.props.sizeSettings), () => this.updateStateToContainerSize());
      }
    }

    componentDidMount() {
      this.updateStateToContainerSize();
      window.addEventListener('resize', this.updateStateToContainerSize);
    }

    componentWillUnmount() {
      window.removeEventListener('resize', this.updateStateToContainerSize);
    }

    updateStateToContainerSize() {
      const { outputWidth, outputHeight, height, minHeight, updateHeight } = this.state;
      const chartWidth = this.chartContainer.getBoundingClientRect().width;
      let chartHeight: number = 0;

      // Parse height, if not already numerical
      if (typeof (height) !== 'number' || updateHeight) {
        const parsedHeight = this.parseValue(height);

        // Fallback to default height, if parsing failed
        chartHeight = (parsedHeight !== null) ? parsedHeight : defaultHeight;

        // Consider min height settings
        chartHeight = Math.max(chartHeight, minHeight);
      } else {
        chartHeight = height;
      }

      if (outputWidth !== chartWidth || outputHeight !== chartHeight) {
        this.setState({
          outputWidth: chartWidth,
          outputHeight: chartHeight
        });
      }
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

      // Try to parse string into numerical value
      if (typeof (value) === "string") {
        value = value.trim().toLowerCase();
        let scale = 1.0;
        let cut = 0;

        if (value.endsWith("%")) {
          scale = document.body.clientHeight / 100.0;
          cut = 1;
        } else if (value.endsWith("vh")) {
          scale = window.innerHeight / 100.0;
          cut = 2;
        } else if (value.endsWith("px")) {
          cut = 2;
        }

        result = Number(value.substring(0, value.length - cut)) * scale;
      }

      if (typeof (result) === "number" && isFinite(result)) {
        return result;
      } else{
        return null;
      }
    }


    render() {
      const { outputWidth, outputHeight } = this.state;
      const shouldRenderChart = (outputWidth && outputHeight);

      // with ref we bind the chartContainer to get the width
      // we only render the chart when we have values for width and height
      // (at startup, those numbers can be 0, or null/undefined in case of errors)
      return (
        <div
          ref={(e) => { this.chartContainer = e as HTMLDivElement }}
          className="responsive-wrapper">
          {shouldRenderChart && this.renderComponent()}
        </div>
      )
    }

    renderComponent() {
      const { outputWidth, outputHeight } = this.state;
      const sizeSettings = { width: outputWidth, height: outputHeight };

      // overwrite the sizeSettings with our sizeSetting version and render the chart
      return (
        <WrappedComponent {...this.props as WrappedComponentProps} sizeSettings={sizeSettings} />
      );
    }


  };

export default ResizeComponent
