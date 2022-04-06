import timeTable from './Weeks.json';

const toGive = {
    today: "Today",
    tomorrow: "Tomorrow",
    week: "Week",
}

const getWeekTable = (week) => week == 1 ? timeTable.firstWeek : timeTable.secondWeek;
const weekAfter = (day) => Math.floor(((day - 4) / 7 + new Date().getTime() / 604800000) % 2);

function dummyBD(time){
    const dayFromSunday = new Date().getDay();
    const todayFromMonday = dayFromSunday - 1 == -1 ? 6 : dayFromSunday - 1;

    switch (time){
        case toGive.today:
            return getWeekTable(weekAfter(0))[todayFromMonday];
        case toGive.tomorrow:
            return getWeekTable(weekAfter(1))[(todayFromMonday + 1) % 7];
        case toGive.week:
            return getWeekTable(weekAfter(0));
        default:
            console.log("Error in switch at \"" + time + "\" value");
            return getWeekTable(weekAfter(0))[todayFromMonday];
    }
}
export {
    dummyBD,
    toGive
}