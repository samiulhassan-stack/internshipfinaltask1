import { useAuth } from '../context/AuthContext';
import { Mail, User as UserIcon, Calendar } from 'lucide-react';
import { format } from 'date-fns';

export default function ProfilePage() {
  const { user } = useAuth();

  if (!user) return null;

  return (
    <div className="p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Profile</h1>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-8">
          <div className="flex items-center gap-6 mb-8">
            <div className="w-24 h-24 rounded-full bg-primary-100 dark:bg-primary-900 flex items-center justify-center">
              {user.avatar ? (
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-24 h-24 rounded-full object-cover"
                />
              ) : (
                <span className="text-4xl font-bold text-primary-600 dark:text-primary-400">
                  {user.name.charAt(0).toUpperCase()}
                </span>
              )}
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{user.name}</h2>
              <p className="text-gray-500 dark:text-gray-400 mt-1">Member</p>
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
                <UserIcon size={16} />
                Full Name
              </label>
              <p className="text-gray-900 dark:text-white">{user.name}</p>
            </div>

            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
                <Mail size={16} />
                Email Address
              </label>
              <p className="text-gray-900 dark:text-white">{user.email}</p>
            </div>

            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
                <Calendar size={16} />
                Member Since
              </label>
              <p className="text-gray-900 dark:text-white">
                {format(new Date(user.createdAt), 'MMMM d, yyyy')}
              </p>
            </div>
          </div>

          <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Account Settings
            </h3>
            <p className="text-gray-500 dark:text-gray-400">
              Additional profile settings and preferences will be available in future updates.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
