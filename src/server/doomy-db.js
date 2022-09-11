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

function todayWeek() {
    const week = Math.floor(((7 - 4) / 7 + new Date().getTime() / 604800000) % 2) + 1;
    return week === 1 ? "firstWeek" : week === 2 ? "secondWeek" : ""
}

function tomorrowWeek() {
    const week =  Math.floor(((8 - 4) / 7 + new Date().getTime() / 604800000) % 2) + 1;
    return week === 1 ? "firstWeek" : week === 2 ? "secondWeek" : ""
}

function today() {
    return new Date().getDay() === 0 ? 7 : new Date().getDay();
}

function tomorrow() {
    return new Date().getDay() === 0 ? 1 : new Date().getDay() + 1;
}

function getDay(day){
    switch (day){
        case days.today:
            return timeTable[todayWeek()][today()]
        case days.tomorrow:
            return timeTable[tomorrowWeek()][tomorrow()]
    }
}

function getWeek(){
    return timeTable
}
export {
    days,
    weeks,
    getDay,
    getWeek
}