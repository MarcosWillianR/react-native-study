import AsyncStorage from "@react-native-async-storage/async-storage";

import { PLAYER_COLLECTION } from "@storage/storageConfig";

import { PlayerStorageDTO } from "./PlayerStorageDTO";

import { playersGetByGroup } from "./playersGetByGroup";

export async function playerRemoveByGroup(player: PlayerStorageDTO, group: string) {
  try {
    const data = await playersGetByGroup(group);
    const formattedPlayers = data.filter(storagedPlayer => storagedPlayer.name !== player.name);
    await AsyncStorage.setItem(`${PLAYER_COLLECTION}-${group}`, JSON.stringify(formattedPlayers))
  } catch (error) {
    throw error;
  }
}