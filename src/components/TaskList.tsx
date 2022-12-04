import { ChangeEvent, FormEvent, InvalidEvent, useState } from "react";
import { PlusCircle } from "phosphor-react";
import { v4 as uuidv4 } from "uuid"

import { Task } from "./Task";

import styles from "./TaskList.module.css";

import Clipboard from "../assets/clipboard.svg";

interface Task {
  id: string;
  description: string;
  status: "pending" | "concluded";
}

export function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState("");

  const isNewTaskEmpty = newTask.length === 0;
  
  function handleCreateNewTask(event: FormEvent) {
    event.preventDefault();

    const task: Task = {
      id: uuidv4(),
      description: newTask,
      status: "pending",
    }

    setTasks([...tasks, task]);
    setNewTask("");
  }

  function handleNewTaskChange(event: ChangeEvent<HTMLInputElement>) {
    event.target.setCustomValidity("");
    setNewTask(event.target.value);
  }

  function handleNewTaskInvalid(event: InvalidEvent<HTMLInputElement>) {
    event.target.setCustomValidity("Esse Campo é obrigatório");
  }

  function concludedTask(idTaskToConcluded: string) {
    const tasksWithChangeStatus = tasks.map(task => {
      if(task.id === idTaskToConcluded) {
        if(task.status === "concluded") {
          task.status = "pending";
        } else {
          task.status = "concluded";
        }
        return task;
      } else {
        return task;
      }
    });

    setTasks(tasksWithChangeStatus);
  }

  function deleteTask(idTaskToDelete: string) {
    const tasksWithoutDeletedOne = tasks.filter(task => {
      if(task.id !== idTaskToDelete) {
        return task;
      }
    });

    setTasks(tasksWithoutDeletedOne);
  }

  return (
    <main>
      <div>
        <form className={styles.taskForm} onSubmit={handleCreateNewTask}>
          <input
            type="text"
            name="task"
            placeholder="Adicione uma nova tarefa" 
            value={newTask}
            onChange={handleNewTaskChange}
            onInvalid={handleNewTaskInvalid}
            required
          />

          <button type="submit" disabled={isNewTaskEmpty}>
            Criar <PlusCircle size={20} />
          </button>
        </form>

        <div className={styles.taskInfo}>
          <strong className={styles.taskCreate}>
            Tarefas criadas <span>0</span>
          </strong>

          <strong className={styles.taskCompleted}>
            Concluídas <span>0</span>
          </strong>
        </div>

        {
          tasks.length === 0 ? (
            <div className={styles.taskEmpty}>
              <img src={Clipboard} alt="Clipboard" />
              <strong>Você ainda não tem tarefas cadastradas</strong>
              <span>Crie tarefas e organize seus itens a fazer</span>
            </div>
          ) : (
            tasks.map(task => (
              <Task
                key={task.id}
                task={task}
                onConcludedTask={concludedTask}
                onDeleteTask={deleteTask} 
              />
            ))
            
          )
        }
      </div>
    </main>
  )
}