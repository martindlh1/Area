import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    Image,
    TouchableOpacity,
    SafeAreaView,
  } from "react-native";
  import discordImg from "../../assets/discord.png";
  import twitterImg from "../../assets/twitter.png";
  import youtubeImg from "../../assets/youtube.png";
  import instagramImg from "../../assets/instagram.png";
  
  const AreaYoutube = ({ navigation }) => {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView style={stylesGrid.scrollContainer}>
          <View style={stylesGrid.sectionContainer}>
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
    titleText: {
      fontWeight: "bold",
      fontSize: 25,
      color: "white",
    },
  });
  
  export default AreaYoutube;
  