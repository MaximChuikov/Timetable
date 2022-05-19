import React, {useEffect, useState} from 'react';

const db = require('../server/database');
import {
    Panel,
    PanelHeader,
    View,
    PanelHeaderButton,
    ScreenSpinner
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

    const [currentPanel, setCurrentPanel] = useState(null);
    const [popout, setPopout] = useState(<ScreenSpinner size='large' />);

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
        currentPanel == null ? <div/> :
            <View activePanel={currentPanel}
                  popout={popout}>
                <Panel id={MAIN_PANEL}>
                    <div>
                        <PanelHeader
                            left={
                                <PanelHeaderButton onClick={(e) => {
                                    setCurrentPanel(SETTINGS_PANEL);
                                }
                                }>
                                    <Icon28MenuOutline/>
                                </PanelHeaderButton>
                            }
                            visor={true}
                            separator={false}
                        >Расписание
                        </PanelHeader>
                        <TimetableRenderer vk_id={vk_id}/>
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