
const { TaskService } = require('./src/services/task.service.js');

const service = new TaskService();

function readUserInput(arg) {
    try {
        const command = arg[2];
        const body = arg.slice(3);

        switch (command) {
            case 'add':
                service.create(body);
                break;

            case 'update':
                service.update(body);
                break;

            case 'delete':
                service.remove(body);
                break;

            case 'list':
                listHandler(body);
                break;

            case 'mark-in-progress':
                markAsInProgress(body);
                break;

            case 'mark-done':
                markAsDone(body);
                break;

            default:
                throw new Error('Command not found');
        }
    } catch (error) {
        console.log('There is an error:', error.message);
    }
}

readUserInput(process.argv);