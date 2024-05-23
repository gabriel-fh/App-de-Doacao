import { View, StyleSheet, ScrollView } from "react-native";
import React from "react";
import UserInfos from "@/components/UserInfos";

const Profile = () => {
  return (
    <View style={{ position: "relative", flex: 1 }}>
      <ScrollView
        style={styles.container}
        scrollEventThrottle={16}
        contentContainerStyle={{
          justifyContent: "center",
          alignItems: "center",
          paddingVertical: 20,
          paddingHorizontal: 12,
        }}
      >
        <UserInfos />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default Profile;
