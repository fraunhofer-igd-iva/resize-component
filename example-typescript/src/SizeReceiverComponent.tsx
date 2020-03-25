import React from 'react';

import {InjectedProps, default as ResizeComponent} from "@iva/resize-component";

type Props = {} & InjectedProps

const SizeReceiver = (props: Props) => {

    return <pre style={{
        width: props.sizeSettings.outputWidth,
        height: props.sizeSettings.outputHeight,
        backgroundColor: "pink"
    }}>
            {JSON.stringify(props, null, "    ")}
    </pre>
};

export const SizeReceiverHoc = ResizeComponent(SizeReceiver);