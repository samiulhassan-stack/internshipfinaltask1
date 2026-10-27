import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Plus, ArrowLeft } from 'lucide-react';
import { api } from '../lib/api';
import { useSocket } from '../context/SocketContext';
import toast from 'react-hot-toast';

interface Task {
  id: string;
  title: string;
  status: 'TODO' | 'IN_PROGRESS' | 'DONE';
  priority: 'LOW' | 'MEDIUM' | 'HIGH';
  assignee?: {
    name: string;
  };
}

interface Project {
  id: string;
  name: string;
  description?: string;
  tasks: Task[];
}

export default function ProjectDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const { socket } = useSocket();

  useEffect(() => {
    loadProject();
  }, [id]);

  useEffect(() => {
    if (socket && id) {
      socket.emit('project:join', id);

      socket.on('task:created', ({ task }) => {
        setProject((prev) => prev ? { ...prev, tasks: [...prev.tasks, task] } : null);
      });

      socket.on('task:updated', ({ task }) => {
        setProject((prev) => {
          if (!prev) return null;
          return {
            ...prev,
            tasks: prev.tasks.map((t) => (t.id === task.id ? task : t)),
          };
        });
      });

      socket.on('task:deleted', ({ taskId }) => {
        setProject((prev) => {
          if (!prev) return null;
          return {
            ...prev,
            tasks: prev.tasks.filter((t) => t.id !== taskId),
          };
        });
      });

      return () => {
        socket.emit('project:leave', id);
        socket.off('task:created');
        socket.off('task:updated');
        socket.off('task:deleted');
      };
    }
  }, [socket, id]);

  const loadProject = async () => {
    try {
      const response = await api.get(`/projects/${id}`);
      setProject(response.data.project);
    } catch (error) {
      toast.error('Failed to load project');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateTask = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const title = formData.get('title') as string;
    const priority = formData.get('priority') as string;

    try {
      await api.post('/tasks', { title, priority, projectId: id });
      toast.success('Task created!');
      setShowCreateModal(false);
    } catch (error) {
      toast.error('Failed to create task');
    }
  };

  const handleStatusChange = async (taskId: string, status: string) => {
    try {
      await api.put(`/tasks/${taskId}`, { status });
    } catch (error) {
      toast.error('Failed to update task');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="p-8">
        <p className="text-center text-gray-500">Project not found</p>
      </div>
    );
  }

  const columns = [
    { status: 'TODO', title: 'To Do', color: 'gray' },
    { status: 'IN_PROGRESS', title: 'In Progress', color: 'yellow' },
    { status: 'DONE', title: 'Done', color: 'green' },
  ];

  return (
    <div className="p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <Link
            to="/projects"
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
          >
            <ArrowLeft size={24} />
          </Link>
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{project.name}</h1>
            {project.description && (
              <p className="text-gray-600 dark:text-gray-400 mt-1">{project.description}</p>
            )}
          </div>
          <button
            onClick={() => setShowCreateModal(true)}
            className="flex items-center gap-2 px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg transition-colors"
          >
            <Plus size={20} />
            Add Task
          </button>
        </div>

        {/* Kanban Board */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {columns.map((column) => {
            const tasks = project.tasks.filter((t) => t.status === column.status);
            return (
              <div key={column.status} className="bg-gray-50 dark:bg-gray-800 rounded-xl p-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-gray-900 dark:text-white">
                    {column.title}
                  </h3>
                  <span className="px-2 py-1 text-xs font-medium bg-white dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded">
                    {tasks.length}
                  </span>
                </div>
                <div className="space-y-3">
                  {tasks.map((task) => (
                    <div
                      key={task.id}
                      className="bg-white dark:bg-gray-700 rounded-lg p-4 shadow-sm border border-gray-200 dark:border-gray-600"
                    >
                      <Link to={`/tasks/${task.id}`} className="block">
                        <h4 className="font-medium text-gray-900 dark:text-white mb-2">
                          {task.title}
                        </h4>
                        <div className="flex items-center justify-between">
                          <span
                            className={`px-2 py-1 text-xs font-medium rounded ${
                              task.priority === 'HIGH'
                                ? 'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400'
                                : task.priority === 'MEDIUM'
                                ? 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400'
                                : 'bg-gray-100 dark:bg-gray-600 text-gray-600 dark:text-gray-300'
                            }`}
                          >
                            {task.priority}
                          </span>
                          {task.assignee && (
                            <span className="text-xs text-gray-500 dark:text-gray-400">
                              {task.assignee.name}
                            </span>
                          )}
                        </div>
                      </Link>
                      <select
                        value={task.status}
                        onChange={(e) => handleStatusChange(task.id, e.target.value)}
                        className="w-full mt-3 px-2 py-1 text-xs border border-gray-300 dark:border-gray-600 rounded focus:ring-2 focus:ring-primary-500 dark:bg-gray-600 dark:text-white"
                      >
                        <option value="TODO">To Do</option>
                        <option value="IN_PROGRESS">In Progress</option>
                        <option value="DONE">Done</option>
                      </select>
                    </div>
                  ))}
                  {tasks.length === 0 && (
                    <p className="text-center text-gray-400 dark:text-gray-500 text-sm py-8">
                      No tasks
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Create Modal */}
        {showCreateModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 max-w-md w-full">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Create New Task
              </h2>
              <form onSubmit={handleCreateTask}>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Task Title
                    </label>
                    <input
                      type="text"
                      name="title"
                      required
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                      placeholder="What needs to be done?"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Priority
                    </label>
                    <select
                      name="priority"
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                    >
                      <option value="LOW">Low</option>
                      <option value="MEDIUM">Medium</option>
                      <option value="HIGH">High</option>
                    </select>
                  </div>
                </div>
                <div className="flex gap-3 mt-6">
                  <button
                    type="button"
                    onClick={() => setShowCreateModal(false)}
                    className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg transition-colors"
                  >
                    Create
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
