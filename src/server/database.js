import axios from "axios";
const url = "https://maximchuikov.demlovesky.ru/api/";

async function getToday(vk_id) {
    await axios.get(url + "getToday/" + vk_id).then((res) => {
        return res.data;
    }).catch((e) => {
        console.error("ОШИБКА АКСИУС", e);
    })
    return null;
}
async function getTomorrow(vk_id){
    await axios.get(url + "getDay/" + vk_id+'&1&4').then((res) => {
        return res.data;
    }).catch((e) => {
        console.error("ОШИБКА АКСИУС", e);
    })
    return null;
}
async function createUser(vk_id, subgroup_id){
    axios.post(`${url}createStudent/${vk_id}&${subgroup_id}`).then(r => console.log(r));
}
function studentExists(vk_id){
    return axios.get(url + "studentExists/" + vk_id).then(res => res.data.student_exists).catch(e => console.log(e));
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
    getSubgroups
}