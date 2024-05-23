import { Animated, ScrollView, TouchableHighlight } from "react-native";
import React, { useEffect, useRef } from "react";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";

const BackToTopButton = ({
  scrollViewRef,
  showButton,
}: {
  scrollViewRef: React.RefObject<ScrollView>;
  showButton: boolean;
}) => {
  const buttonScale = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (showButton) {
      Animated.timing(buttonScale, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(buttonScale, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  }, [showButton, buttonScale]);

  const handlePress = () => {
    scrollViewRef.current?.scrollTo({
      y: 0,
      animated: true,
    });
  };

  return (
    <TouchableHighlight onPress={handlePress}>
      <Animated.View
        style={{
          backgroundColor: "#8e98de",
          padding: 10,
          height: 45,
          width: 45,
          position: "absolute",
          bottom: 10,
          right: 10,
          borderRadius: 100,
          alignItems: "center",
          justifyContent: "center",
          transform: [{ scale: buttonScale }],
        }}
      >
        <FontAwesome5 name="arrow-up" size={20} color="#fff" />
      </Animated.View>
    </TouchableHighlight>
  );
};

export default BackToTopButton;
