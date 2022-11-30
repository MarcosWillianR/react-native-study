import AsyncStorage from "@react-native-async-storage/async-storage";

import { AppError } from "@utils/AppError";

import { PLAYER_COLLECTION } from "@storage/storageConfig";

import { PlayerStorageDTO } from "./PlayerStorageDTO";

import { playersGetByGroup } from "./playersGetByGroup";

export async function playerAddByGroup(newPlayer: PlayerStorageDTO, group: string) {
  try {
    const data = await playersGetByGroup(group);

    const playerAlreadyExists = data.filter(player => player.name === newPlayer.name).length > 0;
    if (playerAlreadyExists) {
      throw new AppError('Já existe um jogador cadastrado com esse nome.');
    }

    const updatedStorageData = JSON.stringify([...data, newPlayer]);
    await AsyncStorage.setItem(`${PLAYER_COLLECTION}-${group}`, updatedStorageData)
  } catch (error) {
    throw error;
  }
}