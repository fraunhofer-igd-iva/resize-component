import React, { FC } from 'react';
import TestChart from './TestChart';
import TestWithHook from './TestWithHook';

const Example: FC = () => {
  return (
    <>
      <h2>Example: ResizeComponent</h2>
      <TestChart size={{ height: "50vh", width: "40%" }} color="orange" />

      <h2>Example: onResizeObserver hook</h2>
      <TestWithHook />
    </>
  )
}

export default Example;