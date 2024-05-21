import { useCallback, useState } from "react";
import { Node } from "reactflow";

export function useContextMenu(element: HTMLDivElement) {
  const [menu, setMenu] = useState<{
    id: string;
    top: number;
    bottom: number;
    left: number;
    right: number;
  } | null>(null);

  const onNodeContextMenu = useCallback(
    (e: React.MouseEvent, node: Node) => {
      // Prevent native context menu from showing
      e.preventDefault();

      // Calculate position of the context menu. We want to make sure it
      // doesn't get positioned off-screen.
      const pane = element.getBoundingClientRect() || {
        width: 0,
        height: 0,
      };
      setMenu({
        id: node.id,
        top: (e.clientY < pane.height - 200 && e.clientY) || 0,
        left: (e.clientX < pane.width - 200 && e.clientX) || 0,
        right: (e.clientX >= pane.width - 200 && pane.width - e.clientX) || 0,
        bottom:
          (e.clientY >= pane.height - 200 && pane.height - e.clientY) || 0,
      });
    },
    [setMenu, element]
  );

  return { menu, setMenu, onNodeContextMenu };
}
