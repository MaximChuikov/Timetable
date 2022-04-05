import React, { useState, useEffect } from 'react';
import bridge from '@vkontakte/vk-bridge';
import { View, ScreenSpinner, AdaptivityProvider, AppRoot } from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';
import Today from './panels/Timetable';

const App = () => {
	return (
		<AdaptivityProvider>
			<AppRoot>
				<View>
					<Today/>
				</View>
			</AppRoot>
		</AdaptivityProvider>
	);
}

export default App;
