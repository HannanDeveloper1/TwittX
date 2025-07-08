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
import { SafeAreaView } from "react-native-safe-area-context";
import { ActivityIndicator, Image } from "react-native";
import { images } from "@/constants/image";

const MainLayout = () => {
  const { login, logout, isAuthentictated } = useAuth();
  const pathname = usePathname();
  const router = useRouter();
  const [loaded, error] = useFonts({
    Archicoco: require("../assets/fonts/Archicoco.otf"),
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
  });

  const [checkingAuth, setCheckingAuth] = useState(true);

  useEffect(() => {
    if (!loaded && !error) return;
    const checkAuth = async () => {
      try {
        const res: ServerResponse = await authorizeUser();
        if (res.success && res.user) {
          login(res.user);
          if (pathname.startsWith("/(auth)")) {
            router.replace("/(tabs)/");
          }
        } else {
          logout();
          if (!pathname.startsWith("/(auth)")) {
            router.replace("/sign-in");
          }
        }
      } finally {
        setCheckingAuth(false);
        SplashScreen.hideAsync();
      }
    };
    checkAuth();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loaded, error]);

  if (!loaded || checkingAuth || isAuthentictated === undefined) {
    return (
      <SafeAreaView className="flex-1 flex items-center justify-center gap-10">
        <Image source={images.logo} className="size-36" />
        <ActivityIndicator size={30} color={"#2563eb"} />
      </SafeAreaView>
    );
  }
  return <Slot />;
};

export default MainLayout;
