import {Card, CardGrid, Cell, Header} from "@vkontakte/vkui";

const OneDayTimetable = ({json}, ...props) => {

    json = json ?? [];
    const hasPairs = json.length > 0;
    const header = json.day;

    return (
        <CardGrid size={'l'} {...props}>
            <Card mode={'shadow'}>
                <Header style={{marginLeft: '12px'}} mode={'tertiary'}>
                    {header}
                </Header>
                {
                    hasPairs ?
                        json.map(x =>
                            <Cell disabled={true}
                                  description={x.teacher}
                                  after={x.classroom}
                                  multiline={true}>
                                <div style={{display: 'block'}}>
                                    <div>
                                        {x.lesson}
                                    </div>

                                    <div aria-multiline={true} className={'time-container'}>
                                        <div>
                                            <div>
                                                {x.pair_start}
                                            </div>
                                            <div>
                                                –
                                            </div>
                                        </div>
                                        <div>
                                            {x.pair_end}
                                        </div>
                                    </div>
                                </div>

                            </Cell>
                        )
                        :
                        <Cell disabled={true}>
                            В этот день пар нет
                        </Cell>
                }
            </Card>
        </CardGrid>
    );
};
export default OneDayTimetable;