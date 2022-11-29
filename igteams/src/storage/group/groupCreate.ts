import AsyncStprage from '@react-native-async-storage/async-storage';

import { AppError } from '@utils/AppError';

import { groupGetAll } from './groupsGetAll';

import { GROUP_COLLECTION } from '@storage/storageConfig';

export async function groupCreate(newGroup: string) {
  try {
    const storedGroups = await groupGetAll();

    const groupAlreadyExists = storedGroups.findIndex(group => group === newGroup);

    if (groupAlreadyExists !== -1) {
      throw new AppError('Já existe um grupo cadastrado com esse nome.');
    }

    await AsyncStprage.setItem(
      GROUP_COLLECTION,
      JSON.stringify([...storedGroups, newGroup])
    );
  } catch (error) {
    throw error;
  }
}