import AsyncStprage from '@react-native-async-storage/async-storage';

import { TASK_COLLECTION } from '@storage/storageConfig';

import { ITask } from './ITask';

export async function taskGetAll(): Promise<ITask[]> {
  try {
    const storage = await AsyncStprage.getItem(TASK_COLLECTION);
    const tasks = storage ? JSON.parse(storage) : [];
    return tasks;
  } catch (error) {
    throw error;
  }
}