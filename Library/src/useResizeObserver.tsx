import { useRef, useLayoutEffect, useState, useCallback } from 'react';
import ResizeObserver from 'resize-observer-polyfill';

export type ComponentSize = { width: number, height: number };

export const useResizeObserver = () => {
    const [elemToObserve, setElemToObserve] = useState<HTMLElement | undefined>(undefined);
    const [observerEntry, setObserverEntry] = useState<ResizeObserverEntry | null>();
    const observer = useRef<ResizeObserver | null>(null);

    const disconnect = useCallback(() => observer.current?.disconnect(), []);
    const observe = useCallback(() => {
        // @ts-ignore
        observer.current = new ResizeObserver(([entry]) => setObserverEntry(entry));
        if (elemToObserve) {
            observer.current.observe(elemToObserve);
        }
    }, [elemToObserve]);

    useLayoutEffect(() => {
        observe();
        return () => disconnect();
    }, [disconnect, observe]);

    const sizeReturn: ComponentSize = {
        width: observerEntry ? observerEntry.contentRect.width : 0,
        height: observerEntry ? observerEntry.contentRect.height : 0,
    };

    return [setElemToObserve, sizeReturn] as const;
};