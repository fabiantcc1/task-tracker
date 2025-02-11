const fs = require('fs');
const path = require('path');
const { json } = require('stream/consumers');

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

function readUserInput(arg) {
    try {
        const command = arg[2];
        const body = arg.slice(3);

        switch (command) {
            case 'add':
                add(body);
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