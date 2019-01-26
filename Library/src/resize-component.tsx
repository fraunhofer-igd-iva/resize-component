import * as React from 'react'

export type Size = {
  width: number;
  height: number;
}

// Props you want the resulting component to take (besides the props of the wrapped component)
export interface ExternalProps {
  sizeSettings: SizeSettings;
}

// Props the HOC adds to the wrapped component
export interface InjectedProps {
  sizeSettings: Size;
}

// Size settings provided by the caller
export interface SizeSettings {
  height?: number | string;
  minHeight?: number;
  updateHeight?: boolean;
};

// Size settings with complete setup
type CompleteSizeSettings = {
  startHeight: number | string;
  minHeight: number;
  updateHeight: boolean;
};

// Internal state
type State = CompleteSizeSettings & {
  width: number;
  height: number;
}

const defaultHeight = 400;

const ResizeComponent = () => <OriginalProps extends {}>(WrappedComponent: React.ComponentType<OriginalProps & InjectedProps>, ): React.ComponentClass<OriginalProps & ExternalProps> => {
  type CombinedProps = OriginalProps & ExternalProps;

  class ResizeHOC extends React.Component<CombinedProps, State> {
    private chartContainer: HTMLDivElement;

    constructor(props: CombinedProps) {
      super(props);

      this.state = Object.assign(
        this._getDefaultState(this.props.sizeSettings),
        {
          width: 0,
          height: 0
        }
      );
      this.calculateContainerSize = this.calculateContainerSize.bind(this);
    }

    _getDefaultState(sizeSettings: SizeSettings): CompleteSizeSettings {
      return {
        startHeight: sizeSettings.height ? sizeSettings.height : 400,
        minHeight: sizeSettings.minHeight ? sizeSettings.minHeight : 100,
        updateHeight: sizeSettings.updateHeight ? sizeSettings.updateHeight : true,
      }
    }

    componentDidUpdate(prevProps: CombinedProps) {
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
      const { width, height, startHeight, minHeight, updateHeight } = this.state;
      const chartWidth = this.chartContainer.getBoundingClientRect().width;
      let chartHeight = height;

      // on initial call or when updateHeight is set
      if (!chartHeight || updateHeight) {
        let parsedHeight = this.parseValue(startHeight);

        // when parsing failed
        chartHeight = (parsedHeight !== null) ? parsedHeight : defaultHeight;

        // Consider min height settings
        chartHeight = Math.max(chartHeight, minHeight);
      }

      if (width !== chartWidth || height !== chartHeight) {
        this.setState({
          width: chartWidth,
          height: chartHeight
        });
      }
    }


    renderComponent() {
      const { width, height } = this.state;

      // merge the sizeSettings with our width and height. sizeSetting can
      // contain padding, fontsize etc which we don't want to overwrite
      let sizeSettings = { width: width, height: height };

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
          {shouldRenderChart && this.renderComponent()}
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

  return ResizeHOC
}

export default ResizeComponent
