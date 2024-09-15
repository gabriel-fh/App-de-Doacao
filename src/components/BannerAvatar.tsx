import { View, Text, StyleSheet } from "react-native";
import React from "react";
import CacheImage from "./CacheImage";

type BannerAvatarProps = {
  banner: string;
  avatar: string;
  name: string;
};

const BannerAvatar = (campaingInfo: BannerAvatarProps) => {
  const { avatar, banner, name } = campaingInfo;

  return (
    <>
      <CacheImage
        source={{ uri: banner }}
        style={styles.banner}
        resizeMode="cover"
      />
      <View style={styles.textImage}>
        <CacheImage
          source={{ uri: avatar }}
          style={styles.avatar}
          resizeMode="contain"
        />
        <Text style={styles.title}>{name}</Text>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  banner: {
    height: 200,
    width: "100%",
  },
  textImage: {
    left: 0,
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    width: "100%",
    paddingHorizontal: 12,
  },
  avatar: {
    height: 90,
    width: 90,
    borderRadius: 50,
    borderWidth: 3.5,
    borderColor: "#f3f3f2",
    position: "absolute",
    top: -35,
    left: 15,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    fontFamily: "Montserrat_600SemiBold",
    marginTop: 70,
  },
});

export default BannerAvatar;
