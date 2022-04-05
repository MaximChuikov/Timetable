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
	VKCOM, SplitLayout, Root, CellButton, Button, Text,

} from '@vkontakte/vkui';
import {
	Icon28CalendarOutline, Icon28MessageOutline, Icon28NewsfeedOutline, Icon28ServicesOutline,
	Icon28UserCircleOutline,
	Icon56NewsfeedOutline
} from '@vkontakte/icons';



const Timetable = () => {
	const [activeView, setActiveView] = React.useState("view1");
	return(
		<Epic activeStory={activeView}
		tabbar={
			<Tabbar style={{ position: "absolute", margin: "0 0 10px" }}>
				<TabbarItem
					selected={activeView === "view1"}
					onClick={() => setActiveView("view1")}
					text="Сегодня">
					<Icon28CalendarOutline />
				</TabbarItem>

				<TabbarItem
					selected={activeView === "view2"}
					onClick={() => setActiveView("view2")}
					text="Завтра">
					<Icon28CalendarOutline />
				</TabbarItem>
			</Tabbar>
		}>
			<View activePanel="panel1.1" id="view1">
				<Panel id="panel1.1">
					<PanelHeader>Сегодня</PanelHeader>
					<Text weight={"semibold"}>Чилим че</Text>
				</Panel>
			</View>
			<View header activePanel="panel2.1" id="view2">
				<Panel id="panel2.1">
					<PanelHeader>Завтра</PanelHeader>
					<Text weight={"semibold"}>Чилим че</Text>
				</Panel>
			</View>
		</Epic>
	)
}


// const queryParams = parseQueryString(window.location.search);
// const hashParams = parseQueryString(window.location.hash);
//
// function parseQueryString (string) {
// 	let a = string.slice(1).split('&')
// 		.map((queryParam) => {
// 			let kvp = queryParam.split('=');
// 			return {key: kvp[0], value: kvp[1]}
// 		})
// 		.reduce((query, kvp) => {
// 			query[kvp.key] = kvp.value;
// 			return query
// 		}, {})
// 	console.log(a);
// 	console.log(string);
// 	return a;
// };
//
// const Today = () => {
// 	return (
// 		<View activePanel="main">
// 			<Panel id="main">
// 				<PanelHeader>Launch params</PanelHeader>
// 				<Group title="Query params">
// 					<List>
// 						{Object.keys(queryParams).map((key) => {
// 							let value = queryParams[key];
// 							return <Cell description={key}>{value ? value :
// 								<span style={{color: 'red'}}>-</span>}</Cell>;
// 						})}
// 					</List>
// 				</Group>
//
// 				<Group title="Hash params">
// 					<List>
// 						{Object.keys(hashParams).map((key) => {
// 							let value = hashParams[key];
// 							return <Cell description={key}>{value ? value :
// 								<span style={{color: 'red'}}>-</span>}</Cell>;
// 						})}
// 					</List>
// 				</Group>
// 			</Panel>
// 		</View>
// 	);

export default Timetable;
