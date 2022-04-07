import React from 'react';
import {
    Badge,
    Cell,
    Counter,
    Group,
    Header,
    Panel,
    SimpleCell,
    Tabs,
    TabsItem,
    Text,
    Textarea,
    View
} from "@vkontakte/vkui";
import OneDayTimetable from "./OneDayTimetable";
import database from "../server/database";

const week = {
    current: "currentWeek",
    other: "otherWeek"
}


const DoubleWeekTimetable = ({id, ...props}) => {
    const database = require('../server/database');
    const [activeWeek, setActiveWeek] = React.useState(week.current);
    const times = database.timesToGet;

    const current = database.getWeekNumber(times.currentWeek);
    const other = database.getWeekNumber(times.otherWeek);
    console.log(current, other);
    return(
        <Panel {...props} id={id}>
            <Tabs>
                <TabsItem
                    after={<Counter mode={'primary'}>{current}</Counter>}
                    onClick={() => {setActiveWeek(week.current)}}
                    selected={activeWeek === week.current}
                >
                    Текущая неделя
                </TabsItem>
                <TabsItem
                    after={<Counter mode={'primary'}>{other}</Counter>}
                    onClick={() => {setActiveWeek(week.other)}}
                    selected={activeWeek === week.other}
                >
                    Другая неделя
                </TabsItem>
            </Tabs>

            <View activePanel={activeWeek}>
                <Panel id={week.current}>
                    {database.dummyBD(times.currentWeek).map(x => <OneDayTimetable json={x}/>)}
                </Panel>

                <Panel id={week.other}>
                    {database.dummyBD(times.otherWeek).map(x => <OneDayTimetable json={x}/>)}
                </Panel>
            </View>
        </Panel>
    );
};
export default DoubleWeekTimetable;