const bells = require('./bells.json')
const timeTable = require('./Weeks.json')

const daysOfWeek = [
    'Понедельник',
    'Вторник',
    'Среда',
    'Четверг',
    'Пятница',
    'Суббота',
    'Воскресенье'
]
let i = 0
timeTable.firstWeek.map(day => {
    day.day = daysOfWeek[i++]
    day.map(pair => {
        pair.pair_start = bells.bells[pair.pair - 1].start
        pair.pair_end = bells.bells[pair.pair - 1].end
    })
})
i = 0
timeTable.secondWeek.map(day => {
    day.day = daysOfWeek[i++]
    day.map(pair => {
        pair.pair_start = bells.bells[pair.pair - 1].start
        pair.pair_end = bells.bells[pair.pair - 1].end
    })
})

const days = {
    today: "Today",
    tomorrow: "Tomorrow",
}
const weeks = {
    currentWeek: "CurrentWeek",
    otherWeek: "OtherWeek"
}



const getWeekTable = (week) => week == 1 ? timeTable.firstWeek : timeTable.secondWeek;
const weekAfter = (day) => Math.floor(((day + 3) / 7 + new Date().getTime() / 604800000) % 2);
const getWeekNumber = (week) => week == weeks.currentWeek ? weekAfter(0) + 1 : weekAfter(7) + 1;

function todayDay (){
    const dayFromSunday = new Date().getDay();
    return dayFromSunday - 1 === -1 ? 6 : dayFromSunday - 1;
}

function getDay(day){
    switch (day){
        case days.today:
            return getWeekTable(weekAfter(0))[todayDay()]
        case days.tomorrow:
            return getWeekTable(weekAfter(1))[(todayDay() + 1) % 7]
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

function getWeek(){
    return timeTable
    // switch (week){
    //     case weeks.currentWeek:
    //         return mergeWeekDays(getWeekTable(weekAfter(0)));
    //     case weeks.otherWeek:
    //         return mergeWeekDays(getWeekTable(weekAfter(7)));
    //
    //     default:
    //         console.log("Error in switch getWeek with \"" + week + "\" value");
    //         return mergeWeekDays(getWeekTable(weekAfter(0)));
    // }
}
export {
    days,
    weeks,
    getWeekNumber,
    getDay,
    getWeek
}