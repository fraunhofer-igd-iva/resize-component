import React from "react";
import { useResizeObserver, ComponentSize } from "./useResizeObserver";

// Props injected into the wrapped component
export type SizeProps = {
  size: ComponentSize;
};

// Props that only the ResizeComponent will receive
export type ResizeComponentProps = {
  size: {
    height?: number | string;
    width?: number | string;
  },
}

export function ResizeComponent<P>(WrappedComponent: React.ComponentType<P & SizeProps>) {
  const ComponentWithInjectedProps = (props: P & ResizeComponentProps) => {
    const [ref, size] = useResizeObserver();
    const { height, width } = props.size;

    return (
      <div
        ref={ref as any}
        className="responsive-wrapper"
        style={{ height: height, width: width ?? "100%" }}
      >
        {size && <WrappedComponent {...props} size={size} />}
      </div>
    );
  };
  return ComponentWithInjectedProps;
}
