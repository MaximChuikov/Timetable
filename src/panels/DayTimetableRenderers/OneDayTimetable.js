import {Card, CardGrid, Cell, Header, Text} from "@vkontakte/vkui";

const OneDayTimetable = ({json}, ...props) => {
    return (
        <CardGrid size={'l'} {...props}>
            <Card mode={'shadow'}>
                <Header style={{marginLeft: '42px'}} mode={'tertiary'}>
                    {json.length == 0 ? 'День' : json[0].day_of_week}
                </Header>
                {
                    json.length !== 0 ?
                        json.map(x =>
                            <Cell disabled={true}
                                  before={
                                      <div style={{minWidth: '42px', textAlign:'center'}}>
                                          <Text weight={'medium'}>{x.pair_start}</Text>
                                          <Text weight={'medium'}>{x.pair_end}</Text>
                                      </div>
                                  }
                                  description={x.lecturer}
                                  after={x.cabinet}
                                  multiline={true}>
                                {x.subject_name}
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