import axios from "axios";

const url = "http://localhost:8080/api/";
const vkid = "222";


const days = {
    today: "Today",
    tomorrow: "Tomorrow",
}
const weeks = {
    currentWeek: "CurrentWeek",
    otherWeek: "OtherWeek"
}

const getWeekNumber = (week) => week == weeks.currentWeek ? weekAfter(0) + 1 : weekAfter(7) + 1;

async function getDay(day) {
    switch (day) {
        case days.today:
            await axios.get(url + "getTodayTimetable/" + vkid).then((res) => {
                console.log(url + "getTodayTimetable/" + vkid, res.data);
                return res.data;
            }).catch((e) => {
                console.error("ОШИБКА АКСИУС", e);
            })
            return null;
        case days.tomorrow:
            await axios.get(url + "getTomorrowTimetable/" + vkid).then((res) => {
                return res.data;
            }).catch((e) => {
                console.error("ОШИБКА АКСИУС", e);
            })
            return null;
        default:
            console.log("Error in switch getDAY with \"" + day + "\" value");
            return null;
    }
}

function getWeek(week) {
    switch (week) {
        case weeks.currentWeek:
            axios.get(url + "getCurrentWeekTimetable/" + vkid).then((res) => {
                return res.data;
            }).catch((e) => {
                console.error("ОШИБКА АКСИУС", e);
                return null;
            })
        case weeks.otherWeek:
            axios.get(url + "getOtherWeekTimetable/" + vkid).then((res) => {
                return res.data;
            }).catch((e) => {
                console.error("ОШИБКА АКСИУС", e);
                return null;
            })

        default:
            console.log("Error in switch getWeek with \"" + week + "\" value");
            return null;
    }
}

export {
    days,
    weeks,
    getWeekNumber,
    getDay,
    getWeek
}