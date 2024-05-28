import { useCallback, useState } from 'react';
import { Edge } from 'reactflow';

export function useEdgeContextMenu(element: HTMLDivElement) {
    const [menu, setMenu] = useState<{
        id: string;
        top: number;
        bottom: number;
        left: number;
        right: number;
    } | null>(null);

    const onEdgeContextMenu = useCallback(
        (e: React.MouseEvent, edge: Edge) => {
            // Prevent native context menu from showing
            e.preventDefault();

            // Calculate position of the context menu. We want to make sure it
            // doesn't get positioned off-screen.
            const pane = element.getBoundingClientRect() || {
                width: 0,
                height: 0,
            };
            setMenu({
                id: edge.id,
                top: (e.clientY < pane.height - 200 && e.clientY) || 0,
                left: (e.clientX < pane.width - 200 && e.clientX) || 0,
                right:
                    (e.clientX >= pane.width - 200 && pane.width - e.clientX) ||
                    0,
                bottom:
                    (e.clientY >= pane.height - 200 &&
                        pane.height - e.clientY) ||
                    0,
            });
        },
        [setMenu, element]
    );

    return { menu, setMenu, onEdgeContextMenu };
}
