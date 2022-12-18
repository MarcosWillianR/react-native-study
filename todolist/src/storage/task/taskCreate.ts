import AsyncStprage from '@react-native-async-storage/async-storage';

import { AppError } from '@utils/AppError';

import { taskGetAll } from './taskGetAll';

import { TASK_COLLECTION } from '@storage/storageConfig';

import { ITask } from './ITask';

export async function taskCreate(newTask: ITask) {
  try {
    const storedTasks = await taskGetAll();

    const taskAlreadyExists = storedTasks.findIndex(task => task.name === newTask.name);

    if (taskAlreadyExists !== -1) {
      throw new AppError('Já existe uma tarefa cadastrada com esse nome.');
    }

    await AsyncStprage.setItem(TASK_COLLECTION, JSON.stringify([...storedTasks, newTask]));
  } catch (error) {
    throw error;
  }
}