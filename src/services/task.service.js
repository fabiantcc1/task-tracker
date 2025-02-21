const { TaskModel } = require('../models/task.model.js');
const { DbIdModel } = require('../models/db-id.model.js');

class TaskService {
    constructor() {
        this.TaskModel = new TaskModel();
        this.DbIdModel = new DbIdModel();
    }

    listHandler(body) {
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

    create(body) {
        const tasks = JSON.parse(this.TaskModel.findAll());
        const task = body[0];
        
        if (task === '' || task === undefined || task === null) {
            throw new Error("Task can't be empty");
        }
    
        const idTaskHandler = JSON.parse(this.DbIdModel.findAll());
        const newId = idTaskHandler.id + 1;
        const newTask = {
            id: newId,
            description: task,
            status: 'todo',
            createdAt: new Date(),
            updatedAt: new Date()
        };
        tasks.push(newTask);
        this.TaskModel.create(tasks);
        this.DbIdModel.update(newId);
    
        console.log(`Task added successfully (ID: ${newTask.id})`);
    }

    update(body) {
        const tasks = JSON.parse(this.TaskModel.findAll());
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
        this.TaskModel.create(tasks);
    
        console.log(`Task updated successfully (ID: ${idTask})`);
    }

    remove(body) {
        const tasks = JSON.parse(this.TaskModel.findAll());
        const idTask = parseInt(body[0], 10);
    
        if (typeof idTask !== 'number' || isNaN(idTask)) {
            throw new Error('ID must be a number');
        }
    
        const taskToRemove = tasks.findIndex(task => task.id === idTask);
        if (taskToRemove === -1) {
            throw new Error('Task to remove not found');
        }
    
        tasks.splice(taskToRemove, 1);
        this.TaskModel.create(tasks);
    
        console.log(`Task removed successfully (ID: ${idTask})`);
    }

    markAsInProgress(body) {
        const tasks = JSON.parse(this.TaskModel.findAll());
        const idTask = parseInt(body[0], 10);
    
        if (typeof idTask !== 'number' || isNaN(idTask)) {
            throw new Error('Task ID must be a number');
        }
    
        const task = tasks.find(task => task.id === idTask);
        if (!task) {
            throw new Error('Task not found');
        }
    
        task.status = 'in-progress';
        task.updatedAt = new Date();
        this.TaskModel.create(tasks);
    
        console.log(`Task "${task.description}" marked as IN PROGRESS (ID: ${idTask})`);
    }

    markAsDone(body) {
        const tasks = JSON.parse(this.TaskModel.findAll());
        const idTask = parseInt(body[0], 10);
    
        if (typeof idTask !== 'number' || isNaN(idTask)) {
            throw new Error('Task ID must be a number');
        }
    
        const task = tasks.find(task => task.id === idTask);
        if (!task) {
            throw new Error('Task not found');
        }
    
        task.status = 'done';
        task.updatedAt = new Date();
        this.TaskModel.create(tasks);
    
        console.log(`Task "${task.description}" marked as DONE (ID: ${idTask})`);
    }

    listAll() {
        const tasks = JSON.parse(readTaskJSON());
        
        if (tasks.length === 0) {
            console.log('There are no tasks, add one!');
            return;
        }
    
        tasks.forEach(task => {
            console.log(`ID: ${task.id} | Description: ${task.description} | Status: ${task.status}`);
        });
    }

    listTodo() {
        const tasks = JSON.parse(readTaskJSON());
    
        const todoTasks = tasks.filter(task => task.status === 'todo');
        if (todoTasks.length === 0) {
            console.log('You have no tasks TODO');
        }
    
        todoTasks.forEach(task => {
            console.log(`ID: ${task.id} | Description: ${task.description} | Status: ${task.status}`);
        });
    }
    
    listInProgress() {
        const tasks = JSON.parse(readTaskJSON());
    
        const inProgressTasks = tasks.filter(task => task.status === 'in-progress');
        if (inProgressTasks.length === 0) {
            console.log('You have no tasks IN PROGRESS');
        }
    
        inProgressTasks.forEach(task => {
            console.log(`ID: ${task.id} | Description: ${task.description} | Status: ${task.status}`);
        });
    }

    listDone() {
        const tasks = JSON.parse(readTaskJSON());
    
        const doneTasks = tasks.filter(task => task.status === 'done');
        if (doneTasks.length === 0) {
            console.log('You have no tasks DONE');
        }
    
        doneTasks.forEach(task => {
            console.log(`ID: ${task.id} | Description: ${task.description} | Status: ${task.status}`);
        });
    }
}

module.exports = { TaskService };