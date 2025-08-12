import React, { useState } from 'react';
import { User, Mail, Key, Edit } from 'react-feather';

export default function ProfilePage({ user, onUpdateUser, onChangePassword, resetMessage, resetError }) {
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(user.name);

  // For change password
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [localMessage, setLocalMessage] = useState('');
  const [localError, setLocalError] = useState('');

  const handleSave = () => {
    onUpdateUser({ ...user, name });
    setIsEditing(false);
  };

  const handlePasswordChange = async () => {
    setLocalMessage('');
    setLocalError('');
    try {
      await onChangePassword(newPassword);
      setLocalMessage('Password changed successfully.');
      setNewPassword('');
      setIsChangingPassword(false);
    } catch (err) {
      setLocalError(err.message || 'Failed to change password.');
    }
  };

  return (
    <div className="p-4 sm:p-8 bg-green-50/50 min-h-screen max-w-4xl mx-auto">
      <h2 className="text-4xl font-bold text-green-900 mb-8">My Profile</h2>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1">
          <section className="bg-white p-6 rounded-2xl shadow space-y-6">
            <h3 className="text-xl font-semibold mb-4">Account Details</h3>
            <div className="flex items-center gap-4">
              <User className="text-green-700" />
              {isEditing ? (
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full p-2 border rounded-md"
                />
              ) : (
                <span className="font-semibold text-lg">{user.name}</span>
              )}
            </div>
            <div className="flex items-center gap-4">
              <Mail className="text-green-700" />
              <span className="text-gray-600">{user.email}</span>
            </div>

            <div className="flex items-center gap-4">
              <Key className="text-green-700" />
              {!isChangingPassword ? (
                <button
                  className="text-green-600 hover:underline"
                  onClick={() => {
                    setIsChangingPassword(true);
                    setLocalMessage('');
                    setLocalError('');
                  }}
                >
                  Change Password
                </button>
              ) : (
                <div className="flex flex-col space-y-2 w-full">
                  <input
                    type="password"
                    placeholder="New Password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="p-2 border rounded-md"
                  />
                  <div className="flex gap-2">
                    <button
                      onClick={handlePasswordChange}
                      className="bg-green-700 text-white py-2 px-4 rounded-lg hover:bg-green-800 transition-colors flex-1"
                    >
                      Save Password
                    </button>
                    <button
                      onClick={() => {
                        setIsChangingPassword(false);
                        setNewPassword('');
                        setLocalMessage('');
                        setLocalError('');
                      }}
                      className="bg-gray-300 text-gray-800 py-2 px-4 rounded-lg hover:bg-gray-400 transition-colors flex-1"
                    >
                      Cancel
                    </button>
                  </div>
                  {(localMessage || resetMessage) && (
                    <p className="text-green-700 mt-1 text-sm">{localMessage || resetMessage}</p>
                  )}
                  {(localError || resetError) && (
                    <p className="text-red-600 mt-1 text-sm">{localError || resetError}</p>
                  )}
                </div>
              )}
            </div>

            {isEditing ? (
              <button
                onClick={handleSave}
                className="w-full bg-green-700 text-white py-2 px-4 rounded-lg font-semibold hover:bg-green-800 transition-colors"
              >
                Save Changes
              </button>
            ) : (
              <button
                onClick={() => setIsEditing(true)}
                className="w-full bg-gray-200 text-gray-800 py-2 px-4 rounded-lg font-semibold hover:bg-gray-300 transition-colors flex items-center justify-center gap-2"
              >
                <Edit size={16} /> Edit Profile
              </button>
            )}
          </section>

          <section className="bg-white p-6 rounded-2xl shadow mt-8">
            <h3 className="text-xl font-semibold mb-4">Payment Methods</h3>
            <p className="text-gray-500">Visa **** **** **** 1234</p>
            <button className="text-green-600 hover:underline mt-2">Add new method</button>
          </section>
        </div>

        <div className="lg:col-span-2">
          <section className="bg-white p-6 rounded-2xl shadow">
            <h3 className="text-xl font-semibold mb-6">Order History</h3>
            {user.orders && user.orders.length > 0 ? (
              <div className="space-y-4">
                {user.orders.map((order) => (
                  <div key={order.id} className="bg-green-50 p-4 rounded-lg shadow-sm">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-bold">Order #{order.id}</p>
                        <p className="text-sm text-gray-500">{order.date}</p>
                      </div>
                      <p className="font-semibold text-lg">${order.total.toFixed(2)}</p>
                    </div>
                    <div className="mt-2 text-sm text-gray-600">Items: {order.items.join(', ')}</div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-600">You have no past orders.</p>
            )}
          </section>
        </div>
      </div>
    </div>
  );
}
