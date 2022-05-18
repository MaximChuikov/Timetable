import axios from "axios";
const url = "https://maximchuikov.demlovesky.ru/api/";

function studentExists(vk_id){
    console.log(url + "studentExists/" + vk_id)
    return axios.get(url + "studentExists/" + vk_id).then(res => res.data.student_exists).catch(e => console.log(e));
}
function getToday(vk_id) {
    console.log(url + "getToday/" + vk_id);
    return axios.get(url + "getToday/" + vk_id).then((res) => res.data).catch((e) => console.log(e));
}
function getTomorrow(vk_id){
    return axios.get(url + "getTomorrow/" + vk_id).then((res) => res.data).catch((e) => console.log(e));
}
function getTimetable(vk_id){
    return axios.get(url + "getTimetable/" + vk_id).then((res) => res.data).catch((e) => console.log(e));
}
function createUser(vk_id, subgroup_id){
    console.log(`${url}createStudent/${vk_id}&${subgroup_id}`);
    axios.get(`${url}createStudent/${vk_id}&${subgroup_id}`).then(r => console.log(r));
}
function getFaculties(){
    return axios.get(url + "getFaculties").then(res => res.data).catch(e => console.log(e));
}
function getGroups(faculty_id, course){
    return axios.get(`${url}getGroups/${faculty_id}&${course}`).then(res => res.data).catch(e => console.log(e));
}
function getSubgroups(group_id){
    return axios.get(url + "getSubgroups/" + group_id).then(res => res.data).catch(e => console.log(e));
}

export {
    getToday,
    getTomorrow,
    createUser,
    studentExists,
    getFaculties,
    getGroups,
    getSubgroups,
    getTimetable
}