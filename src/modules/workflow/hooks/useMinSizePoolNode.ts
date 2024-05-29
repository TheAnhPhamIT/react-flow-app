import { useMemo } from 'react';
import { getNodesBounds, useReactFlow } from 'reactflow';

export function useMinSizePoolNode(
    nodeId: string,
    defaultMinWidth: number,
    defaultMinHeight: number,
    padding = 0,
    extraWidth = 0,
    extraHeight = 0
) {
    const { getNodes } = useReactFlow();
    const { minWidth, minHeight } = useMemo(() => {
        const childNodes = getNodes().filter(
            (node) => node.parentId === nodeId && node.type !== 'textNotation'
        );
        if (childNodes.length <= 0) {
            return {
                minWidth: defaultMinWidth,
                minHeight: defaultMinHeight,
            };
        }

        // let minX, minY, maxX, maxY;
        // for (const node of childNodes) {
        //     const { x, y } = node.positionAbsolute || node.position;
        //     const { width, height } = node;
        //     minX = minX === undefined ? x : Math.min(x, minX);
        //     minY = minY === undefined ? y : Math.min(y, minY);
        //     maxX =
        //         maxX === undefined
        //             ? x + (width || 0)
        //             : Math.max(maxX, x + (width || 0));
        //     maxY =
        //         maxY === undefined
        //             ? y + (height || 0)
        //             : Math.max(maxY, y + (height || 0));
        // }

        // const minHeight = maxY! - minY! + padding * 2 + extraWidth;
        // const minWidth = maxX! - minX! + padding * 2 + extraHeight;

        // return {
        //     minHeight,
        //     minWidth,
        // };
        const rect = getNodesBounds(childNodes);

        return {
            minWidth: rect.width + padding * 2 + extraWidth,
            minHeight: rect.height + padding * 2 + extraHeight,
        };
    }, [
        nodeId,
        defaultMinWidth,
        defaultMinHeight,
        padding,
        extraWidth,
        extraHeight,
        getNodes,
    ]);

    return { minWidth, minHeight };
}
