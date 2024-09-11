import { useEffect, useState } from "react";
import { showMessage } from "react-native-flash-message";
import NetInfo from "@react-native-community/netinfo";
import { onlineManager, QueryClient } from "@tanstack/react-query";

export const useVerifyConnetion = () => {
  const [isConnected, setIsConnected] = useState(true);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      onlineManager.setOnline(state.isConnected);
      setIsConnected(state.isConnected);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const showFlashMessage = () => {
    showMessage({
      message: "Sem conexão com a internet",
      type: "warning",
      hideStatusBar: true,
      autoHide: false,
      hideOnPress: true,
      style: {
        backgroundColor: "#FFA500",
        height: 60,
        marginTop: 20,
      },
      floating: true,
      titleStyle: {
        color: "white",
        fontSize: 18,
        fontFamily: "Montserrat_600SemiBold",
        marginTop: 7,
        textAlign: "center",
      },
    });
  };

  return { isConnected, showFlashMessage };
};
