import {
  Alert,
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import AddButton from "../components/AddButton";
import { useFonts } from "expo-font";
import BasicSlider from "../components/BasicSlider";
import BasicButton from "../components/BasicButton";
import { useDispatch, useSelector } from "react-redux";
import {
  removeAction,
  removeReaction,
  setName,
  setReload,
  setTimer,
} from "../redux/areaSlice";
import Carousel from "react-native-snap-carousel";
import ActionCard from "../components/Action/ActionCard";
import axios from "axios";
import { resetArea } from "../redux/areaSlice";
import BasicAlertPrompt from "../components/BasicAlertPrompt";
import Header from "../components/Header";

export default function CreatePage({ navigation }) {
  const [fontsLoaded] = useFonts({
    "Poppins-Regular": require("../../assets/fonts/Poppins-Regular.ttf"),
    "Poppins-Medium": require("../../assets/fonts/Poppins-Medium.ttf"),
  });

  const [actionIndex, setActionIndex] = useState(0);
  const [reactionIndex, setReactionIndex] = useState(0);

  const name = useSelector((state) => state.area.name);
  const timer = useSelector((state) => state.area.timer);
  const actions = useSelector((state) => state.area.actions);
  const reactions = useSelector((state) => state.area.reactions);
  const dispatch = useDispatch();
  const [alertVisible, setAlertVisible] = useState(false);

  if (!fontsLoaded) {
    return null;
  }

  const submitArea = () => {
    if (name.length <= 0) {
      return;
    }
    const area = {
      name: name,
      interval: timer * 1000,
      actions: actions.map((action) => ({
        id: action.actionId,
        serviceId: action.serviceId,
        param: action.param,
      })),
      reactions: reactions.map((reaction) => ({
        id: reaction.actionId,
        serviceId: reaction.serviceId,
        param: reaction.param,
      })),
    };
    axios
      .post("/areas", area)
      .then((res) => {
        dispatch(resetArea());
        dispatch(setReload(true));
        navigation.navigate("Home");
        setAlertVisible(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const createArea = () => {
    if (actions.length <= 0 || reactions.length <= 0) {
      return;
    }
    setAlertVisible(true);
  };

  return (
    <>
      <BasicAlertPrompt
        title="AREA Name"
        visible={alertVisible}
        onCancel={() => setAlertVisible(false)}
        onConfirm={submitArea}
        onChangeText={(value) => dispatch(setName(value))}
        textValue={name}
      />
      <SafeAreaView style={styles.container}>
        <Header
          navigation={navigation}
          title={"Create"}
          profile={false}
          back={false}
          getBack={"Home"}
        />
        <View style={styles.contentContainer}>
          <View style={styles.actionContainer}>
            <Text style={styles.subTitleText}>Actions</Text>
            <View style={styles.actionCarouselView}>
              <Carousel
                layout="default"
                data={actions}
                onSnapToItem={(index) => setActionIndex(index)}
                sliderWidth={350}
                sliderHeight={200}
                itemWidth={270}
                itemHeight={100}
                style={styles.actionCarousel}
                renderItem={({ item, index }) => (
                  <TouchableOpacity
                    onPress={() =>
                      dispatch(removeAction([item.id, item.serviceId]))
                    }
                  >
                    <ActionCard
                      action={{ desc: item.desc }}
                      service={{ color: item.color, logo: item.logo }}
                      style={styles.actionCarouselItem}
                      logo
                    />
                  </TouchableOpacity>
                )}
              />
            </View>
            <AddButton
              type="action"
              onPress={() =>
                navigation.navigate("Services", { type: "action" })
              }
            />
          </View>
          <View style={styles.actionContainer}>
            <Text style={styles.subTitleText}>Reactions</Text>
            <View style={styles.actionCarouselView}>
              <Carousel
                layout="default"
                data={reactions}
                onSnapToItem={(index) => setReactionIndex(index)}
                sliderWidth={350}
                sliderHeight={200}
                itemWidth={270}
                itemHeight={100}
                style={styles.actionCarousel}
                renderItem={({ item, index }) => (
                  <TouchableOpacity
                    onPress={() =>
                      dispatch(removeReaction([item.id, item.serviceId]))
                    }
                  >
                    <ActionCard
                      action={{ desc: item.desc }}
                      service={{ color: item.color, logo: item.logo }}
                      style={styles.actionCarouselItem}
                      logo
                    />
                  </TouchableOpacity>
                )}
              />
            </View>
            <AddButton
              type="reaction"
              onPress={() =>
                navigation.navigate("Services", { type: "reaction" })
              }
            />
          </View>
          <View style={styles.actionContainer}>
            <Text style={styles.subTitleText}>Interval</Text>
            <BasicSlider
              value={timer}
              onValueChange={(value) => dispatch(setTimer(value))}
            />
            <Text style={styles.timerText}>{timer} seconds</Text>
          </View>
          <BasicButton
            title="Create AREA!"
            onPress={createArea}
            customStyle={{ margin: 6 }}
          />
        </View>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-around",
    backgroundColor: "#fff",
  },
  contentContainer: {
    flex: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-around",
  },
  actionContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  subTitleText: {
    fontFamily: "Poppins-Regular",
    fontSize: 20,
    color: "#474554",
    margin: 4,
  },
  timerText: {
    fontFamily: "Poppins-Regular",
  },
  actionCarouselView: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  actionCarousel: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "black",
  },
  actionCarouselItem: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: 125,
    width: 270,
  },
});
