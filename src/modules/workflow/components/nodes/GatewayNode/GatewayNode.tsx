import { Handle, Position } from 'reactflow';
import './GatewayNode.css';
import { CustomNodeProps } from '../types';
import { useRef } from 'react';
import { useFocusContent } from '../../../hooks/useFocusContent';
import { useUpdateContent } from '../../../hooks/useUpdateContent';

export function GatewayNode({ id, selected, data }: CustomNodeProps) {
    const contentRef = useRef<HTMLDivElement>(null);
    useFocusContent(selected, contentRef.current);
    useUpdateContent(selected, id, data.label || '', contentRef.current);
    return (
        <>
            <div className={`gateway-node ${selected ? 'active' : null}`}></div>
            <Handle
                type='target'
                position={Position.Left}
                id='left'
                className='custom-handle handle-left'
                style={{ left: '-8px' }}
            />
            <Handle
                type='source'
                position={Position.Right}
                id='right'
                className='custom-handle handle-right'
                style={{ right: '-8px' }}
            />
            <Handle
                type='source'
                position={Position.Top}
                id='top'
                className='custom-handle handle-top'
                style={{ top: '-8px' }}
            />
            <Handle
                type='source'
                position={Position.Bottom}
                id='bottom'
                className='custom-handle handle-bottom'
                style={{ bottom: '-8px' }}
            />
            <div
                contentEditable={selected}
                ref={contentRef}
                suppressContentEditableWarning={true}
                className='gateway-node__label'
            >
                {data.label}
            </div>
        </>
    );
}
