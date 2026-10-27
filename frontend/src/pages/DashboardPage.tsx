import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus, TrendingUp, CheckCircle2, Clock } from 'lucide-react';
import { api } from '../lib/api';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement } from 'chart.js';
import { Doughnut, Bar } from 'react-chartjs-2';
import toast from 'react-hot-toast';

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement);

interface Project {
  id: string;
  name: string;
  tasks: Array<{ id: string; status: string }>;
}

export default function DashboardPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = async () => {
    try {
      const response = await api.get('/projects');
      setProjects(response.data.projects);
    } catch (error) {
      toast.error('Failed to load projects');
    } finally {
      setLoading(false);
    }
  };

  const stats = {
    totalProjects: projects.length,
    totalTasks: projects.reduce((acc, p) => acc + p.tasks.length, 0),
    completedTasks: projects.reduce(
      (acc, p) => acc + p.tasks.filter((t) => t.status === 'DONE').length,
      0
    ),
    inProgressTasks: projects.reduce(
      (acc, p) => acc + p.tasks.filter((t) => t.status === 'IN_PROGRESS').length,
      0
    ),
  };

  const taskStatusData = {
    labels: ['To Do', 'In Progress', 'Done'],
    datasets: [
      {
        data: [
          projects.reduce(
            (acc, p) => acc + p.tasks.filter((t) => t.status === 'TODO').length,
            0
          ),
          stats.inProgressTasks,
          stats.completedTasks,
        ],
        backgroundColor: ['#94A3B8', '#F59E0B', '#10B981'],
        borderWidth: 0,
      },
    ],
  };

  const projectData = {
    labels: projects.slice(0, 5).map((p) => p.name),
    datasets: [
      {
        label: 'Tasks',
        data: projects.slice(0, 5).map((p) => p.tasks.length),
        backgroundColor: '#6366F1',
      },
    ],
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              Welcome back! Here's your project overview.
            </p>
          </div>
          <Link
            to="/projects"
            className="flex items-center gap-2 px-4 py-2 bg-primary-600 hover:bg-primary-700 dark:bg-primary-500 dark:hover:bg-primary-600 text-white rounded-lg transition-colors"
          >
            <Plus size={20} />
            <span>New Project</span>
          </Link>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 dark:text-gray-400 text-sm">Total Projects</p>
                <p className="text-3xl font-bold text-gray-900 dark:text-white mt-1">
                  {stats.totalProjects}
                </p>
              </div>
              <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                <TrendingUp className="text-blue-600 dark:text-blue-400" size={24} />
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 dark:text-gray-400 text-sm">Total Tasks</p>
                <p className="text-3xl font-bold text-gray-900 dark:text-white mt-1">
                  {stats.totalTasks}
                </p>
              </div>
              <div className="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
                <Clock className="text-purple-600 dark:text-purple-400" size={24} />
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 dark:text-gray-400 text-sm">In Progress</p>
                <p className="text-3xl font-bold text-gray-900 dark:text-white mt-1">
                  {stats.inProgressTasks}
                </p>
              </div>
              <div className="p-3 bg-yellow-100 dark:bg-yellow-900/30 rounded-lg">
                <Clock className="text-yellow-600 dark:text-yellow-400" size={24} />
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 dark:text-gray-400 text-sm">Completed</p>
                <p className="text-3xl font-bold text-gray-900 dark:text-white mt-1">
                  {stats.completedTasks}
                </p>
              </div>
              <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-lg">
                <CheckCircle2 className="text-green-600 dark:text-green-400" size={24} />
              </div>
            </div>
          </div>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Task Status Distribution
            </h2>
            {stats.totalTasks > 0 ? (
              <div className="max-w-xs mx-auto">
                <Doughnut data={taskStatusData} options={{ maintainAspectRatio: true }} />
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                No tasks yet
              </div>
            )}
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Tasks by Project
            </h2>
            {projects.length > 0 ? (
              <Bar
                data={projectData}
                options={{
                  maintainAspectRatio: true,
                  scales: {
                    y: {
                      beginAtZero: true,
                      ticks: { stepSize: 1 },
                    },
                  },
                }}
              />
            ) : (
              <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                No projects yet
              </div>
            )}
          </div>
        </div>

        {/* Recent Projects */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              Recent Projects
            </h2>
          </div>
          {projects.length > 0 ? (
            <div className="divide-y divide-gray-200 dark:divide-gray-700">
              {projects.slice(0, 5).map((project) => (
                <Link
                  key={project.id}
                  to={`/projects/${project.id}`}
                  className="block p-6 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium text-gray-900 dark:text-white">
                        {project.name}
                      </h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                        {project.tasks.length} tasks
                      </p>
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      {project.tasks.filter((t) => t.status === 'DONE').length}/
                      {project.tasks.length} completed
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="p-12 text-center">
              <p className="text-gray-500 dark:text-gray-400 mb-4">No projects yet</p>
              <Link
                to="/projects"
                className="inline-flex items-center gap-2 px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg transition-colors"
              >
                <Plus size={20} />
                Create Your First Project
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
