import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Calendar, User } from 'lucide-react';
import { api } from '../lib/api';
import { format } from 'date-fns';
import toast from 'react-hot-toast';

interface Task {
  id: string;
  title: string;
  description?: string;
  status: string;
  priority: string;
  dueDate?: string;
  project: { id: string; name: string };
  assignee?: { id: string; name: string };
  comments: Array<{
    id: string;
    content: string;
    createdAt: string;
    author: { name: string };
  }>;
}

export default function TaskDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [task, setTask] = useState<Task | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadTask();
  }, [id]);

  const loadTask = async () => {
    try {
      const response = await api.get(`/tasks/${id}`);
      setTask(response.data.task);
    } catch (error) {
      toast.error('Failed to load task');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (!task) {
    return (
      <div className="p-8">
        <p className="text-center text-gray-500">Task not found</p>
      </div>
    );
  }

  return (
    <div className="p-8">
      <div className="max-w-4xl mx-auto">
        <Link
          to={`/projects/${task.project.id}`}
          className="inline-flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white mb-6"
        >
          <ArrowLeft size={20} />
          Back to {task.project.name}
        </Link>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
            {task.title}
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div>
              <label className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
                Status
              </label>
              <span
                className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                  task.status === 'DONE'
                    ? 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400'
                    : task.status === 'IN_PROGRESS'
                    ? 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300'
                }`}
              >
                {task.status.replace('_', ' ')}
              </span>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
                Priority
              </label>
              <span
                className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                  task.priority === 'HIGH'
                    ? 'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400'
                    : task.priority === 'MEDIUM'
                    ? 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300'
                }`}
              >
                {task.priority}
              </span>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
                <User className="inline mr-1" size={16} />
                Assignee
              </label>
              <p className="text-gray-900 dark:text-white">
                {task.assignee?.name || 'Unassigned'}
              </p>
            </div>
          </div>

          {task.dueDate && (
            <div className="mb-8">
              <label className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
                <Calendar className="inline mr-1" size={16} />
                Due Date
              </label>
              <p className="text-gray-900 dark:text-white">
                {format(new Date(task.dueDate), 'PPP')}
              </p>
            </div>
          )}

          <div className="mb-8">
            <label className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
              Description
            </label>
            <p className="text-gray-900 dark:text-white whitespace-pre-wrap">
              {task.description || 'No description provided'}
            </p>
          </div>

          {task.comments.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Comments ({task.comments.length})
              </h3>
              <div className="space-y-4">
                {task.comments.map((comment) => (
                  <div
                    key={comment.id}
                    className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium text-gray-900 dark:text-white">
                        {comment.author.name}
                      </span>
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        {format(new Date(comment.createdAt), 'PPp')}
                      </span>
                    </div>
                    <p className="text-gray-700 dark:text-gray-300">{comment.content}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
