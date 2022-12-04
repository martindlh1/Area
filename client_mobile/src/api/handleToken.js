import AsyncStorage from "@react-native-async-storage/async-storage";

export const storeData = async (value) => {
  let stored_value = value;
  try {
    await AsyncStorage.setItem("@storage_Key", stored_value);
  } catch (e) {
    console.log(e);
  }
};

export const getData = async () => {
  const value = await AsyncStorage.getItem("@storage_Key");
  return value;
};

export const removeData = async () => {
  try {
    await AsyncStorage.removeItem("@storage_Key");
  } catch (e) {
    console.log(e);
  }
};
