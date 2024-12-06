import React, { useState } from 'react';
import { useAuthStore } from '../store/authStore';
import { Camera, CreditCard, MapPin, Plus } from 'lucide-react';
import AddressForm from '../components/AddressForm';
import PaymentMethodForm from '../components/PaymentMethodForm';
import OnlineUsers from '../components/OnlineUsers';

const Profile: React.FC = () => {
  const { user, updateUser } = useAuthStore();
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [showPaymentForm, setShowPaymentForm] = useState(false);

  const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        updateUser({ avatar: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center space-x-6">
              <div className="relative">
                <input
                  type="file"
                  id="avatar-upload"
                  accept="image/*"
                  className="hidden"
                  onChange={handleAvatarChange}
                />
                {user?.avatar ? (
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-24 h-24 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center">
                    <span className="text-3xl font-bold text-gray-500">
                      {user?.name.charAt(0)}
                    </span>
                  </div>
                )}
                <label
                  htmlFor="avatar-upload"
                  className="absolute bottom-0 right-0 bg-blue-600 p-2 rounded-full text-white hover:bg-blue-700 cursor-pointer"
                >
                  <Camera className="w-4 h-4" />
                </label>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">{user?.name}</h1>
                <p className="text-gray-600">{user?.email}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2">
                <MapPin className="w-5 h-5 text-gray-500" />
                <h2 className="text-xl font-semibold">Delivery Address</h2>
              </div>
              {!showAddressForm && (
                <button
                  onClick={() => setShowAddressForm(true)}
                  className="flex items-center space-x-1 text-blue-600 hover:text-blue-700"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Address</span>
                </button>
              )}
            </div>
            {showAddressForm ? (
              <AddressForm onClose={() => setShowAddressForm(false)} />
            ) : user?.address ? (
              <div>
                <p>{user.address.street}</p>
                <p>{`${user.address.city}, ${user.address.state} ${user.address.zipCode}`}</p>
              </div>
            ) : (
              <p className="text-gray-500">No address added yet</p>
            )}
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2">
                <CreditCard className="w-5 h-5 text-gray-500" />
                <h2 className="text-xl font-semibold">Payment Methods</h2>
              </div>
              {!showPaymentForm && (
                <button
                  onClick={() => setShowPaymentForm(true)}
                  className="flex items-center space-x-1 text-blue-600 hover:text-blue-700"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Payment Method</span>
                </button>
              )}
            </div>
            {showPaymentForm ? (
              <PaymentMethodForm onClose={() => setShowPaymentForm(false)} />
            ) : user?.paymentMethods?.length ? (
              <div className="space-y-4">
                {user.paymentMethods.map((method) => (
                  <div
                    key={method.id}
                    className="flex justify-between items-center p-3 border rounded-md"
                  >
                    <div>
                      <p className="font-medium">
                        {method.type.charAt(0).toUpperCase() + method.type.slice(1)} Card
                      </p>
                      <p className="text-sm text-gray-600">
                        **** **** **** {method.lastFourDigits}
                      </p>
                    </div>
                    <p className="text-sm text-gray-600">Expires {method.expiryDate}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500">No payment methods added yet</p>
            )}
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">Account Balance</h2>
            <p className="text-3xl font-bold text-gray-900">
              ${user?.balance.toFixed(2)}
            </p>
            <button className="mt-4 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700">
              Add Funds
            </button>
          </div>
        </div>

        <div className="md:col-span-1">
          <OnlineUsers />
        </div>
      </div>
    </div>
  );
};

export default Profile;