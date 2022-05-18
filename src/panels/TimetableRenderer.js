import OneDayTimetable from "./DayTimetableRenderers/OneDayTimetable";
import DoubleWeekTimetable from "./DayTimetableRenderers/DoubleWeekTimetable";
import {ScreenSpinner, SplitLayout} from "@vkontakte/vkui";
import {Icon28ArrowRightSquareOutline, Icon28ArticleOutline} from "@vkontakte/icons";

const {Panel, Tabbar, TabbarItem, View} = require("@vkontakte/vkui");
const {Icon28CalendarOutline} = require("@vkontakte/icons");
const db = require('../server/database');
const React = require("react");
const {useState, useEffect} = require("react");

const TimetableRenderer = ({vk_id}) => {

    const TODAY_PANEL = 'today_panel';
    const TOMORROW_PANEL = 'tomorrow_panel';
    const WEEK_PANEL = 'week_panel';

    const [activePanel, setActivePanel] = useState(TODAY_PANEL);
    const spinner = <ScreenSpinner size='medium'/>;
    const [popout, setPopout] = useState(spinner);

    const [todayArr, setTodayArr] = useState();
    const [tomorrowArr, setTomorrowArr] = useState();
    const [weeksArr, setWeeksArr] = useState();

    async function fetchToday(){
        setPopout(spinner);
        const today = await db.getToday(vk_id);
        setTodayArr(today);
        console.log("Сегодня", today);
        setPopout(null);
    }
    useEffect(() => {
        fetchToday().then(r => r);
    }, []);

    async function fetchTomorrow(){
        setPopout(spinner);
        const tomorrow = await db.getTomorrow(vk_id);
        setTomorrowArr(tomorrow);
        console.log("Завтра", tomorrow);
        setPopout(null);
    }

    async function fetchTwoWeeks(){
        setPopout(spinner);
        const weeks = await db.getTimetable(vk_id);
        setWeeksArr(weeks);
        console.log("Недели", weeks);
        setPopout(null);
    }

    return(
        <div>
            {/*Нижний таббар*/}
            <Tabbar>
                <TabbarItem
                    selected={activePanel === TODAY_PANEL}
                    onClick={() => setActivePanel(TODAY_PANEL)}
                    text="Сегодня">
                    <Icon28ArticleOutline/>
                </TabbarItem>

                <TabbarItem
                    selected={activePanel === TOMORROW_PANEL}
                    onClick={() => {
                        if (tomorrowArr === undefined)
                            fetchTomorrow().then(r => r);
                        setActivePanel(TOMORROW_PANEL)
                    }}
                    text="Завтра">
                    <Icon28ArrowRightSquareOutline/>
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
            <SplitLayout popout={popout}>

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

            </SplitLayout>
        </div>
    )
}
export default TimetableRenderer;