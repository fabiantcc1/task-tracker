const fs = require('fs');
const path = require('path');

class DbIdModel {
    findAll() {
        const idFileName = 'id_tasks_handler.json';
        const idPath = path.join(__dirname, '../..', idFileName);
    
        if (!fs.existsSync(idPath)) {
            const idInitValue = JSON.stringify({ id: 0 });
            fs.writeFileSync(idPath, idInitValue);
        }
    
        const idHandler = fs.readFileSync(idPath);
    
        return idHandler;
    }
    
    update(newId) {
        const idFileName = 'id_tasks_handler.json';
        const idPath = path.join(__dirname, '../..', idFileName);
    
        const newIdHandler = JSON.stringify({ id: newId });
        fs.writeFileSync(idPath, newIdHandler);
    }
}

module.exports = { DbIdModel };