import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { Provider } from 'react-redux';
import { store, persistor } from './src/store/store';
import { PersistGate } from 'redux-persist/integration/react';
import UserList from './src/screens/UserList/UserList';
import UserForm from './src/screens/UserForm/UserForm';
import PostForm from './src/screens/PostForm/PostForm';
import PostList from './src/screens/PostList/PostList';

const Tab = createBottomTabNavigator();

export default function App() {


  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <NavigationContainer>
          <Tab.Navigator initialRouteName='UserForm'>
            <Tab.Screen name="UserForm" component={UserForm} options={{title: 'Create User'}}/>
            <Tab.Screen name="UserList" component={UserList}/>
            <Tab.Screen name="PostForm" component={PostForm}/>
            <Tab.Screen name="PostList" component={PostList}/>
          </Tab.Navigator>
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
}
