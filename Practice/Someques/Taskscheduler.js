class Taskscheduler {
  constructor(limit) {
    this.__concurrency = limit;
    this.__waitingTasks = [];
    this.__runningTask = 0;
  }

  addtask(task) {
    return new Promise((resolve, reject) => {
      const __taskrunner = async () => {
        try {
          this.__runningTask += 1;
          const result = await task(); // Ensure task execution
          console.log(`Task completed: ${result}`);
          resolve(result);
        } catch (err) {
          reject(err);
        } finally {
          this.__runningTask -= 1;
          this.getNextTask();
        }
      };

      if (this.__runningTask < this.__concurrency) {
        __taskrunner();
      } else {
        this.__waitingTasks.push(__taskrunner);
      }
    });
  }

  getNextTask() {
    if (
      this.__runningTask < this.__concurrency &&
      this.__waitingTasks.length !== 0
    ) {
      const nexttask = this.__waitingTasks.shift();
      nexttask();
    }
  }
}

// Create a scheduler with a concurrency limit of 3
const scheduler = new Taskscheduler(3);

// Sample async tasks
const createTask = (id, time) => () =>
  new Promise((resolve) =>
    setTimeout(() => {
      console.log(`Task ${id} done`);
      resolve(id);
    }, time)
  );

// Adding tasks
scheduler.addtask(createTask(1, 1000));
scheduler.addtask(createTask(2, 500));
scheduler.addtask(createTask(3, 800));
scheduler.addtask(createTask(4, 1200));
scheduler.addtask(createTask(5, 600));
scheduler.addtask(createTask(6, 700));
scheduler.addtask(createTask(7, 400));
