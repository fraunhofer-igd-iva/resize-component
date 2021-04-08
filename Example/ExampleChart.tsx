/**
 * Example for a wrapped component. The component itself requires a color prop, and also receives the
 * size props from the ResizeComponent.
 */

import React, { FC } from 'react';
import { ResizeComponent, SizeProps } from '../resize';

interface ComponentProps {
  color: string;
}

const ExampleChart: FC<ComponentProps & SizeProps> = (props) => {
  const { width, height } = props.size;

  return (
    <svg width={width} height={height}>
      <rect x={0} y={0} width={width} height={height} fill={props.color} />
    </svg>
  )
}

export default ResizeComponent(ExampleChart);