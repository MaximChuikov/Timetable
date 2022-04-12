import React from 'react';
import {
    Panel,
    PanelHeader,
    View,
    Tabbar,
    TabbarItem,
} from '@vkontakte/vkui';
import {
    Icon28ArticleOutline, Icon28BillheadOutline,
    Icon28CalendarOutline
} from '@vkontakte/icons';
import OneDayTimetable from "./OneDayTimetable";
import DoubleWeekTimetable from "./DoubleWeekTimetable";

const panels = {
    today: 'today',
    tomorrow: 'tomorrow',
    currentWeek: 'currWeek',
    otherWeek: 'otherWeek',
    doubleWeek: 'doubleWeek'
};

const Timetable = () => {
    const [activeTimetablePanel, setActiveTimetablePanel] = React.useState(panels.today);
    const db = require('../server/database');

    return (
        <View activePanel={"main"}>
            <Panel id={"main"}>

                <PanelHeader>Расписание</PanelHeader>

                {/*<Нижний таббар главной панели>*/}
                <Tabbar>
                    <TabbarItem
                        selected={activeTimetablePanel === panels.today}
                        onClick={() => setActiveTimetablePanel(panels.today)}
                        text="Сегодня">
                        <Icon28ArticleOutline/>
                    </TabbarItem>

                    <TabbarItem
                        selected={activeTimetablePanel === panels.tomorrow}
                        onClick={() => setActiveTimetablePanel(panels.tomorrow)}
                        text="Завтра">
                        <Icon28BillheadOutline/>
                    </TabbarItem>

                    <TabbarItem
                        selected={activeTimetablePanel === panels.week}
                        onClick={() => setActiveTimetablePanel(panels.week)}
                        text="Неделя">
                        <Icon28CalendarOutline/>
                    </TabbarItem>
                </Tabbar>

                {/*<Панели основного контента>*/}
                <View activePanel={activeTimetablePanel}>
                    <Panel id={panels.today}>
                        <OneDayTimetable json={db.getDay(db.days.today)}/>
                    </Panel>
                    <Panel id={panels.tomorrow}>
                        <OneDayTimetable json={db.getDay(db.days.tomorrow)}/>
                    </Panel>
                    <Panel id={panels.week}>
                        <DoubleWeekTimetable jsonCurrent={db.getWeek(db.weeks.currentWeek)}
                                             jsonOther={db.getWeek(db.weeks.otherWeek)}
                                             panelId={panels.doubleWeek}
                                             currId={panels.currentWeek}
                                             otherId={panels.otherWeek}/>
                    </Panel>
                </View>
            </Panel>
        </View>
    )
}
export default Timetable;
