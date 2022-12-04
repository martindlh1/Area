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
  const AreaDiscord = ({ navigation }) => {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView style={stylesGrid.scrollContainer}>
          <View style={stylesGrid.sectionContainer}>
            <TouchableOpacity onPress={() => navigation.navigate("AREA Discord")}>
              <View style={stylesGrid.boxDiscord}>
                <View style={stylesGrid.inBoxContainer}>
                  <Image
                    style={{ width: 40, height: 40, tintColor: "white" }}
                    source={discordImg}
                  />
                  <Text style={stylesGrid.titleText}>Discord</Text>
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
  
  export default AreaDiscord;
  