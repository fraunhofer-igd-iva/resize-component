## Resize Component

This React component resizes the given chart to the available dimensions.

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

input

    sizeSettings: {
      height:  string or number, // can be px, vh or %. Numbers will be interpreted as pixel
      minHeight: number, // minimum height in Pixel
      updateHeight: boolean // if height should change (only vh or %)
    }

output

    sizeSettings: {
      height: number, // available height in pixel, can only change when updateHeight is set
      width: number // avilable width in pixel, can change
    }

### How to add it to a component

write a Wrapper component for your Chart, import the ResizeComponent

    import {ResizeComponent} from "@iva/resize-component";


and when exporting your class wrap it

    export default ResizeComponent(MyAwesomeChart);


### How to use it

In the react component, where you use your HOC- chart:

    import "./MyAwesomeChart";

    render() {
        <MyAwesomeChart sizeSettings= {{
          height:  string or number, // can be px, vh or %. Numbers will be interpreted as pixel
          minHeight: number, // minimum height in Pixel
          updateHeight: boolean // if height should change (only vh or %)
        }} />
    }


### Examples

You can find an example for the wrapper component in ```src/wrapper-example.js```.

Also the following projects use ResizeComponent:

* [jivacharts][1]
* [Attribute Relations][2]

  [1]: https://gitbucket.igd.fraunhofer.de/jburmeis/JivaChartsJS
  [2]: https://gitbucket.igd.fraunhofer.de/jburmeis/AttributeRelations