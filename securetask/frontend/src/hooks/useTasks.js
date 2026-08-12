import { useState, useEffect } from "react";
import {
  getTasksByProject,
  createTask,
  updateTask,
  deleteTask,
} from "../api/tasks";

export default function useTasks(projectId) {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const { data } = await getTasksByProject(projectId);
      setTasks(data);
    } finally {
      setLoading(false);
    }
  };

  const addTask = async (taskData) => {
    const { data } = await createTask({ ...taskData, project: projectId });
    setTasks((prev) => [data, ...prev]);
    return data;
  };

  const editTask = async (id, taskData) => {
    const { data } = await updateTask(id, taskData);
    setTasks((prev) => prev.map((t) => (t.id === id ? data : t)));
    return data;
  };

  const removeTask = async (id) => {
    await deleteTask(id);
    setTasks((prev) => prev.filter((t) => t.id !== id));
  };

  useEffect(() => {
    if (projectId) fetchTasks();
  }, [projectId]);

  return { tasks, loading, addTask, editTask, removeTask, refetch: fetchTasks };
}
