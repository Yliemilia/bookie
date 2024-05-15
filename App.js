import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import MainPage from './MainPage';
import SearchPage from './SearchPage';
import ListPage from './ListPage';

const Tab = createBottomTabNavigator();

function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName='HOME'
        screenOptions={({ route }) => ({
          headerStyle: { backgroundColor: '#7b4d04' },
          headerTintColor: '#fff',
          tabBarActiveTintColor: '#7b4d04',
          tabBarInactiveTintColor: '#fcedd6', 
          tabBarStyle: {
            backgroundColor: '#efb963', 
          },
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'SEARCH') {
              iconName = focused ? 'search' : 'search-outline';
            } else if (route.name === 'HOME') {
              iconName = focused ? 'home' : 'home-outline';
            } else if (route.name === 'MY LIST') {
              iconName = focused ? 'list' : 'list-outline';
            }

            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}
      >
        <Tab.Screen name="SEARCH" component={SearchPage} options={{ title: 'SEARCH' }} />
        <Tab.Screen name="HOME" component={MainPage} options={{ title: 'HOME' }} />
        <Tab.Screen name="MY LIST" component={ListPage} options={{ title: 'MY LIST' }} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default App;
