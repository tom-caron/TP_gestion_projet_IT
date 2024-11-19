import { v4 as uuidv4 } from 'uuid';

const key = `task_${uuidv4}`
const value = {
    title : "Courses",
    text : "Oeuf, lait ...",
    isDone : false
}

localStorage.setItem(key, value)