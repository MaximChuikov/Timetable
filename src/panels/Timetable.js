import React from 'react';
import {
	Panel,
	PanelHeader,
	Group,
	Cell,
	View,
	Epic,
	Tabbar,
	TabbarItem,
	SplitCol,
	Placeholder,
	PanelHeaderBack,
	withAdaptivity,
	usePlatform,
	ViewWidth,
	VKCOM, SplitLayout, Root, CellButton, Button, Text, Header,

} from '@vkontakte/vkui';
import {
	Icon28CalendarOutline, Icon28MessageOutline, Icon28NewsfeedOutline, Icon28ServicesOutline,
	Icon28UserCircleOutline,
	Icon56NewsfeedOutline
} from '@vkontakte/icons';
import ViewTimetable from "./ViewTimetable";



const panels = {
	today: 'today',
	tomorrow: 'tomorrow',
	week: 'week',
};

const Timetable = () => {
	const [activeView, setActiveView] = React.useState(panels.today);
	const file = require('../server/database');
	const times = file.toGive;

	file.dummyBD(times.today);

	return(
		 <Epic activeStory={activeView}
		 tabbar={
		 	<Tabbar>
		 		<TabbarItem
		 			selected={activeView === panels.today}
		 			onClick={() => setActiveView(panels.today)}
		 			text="Сегодня">
		 			<Icon28CalendarOutline />
		 		</TabbarItem>

		 		<TabbarItem
		 			selected={activeView === panels.tomorrow}
		 			onClick={() => setActiveView(panels.tomorrow)}
		 			text="Завтра">
		 			<Icon28CalendarOutline />
		 		</TabbarItem>

		 		<TabbarItem
		 			selected={activeView === panels.week}
		 			onClick={() => setActiveView(panels.week)}
		 			text="Неделя">
		 			<Icon28CalendarOutline />
		 		</TabbarItem>
		 	</Tabbar>
		 }>
		 	<Header>Расписание</Header>
		 	<ViewTimetable id={panels.today} time={times.today}/>
		 	<ViewTimetable id={panels.tomorrow} time={times.tomorrow}/>
		 	<ViewTimetable id={panels.week} time={times.week}/>
		</Epic>
	)
}
export default Timetable;
