const express = require("express");
const fs = require("fs");
const app = express();
const port = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Task 1: Home page with links to addtask and tasks
app.get("/", (req, res) => {
  res.send(`
    <h1>Welcome to the Todo App!</h1>
    <ul>
      <li><a href="/addtask">Add Task</a></li>
      <li><a href="/tasks">View Tasks</a></li>
    </ul>
  `);
});

// Task 2: Endpoint to display UI for adding a task
app.get("/addtask", (req, res) => {
  res.send(`
    <h1>Add Task</h1>
    <form action="/addtask" method="POST">
      <input type="text" name="task" placeholder="Task" required>
      <button type="submit">Add</button>
    </form>
  `);
});

// Task 3: Endpoint to receive task data and store in JSON
app.post("/addtask", (req, res) => {
  const { task } = req.body;
  const tasks = loadTasks();
  tasks.push(task);
  saveTasks(tasks);
  res.redirect("/tasks");
});

// Task 4: Endpoint to display all the tasks
app.get("/tasks", (req, res) => {
  const tasks = loadTasks();
  res.send(`
    <h1>Tasks</h1>
    <ul>
      ${tasks.map((task) => `<li>${task}</li>`).join("")}
    </ul>
  `);
});

// Task 5: Page not found for other endpoints
app.use((req, res) => {
  res.status(404).send("Page not found");
});

// Helper functions to load and save tasks
function loadTasks() {
  try {
    const data = fs.readFileSync("tasks.json");
    return JSON.parse(data);
  } catch (error) {
    console.error(error);
    return [];
  }
}

function saveTasks(tasks) {
  const data = JSON.stringify(tasks);
  fs.writeFileSync("tasks.json", data);
}

// Starting the server
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
