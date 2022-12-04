import { Trash, Check } from "phosphor-react";

import styles from "./Task.module.css";

interface Task {
  id: string;
  description: string;
  status: string;
}

interface TaskProps {
  task: Task;
  onConcludedTask: (taskId: string) => void;
  onDeleteTask: (taskId: string) => void;
}

export function Task({ task, onConcludedTask, onDeleteTask }: TaskProps) {
  return (
    <div className={styles.task}>
      <button
        className={ task.status === "concluded" ? styles.taskConcludedCkeck : styles.taskConcluded}
        title="Concluir tarefa"
        onClick={() => onConcludedTask(task.id)}
      >
        {task.status === "concluded" && (<Check size={14} />)}
      </button>

      <p className={
        task.status === "concluded" ? styles.taskTextConcluded : ""
      }>
        {task.description}
      </p>

      <button
        className={styles.taskDelete}
        title="Deletar tarefa"
        onClick={() => onDeleteTask(task.id)}
      >
        <Trash size={14} />
      </button>
    </div>
  )
}