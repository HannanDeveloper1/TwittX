import "../global.css";
import { Slot, useRouter } from "expo-router";
import { useFonts } from "expo-font";
import {
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold,
} from "@expo-google-fonts/inter";
import { useEffect, useState } from "react";
import * as SplashScreen from "expo-splash-screen";
import { authorizeUser } from "@/lib/fetchAPI/auth";
import { Alert } from "react-native";
import { fields } from "@hookform/resolvers/ajv/src/__tests__/__fixtures__/data.js";

export default function Layout() {
  const router = useRouter();
  const [loaded, error] = useFonts({
    Archicoco: require("../assets/fonts/Archicoco.otf"),
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
  });

  const [apisCompleted, setApisCompleted] = useState(false);

  useEffect(() => {
    const fetchApis = async () => {
      const res = await authorizeUser();
      console.log(res);
      if (!res.success) {
        router.replace("/sign-in");
        setApisCompleted(false);
      } else {
        setApisCompleted(false);
      }
    };
    fetchApis();
    if ((apisCompleted && loaded) || (!apisCompleted && error)) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }
  return <Slot />;
}
