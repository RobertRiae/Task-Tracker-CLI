import process from 'node:process';
import { addTasks,fetchTasks,deleteById,findStatusById, findDescById,listByStatus } from './functions.js';
const command = process.argv[2];
const value = process.argv[3];
const newDescription = process.argv[4];


if (command === 'add') {
    console.log("Adding a task.....");
    var adding = addTasks(value);
    if (adding) {
        console.log("Added a task successfully");
        console.log(adding)
    }
    else {
        console.log("Task already exists");
    }

}else if(command === 'delete') {
    console.log("Deleting a task from the file!");
    deleteById(value);
}else if(command === 'update') {
    
    findDescById(value, { newDesc: newDescription });
    console.log("Updated task.");

}else if(command === "mark-in-progress"){
    findStatusById(value, {updateStatus: "in-progress"});
}else if(command === "mark-done"){
    findStatusById(value, {updateStatus: "done"});
}
else if(command === 'list') {
    if (value === "done") {

        listByStatus("done");
    }else if (value === "todo") {
        
        listByStatus("todo");
    }else if (value === "in-progress") {
        
        listByStatus("in-progress");
        
    }else {
        console.log("Listing all the tasks");
        var tasks = fetchTasks();
        if(tasks.length === 0) {
            console.log("The file is empty,add some tasks first");
        }else
        {console.log(tasks);}
    }
}

else {
    console.log("Please enter a valid command")
}