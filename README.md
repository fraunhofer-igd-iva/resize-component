# Resize Component

This library provides two React components that provide size information of a wrapped or referenced component.
* **ResizeComponent**: Wraps a component into a `<div>` container and injects the size information of the container as props into the wrapped component. Optionally provide width and height properties for the container. This can be used to set the container's size in (responsive) CSS format, and pass numeric values in pixels to an SVG chart.
* **useResizeObserver Hook**: Provides the size information via a React hook. Can be used on any `ref`. 

## Installation
You can install it with
```bash
npm i @iva/resize-component --save
```

## Examples

See explanations below, or code examples in `/Example`


## Changelog

* **v6.1.2**: Fixed prepublish script to build before publishing, Update dependencies for React 18
* **v6.1.1**: Fixed type in useResizeComponent to remove cast to any
* **v6.1.0**: Added export for ResizeComponentProps to enable wrapping of ResizeComponents
* **v6.0.4**: added /src folder to fix unresolved sourcemap
* **v6.0.3**: fix repo path in package.json
* **v6.0.2**: useResizeObserver now returns floored integer values
* **v6.0.1**: Initial Observer size is now undefined instead of (0,0)
* **v6.0.0**: API change, use of ResizeObserver API instead of event listener on 'window'
* **v5.0.0**: API change towards simpler variable names (e.g. outputHeight -> height)
* **v3.1.0**: output sizeSettings actually is `{outputHeight: number, outputWidth: number}` as defined in the contract.
* **v3.0.0**: Fixed bugs, improved TypeScript support
* **v2.0.0**: The API has remained the same, but the import and usage is slightly different. See "How to add it to a component".

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
The input size property will be replaced by the ResizeComponent, and MyAwesomeChart will receive the props size = {width: number, height: number}.

### How to use it with TypeScript
#### Class Component:
```javascript
import { ResizeComponent, SizeProps } from "@iva/resize-component";

class MyAwesomeChart extends React.Component<MyProps & SizeProps> {
    const { height, width } = this.props.size;
    // ...
}
export default ResizeComponent(MyAwesomeChart);
```

#### Functional Component:
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
