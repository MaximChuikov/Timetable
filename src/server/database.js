import timeTable from './Weeks.json';

const days = {
    today: "Today",
    tomorrow: "Tomorrow",
}
const weeks = {
    currentWeek: "CurrentWeek",
    otherWeek: "OtherWeek"
}

const daysOfWeek = [
    'Понедельник',
    'Вторник',
    'Среда',
    'Четверг',
    'Пятница',
    'Суббота',
    'Воскресенье'
]

const getWeekTable = (week) => week == 1 ? timeTable.firstWeek : timeTable.secondWeek;
const weekAfter = (day) => Math.floor(((day + 3) / 7 + new Date().getTime() / 604800000) % 2);
const getWeekNumber = (week) => week == weeks.currentWeek ? weekAfter(0) + 1 : weekAfter(7) + 1;

function todayDay (){
    const dayFromSunday = new Date().getDay();
    return dayFromSunday - 1 == -1 ? 6 : dayFromSunday - 1;
}

function getDay(day){
    switch (day){
        case days.today:
            return {
                table: getWeekTable(weekAfter(0))[todayDay()],
                day: daysOfWeek[todayDay()]
            };
        case days.tomorrow:
            return {
                table: getWeekTable(weekAfter(1))[(todayDay() + 1) % 7],
                day: daysOfWeek[(todayDay() + 1) % 7]
            };

        default:
            console.log("Error in switch getDAY with \"" + day + "\" value");
            return getWeekTable(weekAfter(0))[todayDay()];
    }
}

function mergeWeekDays(weekTable){
    const arr = [daysOfWeek.length];
    for (let i = 0; i < daysOfWeek.length; i++){
        arr[i] = {
            table: weekTable[i],
            day: daysOfWeek[i]
        }
    }
    return arr;
}

function getWeek(week){
    switch (week){
        case weeks.currentWeek:
            return mergeWeekDays(getWeekTable(weekAfter(0)));
        case weeks.otherWeek:
            return mergeWeekDays(getWeekTable(weekAfter(7)));

        default:
            console.log("Error in switch getWeek with \"" + week + "\" value");
            return mergeWeekDays(getWeekTable(weekAfter(0)));
    }
}
export {
    days,
    weeks,
    getWeekNumber,
    getDay,
    getWeek
}