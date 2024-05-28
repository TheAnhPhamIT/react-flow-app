import { useEffect } from 'react';
import { useReactFlow } from 'reactflow';

export function useUpdateContent(
    selected: boolean,
    nodeId: string,
    label: string,
    contentEditableElement: HTMLElement | null
) {
    const { setNodes } = useReactFlow();
    useEffect(() => {
        if (selected) return;
        if (
            contentEditableElement &&
            label !== contentEditableElement.innerText
        ) {
            setNodes((nodes) =>
                nodes.map((node) => {
                    if (node.id !== nodeId) return node;
                    node.data.label = contentEditableElement.innerText || '';
                    return node;
                })
            );
        }
    }, [selected, nodeId, label, contentEditableElement, setNodes]);
}
