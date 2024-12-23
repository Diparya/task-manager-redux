'use client'
import TaskDashboard from "@/components/TaskDashboard";
import { Provider } from 'react-redux';
import store from '@/store/store';

export default function Home() {
  return (
      <Provider store={store}>
      <TaskDashboard />
      </Provider>
  );
}
