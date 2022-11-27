import {
  createStackNavigator,
  TransitionPresets,
} from '@react-navigation/stack';

import { Groups } from '@screens/Groups';
import { NewGroup } from '@screens/NewGroup';
import { Players } from '@screens/Players';

const { Navigator, Screen } = createStackNavigator();

export function AppRoutes() {
  return (
    <Navigator
      screenOptions={{
        headerShown: false,
        gestureEnabled: true,
        cardOverlayEnabled: true,
        ...TransitionPresets.ModalPresentationIOS,
      }}
    >
      <Screen name="groups" component={Groups} />
      <Screen name="newGroup" component={NewGroup} />
      <Screen name="players" component={Players} />
    </Navigator>
  )
}