/**
 * Example for a wrapped component. The component itself requires a color prop, and also receives the
 * size props from the ResizeComponent.
 */

import React, { FC } from 'react';
import { ResizeComponent, SizeProps } from '../Library';

interface ComponentProps {
  color: string;
}

function ExampleChart(props: ComponentProps & SizeProps) {
  const { width, height } = props.size;

  return (
    <svg width={width} height={height}>
      <rect x={0} y={0} width={width} height={height} fill={props.color} />
    </svg>
  );
}

export default ResizeComponent(ExampleChart);