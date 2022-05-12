import React from 'react';
import {
    Counter, List,
    Panel,
    Tabs,
    TabsItem,
    View
} from "@vkontakte/vkui";
import OneDayTimetable from "./OneDayTimetable";

const DoubleWeekTimetable = ({panelId, currId, otherId, json, ...props}) => {
    const [activeWeek, setActiveWeek] = React.useState(currId);

    console.log("raw", json)
    const groupByWeek =
        json.reduce((group, product) => {
            const { week } = product;
            group[week] = group[week] ?? [];
            group[week].push(product);
            return group;
        }, {});
    console.log("week", groupByWeek);

    const groupByDay = (arr) => arr.reduce((group, product) => {
        const { day_number } = product;
        group[day_number] = group[day_number] ?? [];
        group[day_number].push(product);
        return group;
    }, {});

    const groupByWeekDay1 = groupByDay(groupByWeek["1"]);
    const groupByWeekDay2 = groupByDay(groupByWeek["2"]);

    const collectToArr = (instance) => {
        const list = [7];
        for (let i = 1; i <= 7; i++)
            list[i - 1] = instance[i.toString()];
        return list;
    }
    const coll1 = collectToArr(groupByWeekDay1);
    const coll2 = collectToArr(groupByWeekDay2);
    console.log("2 списка", coll1, coll2);


    return (
        <Panel {...props} id={panelId}
               style={{paddingBottom: '16px'}}>
            <Tabs>
                <TabsItem
                    onClick={() => setActiveWeek(currId)}
                    selected={activeWeek === currId}
                >Первая неделя</TabsItem>
                <TabsItem
                    onClick={() => setActiveWeek(otherId)}
                    selected={activeWeek === otherId}
                >Вторая неделя</TabsItem>
            </Tabs>

            <View activePanel={activeWeek}
                  style={{paddingBottom: '48px'}}>
                <Panel id={currId}>
                    {coll1.map(x => <OneDayTimetable json={x === undefined ? [] : x}/>)}
                </Panel>

                <Panel id={otherId}>
                    {coll2.map(x => <OneDayTimetable json={x === undefined ? [] : x}/>)}
                </Panel>
            </View>
        </Panel>
    );
};
export default DoubleWeekTimetable;