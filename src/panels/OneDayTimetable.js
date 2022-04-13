import React from 'react';
import {Card, CardGrid, Cell, Group, Header, SimpleCell, Text} from "@vkontakte/vkui";

const OneDayTimetable = ({json}, ...props) => {
    return (
        <CardGrid size={'l'} {...props}>
            <Card mode={'shadow'}>
                <Header style={{marginLeft: '42px'}} mode={'tertiary'}>
                    {json.day}
                </Header>
                {
                    json.table.length !== 0 ?
                        json.table.map(x =>
                            <Cell disabled={true}
                                  before={
                                      <div style={{minWidth: '42px', textAlign:'center'}}>
                                          <Text weight={'medium'}>{x.start}</Text>
                                          <Text weight={'medium'}>{x.end}</Text>
                                      </div>
                                  }
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