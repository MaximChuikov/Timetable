import React, {useState, useEffect} from 'react';
import bridge from '@vkontakte/vk-bridge';
import {ScreenSpinner, AdaptivityProvider, AppRoot, ConfigProvider, SplitLayout, Button} from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';
import Timetable from './panels/Timetable';
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
            // await bridge.send('VKWebAppGetUserInfo').then((res) => {
            //     setUser(res);
            //     console.log("Получил пользователя", res);
            // }).catch((e) =>{
            //     console.error(e);
            // });
            setTimeout(() => {
                setUser({
                    id: 12312
                });
                setPopout(null);
            }, 500);

        }
        fetchData().then(r => r);
    }, []);

    return (
        <ConfigProvider scheme={scheme}>
            <AdaptivityProvider>
                <AppRoot>
                    <SplitLayout popout={popout}>
                        {fetchedUser == null ? <div/> : <Timetable userInfo={fetchedUser}/>}
                    </SplitLayout>
                </AppRoot>
            </AdaptivityProvider>
        </ConfigProvider>
    );
}

export default App;
