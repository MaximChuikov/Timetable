import timeTable from './Weeks.json';

const timesToGet = {
    today: "Today",
    tomorrow: "Tomorrow",
    currentWeek: "CurrentWeek",
    otherWeek: "OtherWeek"
}

const getWeekTable = (week) => week == 1 ? timeTable.firstWeek : timeTable.secondWeek;
const weekAfter = (day) => Math.floor(((day - 4) / 7 + new Date().getTime() / 604800000) % 2);
const getWeekNumber = (week) => week == timesToGet.currentWeek ? weekAfter(0) + 1 : weekAfter(7) + 1;

function dummyBD(time){
    const dayFromSunday = new Date().getDay();
    const todayFromMonday = dayFromSunday - 1 == -1 ? 6 : dayFromSunday - 1;

    switch (time){
        case timesToGet.today:
            return getWeekTable(weekAfter(0))[todayFromMonday];
        case timesToGet.tomorrow:
            return getWeekTable(weekAfter(1))[(todayFromMonday + 1) % 7];
        case timesToGet.currentWeek:
            return getWeekTable(weekAfter(0));
        case timesToGet.otherWeek:
            return getWeekTable(weekAfter(7));
        default:
            console.log("Error in switch at \"" + time + "\" value");
            return getWeekTable(weekAfter(0))[todayFromMonday];
    }
}
export {
    dummyBD,
    getWeekNumber,
    timesToGet
}