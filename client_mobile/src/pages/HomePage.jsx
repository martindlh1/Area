import React, { useState, useEffect } from "react";
import { Text, StyleSheet, SafeAreaView, View, ScrollView } from "react-native";
import { removeData } from "../api/handleToken";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import AreaCard from "../components/Area/AreaCard";
import { setReload } from "../redux/areaSlice";
import Header from "../components/Header";
import BasicButton from "../components/BasicButton";
import { useFonts } from "expo-font";
import Loading from "../components/Loading";
import ErrorHome from "../components/ErrorHome";

const HomePage = ({ navigation }) => {
  const [areas, setAreas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const reload = useSelector((state) => state.area.reload);

  const dispatch = useDispatch();

  const [fontsLoaded] = useFonts({
    "Poppins-SemiBold": require("../../assets/fonts/Poppins-SemiBold.ttf"),
  });

  useEffect(() => {
    axios
      .get("/areas")
      .then((res) => {
        setAreas(res.data);
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
      .put(`/areas/${id}`, {
        on: !state,
      })
      .then((res) => {
        dispatch(setReload(true));
      })
      .catch((err) => console.log(err));
  };

  const deleteArea = (id) => {
    axios
      .delete(`/areas/${id}`)
      .then((res) => {
        dispatch(setReload(true));
      })
      .catch((err) => console.log(err));
  };

  if (!fontsLoaded) {
    return null;
  }

  if (loading) {
    return <Loading />;
  } else if (error) {
    return <ErrorHome />;
  } else {
    return (
      <SafeAreaView style={styles.container} direction={true}>
        <Header title={"Home"} />
        {areas.length === 0 && (
          <View style={styles.noAreaContainer}>
            <Text style={styles.noAreaText}>No Areas</Text>
            <BasicButton
              title={"Create one!"}
              onPress={() => navigation.navigate("Create")}
            />
          </View>
        )}
        <ScrollView>
          {areas.map((area, index) => (
            <AreaCard
              area={area}
              key={index}
              onDeleteClick={deleteArea}
              onToggle={toggleArea}
            />
          ))}
        </ScrollView>
      </SafeAreaView>
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
  noAreaContainer: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  noAreaText: {
    fontFamily: "Poppins-SemiBold",
    fontSize: 20,
    margin: 10,
  },
});

export default HomePage;
