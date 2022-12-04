import { StyleSheet, SafeAreaView, Text } from "react-native";
import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Provider } from "react-redux";
import LoginPage from "./src/pages/LoginPage";
import HomePage from "./src/pages/HomePage";
import CreatePage from "./src/pages/CreatePage";
import ServicesPage from "./src/pages/ServicesPage";
import SingleServicePage from "./src/pages/SingleServicePage";
import SingleActionPage from "./src/pages/SingleActionPage";
import ProfilePage from "./src/pages/ProfilePage";
import AdminPage from "./src/pages/AdminPage";
import axios from "axios";
import store from "./src/redux/store";
import * as React from "react";
import { Ionicons } from "@expo/vector-icons";
import AdressIPPage from "./src/pages/AdressIPPage";

axios.defaults.baseURL = "http://10.0.2.2:8080";
axios.defaults.headers.post["Content-Type"] = "application/json";

const AppTabNavigator = createBottomTabNavigator();
const RootStack = createNativeStackNavigator();
const CreateStack = createNativeStackNavigator();

const CreateStackScreen = () => {
  return (
    <CreateStack.Navigator
      initialRouteName="CreateForm"
      screenOptions={{
        headerShown: false,
      }}
    >
      <CreateStack.Screen name="CreateForm" component={CreatePage} />
      <CreateStack.Screen name="Services" component={ServicesPage} />
      <CreateStack.Screen name="SingleAction" component={SingleActionPage} />
      <CreateStack.Screen name="SingleService" component={SingleServicePage} />
    </CreateStack.Navigator>
  );
};

const AppTabNavigatorScreen = () => {
  return (
    <AppTabNavigator.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: () => {
          if (route.name === "Home") {
            return <Ionicons name="home-outline" size={30} color={"black"} />;
          } else if (route.name === "Create") {
            return <Ionicons name={"add-outline"} size={30} color={"black"} />;
          } else if (route.name === "Profile") {
            return (
              <Ionicons name={"person-outline"} size={30} color={"black"} />
            );
          }
        },
        headerShown: false,
      })}
    >
      <AppTabNavigator.Screen name="Home" component={HomePage} />
      <AppTabNavigator.Screen name="Create" component={CreateStackScreen} />
      <AppTabNavigator.Screen name="Profile" component={ProfilePage} />
    </AppTabNavigator.Navigator>
  );
};

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        {/* <TabNavigator /> */}
        {/* <Pages /> */}
        <RootStack.Navigator
          initialRouteName="Adress"
          screenOptions={{
            headerShown: false,
          }}
        >
          <RootStack.Screen name="Adress" component={AdressIPPage} />
          <RootStack.Screen name="Login" component={LoginPage} />
          <RootStack.Screen name="App" component={AppTabNavigatorScreen} />
          <RootStack.Screen name="Admin" component={AdminPage} />
        </RootStack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default App;
