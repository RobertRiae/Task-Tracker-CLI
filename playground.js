import { addTasks, fetchTasks } from "./functions.js";
var tasks = fetchTasks();
const yourdata = tasks.find((element) => (element.id == 2))
var id_extracted = yourdata;

console.log(id_extracted.status)

