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
            (node) => node.parentId === nodeId
        );
        if (childNodes.length <= 0)
            return {
                minWidth: defaultMinWidth,
                minHeight: defaultMinHeight,
            };
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
