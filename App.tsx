import { StyleSheet } from 'react-native';
import UserList from './src/screens/UserList/UserList';
import UserForm from './src/screens/UserForm/UserForm';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { Provider } from 'react-redux';
import { store } from './src/store/store';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <Provider store={store}>
    <NavigationContainer>
      <Tab.Navigator initialRouteName='UserForm'>
        <Tab.Screen name="UserForm" component={UserForm} options={{title: 'Create User'}}/>
        <Tab.Screen name="UserList" component={UserList}/>
      </Tab.Navigator>
    </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
