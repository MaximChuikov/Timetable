import React, {useEffect, useState} from 'react';
import './DayTimetableRenderers/styles.css'
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

const MainPage = () => {

    //const [studentExists, setStudentExists] = useState(true);//null
    //const vk_id = userInfo.id;

    const MAIN_PANEL = "mainPanel";
    //const SETTINGS_PANEL = "settingsPanel"

    // const [currentPanel, setCurrentPanel] = useState(MAIN_PANEL);//null
    // //const [popout, setPopout] = useState(<ScreenSpinner size='large' />);

    // useEffect(() => {
    //     async function fetch() {
    //         //const student = await db.studentExists(vk_id).then(res => res);
    //         //setCurrentPanel(student === true ? MAIN_PANEL : SETTINGS_PANEL);
    //         //setStudentExists(student);
    //         setPopout(null);
    //     }
    //     fetch().then(r => r);
    // }, [])
    return (
        // currentPanel == null ? <div/> :
            <View activePanel={MAIN_PANEL}>
                <Panel id={MAIN_PANEL}>
                    <div>
                        <PanelHeader
                            // left={
                            //     <PanelHeaderButton onClick={(_e) => {
                            //         setCurrentPanel(SETTINGS_PANEL);
                            //     }
                            //     }>
                            //         <Icon28MenuOutline/>
                            //     </PanelHeaderButton>
                            // }
                            visor={true}
                            separator={false}
                        >
                            Расписание
                        </PanelHeader>
                        <TimetableRenderer /*vk_id={vk_id}*//>
                    </div>
                </Panel>


                {/*<Panel id={SETTINGS_PANEL}>*/}
                {/*    <Settings vk_id={vk_id}*/}
                {/*              haveBackButton={studentExists}*/}
                {/*              exitFunc={() => {*/}
                {/*                  setStudentExists(true);*/}
                {/*                  setCurrentPanel(MAIN_PANEL);*/}
                {/*              }}*/}
                {/*    />*/}
                {/*</Panel>*/}
            </View>
    )
}
export default MainPage;