/**
 * Fraunhofer Institute for Computer Graphics Research (IGD)
 * Competence Center for Information Visualization and Visual Analytics
 *
 * Copyright (c) 2018 Fraunhofer IGD. All rights reserved.
 *
 * This source code is property of the Fraunhofer IGD and underlies
 * copyright restrictions. It may only be used with explicit
 * permission from the respective owner.
 */

import React, { Component } from 'react';

export type ComponentProps = {
    sizeSettings?: {
        width?: number;
        height?: number;
        minHeight?: number;
        updateHeight?: boolean;
    };
}

declare class ResizeComponent extends React.Component<ComponentProps, any> { }
