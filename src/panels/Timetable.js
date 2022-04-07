import React from 'react';
import {
	Panel,
	PanelHeader,
	View,
	Tabbar,
	TabbarItem,
} from '@vkontakte/vkui';
import {
	Icon28ArticleOutline, Icon28BillheadOutline,
	Icon28CalendarOutline
} from '@vkontakte/icons';
import OneDayTimetable from "./OneDayTimetable";
import DoubleWeekTimetable from "./DoubleWeekTimetable";



const panels = {
	today: 'today',
	tomorrow: 'tomorrow',
	week: 'week',
};

const Timetable = () => {
	const [activeTimetablePanel, setActiveTimetablePanel] = React.useState(panels.today);
	const file = require('../server/database');
	const times = file.timesToGet;

	file.dummyBD(times.today);

	return(
		 <View activePanel={"main"}>
			 <Panel id={"main"}>

				 <PanelHeader>Расписание</PanelHeader>

				 {/*<Нижний таббар главной панели>*/}
				 <Tabbar>
					 <TabbarItem
						 selected={activeTimetablePanel === panels.today}
						 onClick={() => setActiveTimetablePanel(panels.today)}
						 text="Сегодня">
						 <Icon28ArticleOutline/>
					 </TabbarItem>

					 <TabbarItem
						 selected={activeTimetablePanel === panels.tomorrow}
						 onClick={() => setActiveTimetablePanel(panels.tomorrow)}
						 text="Завтра">
						 <Icon28BillheadOutline/>
					 </TabbarItem>

					 <TabbarItem
						 selected={activeTimetablePanel === panels.week}
						 onClick={() => setActiveTimetablePanel(panels.week)}
						 text="Неделя">
						 <Icon28CalendarOutline/>
					 </TabbarItem>
				 </Tabbar>

				 {/*<Панели основного контента>*/}
				 <View activePanel={activeTimetablePanel}>
					 <Panel id={panels.today}><OneDayTimetable time={times.today}/> </Panel>
					 <OneDayTimetable id={panels.tomorrow} time={times.tomorrow}/>
					 <DoubleWeekTimetable id={panels.week}/>
				 </View>
			 </Panel>
		 </View>
	)
}
export default Timetable;
