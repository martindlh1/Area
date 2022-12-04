import React, { useState, useEffect } from "react";
import { Button, View, Text, StyleSheet, onPress } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { removeData } from "../api/handleToken";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import AdminCard from "../components/AdminCard";
import { setReload } from "../redux/areaSlice";
import Header from "../components/Header";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView } from "react-native-gesture-handler";

const AdminPage = ({ navigation }) => {
  const [user, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const reload = useSelector((state) => state.area.reload);

  const dispatch = useDispatch();

  const signOut = async () => {
    try {
      await AsyncStorage.removeItem("@storage_Key");
      navigation.navigate("Login");
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    axios
      .get("/admin/users")
      .then((res) => {
        setUsers(res.data);
        setLoading(false);
      })
      .catch((err) => {
        if (err.response.data === "Unauthorized") {
          removeData();
          navigation.navigate("Login");
        }
        setLoading(false);
        setError(true);
        console.log(err);
      });
    dispatch(setReload(false));
  }, [reload]);

  const toggleArea = (id, state) => {
    axios
      .put(`/admin/user/${id}`, {
        on: !state,
      })
      .then((res) => {
        dispatch(setReload(true));
      })
      .catch((err) => console.log(err));
  };

  const deleteUser = (id) => {
    axios
      .delete(`/admin/users/${id}`)
      .then((res) => {
        console.log(res);
        dispatch(setReload(true));
      })
      .catch((err) => console.log(err));
  };

  if (loading) {
    return <Text style={{ justifyContent: "center" }}>LOADING</Text>;
  } else if (error) {
    return <Text style={{ justifyContent: "center" }}>ERROR</Text>;
  } else {
    return (
      <View style={styles.container} direction={true}>
        <ScrollView>
          <Header
            navigation={navigation}
            title={"Admin"}
            direction={"Profile"}
            profile={false}
          />
          <Button title="Disconnect" onPress={signOut} />
          {user.map((user, index) => (
            <AdminCard user={user} key={index} onDeleteClick={deleteUser} />
          ))}
        </ScrollView>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "flex-start",
  },
});

export default AdminPage;
