import React, {useState, useEffect} from 'react';
import bridge from '@vkontakte/vk-bridge';
import {ScreenSpinner, AdaptivityProvider, AppRoot, ConfigProvider, SplitLayout, Button} from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';
import MainPage from './panels/MainPage';
const App = () => {
    const [scheme, setScheme] = useState(null)
    const [fetchedUser, setUser] = useState(null);
    const [popout, setPopout] = useState(<ScreenSpinner size='large' />);

    useEffect(() =>{
        bridge.subscribe(({ detail: { type, data }}) => {
            if (type === 'VKWebAppUpdateConfig') {
                setScheme(data.scheme)
            }
        });
    }, []);

    useEffect(() => {
        async function fetchData() {
            await bridge.send('VKWebAppGetUserInfo')
                .then((res) => setUser(res))
                .catch((e) => console.error(e));
            setPopout(null);
        }
        fetchData().then(r => r);
    }, []);

    return (
        scheme == null ? <div/> :
        <ConfigProvider scheme={scheme}>
            <AdaptivityProvider>
                <AppRoot>
                    <SplitLayout popout={popout}>
                        {fetchedUser == null ? <div/> : <MainPage userInfo={fetchedUser}/>}
                    </SplitLayout>
                </AppRoot>
            </AdaptivityProvider>
        </ConfigProvider>
    );
}

export default App;
