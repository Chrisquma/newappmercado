import { create } from 'zustand';
import { faker } from '@faker-js/faker';
import { User } from '../types';

interface OnlineUsersState {
  onlineUsers: User[];
  addUser: (user: User) => void;
  removeUser: (userId: string) => void;
}

// Generate some fake online users
const generateFakeUsers = (count: number): User[] => {
  return Array.from({ length: count }, () => ({
    id: faker.string.uuid(),
    name: faker.person.firstName(),
    email: faker.internet.email(),
    avatar: faker.image.avatar(),
    balance: faker.number.int({ min: 100, max: 1000 }),
  }));
};

export const useOnlineUsersStore = create<OnlineUsersState>((set) => ({
  onlineUsers: generateFakeUsers(5), // Start with 5 fake online users
  addUser: (user) =>
    set((state) => ({
      onlineUsers: [...state.onlineUsers, user],
    })),
  removeUser: (userId) =>
    set((state) => ({
      onlineUsers: state.onlineUsers.filter((user) => user.id !== userId),
    })),
}));