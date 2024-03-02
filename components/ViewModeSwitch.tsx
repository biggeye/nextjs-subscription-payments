'use client'
import { Switch } from '@chakra-ui/react';
import { useRecoilState } from 'recoil';
import { viewModeState } from '@/state/user/user_state-atoms';

const ViewModeSwitch = () => {
    const [viewMode, setViewMode] = useRecoilState(viewModeState);

    // Corrected toggle logic
    const toggleViewMode = () => {
        const nextViewMode = viewMode === 'tabs' ? 'grid' : 'tabs';
        setViewMode(nextViewMode);
        console.log("Toggling viewMode to:", nextViewMode); // Additional logging for debugging
    };

    return (
        <Switch size={{base: "sm", md: "md"}} onChange={toggleViewMode}>
           {viewMode === 'tabs' ? 'Tabbed View' : 'Grid View'}
        </Switch>
    );
}

export default ViewModeSwitch;
