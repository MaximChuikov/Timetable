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
    /*
        The response looks like:
        {
            "1": [
                {}, [], [], {}, {}, [], {}
            ]
            "2": [
                {}, [], [], {}, {}, [], {}
            ]
        }
        Where [] - array of day lessons, {} - day name if lessons none
     */
    return (
        <Panel {...props} id={panelId}>
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

            <View activePanel={activeWeek}>
                <Panel id={currId}>
                    {json["1"].map(x => <OneDayTimetable json={x}/>)}
                </Panel>

                <Panel id={otherId}>
                    {json["2"].map(x => <OneDayTimetable json={x}/>)}
                </Panel>
            </View>
        </Panel>
    );
};
export default DoubleWeekTimetable;