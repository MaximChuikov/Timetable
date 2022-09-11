import {
    Button,
    FormItem,
    Group, Panel, PanelHeader, PanelHeaderBack,
    Select,
} from "@vkontakte/vkui";
import {useEffect, useState} from "react";

const selectedItems = {
    facultyId: 0, groupId: 0, subgroupId: 0, course: 0
}

const db = require('../server/database');

const Settings = ({vk_id, haveBackButton, exitFunc, ...props}) => {

    const [faculties, setFaculties] = useState([{label: '', value: 1}]);
    const [groups, setGroups] = useState([{label: '', value: 1}]);
    const [subgroups, setSubgroups] = useState([{label: '', value: 1}]);

    const [facultiesFetched, setFacultiesFetched] = useState(false);
    const [groupsFetched, setGroupsFetched] = useState(false);
    const [subgroupsFetched, setSubgroupsFetched] = useState(false);



    async function fetchFaculties() {
        const _faculties = await db.getFaculties();
        setFaculties(_faculties.map(row => ({
            label: row.faculty_name,
            value: row.faculty_id
        })));
        setFacultiesFetched(true);
    }

    useEffect(() => {
        fetchFaculties().then(r => r);
    }, [])

    async function fetchGroups() {
        setGroupsFetched(false);
        setSubgroupsFetched(false);
        if (selectedItems.course !== 0 && selectedItems.facultyId !== 0){
            const _groups = await db.getGroups(selectedItems.facultyId, selectedItems.course);
            setGroups(_groups.map(row => ({
                label: row.group_name,
                value: row.group_id
            })));
            setGroupsFetched(true);
        }
    }

    async function fetchSubgroups() {
        const subgroups = await db.getSubgroups(selectedItems.groupId);
        setSubgroups(subgroups.map(row => ({
            label: row.group_name,
            value: row.group_id
        })));
        console.log(subgroups);
        setSubgroupsFetched(true);
    }

    return (
        <Panel>
            <PanelHeader separator={false}
                         left={haveBackButton ?
                             <PanelHeaderBack onClick={exitFunc}/> : null}
            >Настройки</PanelHeader>

                <FormItem top={"Факультет"}>
                    <Select id={"selectFaculty"}
                            onChange={(e) => {
                                selectedItems.facultyId = e.target.value;
                                fetchGroups().then(r => r);
                            }}
                            placeholder="Не выбран"
                            options={faculties}
                    />
                </FormItem>

                <FormItem top={"Курс"}>
                    <Select id={"selectCourse"}
                            onChange={(e) => {
                                selectedItems.course = e.target.value;
                                fetchGroups().then(r => r);
                            }}
                            placeholder="Не выбран"
                            options={
                                [{label: '1 курс', value: 1}, {label: '2 курс', value: 2}, {label: '3 курс', value: 3},
                                 {label: '4 курс', value: 4}, {label: '5 курс', value: 5}]
                            }
                    />
                </FormItem>

                <FormItem top={"Группа"}>
                    <Select
                        placeholder="Не выбрана"
                        onChange={(e) => {
                            selectedItems.groupId = e.target.value;
                            fetchSubgroups().then(r => r);
                        }}
                        options={groupsFetched ? groups : []}
                    />
                </FormItem>

                <FormItem top={"Подгруппа"}>
                    <Select
                        placeholder="Не выбрана"
                        onChange={(e) => {
                            selectedItems.subgroupId = e.target.value;
                        }}
                        options={subgroupsFetched ? subgroups : []}
                    />
                </FormItem>

                <FormItem>
                    <Button stretched={false} align={'center'} onClick={(e) => {
                        if (facultiesFetched && groupsFetched && subgroupsFetched && selectedItems.subgroupId != 0) {
                            console.log(vk_id, selectedItems.subgroupId);
                            db.createUser(vk_id, selectedItems.subgroupId);
                            exitFunc();
                        } else
                            alert('Выберите все пункты');
                    }}>Сохранить</Button>
                </FormItem>




        </Panel>
    )
}
export default Settings;