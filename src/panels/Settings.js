import {
    Button,
    FormItem,
    Group, PanelHeader, PanelHeaderBack,
    Select,
} from "@vkontakte/vkui";
import {useEffect, useState} from "react";

const db = require('../server/database');

const Settings = ({vk_id, haveBackButton, exitFunc, ...props}) => {

    const [faculties, setFaculties] = useState([{label: '', value: 1}]);
    const [groups, setGroups] = useState([{label: '', value: 1}]);
    const [subgroups, setSubgroups] = useState([{label: '', value: 1}]);

    const [facultiesFetched, setFacultiesFetched] = useState(false);
    const [groupsFetched, setGroupsFetched] = useState(false);
    const [subgroupsFetched, setSubgroupsFetched] = useState(false);

    const selectedItems = {
        facultyId: 0, groupId: 0, subgroupId: 0
    }

    async function fetchFaculties() {
        setGroupsFetched(false);
        setFacultiesFetched(false);
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

        await new Promise(resolve => setTimeout(resolve, 3000));

        setSubgroupsFetched(false);
        const _groups = await db.getGroups(selectedItems.facultyId, 2);
        setGroups(_groups.map(row => ({
            label: row.group_name,
            value: row.group_id
        })));
        setGroupsFetched(true);
    }

    async function fetchSubgroups() {
        await new Promise(resolve => setTimeout(resolve, 3000));
        const subgroups = await db.getSubgroups(selectedItems.groupId);
        setSubgroups(subgroups.map(row => ({
            label: row.group_name,
            value: row.group_id
        })));
        console.log(subgroups);
        setSubgroupsFetched(true);
    }

    return (
        <>
            <PanelHeader separator={false}
                         left={haveBackButton ?
                             <PanelHeaderBack onClick={exitFunc}/> : null}
            >Настройки</PanelHeader>

            <Group>
                <div>
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

                    <Button onClick={(e) => {

                        exitFunc();
                    }}>Сохранить</Button>

                </div>
            </Group>
        </>
    )
}
export default Settings;