import {
  StyleSheet,
  View,
  SafeAreaView,
  Image,
  Text,
  Alert,
  TouchableOpacity,
  Linking,
} from "react-native";
import { useState, useEffect } from "react";
import React from "react";
import SwitchSelector from "react-native-switch-selector";
import Logo from "../../assets/logo.png";
import Line from "../../assets/line.png";
import Google from "../../assets/services/google.png";
import BasicButton from "../components/BasicButton";
import BasicInput from "../components/BasicInput";
import { useFonts } from "expo-font";
import axios from "axios";
import { setAuthToken } from "../api/setAuthToken";
import { storeData, getData } from "../api/handleToken";
import { WebView } from "react-native-webview";
import BasicWebView from "../components/BasicWebView";

const loginWithGoogleUrl = "/auth/login/google?callback=rn";
const registerWithGoogleUrl = "/auth/register/google?callback=registerSucess";

const LoginPage = ({ navigation }) => {
  const [user, setUser] = useState("");
  const [pwd, setPwd] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [mySwitch, setMySwitch] = useState(0);
  const [url, setUrl] = useState("");
  const [webView, setWebView] = useState(false);
  const [uri, setUri] = useState(
    mySwitch === 0 ? loginWithGoogleUrl : registerWithGoogleUrl
  );

  const [fontsLoaded] = useFonts({
    "Poppins-Regular": require("../../assets/fonts/Poppins-Regular.ttf"),
  });

  const handleErrorMessage = (msg) => {
    setErrMsg(msg);
    setTimeout(() => {
      setErrMsg("");
    }, 3000);
  };

  const handleLogin = () => {
    axios
      .post(`/auth/login?username=${user}&password=${pwd}`)
      .then((res) => {
        const userData = {
          user: user,
          token: res.data.token,
        };
        storeData(res.data.token);
        setAuthToken(res.data.token);
        setUser("");
        setPwd("");
        axios
          .get("/admin/users")
          .then((res) => {
            navigation.navigate("Admin");
          })
          .catch((err) => {
            navigation.navigate("App");
          });
      })
      .catch((err) => {
        if (err.response.status === 401) {
          handleErrorMessage("Username or password incorrect");
        } else {
          handleErrorMessage("Error, please retry");
        }
      });
  };

  const handleRegister = () => {
    if (user === "" || pwd === "") {
      handleErrorMessage("Username or password incorrect");
      return;
    }
    axios
      .post(`/auth/register`, {
        username: user,
        password: pwd,
      })
      .then((res) => {
        Alert.alert("Register", "Successfully registered, please log in", [
          {
            text: "OK",
            onPress: () => {
              setUser("");
              setPwd("");
              setMySwitch(0);
            },
          },
        ]);
      })
      .catch((err) => {
        if (!err.response) {
          handleErrorMessage("Connection to server failed");
        } else if (err.response.status === 405) {
          handleErrorMessage(err.response.data);
        } else {
          handleErrorMessage("Connection to server failed");
        }
        console.log(err);
      });
  };

  const handleUserInput = (text) => setUser(text);
  const handlePwdInput = (text) => setPwd(text);

  const checkToken = async () => {
    const token = await getData();
    if (token) {
      navigation.navigate("App");
    }
  };

  useEffect(() => {
    checkToken();
  }, []);

  useEffect(() => {
    setUri(mySwitch === 0 ? loginWithGoogleUrl : registerWithGoogleUrl);
  }, [mySwitch]);

  useEffect(() => {
    if (url.includes("/auth/google/registerSucess")) {
      setWebView(false);
      setMySwitch(0);
      Alert.alert("Register", "Successfully registered, please log in");
      setUrl("");
    }
    if (url.includes("http://localhost:8080")) {
      setWebView(false);
      setUri(url.split("http://localhost:8080")[1]);
      setWebView(true);
    }

    if (url.includes("?jwt=")) {
      let jwt = url.split("?jwt=")[1];
      jwt = jwt.split("#")[0];

      setWebView(false);
      storeData(jwt);
      setAuthToken(jwt);
      setUser("");
      setPwd("");
      setUrl("");
      navigation.navigate("App");
    }
  }, [url]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <SafeAreaView style={styles.container}>
      {webView && (
        <BasicWebView
          uri={uri}
          onUrlChange={(value) => setUrl(value)}
          onExitClick={() => setWebView(false)}
        />
      )}
      <Image source={Logo} style={styles.logo} />
      <SwitchSelector
        initial={0}
        textColor={"black"}
        selectedColor={"white"}
        fontSize={20}
        buttonColor={"#4461F2"}
        borderColor={"#4461F2"}
        backgroundColor="#f6f6f6"
        textStyle={{ fontFamily: "Poppins-Regular" }}
        selectedTextStyle={{ fontFamily: "Poppins-Regular" }}
        style={styles.switch}
        hasPadding
        onPress={(value) => setMySwitch(value)}
        value={mySwitch}
        options={[
          { label: "Sign In", value: 0 },
          { label: "Register", value: 1 },
        ]}
        testID="SwitchSelector"
        accessibilityLabel="SwitchSelector"
      />
      <Text style={styles.errorText}>{errMsg}</Text>
      <View style={styles.inputContainer}>
        <BasicInput
          placeholder="Enter username"
          onChangeText={handleUserInput}
          value={user}
        />
        <BasicInput
          secureTextEntry={true}
          placeholder="Password"
          onChangeText={handlePwdInput}
          value={pwd}
        />
      </View>
      <BasicButton
        title={mySwitch === 0 ? "Sign in" : "Register"}
        onPress={mySwitch === 0 ? handleLogin : handleRegister}
      />
      <View style={styles.signInWithContainer}>
        <Image source={Line} style={styles.line} />
        <Text style={styles.signInWithText}>or continue with</Text>
        <Image source={Line} style={styles.line} />
      </View>
      <TouchableOpacity
        style={styles.googleButtonContainer}
        onPress={() => {
          setWebView(true);
          setUri(mySwitch === 0 ? loginWithGoogleUrl : registerWithGoogleUrl);
        }}
      >
        <Image source={Google} style={styles.googleIcon} />
      </TouchableOpacity>
      <BasicButton
        title={"Change server adress"}
        onPress={() => navigation.navigate("Adress", { initialRoute: "Login" })}
        customStyle={{ backgroundColor: "black", margin: 10 }}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
  },
  inputContainer: {
    margin: 20,
  },
  switch: {
    width: 300,
    margin: 10,
  },
  logo: {
    width: 200,
    height: 70,
    margin: 40,
  },
  signInWithContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    margin: 10,
  },
  signInWithText: {
    fontFamily: "Poppins-Regular",
    margin: 8,
  },
  errorText: {
    fontFamily: "Poppins-Regular",
    color: "red",
    margin: 8,
  },
  line: {
    width: 75,
    height: 2,
  },
  googleButtonContainer: {
    height: 50,
    width: 250,
    backgroundColor: "#ffffff",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#dddfdd",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  googleIcon: {
    height: 25,
    width: 75,
  },
});

export default LoginPage;
