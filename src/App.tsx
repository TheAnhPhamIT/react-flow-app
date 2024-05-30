import { ReactFlowProvider } from 'reactflow';
import Workflow from './modules/workflow/workflow';

export default function App() {
    return (
        <ReactFlowProvider>
            <div style={{ width: '100vw', height: '100vh' }}>
                <Workflow />
            </div>
        </ReactFlowProvider>
    );
}
