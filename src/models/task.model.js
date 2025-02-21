const fs = require('fs');
const path = require('path');

class TaskModel {
    findAll() {
        const jsonFileName = 'tasks.json';
        const pathJSON = path.join(__dirname, '../..', jsonFileName);
    
        if (!fs.existsSync(pathJSON)) {
            const newJSON = JSON.stringify([]);
            fs.writeFileSync(pathJSON, newJSON);
        }
    
        const tasksJSON = fs.readFileSync(pathJSON, 'utf8');
    
        return tasksJSON;
    }
    
    create(newTasks) {
        const jsonFileName = 'tasks.json';
        const pathJSON = path.join(__dirname, '../..', jsonFileName);
    
        const newTasksJSON = JSON.stringify(newTasks);
        fs.writeFileSync(pathJSON, newTasksJSON);
    }
}

module.exports = { TaskModel };