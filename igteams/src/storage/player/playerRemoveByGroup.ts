import AsyncStorage from "@react-native-async-storage/async-storage";

import { PLAYER_COLLECTION } from "@storage/storageConfig";

import { playersGetByGroup } from "./playersGetByGroup";

export async function playerRemoveByGroup(playerName: string, group: string) {
  try {
    const data = await playersGetByGroup(group);
    const formattedPlayers = data.filter(storagedPlayer => storagedPlayer.name !== playerName);
    await AsyncStorage.setItem(`${PLAYER_COLLECTION}-${group}`, JSON.stringify(formattedPlayers))
  } catch (error) {
    throw error;
  }
}