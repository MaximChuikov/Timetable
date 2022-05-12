import OneDayTimetable from "./DayTimetableRenderers/OneDayTimetable";
import DoubleWeekTimetable from "./DayTimetableRenderers/DoubleWeekTimetable";

const {Panel, PanelHeader, Tabbar, TabbarItem, View} = require("@vkontakte/vkui");
const {Icon28CalendarOutline} = require("@vkontakte/icons");
const db = require('../server/database');
const React = require("react");
const {useState, useEffect} = require("react");

const TimetableRenderer = ({vk_id}) => {

    const TODAY_PANEL = 'today_panel';
    const TOMORROW_PANEL = 'tomorrow_panel';
    const WEEK_PANEL = 'week_panel';

    const [activePanel, setActivePanel] = useState(TODAY_PANEL);
    const [popout, setPopout] = useState();

    const [todayArr, setTodayArr] = useState();
    const [tomorrowArr, setTomorrowArr] = useState();
    const [weeksArr, setWeeksArr] = useState();

    async function fetchToday(){
        const today = await db.getToday(vk_id);
        setTodayArr(today);
        console.log("Сегодня", today);
    }
    useEffect(() => {
        fetchToday().then(r => r);
    }, []);

    async function fetchTomorrow(){
        const tomorrow = await db.getTomorrow(vk_id);
        setTomorrowArr(tomorrow);
        console.log("Завтра", tomorrow);
    }

    async function fetchTwoWeeks(){
        const weeks = await db.getTimetable(vk_id);
        setWeeksArr(weeks);
        console.log("Недели", weeks);
    }

    return(
        <div>
            {/*Нижний таббар*/}
            <Tabbar>
                <TabbarItem
                    selected={activePanel === TODAY_PANEL}
                    onClick={() => setActivePanel(TODAY_PANEL)}
                    text="Сегодня">
                    <Icon28CalendarOutline />
                </TabbarItem>

                <TabbarItem
                    selected={activePanel === TOMORROW_PANEL}
                    onClick={() => {
                        if (tomorrowArr === undefined)
                            fetchTomorrow().then(r => r);
                        setActivePanel(TOMORROW_PANEL)
                    }}
                    text="Завтра">
                    <Icon28CalendarOutline />
                </TabbarItem>

                <TabbarItem
                    selected={activePanel === WEEK_PANEL}
                    onClick={() => {
                        if (weeksArr === undefined)
                            fetchTwoWeeks().then(r => r);
                        setActivePanel(WEEK_PANEL)
                    }}
                    text="Неделя">
                    <Icon28CalendarOutline />
                </TabbarItem>
            </Tabbar>

            {/*<Панели основного контента>*/}
            <View activePanel={activePanel}>
                <Panel id={TODAY_PANEL}>
                    {
                        todayArr === undefined ? <div/> : <OneDayTimetable json={todayArr}/>
                    }
                </Panel>

                <Panel id={TOMORROW_PANEL}>
                    {
                        tomorrowArr === undefined ? <div/> : <OneDayTimetable json={tomorrowArr}/>
                    }
                </Panel>

                <Panel id={WEEK_PANEL}>
                    {
                        weeksArr === undefined ? <div/> :
                            <DoubleWeekTimetable otherId={"otherWeek"}
                                                 currId={"currentWeek"}
                                                 panelId={"weeksPanel"}
                                                 json={weeksArr}/>
                    }
                </Panel>
            </View>
        </div>
    )
}
export default TimetableRenderer;