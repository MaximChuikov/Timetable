import React, {useEffect, useState} from 'react';
import './DayTimetableRenderers/styles.css'

const db = require('../server/database');
import {
    Panel,
    PanelHeader,
    View,
    PanelHeaderButton,
    ScreenSpinner, Header
} from '@vkontakte/vkui';
import {
    Icon28MenuOutline
} from '@vkontakte/icons';

import Settings from "./Settings";
import TimetableRenderer from "./TimetableRenderer";

const MainPage = ({userInfo}) => {

    const [studentExists, setStudentExists] = useState(null);
    const vk_id = userInfo.id;

    const MAIN_PANEL = "mainPanel";
    const SETTINGS_PANEL = "settingsPanel"
    const WAIT_PANEL = "waitPanel"

    const [currentPanel, setCurrentPanel] = useState(null);
    const [popout, setPopout] = useState(<ScreenSpinner size='large'/>);

    useEffect(() => {
        async function fetch() {
            const student = await db.studentExists(vk_id).then(res => res);
            setCurrentPanel(student === true ? MAIN_PANEL : SETTINGS_PANEL);
            setStudentExists(student);
            setPopout(null);
        }

        fetch().then(r => r);
    }, [])
    return (
        <View activePanel={currentPanel ?? WAIT_PANEL}
              popout={popout}>
            <Panel id={WAIT_PANEL}/>
            <Panel id={MAIN_PANEL}>
                <div>
                    <TimetableRenderer vk_id={vk_id} viewWidth={'100%'}/>
                </div>

            </Panel>

            <Panel id={SETTINGS_PANEL}>
                <Settings vk_id={vk_id}
                          haveBackButton={studentExists}
                          exitFunc={() => {
                              setStudentExists(true);
                              setCurrentPanel(MAIN_PANEL);
                          }}
                />
            </Panel>
        </View>
    )
}
export default MainPage;