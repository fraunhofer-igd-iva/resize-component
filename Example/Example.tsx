import React, { FC } from 'react';
import ExampleChart from './ExampleChart';
import ExampleWithHook from './ExampleWithHook';

const Example: FC = () => {
  return (
    <>
      <h2>Example: ResizeComponent</h2>
      <ExampleChart size={{ height: "50vh", width: "40%" }} color="orange" />

      <h2>Example: onResizeObserver hook</h2>
      <ExampleWithHook />
    </>
  )
}

export default Example;