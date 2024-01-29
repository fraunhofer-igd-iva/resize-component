# Resize Component

This library provides two React components that provide size information of a wrapped or referenced component.

* **ResizeComponent**: Wraps a component into a `<div>` container and injects the size information of the container as props into the wrapped component. Optionally provide width and height properties for the container. This can be used to set the container's size in (responsive) CSS format, and pass numeric values in pixels to an SVG chart.

* **useResizeObserver Hook**: Provides the size information via a React hook. Can be used on any `ref`.

## Installation

You can install it with

```bash
npm i @iva/resize-component --save
```

If you receive a 404 Error: Not Found, you can run:

```bash
npm login --scope=@iva --registry=https://registry.igd.fraunhofer.de/repository/npm-all/ --auth-type=legacy
```

## Examples

See explanations below, or code examples in `/Example`

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

## FAQ

### 1. My container grows indefinitly. What can I do?

If you have given something like `size={{ height: "100%"}}` to your component, and it grows and grows and grows, then the reason might be, that the outside container can grow, too. Hence, the solution is to restrict growth.

```tsx
export const Chart = (props: ComponentProps & SizeProps) => {
  const d3Container = useRef<SVGSVGElement>(null);
        
  // much code here
  return (<svg
    width={props.size.width}
    height={props.size.height}
    ref={d3Container}
    xmlns="http://www.w3.org/2000/svg"
    version="1.1"
  />);
}

export const ResponsiveChart = ResizeComponent(Chart);

export const App = ()=> {
  return (<div style={{height: "100%"}}>
    <ResponsiveChart size={{}}/>
  </div>);
}
```

Solution: Ensure that the height is "bounded" somehow. This means, that you should not use `%` as a css measure in either the wrapping container, nor in the `size` prop.

```diff
export const App = ()=> {
-  return (<div>
+  return (<div style={{height: "500px"}}>)
    <ResponsiveChart size={{}}/>
  </div>);
}
```

```diff
export const App = ()=> {
  return (<div>
-    <ResponsiveChart size={{}}/>
+    <ResponsiveChart size={{height: "50em"}}/>
  </div>);
}
```

### A more elaborate example which uses mui.com

Lets assume that `Card` has a height and width assigned from somewhere. Hence, the `Card` is rendered with a fixed size. However, our ResponsiveChart would grow, unless we fix the `CardContent` height. To make CardContent fit the container, we use the resizeobserver to monitor the header size and then substract that value from the `CardContent`.

```tsx
const WidgetContainer = ({ content, layout, title = "", endAdornment }: LayoutWidget)  => {
    const [headerRef, headerSize] = useResizeObserver('border-box');

    return <div key={layout.i} data-grid={layout}>
        <Card>
            <CardHeader title={title} action={<Button>Hit me</Button>} ref={headerRef} />
            <CardContent sx={{
                height: `calc(100% - ${headerSize?.height || 0}px)`,
            }}>
                <ResponsiveChart size={{
                  /* no need to provide these because CardContent limits growth for us.*/
                }}/>
            </CardContent>
        </Card>
    </div>
}
```

## Changelog

* **v6.2.0**: Added optional parameter `box` to `useResizeObserver` to enable getting the border box of a ref.
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

## License

This project is licensed under Apache-2.0.

## Contributions

We appreciate all contributions. For bigger changes please open an issue first to discuss it.
