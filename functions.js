import fs, { read, readFileSync } from 'node:fs';
import { todo } from 'node:test';


const getNextid = (tasks) => {
    const ids = tasks.map(t => t.id).sort((a,b) => a - b); // sort ascending

    let nextId = 1; // start checking from 1
    for (const id of ids) {
        if (id === nextId) {
            nextId++; // occupied, check next
        } else if (id > nextId) {
            break; // found a gap
        }
    }
    return nextId;
};

const addTasks = (desc) => {
    //console.log('Adding note', title, body)
    var tasks = fetchTasks();
    const now = new Date().toISOString();
    var task = { 
        id: getNextid(tasks),
        description: desc,
        status: "todo",
        createdAt: now,
        updatedAt: now
    };
    var duplicateTasks = tasks.find((task) => task.description === desc);
    
    if (!duplicateTasks){
        tasks.push(task)
        saveTasks(tasks);
        return task;
    }
    else return -1;
};
const fetchTasks = () => {
    try {
        const content = fs.readFileSync('./task.json', 'utf8');
        if (!content.trim()) return []; // empty file
        return JSON.parse(content);
    } catch (err) {
        // file does not exist → return empty array
        return [];
    }
};

const saveTasks = (tasks) => {
    fs.writeFileSync('./task.json', JSON.stringify(tasks,null,2));
}


const findStatusById = (id, options = {}) => {
    const {
        updateStatus,
    } = options;
    id = Number(id);
    var tasks = fetchTasks();
    var taskObj = tasks.find((element) => (element.id === id))
    if (updateStatus) {
        taskObj.status = updateStatus;
        taskObj.updatedAt = new Date().toISOString();
        fs.writeFileSync('./task.json', JSON.stringify(tasks, null, 2));
    }
    
}
const findDescById = (id, options= {}) => {
    const {
        newDesc,
        
    } = options;

    id = Number(id);
    var tasks = fetchTasks();
    var task = tasks.find((element) => (element.id === id))
    if (!task) {
        console.log(`Task with ID:${id} is not found.`);
        return;
    }
    if (newDesc) {
        task.description = newDesc;
        task.updatedAt = new Date().toISOString();
        fs.writeFileSync('./task.json', JSON.stringify(tasks,null,2));
    }
    console.log(task.description);
}
const deleteById = (id) => {
    id = Number(id);
    var tasks = fetchTasks();
    var deletedArray = tasks.filter(element => element.id !== id);
    
    fs.writeFileSync('./task.json', JSON.stringify(deletedArray, null, 2));
    console.log(`Task with ID:${id} have been deleted.`);
}
const listByStatus = (status) => {
    const tasks = fetchTasks();
    var filteredTasks = tasks.filter(t => t.status === status);
    if(filteredTasks.length === 0){
        console.log(`No Tasks with the status:${status}`);
        return;
    }
    filteredTasks.forEach(task => {
        console.log(task);
    });
}
export {
    getNextid,
    addTasks,
    fetchTasks,
    findStatusById, 
    findDescById,
    deleteById,
    listByStatus
}