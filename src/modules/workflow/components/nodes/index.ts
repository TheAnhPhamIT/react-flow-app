import { NodeTypes } from 'reactflow';
import { StartNode } from './StartNode/StartNode';
import { EndNode } from './EndNode/EndNode';
import { GatewayNode } from './GatewayNode/GatewayNode';
import { TaskNode } from './TaskNode/TaskNode';
import { CustomNode } from './types';
import { TextNotationNode } from './TextNotationNode/TextNotationNode';
import { PoolNode } from './PoolNode/PoolNode';

export const initialNodes = [
    {
        id: 'node-1716869387264',
        type: 'pool',
        position: {
            x: -78.16786399799742,
            y: 293.96990154373657,
        },
        data: {
            label: 'Restaurant',
        },
        width: 1002,
        height: 257,
        style: {
            width: 1002,
            height: 257,
        },
    },
    {
        id: 'node-1716869183568',
        type: 'pool',
        position: {
            x: -74.4304282342896,
            y: 102.96224286171126,
        },
        data: {
            label: 'Customer',
        },
        width: 718,
        height: 134,
        style: {
            width: 718,
            height: 134,
        },
    },
    {
        id: 'node-1716869178889',
        type: 'startEvent',
        position: {
            x: 44.06579639437432,
            y: 39.509323347421514,
        },
        data: {
            label: 'start',
        },
        width: 30,
        height: 30,
        parentId: 'node-1716869183568',
        extent: 'parent',
    },
    {
        id: 'node-1716869202295',
        position: {
            x: 134.19499201721365,
            y: 21.320724549296727,
        },
        type: 'task',
        data: {
            label: 'Place order',
        },
        parentId: 'node-1716869183568',
        width: 120,
        height: 70,
        extent: 'parent',
    },
    {
        id: 'node-1716869265766',
        position: {
            x: 245.54421957119843,
            y: -116.7887584538527,
        },
        type: 'textNotation',
        data: {
            label: 'Over 70% of request are made by phone call, about 30% by app',
        },
        parentId: 'node-1716869183568',
        width: 211,
        height: 43,
        style: {
            width: 211,
            height: 43,
        },
    },
    {
        id: 'node-1716869419367',
        type: 'task',
        position: {
            x: 42.00000000000003,
            y: 58,
        },
        data: {
            label: 'Verify customer identity',
        },
        width: 120,
        height: 70,
        parentId: 'node-1716869387264',
        extent: 'parent',
    },
    {
        id: 'node-1716869456014',
        position: {
            x: 215.0000000000001,
            y: 82,
        },
        type: 'gateway',
        data: {
            label: 'Customer exist?',
        },
        parentId: 'node-1716869387264',
        width: 25,
        height: 25,
        extent: 'parent',
    },
    {
        id: 'node-1716869532373',
        position: {
            x: 342.3107467286489,
            y: 4.155373364324419,
        },
        type: 'task',
        data: {
            label: 'Create customer account',
        },
        parentId: 'node-1716869387264',
        width: 120,
        height: 70,
        extent: 'parent',
    },
    {
        id: 'node-1716869553093',
        position: {
            x: 387.7768668216221,
            y: 133.75701308540482,
        },
        type: 'gateway',
        data: {
            label: '',
        },
        parentId: 'node-1716869387264',
        width: 25,
        height: 25,
        extent: 'parent',
    },
    {
        id: 'node-1716869577709',
        position: {
            x: 457.0000000000001,
            y: 104,
        },
        type: 'task',
        data: {
            label: 'Forward order to the kitchen',
        },
        parentId: 'node-1716869387264',
        width: 120,
        height: 70,
        extent: 'parent',
    },
    {
        id: 'node-1716869631669',
        position: {
            x: 642.0000000000001,
            y: 106,
        },
        type: 'task',
        data: {
            label: 'The chef will prepare the meal by customer order',
        },
        parentId: 'node-1716869387264',
        width: 120,
        height: 70,
        extent: 'parent',
    },
    {
        id: 'node-1716869742878',
        position: {
            x: 800.0000000000001,
            y: 108,
        },
        type: 'task',
        data: {
            label: 'Delivering the order to customer',
        },
        parentId: 'node-1716869387264',
        width: 120,
        height: 70,
        extent: 'parent',
    },
    {
        id: 'node-1716869860284',
        position: {
            x: 325.1949920172136,
            y: 21.320724549296727,
        },
        type: 'task',
        data: {
            label: 'Waiting for the meal',
        },
        parentId: 'node-1716869183568',
        width: 120,
        height: 70,
        extent: 'parent',
    },
    {
        id: 'node-1716870052717',
        position: {
            x: 490.1949920172136,
            y: 23.320724549296727,
        },
        type: 'task',
        data: {
            label: 'Received the order from deliver',
        },
        parentId: 'node-1716869183568',
        width: 120,
        height: 70,
        extent: 'parent',
    },
    {
        id: 'node-1716870094205',
        position: {
            x: 670.1949920172137,
            y: 44.32072454929673,
        },
        type: 'endEvent',
        data: {
            label: 'Enjoy the meal',
        },
        parentId: 'node-1716869183568',
        width: 30,
        height: 30,
        extent: 'parent',
    },
    {
        id: 'node-1716870110324',
        position: {
            x: 960.0000000000001,
            y: 129,
        },
        type: 'endEvent',
        data: {
            label: 'end',
        },
        parentId: 'node-1716869387264',
        width: 30,
        height: 30,
        extent: 'parent',
    },
] satisfies CustomNode[];

export const nodeTypes = {
    startEvent: StartNode,
    endEvent: EndNode,
    gateway: GatewayNode,
    task: TaskNode,
    textNotation: TextNotationNode,
    pool: PoolNode,
} satisfies NodeTypes;
