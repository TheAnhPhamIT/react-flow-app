import { Handle, NodeResizer, Position } from 'reactflow';
import { CustomNodeProps } from '../types';
import './PoolNode.css';
import { useRef } from 'react';
import { useFocusContent } from '../../../hooks/useFocusContent';
import { useUpdateContent } from '../../../hooks/useUpdateContent';

export function PoolNode({ id, selected, data }: CustomNodeProps) {
    const contentRef = useRef<HTMLDivElement>(null);
    useFocusContent(selected, contentRef.current);
    useUpdateContent(selected, id, data.label || '', contentRef.current);
    return (
        <>
            <NodeResizer minWidth={300} minHeight={100} isVisible={selected} />
            <div className='pool-node'></div>
            <div
                contentEditable={selected}
                ref={contentRef}
                suppressContentEditableWarning={true}
                className='pool-node__label'
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
