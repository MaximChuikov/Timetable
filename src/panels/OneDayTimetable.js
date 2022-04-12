import React from 'react';
import {Card, CardGrid, Cell, Header, SimpleCell} from "@vkontakte/vkui";

const OneDayTimetable = ({json}, ...props) => {
    return (
        <CardGrid size={'l'} {...props}>
            <Card mode={'shadow'}>
                <Header style={{marginLeft: '40.63px'}} mode={'tertiary'}>
                    {json.day}
                </Header>
                {
                    json.table.length !== 0 ?
                        json.table.map(x =>
                            <Cell disabled={true}
                                  before={<SimpleCell disabled={true}>{x.pair}</SimpleCell>}
                                  description={x.teacher}
                                  after={x.classroom}
                                  multiline={true}>
                                {x.lesson}
                            </Cell>)
                        :
                        <Cell style={{paddingLeft: '40.63px'}}
                              disabled={true}>
                            В этот день пар нет
                        </Cell>
                }
            </Card>
        </CardGrid>
    );
};
export default OneDayTimetable;