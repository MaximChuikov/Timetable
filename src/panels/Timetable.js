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
import OneDayTimetable from "./TimetableRender/OneDayTimetable";
import DoubleWeekTimetable from "./TimetableRender/DoubleWeekTimetable";
import Settings from "./Settings";

const panels = {
    today: 'today',
    tomorrow: 'tomorrow',
    currentWeek: 'currWeek',
    otherWeek: 'otherWeek',
    doubleWeek: 'doubleWeek',

    settings: 'settings',
    editTable: 'edit'
};


const Timetable = ({userInfo}) => {
    // const [today, setToday] = useState(null);
    // const [tomorrow, setTomorrow] = useState(null);
    // const [week, setWeek] = useState(null);
    const [studentExists, setStudentExists] = useState(null);
    const [popout, setPopout] = useState(<ScreenSpinner size='medium'/>);
    const vk_id = userInfo.id;

    const MAIN_PANEL = "mainPanel";
    const SETTINGS_PANEL = "settingsPanel"

    const [currentPanel, setCurrentPanel] = useState(null);

    useEffect(() => {
        async function fetch() {
            const student = await db.studentExists(vk_id).then(res => res);
            setStudentExists(student);
            setPopout(null);
        }

        fetch().then(r => r);
    }, [])

    return (
        <>
            {
                studentExists == null ? <div/> :
                    <View activePanel={studentExists === true ? MAIN_PANEL : SETTINGS_PANEL}>
                        <Panel id={MAIN_PANEL}>
                            <div>
                                <PanelHeader
                                    left={
                                        <PanelHeaderButton>
                                            <Icon28MenuOutline/>
                                        </PanelHeaderButton>
                                    }
                                    visor={true}
                                >Расписание
                                </PanelHeader>
                            </div>
                            <div>
                                govno
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
export default Timetable;
