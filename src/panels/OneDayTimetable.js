import React from 'react';
import {Card, CardGrid, Cell, SimpleCell} from "@vkontakte/vkui";

const database = require('../server/database');

const OneDayTimetable = ({time = null, json = null}) => {
    const arr = json == null ? database.dummyBD(time) : json;
    return(
        <CardGrid size={'l'}>
            <Card mode={'shadow'}>

                    {arr.map(x =>
                        <Cell
                            before={<SimpleCell>{x.pair}</SimpleCell>}
                            description={x.teacher}
                            after={x.classroom}>
                            {x.lesson}
                        </Cell>
                    )}

            </Card>
        </CardGrid>
    );
};
export default OneDayTimetable;