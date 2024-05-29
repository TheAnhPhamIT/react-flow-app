import { Handle, NodeResizer, Position } from 'reactflow';
import { CustomNodeProps } from '../types';
import './PoolNode.css';
import { useRef } from 'react';
import { useFocusContent } from '../../../hooks/useFocusContent';
import { useUpdateContent } from '../../../hooks/useUpdateContent';
// import { useMinSizePoolNode } from '../../../hooks/useMinSizePoolNode';

// const POOL_NODE_PADDING = 10;
const POOL_NODE_MIN_WIDTH = 300;
const POOL_NODE_MIN_HEIGHT = 100;
const POOL_NODE_LABEL_WIDTH = 20;

export function PoolNode({ id, selected, data }: CustomNodeProps) {
    const contentRef = useRef<HTMLDivElement>(null);
    useFocusContent(selected, contentRef.current);
    useUpdateContent(selected, id, data.label || '', contentRef.current);

    // const { minWidth, minHeight } = useMinSizePoolNode(
    //     id,
    //     POOL_NODE_MIN_WIDTH,
    //     POOL_NODE_MIN_HEIGHT,
    //     POOL_NODE_PADDING,
    //     POOL_NODE_LABEL_WIDTH
    // );

    return (
        <>
            <NodeResizer
                minWidth={POOL_NODE_MIN_WIDTH}
                minHeight={POOL_NODE_MIN_HEIGHT}
                isVisible={selected}
            />
            <div
                className='pool-node'
                style={{
                    minWidth: `${POOL_NODE_MIN_WIDTH}px`,
                    minHeight: `${POOL_NODE_MIN_HEIGHT}px`,
                }}
            ></div>
            <div
                contentEditable={selected}
                ref={contentRef}
                suppressContentEditableWarning={true}
                className='pool-node__label'
                style={{ width: `${POOL_NODE_LABEL_WIDTH}px` }}
            >
                <p>{data.label}</p>
            </div>
            <Handle
                type='target'
                position={Position.Top}
                id='top'
                className='custom-handle'
            />
            <Handle
                type='target'
                position={Position.Bottom}
                id='bottom'
                className='custom-handle'
            />
        </>
    );
}
