import React, {useState, useEffect} from 'react';
import bridge from '@vkontakte/vk-bridge';
import {ScreenSpinner, AdaptivityProvider, AppRoot, ConfigProvider, SplitLayout} from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';
import MainPage from './panels/MainPage';

import './panels/DayTimetableRenderers/styles.css'

const App = () => {
    // const [fetchedUser, setUser] = useState(null);
    // const [popout, setPopout] = useState(<ScreenSpinner size='large' />);

    // useEffect(() =>{
    //     async function fetchData() {
    //         await bridge.send('VKWebAppGetUserInfo')
    //             .then((res) => setUser(res))
    //             .catch((e) => console.error(e));
    //         setPopout(null);
    //     }
    //     fetchData().then(r => r);
    // }, []);

    return (
        <ConfigProvider scheme='client_dark'>
            <AdaptivityProvider>
                <AppRoot>
                    <SplitLayout>
                        {/*{fetchedUser == null ? <div/> : <MainPage userInfo={fetchedUser}/>}*/}
                        <MainPage/>
                    </SplitLayout>
                </AppRoot>
            </AdaptivityProvider>
        </ConfigProvider>
    );
}

export default App;
