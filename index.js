const fs = require('fs');
const path = require('path');

function readIdHandler() {
    const idFileName = 'id_tasks_handler.json';
    const idPath = path.join(__dirname, idFileName);

    if (!fs.existsSync(idPath)) {
        const idInitValue = JSON.stringify({ id: 0 });
        fs.writeFileSync(idPath, idInitValue);
    }

    const idHandler = fs.readFileSync(idPath);

    return idHandler;
}

function writeIdHandler(newId) {
    const idFileName = 'id_tasks_handler.json';
    const idPath = path.join(__dirname, idFileName);

    const newIdHandler = JSON.stringify({ id: newId });
    fs.writeFileSync(idPath, newIdHandler);
}

function readTaskJSON() {
    const jsonFileName = 'tasks.json';
    const pathJSON = path.join(__dirname, jsonFileName);

    if (!fs.existsSync(pathJSON)) {
        const newJSON = JSON.stringify([]);
        fs.writeFileSync(pathJSON, newJSON);
    }

    const tasksJSON = fs.readFileSync(pathJSON, 'utf8');

    return tasksJSON;
}

function writeTaskJSON(newTasks) {
    const jsonFileName = 'tasks.json';
    const pathJSON = path.join(__dirname, jsonFileName);

    const newTasksJSON = JSON.stringify(newTasks);
    fs.writeFileSync(pathJSON, newTasksJSON);
}

function add(body) {
    const tasks = JSON.parse(readTaskJSON());
    const task = body[0];
    
    if (task === '' || task === undefined || task === null) {
        throw new Error("Task can't be empty");
    }

    const idTaskHandler = JSON.parse(readIdHandler());
    const newId = idTaskHandler.id + 1;
    const newTask = {
        id: newId,
        description: task,
        status: 'todo',
        createdAt: new Date(),
        updatedAt: new Date()
    };
    tasks.push(newTask);
    writeTaskJSON(tasks);
    writeIdHandler(newId);

    console.log(`Task added successfully (ID: ${newTask.id})`);
}

function update(body) {
    const tasks = JSON.parse(readTaskJSON());
    const idTask = parseInt(body[0], 10);
    const task = body[1];

    if (typeof idTask !== 'number' || isNaN(idTask)) {
        throw new Error('ID must be a number');
    }

    if (task === '' || task === undefined || task === null) {
        throw new Error("Task can't be empty");
    }

    const taskToUpdate = tasks.find(task => task.id === idTask);
    if (!taskToUpdate) {
        throw new Error('Task to update not found');
    }

    taskToUpdate.description = task;
    taskToUpdate.updatedAt = new Date();
    writeTaskJSON(tasks);

    console.log(`Task updated successfully (ID: ${idTask})`);
}

function remove(body) {
    const tasks = JSON.parse(readTaskJSON());
    const idTask = parseInt(body[0], 10);

    if (typeof idTask !== 'number' || isNaN(idTask)) {
        throw new Error('ID must be a number');
    }

    const taskToRemove = tasks.findIndex(task => task.id === idTask);
    if (taskToRemove === -1) {
        throw new Error('Task to remove not found');
    }

    tasks.splice(taskToRemove, 1);
    writeTaskJSON(tasks);

    console.log(`Task removed successfully (ID: ${idTask})`);
}

function listHandler(body) {
    if (body.length === 0) {
        listAll();
        return;
    }

    switch (body[0]) {
        case 'todo':
            listTodo();
            break;
    
        case 'in-progress':
            listInProgress();
            break;
        
        case 'done':
            listDone();
            break;

        default:
            throw new Error('[list] Command not found');
    }
}

function listAll() {
    const tasks = JSON.parse(readTaskJSON());
    
    if (tasks.length === 0) {
        console.log('There are no tasks, add one!');
        return;
    }

    tasks.forEach(task => {
        console.log(`ID: ${task.id} | Description: ${task.description} | Status: ${task.status}`);
    });
}

function listTodo() {
    const tasks = JSON.parse(readTaskJSON());

    const todoTasks = tasks.filter(task => task.status === 'todo');
    if (todoTasks.length === 0) {
        console.log('You have no tasks TODO');
    }

    todoTasks.forEach(task => {
        console.log(`ID: ${task.id} | Description: ${task.description} | Status: ${task.status}`);
    });
}

function listInProgress() {
    const tasks = JSON.parse(readTaskJSON());

    const inProgressTasks = tasks.filter(task => task.status === 'in-progress');
    if (inProgressTasks.length === 0) {
        console.log('You have no tasks IN PROGRESS');
    }

    inProgressTasks.forEach(task => {
        console.log(`ID: ${task.id} | Description: ${task.description} | Status: ${task.status}`);
    });
}

function listDone() {
    const tasks = JSON.parse(readTaskJSON());

    const doneTasks = tasks.filter(task => task.status === 'done');
    if (doneTasks.length === 0) {
        console.log('You have no tasks DONE');
    }

    doneTasks.forEach(task => {
        console.log(`ID: ${task.id} | Description: ${task.description} | Status: ${task.status}`);
    });
}

function readUserInput(arg) {
    try {
        const command = arg[2];
        const body = arg.slice(3);

        switch (command) {
            case 'add':
                add(body);
                break;

            case 'update':
                update(body);
                break;

            case 'delete':
                remove(body);
                break;

            case 'list':
                listHandler(body);
                break;

            default:
                throw new Error('Command not found');
                break;
        }
    } catch (error) {
        console.log('There is an error:', error.message);
    }
}

readUserInput(process.argv);