import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { useEffect, useState } from "react";
import axios from "axios";
import discordImg from "../../assets/discord.png";
import twitterImg from "../../assets/twitter.png";
import youtubeImg from "../../assets/youtube.png";
import instagramImg from "../../assets/instagram.png";

const Boxes = ({ navigation }) => {

  useEffect(() => {
    axios
      .get("/service/services")
      .then((res) => {
        setLocalServices(res.data);
        setLoading(false);
      })
      .catch((err) => {
        if (err.response.data === "Unauthorized") {
          localStorage.removeItem("token");
          navigate("/login");
        }
        setLoading(false);
        setError(true);
        console.log(err);
      });
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView style={stylesGrid.scrollContainer}>
        <View style={stylesGrid.sectionContainer}>
          <TouchableOpacity
            onPress={() => navigation.navigate("AREA Instagram")}
          >
            <View style={stylesGrid.boxInstagram}>
              <View style={stylesGrid.inBoxContainer}>
                <Image
                  style={{ width: 40, height: 40, tintColor: "white" }}
                  source={instagramImg}
                />
                <Text style={stylesGrid.titleText}>Instagram</Text>
              </View>
              <TouchableOpacity>
                <View style={stylesGrid.signInButton}>
                  <Text style={stylesGrid.titleText}>Sign In</Text>
                </View>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate("AREA Twitter")}>
            <View style={stylesGrid.boxTwitter}>
              <View style={stylesGrid.inBoxContainer}>
                <Image
                  style={{ width: 40, height: 40, tintColor: "white" }}
                  source={twitterImg}
                />
                <Text style={stylesGrid.titleText}>Twitter</Text>
              </View>
              <TouchableOpacity>
                <View style={stylesGrid.signInButton}>
                  <Text style={stylesGrid.titleText}>Sign In</Text>
                </View>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate("AREA Discord")}>
            <View style={stylesGrid.boxDiscord}>
              <View style={stylesGrid.inBoxContainer}>
                <Image
                  style={{ width: 40, height: 40, tintColor: "white" }}
                  source={discordImg}
                />
                <Text style={stylesGrid.titleText}>Discord</Text>
              </View>
              <TouchableOpacity>
                <View style={stylesGrid.signInButton}>
                  <Text style={stylesGrid.titleText}>Sign In</Text>
                </View>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate("AREA YoutTube")}
          >
            <View style={stylesGrid.boxYoutube}>
              <View style={stylesGrid.inBoxContainer}>
                <Image
                  style={{ width: 40, height: 40, tintColor: "white" }}
                  source={youtubeImg}
                />
                <Text style={stylesGrid.titleText}>YouTube</Text>
              </View>
              <TouchableOpacity>
                <View style={stylesGrid.signInButton}>
                  <Text style={stylesGrid.titleText}>Sign In</Text>
                </View>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const stylesGrid = StyleSheet.create({
  scrollContainer: {
    flex: 1,
  },
  signInButton: {
    borderWidth: 2,
    borderRadius: 10,
    borderColor: "white",
    width: 100,
    margin: 10,
    alignItems: "center",
  },
  sectionContainer: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
  },
  inBoxContainer: {
    flex: 1,
    flexDirection: "column",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
  },
  boxTwitter: {
    marginTop: 20,
    marginBottom: 20,
    width: 250,
    height: 150,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#00ACEE",
    borderRadius: 25,
  },
  boxYoutube: {
    marginTop: 20,
    marginBottom: 20,
    width: 250,
    height: 150,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FF3445",
    borderRadius: 25,
  },
  boxInstagram: {
    marginTop: 20,
    marginBottom: 20,
    width: 250,
    height: 150,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#E1306C",
    borderRadius: 25,
  },
  boxDiscord: {
    marginTop: 20,
    marginBottom: 20,
    width: 250,
    height: 150,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#7289da",
    borderRadius: 25,
  },
  titleText: {
    fontWeight: "bold",
    fontSize: 25,
    color: "white",
  },
});

export default Boxes;
