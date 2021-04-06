/**
 * Example for a component that uses the useResizeObserver hook to get
 * the current size of the ref-component.
 */

import React, { FC } from 'react';
import { useResizeObserver } from '@iva/resize-component';

const ExampleWithHook: FC = () => {
  const [ref, size] = useResizeObserver();

  return (
    <div ref={ref as any} style={{ borderStyle: "solid", borderColor: "orange"}}>
      <p>Width: {size.width}</p>
      <p>Height: {size.height}</p>
    </div>
  )
}

export default ExampleWithHook;