import React, { useEffect, useMemo, useState } from 'react';
import { StyleSheet } from 'react-native';
import { Provider as PaperProvider } from 'react-native-paper';
import MyTabBar from '../components/BottomSheets';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import Login from '../screens/Login';
import Home from '../screens/Home';
import Biosense from '../screens/Biosense';
import Welcome from '../screens/Welcome';
import Splash from '../screens/Splash';
import User from '../screens/User';
import Logout from '../screens/Logout';
const Stack = createStackNavigator();
import { AuthContext } from '../context/context';
import { NativeBaseProvider } from 'native-base';

import { NavigationContainer } from '@react-navigation/native';

import {
  create_session_table,
  drop_session,
  insert_session,
  select_session,
  create_farm_table,
  create_sumafrio_table,
  create_sumagrados_table,
  create_sumaFrioOffline_table,
  create_desarrolloImg_table,
  create_ptosImg_table,
  create_imagesoffline_table,
  create_ptosbiosense_table,
  create_sumaGradosOffline_table,
  drop_farms,
  drop_sumafrio,
  drop_sumagrados,
  drop_sumaFrioOffline,
  drop_desarrolloImg,
  drop_ptosImg,
  drop_imagesoffline,
  drop_ptosbiosense,
  drop_sumaGradosOffline,
} from '../model';

const Tab = createBottomTabNavigator();

const AddClimasenseComponent = () => {
  return null;
};
const AddBiosenseComponent = () => {
  return null;
};

const tabList = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          backgroundColor: '#fff',
          height: 80,
          paddingBottom: 5,
          position: 'absolute',
        },
        tabBarHideOnKeyboard: true,
        headerShown: false,
      }}
      tabBar={props => <MyTabBar {...props} />}
    >
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Climasense" component={AddClimasenseComponent} />

      <Tab.Screen name="Biosense" component={Biosense} />

      <Tab.Screen name="Perfil" component={User} />
    </Tab.Navigator>
  );
};

let userToken = null;

const RootNavigation = ({}) => {
  const [isLogin, setIsLogin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const bootstrapAsync = async () => {
      await Promise.all([
        // drop_farms(),
        create_session_table(),
        create_farm_table(),
        create_sumafrio_table(),
        create_sumagrados_table(),
        create_sumaFrioOffline_table(),
        create_desarrolloImg_table(),
        create_ptosImg_table(),
        create_imagesoffline_table(),
        create_ptosbiosense_table(),
        create_sumaGradosOffline_table(),
      ]);

      try {
        const res = await select_session();
        userToken = res.rows._array[0];
        if (userToken != undefined) {
          setIsLogin(true);
          setIsLoading(false);
        } else {
          setIsLoading(false);
        }
      } catch (e) {}
    };
    bootstrapAsync();
    // setIsLoading(false);
  }, [isLogin]);

  const authContext = useMemo(
    () => ({
      signIn: async (token, name) => {
        create_session_table();
        await insert_session({ id_session: token, nombre: name });
        setIsLogin(true);
        setIsLoading(false);
      },

      signOut: async () => {
        await drop_session();
        await drop_farms();
        await drop_sumafrio();
        await drop_sumagrados();
        await drop_sumaFrioOffline();
        await drop_desarrolloImg();
        await drop_ptosImg();
        await drop_imagesoffline();
        await drop_ptosbiosense();
        await drop_sumaGradosOffline();
        setIsLogin(false);
      },

      signUp: async (token, name) => {
        create_session_table();
        await insert_session({ id_session: token, nombre: name });
        setIsLogin(true);
        setIsLoading(false);
      },
    }),
    [],
  );

  return (
    <AuthContext.Provider value={authContext}>
      <NativeBaseProvider>
        <PaperProvider>
          <NavigationContainer>
            {isLoading ? (
              <Stack.Navigator
                screenOptions={{
                  headerShown: false,
                }}
              >
                <Stack.Screen name="Splash" component={Splash} />
              </Stack.Navigator>
            ) : (
              <Stack.Navigator
                screenOptions={{
                  headerShown: false,
                }}
              >
                {isLogin ? (
                  <>
                    <Stack.Screen name="Bienvenido" component={Welcome} />

                    <Stack.Screen
                      name="Inicio"
                      component={tabList}
                      options={{ headerShown: false }}
                    />
                    <Stack.Screen name="Logout" component={Logout} />
                  </>
                ) : (
                  <>
                    {/* <Stack.Screen name="Bienvenido" component={Landing} /> */}
                    <Stack.Screen name="Inicio sesion" component={Login} />

                    {/* <Stack.Screen
                      options={{
                        headerShown: true,
                        headerTintColor: 'white',
                        headerLeft: null,
                        headerStyle: {
                          backgroundColor: 'black',
                        },
                      }}
                      name="Registro"
                      component={Register}
                    /> */}
                  </>
                )}
              </Stack.Navigator>
            )}
          </NavigationContainer>
        </PaperProvider>
      </NativeBaseProvider>
    </AuthContext.Provider>
  );
};
export default RootNavigation;
