import { useState, useEffect } from "react";
import { getProjects, createProject, deleteProject } from "../api/projects";

export default function useProjects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      const { data } = await getProjects();
      setProjects(data);
    } catch (err) {
      setError("Failed to load projects");
    } finally {
      setLoading(false);
    }
  };

  const addProject = async (projectData) => {
    const { data } = await createProject(projectData);
    setProjects((prev) => [data, ...prev]);
    return data;
  };

  const removeProject = async (id) => {
    await deleteProject(id);
    setProjects((prev) => prev.filter((p) => p.id !== id));
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  return {
    projects,
    loading,
    error,
    addProject,
    removeProject,
    refetch: fetchProjects,
  };
}
