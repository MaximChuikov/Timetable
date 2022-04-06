import React from 'react';
import {Group, Header, Panel, PanelHeader, Text, View} from "@vkontakte/vkui";

const database = require('../server/database');

const ViewTimetable = ({time, ...props}) => {
    const arr = database.dummyBD(time);
    return(
        <View {...props}>
            <h3>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab, ad aliquam atque cumque cupiditate deleniti dignissimos dolore doloribus, eaque fuga itaque laudantium magnam neque provident quam qui repellendus tempore ullam.</h3>
        </View>
    );
};
export default ViewTimetable;