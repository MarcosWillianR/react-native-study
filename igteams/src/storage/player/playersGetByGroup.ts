import AsyncStorage from "@react-native-async-storage/async-storage";

import { PLAYER_COLLECTION } from "@storage/storageConfig";

import { PlayerStorageDTO } from "./PlayerStorageDTO";

export async function playersGetByGroup(group: string) {
  try {
    const storagedPlayersByGroup = await AsyncStorage.getItem(`${PLAYER_COLLECTION}-${group}`);
    const data: PlayerStorageDTO[] = storagedPlayersByGroup ? JSON.parse(storagedPlayersByGroup) : []
    return data;
  } catch (error) {
    throw error;
  }
}