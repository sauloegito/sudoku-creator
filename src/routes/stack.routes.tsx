import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { COLORS } from '../theme';
import { SelectGame } from '../screens/SelectGame';
import { EditGame } from '../screens/EditGame';
import { PlayGame } from '../screens/PlayGame';

const stackRoutes = createStackNavigator();

const AppRoutes: React.FC = () => (
  <stackRoutes.Navigator
    initialRouteName="Select"
    screenOptions={{
      headerShown: false,
      cardStyle: {
        backgroundColor: COLORS.BLACK_SECONDARY
      }
    }}
  >
    <stackRoutes.Screen
      name="Select"
      component={SelectGame}
    />

    <stackRoutes.Screen
      name="Edit"
      component={EditGame}
    />

    <stackRoutes.Screen
      name="Play"
      component={PlayGame}
    />

  </stackRoutes.Navigator>
)

export default AppRoutes;
