# Task tracker
`Task tracker` is a tool that helps you handle your daily activities.

## Functionalities
- ✔️ Add, Update and Delete tasks.
- ✔️ Manage your tasks by marking them as `in-progress` or `done`.
- ✔️ List all your tasks, with the possibility of filtering them by `to-do`, `in-progress` or `done`.

## Installation
 - Clone the repository in your local machine.
```bash
git clone --depth=1 git@github.com:fabiantcc1/task-tracker.git
```

## Usage
### Add task
- Create and save a new task.
```bash
node index.js add "My new task"
```

### Update task
- Update an existing task using the task ID.
```bash
node index.js update 1 "My task updated"
```

### Delete task
- Delete an existing task using the task ID.
```bash
node index.js delete 1
```

### Manage progress task
- Mark task as `in-progress`.
```bash
# Use the task ID to mark a task as "in-progress"
node index.js mark-in-progress 1
```
- Mark task as `done`.
```bash
# Use the task ID to mark a task as "done"
node index.js mark-done 1
```
### List task
- List all tasks.
```bash
# Show all tasks with different progress
node index.js list
```

- List all tasks by status: `todo`.
```bash
# Show all tasks with "todo" status
node index.js list todo
```

- List all tasks by status: `in-progress`.
```bash
# Show all tasks with "in-progress" status
node index.js list in-progress
```

- List all tasks by status: `done`.
```bash
# Show all tasks with "done" status
node index.js list done
```