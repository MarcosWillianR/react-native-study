import AsyncStprage from '@react-native-async-storage/async-storage';

import { GROUP_COLLECTION } from '@storage/storageConfig';

export async function groupGetAll(): Promise<string[]> {
  try {
    const storage = await AsyncStprage.getItem(GROUP_COLLECTION);
    const groups = storage ? JSON.parse(storage) : [];
    return groups;
  } catch (error) {
    throw error;
  }
}