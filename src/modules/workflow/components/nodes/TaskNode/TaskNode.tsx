import { Handle, Position } from 'reactflow';
import './TaskNode.css';
import { CustomNodeProps } from '../types';
import { useRef } from 'react';
import { useUpdateContent } from '../../../hooks/useUpdateContent';
import { useFocusContent } from '../../../hooks/useFocusContent';

export function TaskNode({ data, selected, id }: CustomNodeProps) {
    const contentRef = useRef<HTMLDivElement>(null);
    useFocusContent(selected, contentRef.current);
    useUpdateContent(selected, id, data.label || '', contentRef.current);

    return (
        <>
            <div
                className={`task-node ${selected ? 'active' : ''}`}
                contentEditable={selected}
                ref={contentRef}
                suppressContentEditableWarning={true}
            >
                {data.label}
            </div>
            <Handle
                type='target'
                position={Position.Left}
                id='left'
                className='custom-handle'
            />
            <Handle
                type='source'
                position={Position.Right}
                id='right'
                className='custom-handle'
            />
            <Handle
                type='source'
                position={Position.Top}
                id='top'
                className='custom-handle'
            />
            <Handle
                type='source'
                position={Position.Bottom}
                id='bottom'
                className='custom-handle'
            />
        </>
    );
}
