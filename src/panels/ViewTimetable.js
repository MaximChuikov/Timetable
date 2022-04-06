import React from 'react';
import {Cell, Group, Header, Panel, SimpleCell, Text, Textarea, View} from "@vkontakte/vkui";

const database = require('../server/database');



const ViewTimetable = ({time, panelId, ...props}) => {
    const arr = database.dummyBD(time);
    return(
        <View {...props}>
            <Panel>
                <h1>Расписание</h1>
                <Group>
                    {arr.map(x =>
                        <SimpleCell before={x.pair} description={x.teacher}>
                            {x.lesson}
                        </SimpleCell>
                    )}
                </Group>
            </Panel>
        </View>
    );
};
export default ViewTimetable;