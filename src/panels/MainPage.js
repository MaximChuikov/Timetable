import React, {useEffect, useState} from 'react';

const db = require('../server/database');
import {
    Panel,
    PanelHeader,
    View,
    PanelHeaderButton
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

    useEffect(() => {
        async function fetch() {
            const student = await db.studentExists(vk_id).then(res => res);
            setCurrentPanel(student === true ? MAIN_PANEL : SETTINGS_PANEL);
            setStudentExists(student);
        }
        fetch().then(r => r);
    }, [])
    return (
        <>
            {
                currentPanel == null ? <div/> :
                    <View activePanel={currentPanel}>
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
                                <TimetableRenderer vk_id={vk_id}></TimetableRenderer>
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
            }
        </>


    )
}
export default MainPage;
