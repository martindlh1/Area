import { StyleSheet, Text, View, SafeAreaView, ScrollView } from "react-native";
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import ActionCard from "../components/Action/ActionCard";
import ParamsList from "../components/Param/ParamsList";
import { removeData } from "../api/handleToken";
import BasicButton from "../components/BasicButton";
import { addAction, addReaction, setReload } from "../redux/areaSlice";
import Header from "../components/Header";
import Loading from "../components/Loading";
import Error from "../components/Error";

export default function SingleActionPage({ route, navigation }) {
  const { service, action, type } = route.params;
  const [params, setParams] = useState([]);
  const [inputParams, setInputParams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    axios
      .get(`/service/${service.name}/${type}/${action.id}`)
      .then((res) => {
        setParams(res.data.paramSchem);
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
  }, []);

  const setInputParam = (inputParam, index) => {
    let tmp_params = inputParams.map((i) => i);

    tmp_params[index] = inputParam;

    setInputParams(tmp_params);
  };

  const checkParams = () => {
    for (const inputParam of inputParams) {
      if (inputParam !== "") {
        return false;
      }
    }
    return true;
  };

  const addReduxAction = () => {
    if (checkParams()) {
      setError(true);
      setTimeout(() => setError(false), 2000);
    } else {
      type === "action"
        ? dispatch(
            addAction({
              logo: service.logo,
              color: service.color,
              actionId: action.id,
              desc: action.desc,
              serviceId: service.id,
              param: inputParams,
            })
          )
        : dispatch(
            addReaction({
              logo: service.logo,
              color: service.color,
              actionId: action.id,
              desc: action.desc,
              serviceId: service.id,
              param: inputParams,
            })
          );
      navigation.navigate("CreateForm");
    }
  };

  if (loading) {
    return <Loading />;
  } else if (error) {
    return <Error />;
  } else {
    return (
      <SafeAreaView style={styles.container}>
        <Header
          navigation={navigation}
          title={service.title}
          profile={false}
          back={true}
          onBackPress={() =>
            navigation.navigate("SingleService", {
              service: service,
              action: action,
              type: type,
            })
          }
        />
        <ScrollView contentContainerStyle={{ alignItems: "center" }}>
          <ActionCard service={service} action={action} />
          <ParamsList
            navigation={navigation}
            service={service}
            params={params}
            setParam={setInputParam}
            paramValue={inputParams}
          />

          <BasicButton title="Confirm" onPress={addReduxAction} />
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    backgroundColor: "#fff",
  },
});
