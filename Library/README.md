# React Resize Component

This library provides two React components that provide size information of a wrapped or referenced component.

* **ResizeComponent**: Wraps a component into a `<div>` container and injects the size information of the container as props into the wrapped component. Optionally provide width and height properties for the container. This can be used to set the container's size in (responsive) CSS format, and pass numeric values in pixels to an SVG chart.

* **useResizeObserver Hook**: Provides the size information via a React hook. Can be used on any `ref`.

## Installation

You can install it with

```bash
npm i @igd-iva/resize-component --save
```

## Examples

## ResizeComponent

Input Props (set by the parent component):

```javascript
    size: {
      height?: string | number,  // CSS format
      width?:  string | number,  // CSS format (defaults to '100%')
    }
```

Injected Props (received by the child component):

```javascript
    size: {
      height: number,  // height in pixel
      width:  number,  // width in pixel
    }
```

### How to add it to a component

Simply wrap your component 'MyAwesomeChart' with the ResizeComponent. First import the ResizeComponent

```javascript
import { ResizeComponent } from "@iva/resize-component";

const MyAwesomeChart = (props) => {
    // Injected props from ResizeComponent:
    const { height, width } = props.size;
    // ...
}

// Export the component wrapped like this 
export default ResizeComponent(MyAwesomeChart);
```

### How to use a wrapped component

```javascript
import "./MyAwesomeChart";

    render() {
        <MyAwesomeChart size = {{ height: "20vh" }} />
    }
```

The input size property will be replaced by the ResizeComponent, and MyAwesomeChart will receive the props `size = {width: number, height: number}`. Be aware, that you might run into race conditions, when you use a relative size, such as `height: "80%"` and similar, if no parent container restricts growth. See FAQ for more details.

### How to use it with TypeScript

#### Class Component

```javascript
import { ResizeComponent, SizeProps } from "@iva/resize-component";

class MyAwesomeChart extends React.Component<MyProps & SizeProps> {
    const { height, width } = this.props.size;
    // ...
}
export default ResizeComponent(MyAwesomeChart);
```

#### Functional Component

```javascript
import { ResizeComponent, SizeProps } from "@iva/resize-component";

const MyAwesomeChart:FC<MyProps & SizeProps> = props => {
    const { height, width } = props.size;
    // ...
}
export default ResizeComponent(MyAwesomeChart);
```

#### Wrap and expose a resize-component

To wrap a ResizeComponent and expose its input types, you can use the type `ResizeComponentProps` similar to the pseudocode below:

```typescript
const X = (props: XProps & SizeProps) => (<>...</>);
const Y = ResizeComponent(X)

const Z = ({size, ...other} : ZProps & ResizeComponentProps ) => {
    return <Y size={size} />;
}
```

## useResizeObserver

Simply add as hook into a component, and provide a `ref` like this:

```javascript
import { useResizeObserver } from '@iva/resize-component';

const ExampleWithHook: FC = () => {
  const [ref, size] = useResizeObserver();
  const {width, height} = size;

  return (
    <div ref={ref} />
  )
}
```

If you want the size to not be `undefined` initially, you can also specify default values before the size is observed:

```javascript
const [ref, observedSize = { width: 1000, height: 1000 }] = useResizeObserver();
```

## Monitor the border box size of a ref

Simply add as hook into a component, and provide a `ref` like this:

```javascript
import { useResizeObserver } from '@iva/resize-component';

const ExampleWithHook: FC = () => {
  const [ref, size] = useResizeObserver("border-box");
  const {width, height} = size;

  return (
    <div ref={ref} />
  )
}
```

## License

This project is licensed under Apache-2.0.

## Contributions

We appreciate all contributions. For bigger changes please open an issue first in GitHub ( https://github.com/fraunhofer-igd-iva/resize-component ) to discuss it.
