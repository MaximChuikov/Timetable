import React from 'react';
import {
    Counter,
    Panel,
    Tabs,
    TabsItem,
    View
} from "@vkontakte/vkui";
import OneDayTimetable from "./OneDayTimetable";

const DoubleWeekTimetable = ({panelId, currId, otherId, jsonCurrent, jsonOther, ...props}) => {
    const db = require('../../server/database');
    const [activeWeek, setActiveWeek] = React.useState(currId);
    const weeks = db.weeks;

    return (
        <Panel {...props} id={panelId}
               style={{paddingBottom: '16px'}}>
            <Tabs>
                <TabsItem
                    after={
                        <Counter mode={'primary'}>
                            {db.getWeekNumber(weeks.currentWeek)}
                        </Counter>
                    }
                    onClick={() => {
                        setActiveWeek(currId)
                    }}
                    selected={activeWeek === currId}
                >
                    Текущая неделя
                </TabsItem>
                <TabsItem
                    after={
                        <Counter mode={'primary'}>
                            {db.getWeekNumber(weeks.otherWeek)}
                        </Counter>
                    }
                    onClick={() => {
                        setActiveWeek(otherId)
                    }}
                    selected={activeWeek === otherId}
                >
                    Другая неделя
                </TabsItem>
            </Tabs>

            <View activePanel={activeWeek}
                  style={{paddingBottom: '48px'}}>
                <Panel id={currId}>
                    {jsonCurrent.map(x => <OneDayTimetable json={x}/>)}
                </Panel>

                <Panel id={otherId}>
                    {jsonOther.map(x => <OneDayTimetable json={x}/>)}
                </Panel>
            </View>
        </Panel>
    );
};
export default DoubleWeekTimetable;