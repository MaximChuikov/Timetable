import OneDayTimetable from "./DayTimetableRenderers/OneDayTimetable";
import DoubleWeekTimetable from "./DayTimetableRenderers/DoubleWeekTimetable";
import {Icon28ArrowRightSquareOutline, Icon28ArticleOutline, Icon28CalendarOutline} from "@vkontakte/icons";
import {
    Cell,
    Epic,
    Group,
    Header,
    PanelHeader,
    SplitCol,
    usePlatform,
    ViewWidth,
    VKCOM,
    withAdaptivity
} from "@vkontakte/vkui";

const {Panel, Tabbar, TabbarItem, View, ScreenSpinner, SplitLayout} = require("@vkontakte/vkui");
const db = require('../server/database');
const React = require("react");
const {useState, useEffect} = require("react");

const TimetableRenderer = ({vk_id, viewWidth}) => {

    const TODAY_PANEL = 'today_panel';
    const TOMORROW_PANEL = 'tomorrow_panel';
    const WEEK_PANEL = 'week_panel';

    const spinner = <ScreenSpinner size='medium'/>;
    const [popout, setPopout] = useState(spinner);



    const [todayArr, setTodayArr] = useState();
    const [tomorrowArr, setTomorrowArr] = useState();
    const [weeksArr, setWeeksArr] = useState();

    const [activeStory, setActiveStory] = useState(TODAY_PANEL);

    const isDesktop = viewWidth >= ViewWidth.TABLET;
    const hasHeader = usePlatform() !== VKCOM;

    const onStoryChange = (e) => {
        const causingStory = e.currentTarget.dataset.story;
        switch (causingStory) {
            case TOMORROW_PANEL:
                if (tomorrowArr === undefined)
                    fetchTomorrow().then(r => r);
                break
            case WEEK_PANEL:
                if (weeksArr === undefined)
                    fetchTwoWeeks().then(r => r);
                break;
        }
        setActiveStory(causingStory);
    }


    async function fetchToday() {
        setPopout(spinner);
        const today = await db.getToday(vk_id);
        setTodayArr(today);
        console.log("Сегодня", today);
        setPopout(null);
    }

    useEffect(() => {
        fetchToday().then(r => r);
    }, []);

    async function fetchTomorrow() {
        setPopout(spinner);
        const tomorrow = await db.getTomorrow(vk_id);
        setTomorrowArr(tomorrow);
        console.log("Завтра", tomorrow);
        setPopout(null);
    }

    async function fetchTwoWeeks() {
        setPopout(spinner);
        const weeks = await db.getTimetable(vk_id);
        setWeeksArr(weeks);
        console.log("Недели", weeks);
        setPopout(null);
    }

    return (
        <SplitLayout
            popout={popout}
            header={hasHeader && <PanelHeader separator={false}/>}
            style={{justifyContent: "center"}}
        >
            {isDesktop && (
                <SplitCol fixed width={280} maxWidth={280}>
                    <Panel>
                        {hasHeader && <PanelHeader/>}
                        <Group>
                            <Cell
                                disabled={activeStory === TODAY_PANEL}
                                style={
                                    activeStory === TODAY_PANEL
                                        ? {
                                            backgroundColor: "var(--button_secondary_background)",
                                            borderRadius: 8,
                                        }
                                        : {}
                                }
                                data-story={TODAY_PANEL}
                                onClick={onStoryChange}
                                before={<Icon28ArticleOutline/>}
                            >
                                Сегодня
                            </Cell>
                            <Cell
                                disabled={activeStory === TOMORROW_PANEL}
                                style={
                                    activeStory === TOMORROW_PANEL
                                        ? {
                                            backgroundColor: "var(--button_secondary_background)",
                                            borderRadius: 8,
                                        }
                                        : {}
                                }
                                data-story={TOMORROW_PANEL}
                                onClick={onStoryChange}
                                before={<Icon28ArrowRightSquareOutline/>}
                            >
                                Завтра
                            </Cell>
                            <Cell
                                disabled={activeStory === WEEK_PANEL}
                                style={
                                    activeStory === WEEK_PANEL
                                        ? {
                                            backgroundColor: "var(--button_secondary_background)",
                                            borderRadius: 8,
                                        }
                                        : {}
                                }
                                data-story={WEEK_PANEL}
                                onClick={onStoryChange}
                                before={<Icon28CalendarOutline/>}
                            >
                                Неделя
                            </Cell>
                        </Group>
                    </Panel>
                </SplitCol>
            )}

            <SplitCol
                animate={!isDesktop}
                spaced={isDesktop}
                width={isDesktop ? "560px" : "100%"}
                maxWidth={isDesktop ? "560px" : "100%"}
            >
                <Epic
                    activeStory={activeStory}
                    tabbar={
                        !isDesktop && (
                            <Tabbar>
                                <TabbarItem
                                    onClick={onStoryChange}
                                    selected={activeStory === TODAY_PANEL}
                                    data-story={TODAY_PANEL}
                                    text="Сегодня"
                                >
                                    <Icon28ArticleOutline/>
                                </TabbarItem>
                                <TabbarItem
                                    onClick={onStoryChange}
                                    selected={activeStory === TOMORROW_PANEL}
                                    data-story={TOMORROW_PANEL}
                                    text="Завтра"
                                >
                                    <Icon28ArrowRightSquareOutline/>
                                </TabbarItem>
                                <TabbarItem
                                    onClick={onStoryChange}
                                    selected={activeStory === WEEK_PANEL}
                                    data-story={WEEK_PANEL}
                                    text="Неделя"
                                >
                                    <Icon28CalendarOutline/>
                                </TabbarItem>
                            </Tabbar>
                        )
                    }
                >
                    <View id={TODAY_PANEL}
                          activePanel="feed"
                          popout={popout}>
                        <Panel id="feed">
                            <PanelHeader separator={false}>Расписание</PanelHeader>
                            {
                                todayArr === undefined ? <div/> : <OneDayTimetable json={todayArr}/>
                            }
                        </Panel>
                    </View>

                    <View id={TOMORROW_PANEL}
                          activePanel="services"
                          popout={popout}>
                        <Panel id="services">
                            {
                                tomorrowArr === undefined ? <div/> : <OneDayTimetable json={tomorrowArr}/>
                            }
                        </Panel>
                    </View>

                    <View id={WEEK_PANEL}
                          activePanel="services"
                          popout={popout}>
                        <Panel id="services">
                            {
                                weeksArr === undefined ? <div/> :
                                    <DoubleWeekTimetable otherId={"otherWeek"}
                                                         currId={"currentWeek"}
                                                         panelId={"weeksPanel"}
                                                         json={weeksArr}/>
                            }
                        </Panel>
                    </View>
                </Epic>
            </SplitCol>
        </SplitLayout>
    );
}
export default TimetableRenderer;