var developers = [
  { name: "Alice", skillLevel: 7, maxHours: 40, preferredTaskType: "feature" },
  { name: "Bob", skillLevel: 9, maxHours: 30, preferredTaskType: "bug" },
  {
    name: "Charlie",
    skillLevel: 5,
    maxHours: 35,
    preferredTaskType: "refactor",
  },
];

const tasks = [
  {
    taskName: "Feature A",
    difficulty: 7,
    hoursRequired: 15,
    taskType: "feature",
    priority: 4,
    dependencies: [],
  },
  {
    taskName: "Bug Fix B",
    difficulty: 5,
    hoursRequired: 10,
    taskType: "bug",
    priority: 5,
    dependencies: [],
  },
  {
    taskName: "Refactor C",
    difficulty: 9,
    hoursRequired: 25,
    taskType: "refactor",
    priority: 3,
    dependencies: ["Bug Fix B"],
  },
  {
    taskName: "Optimization D",
    difficulty: 6,
    hoursRequired: 20,
    taskType: "feature",
    priority: 2,
    dependencies: [],
  },
  {
    taskName: "Upgrade E",
    difficulty: 8,
    hoursRequired: 15,
    taskType: "feature",
    priority: 5,
    dependencies: ["Feature A"],
  },
];

function isRequiermentsFulfilled(developers, task) {
  for (var idx = 0; idx < developers.length; idx++) {
    if (
      task.difficulty <= developers[idx].skillLevel &&
      task.hoursRequired <= developers[idx].maxHours &&
      developers[idx].preferredTaskType === task.taskType
    ) {
      return idx;
    } else if (
      task.difficulty <= developers[idx].skillLevel &&
      task.hoursRequired <= developers[idx].maxHours
    ) {
      return idx;
    }
  }
  return null;
}

function assignTaskToDeveloper(developers, task) {
  var i = isRequiermentsFulfilled(developers, task);
  if (i != null) {
    var dev = developers[i];
    developers[i] = {
      ...dev,
      maxHours: dev.maxHours - task.hoursRequired,
      assignedTask: [...dev?.assignedTask, task],
      totalHours: dev.totalHours + task.hoursRequired,
    };
    return developers;
  }
  return null;
}

function assignTasksWithPriorityAndDependencies(developers, tasks) {
  // Your code here
  var HighPriorityTasks = tasks.sort((a, b) => a.priority - b.priority);
  let Developers = developers.map((dev) => ({
    ...dev,
    assignedTask: [],
    totalHours: 0,
  }));
  var unassignedTasks = [];

  for (var task of HighPriorityTasks) {
    if (task.dependencies.length) {
      task.dependencies.forEach((dependencyTask) => {
        var IdxTask = HighPriorityTasks.findIndex(
          (t) => t.taskName === dependencyTask
        );
        var devs = assignTaskToDeveloper(
          Developers,
          HighPriorityTasks[IdxTask]
        );
        if (devs) {
          Developers = devs;
          HighPriorityTasks.splice(IdxTask, 1);
        }
      });
    }
    var devs = assignTaskToDeveloper(Developers, task);
    if (devs) Developers = devs;
    else unassignedTasks.push(task);
  }
  return {
    Developers,
    unassignedTasks,
  };
}

// to view answer
console.log(
  JSON.stringify(assignTasksWithPriorityAndDependencies(developers, tasks))
);
