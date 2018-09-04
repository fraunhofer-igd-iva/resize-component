'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /*
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Fraunhofer Institute for Computer Graphics Research (IGD)
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Competence Center for Information Visualization and Visual Analytics
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Copyright (c) 2018 Fraunhofer IGD. All rights reserved.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * This source code is property of the Fraunhofer IGD and underlies
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * copyright restrictions. It may only be used with explicit
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * permission from the respective owner.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

exports.default = function (ChartComponent) {
  return function (_React$Component) {
    _inherits(ResizeComponent, _React$Component);

    function ResizeComponent(props) {
      _classCallCheck(this, ResizeComponent);

      var _this = _possibleConstructorReturn(this, (ResizeComponent.__proto__ || Object.getPrototypeOf(ResizeComponent)).call(this, props));

      _this.state = Object.assign(_this._getDefaultState(_this.props.sizeSettings), {
        defaultHeight: 400,
        width: null,
        height: null
      });
      _this.calculateContainerSize = _this.calculateContainerSize.bind(_this);
      return _this;
    }

    _createClass(ResizeComponent, [{
      key: '_getDefaultState',
      value: function _getDefaultState(sizeSettings) {
        return {
          startHeight: sizeSettings.height ? sizeSettings.height : 400,
          minHeight: sizeSettings.minHeight ? sizeSettings.minHeight : 100,
          updateHeight: sizeSettings.updateHeight ? sizeSettings.updateHeight : true
        };
      }
    }, {
      key: 'componentDidUpdate',
      value: function componentDidUpdate(prevProps) {
        var _this2 = this;

        // if any prop changed update it
        if (this.props.sizeSettings.height !== prevProps.sizeSettings.height || this.props.sizeSettings.minHeight !== prevProps.sizeSettings.minHeight || this.props.sizeSettings.updateHeight !== prevProps.sizeSettings.updateHeight) {
          this.setState(this._getDefaultState(this.props.sizeSettings), function () {
            return _this2.calculateContainerSize();
          });
        }
      }
    }, {
      key: 'componentDidMount',
      value: function componentDidMount() {
        this.calculateContainerSize();
        window.addEventListener('resize', this.calculateContainerSize);
      }
    }, {
      key: 'componentWillUnmount',
      value: function componentWillUnmount() {
        window.removeEventListener('resize', this.calculateContainerSize);
      }
    }, {
      key: 'calculateContainerSize',
      value: function calculateContainerSize() {
        var _state = this.state,
            width = _state.width,
            height = _state.height,
            startHeight = _state.startHeight,
            minHeight = _state.minHeight,
            updateHeight = _state.updateHeight,
            defaultHeight = _state.defaultHeight;

        var chartWidth = this.chartContainer.getBoundingClientRect().width;
        var chartHeight = height;

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
    }, {
      key: 'renderChart',
      value: function renderChart() {
        var _state2 = this.state,
            width = _state2.width,
            height = _state2.height;

        // merge the sizeSettings with our width and height. sizeSetting can
        // contain padding, fontsize etc which we don't want to overwrite

        var sizeSettings = Object.assign({ width: width, height: height }, this.props.sizeSettings);

        // fix: when variable is "" its not overwritten by our value
        sizeSettings.height = height;

        // fix: when width is given as "" we overwrite it
        if (!sizeSettings.width || sizeSettings.width === "") {
          sizeSettings.width = width;
        }

        // fix: sometimes given width can be string
        sizeSettings.width = Number(sizeSettings.width);

        // overwrite the sizeSettings with our sizeSetting version and render the chart
        return _react2.default.createElement(ChartComponent, _extends({}, this.props, { sizeSettings: sizeSettings }));
      }
    }, {
      key: 'render',
      value: function render() {
        var _this3 = this;

        var _state3 = this.state,
            width = _state3.width,
            height = _state3.height;

        var shouldRenderChart = width !== null && height !== null;

        // with ref we bind the chartContainer to get the width
        // we only render the chart when we have values for width and height
        return _react2.default.createElement(
          'div',
          {
            ref: function ref(e) {
              _this3.chartContainer = e;
            },
            className: 'responsive-wrapper' },
          shouldRenderChart && this.renderChart()
        );
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

    }, {
      key: 'parseValue',
      value: function parseValue(value) {
        var result = value;
        if (typeof value === "string") {
          value = value.trim().toLowerCase();
          var scale = 1.0;
          var cut = 0;
          var twoCharacters = value.substring(value.length - 2);
          var oneCharacter = value.substring(value.length - 1);

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
        if (typeof result === "number") {
          return result;
        }
        return null;
      }
    }]);

    return ResizeComponent;
  }(_react2.default.Component);
};
//# sourceMappingURL=resize-component.js.map