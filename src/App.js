import React, {useState, useEffect} from 'react';
import bridge from '@vkontakte/vk-bridge';
import {View, ScreenSpinner, AdaptivityProvider, AppRoot, ConfigProvider} from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';
import TimetableViewer from './panels/Timetable';

const App = () => {
    return (
        <ConfigProvider>
            <AdaptivityProvider>
                <AppRoot>
                    <TimetableViewer/>
                </AppRoot>
            </AdaptivityProvider>
        </ConfigProvider>
    );
}

export default App;
