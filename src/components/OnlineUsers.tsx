import React from 'react';
import { useOnlineUsersStore } from '../store/onlineUsersStore';

const OnlineUsers: React.FC = () => {
  const { onlineUsers } = useOnlineUsersStore();

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-xl font-semibold mb-4">Online Users</h2>
      <div className="space-y-4">
        {onlineUsers.map((user) => (
          <div key={user.id} className="flex items-center space-x-3">
            <div className="relative">
              {user.avatar ? (
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-10 h-10 rounded-full"
                />
              ) : (
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                  <span className="text-blue-600 font-medium">
                    {user.name.charAt(0).toUpperCase()}
                  </span>
                </div>
              )}
              <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 border-2 border-white rounded-full"></span>
            </div>
            <span className="text-gray-700">{user.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OnlineUsers;