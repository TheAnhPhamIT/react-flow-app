import { Handle, Position } from 'reactflow';
import './EndNode.css';
import { CustomNodeProps } from '../types';
import { useRef } from 'react';
import { useFocusContent } from '../../../hooks/useFocusContent';
import { useUpdateContent } from '../../../hooks/useUpdateContent';

export function EndNode({ id, selected, data }: CustomNodeProps) {
    const contentRef = useRef<HTMLDivElement>(null);
    useFocusContent(selected, contentRef.current);
    useUpdateContent(selected, id, data.label || '', contentRef.current);
    return (
        <>
            <div className={`end-node ${selected ? 'active' : null}`}></div>
            <Handle
                type='target'
                position={Position.Left}
                id='left'
                className='custom-handle'
            />
            <div
                className='end-node__label'
                contentEditable={selected}
                ref={contentRef}
                suppressContentEditableWarning={true}
            >
                {data.label}
            </div>
        </>
    );
}
