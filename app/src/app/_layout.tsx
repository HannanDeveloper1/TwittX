import "../global.css";
import { Slot, usePathname, useRouter } from "expo-router";
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
import { useAuth } from "@/state/authStore";
import { Alert } from "react-native";
const MainLayout = () => {
  const { login, logout, isAuthenticated } = useAuth();
  const pathname = usePathname();
  const router = useRouter();

  const [fetching, setFetching] = useState(true);

  const [loaded, error] = useFonts({
    Archicoco: require("../assets/fonts/Archicoco.otf"),
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
  });

  useEffect(() => {
    const checkAuth = async () => {
      setFetching(true);
      try {
        const res: ServerResponse = await authorizeUser();
        if (res.success) {
          login(res.user);
          if (pathname.startsWith("/(auth)") || pathname === "/onboarding") {
            router.replace("/(tabs)/");
          }
        } else {
          logout();
          if (!pathname.startsWith("/(auth)") && pathname !== "/onboarding") {
            router.replace("/(auth)");
          }
        }
      } catch (error) {
        Alert.alert("Error", "Something went wrong, please try again later");
      } finally {
        setFetching(false);
      }
    };

    checkAuth();

    if (!fetching && (loaded || error)) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if ((!loaded && !error && !fetching) || isAuthenticated === undefined) {
    return null;
  }

  return <Slot />;
};

export default MainLayout;
