import React, {useState, useEffect} from 'react';
import bridge from '@vkontakte/vk-bridge';
import {ScreenSpinner, AdaptivityProvider, AppRoot, ConfigProvider, SplitLayout} from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';
import TimetableViewer from './panels/Timetable';
const App = () => {
    const [scheme, setScheme] = useState('bright_light')
    const [fetchedUser, setUser] = useState(null);
    const [popout, setPopout] = useState(<ScreenSpinner size='large' />);

    useEffect(() => {
        bridge.subscribe(({ detail: { type, data }}) => {
            if (type === 'VKWebAppUpdateConfig') {
                setScheme(data.scheme)
            }
        });

        async function fetchData() {
            const user = await bridge.send('VKWebAppGetUserInfo');
            setUser(user);
            setPopout(null);
        }
        fetchData().then(r => r);
    }, []);

    return (
        <ConfigProvider scheme={scheme}>
            <AdaptivityProvider>
                <AppRoot>
                    <SplitLayout popout={popout}>
                        <TimetableViewer userInfo={fetchedUser}/>
                    </SplitLayout>
                </AppRoot>
            </AdaptivityProvider>
        </ConfigProvider>
    );
}

export default App;
