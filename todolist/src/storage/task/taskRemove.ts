import AsyncStprage from '@react-native-async-storage/async-storage';

import { AppError } from '@utils/AppError';

import { taskGetAll } from './taskGetAll';

import { TASK_COLLECTION } from '@storage/storageConfig';

import { ITask } from './ITask';

export async function taskRemove(task: ITask) {
  try {
    const storedTasks = await taskGetAll();

    const taskToUpdate = storedTasks.find(storedTask => storedTask.name === task.name);

    if (!taskToUpdate) {
      throw new AppError('Tarefa não encontrada.');
    }

    const updatedStoredTasks = storedTasks.filter(storedTask => storedTask.name !== task.name);

    await AsyncStprage.setItem(TASK_COLLECTION, JSON.stringify(updatedStoredTasks));
  } catch (error) {
    throw error;
  }
}