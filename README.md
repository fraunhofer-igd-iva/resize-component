## Resize Component

This React higher order component injects a size information props into a wrapped component.

## Changelog

* **v5.0.0**: API change towards simpler variable names (e.g. outputHeight -> height)
* **v3.1.0**: output sizeSettings actually is `{outputHeight: number, outputWidth: number}` as defined in the contract.
* **v3.0.0**: Fixed bugs, improved TypeScript support
* **v2.0.0**: The API has remained the same, but the import and usage is slightly different. See "How to add it to a component".


### Local demo

1. Clone this project (```git clone <url>```) or download this project as .zip (Repository -> Files -> Dowload zip)
2. Install required node modules with:

    ```bash
    $ npm install
    ```

3. To view the demo, start the NPM server with:

    ```bash
    $ npm start
    ```

4. You then can change height and width to see what it does.

### What it does

Input (set by the parent component):

    size: {
      height?:  string | number,  // can be px, vh or %. Numbers will be interpreted as pixel
      minHeight?: number,         // minimum height in Pixel
      updateHeight?: boolean      // if height should change (only vh or %)
    }

Output (received by the child component):

    size: {
      height: number, // available height in pixel, can only change when updateHeight is set
      width: number   // available width in pixel, can change
    }


### How to add it to a component

Simple wrap your component 'MyAwesomeChart' with the ResizeComponent. First import the ResizeComponent

    import ResizeComponent from "@iva/resize-component";


and when exporting your component wrap it

    export default ResizeComponent(MyAwesomeChart);


### How to use it

In the react component, where you use your chart component:

    import "./MyAwesomeChart";

    render() {
        <MyAwesomeChart size= {{
          height:  string or number, // can be px, vh or %. Numbers will be interpreted as pixel
          minHeight: number, // minimum height in Pixel
          updateHeight: boolean // if height should change (only vh or %)
        }} />
    }

The input size property will be replaced by the ResizeComponent, and MyAwesomeChart will receive the props size = {width: number, height: number}.

### How to use it with TypeScript

See [Receiver HOC](example-typescript/src/SizeReceiverComponent.tsx) for an dead simple example how to apply the HOC to a component, and [to use the HOCed component](example-typescript/src/App.tsx).

MyAwesomeChart can simply receive and integrate the props from the wrapping ResizeComponent like this:

Class Component:

    import ResizeComponent, { SizeProps } from "@iva/resize-component";
    ...
    class MyAwesomeChart extends React.Component<MyProps & SizeProps> {
        ...
        const { height, width } = this.props.size;
    }
    export default ResizeComponent(MyAwesomeChart);

Functional Component:

    import ResizeComponent, { SizeProps } from "@iva/resize-component";
    ...
    const MyAwesomeChart:FC<MyProps & SizeProps> = props => {
        ...
        const { height, width } = props.size;
    }
    export default ResizeComponent(MyAwesomeChart);


### Examples

You can find an example for the wrapper component in ```examples/src/wrapper-example.js```.

Also the following projects use ResizeComponent:

* [jivacharts][1]
* [Attribute Relations][2]

  [1]: https://iva-git.igd.fraunhofer.de/jburmeis/JivaChartsJS
  [2]: https://iva-git.igd.fraunhofer.de/jburmeis/AttributeRelations


### Building, Deployment & Demo App
This repository contains two separate projects: The library and a demo app:
* `Library/` contains the actual library. Build and deploy via tsc --> npm publish
* `Example/` contains a demo for the library. Install and run via npm install --> npm start
* `example-typescript/` contains a typescript demo. --> npm start


