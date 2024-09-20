import React from "react";
import { TouchableOpacity, View, Text, StyleSheet } from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";

function ActionButton({
  profileTabs,
  index,
  tab,
}: {
  profileTabs: any;
  index: number;
  tab: any;
}) {
  return (
    <TouchableOpacity
      style={[
        styles.item,
        { width: "100%", paddingHorizontal: 20 },
        index < profileTabs.length - 1 && {
          borderBottomWidth: 1,
          borderBottomColor: "#ddd",
        },
      ]}
      onPress={() => tab?.onPress()}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          gap: 20,
        }}
      >
        {tab.icon}
        <Text
          style={{
            fontFamily: "Montserrat_600SemiBold",
            fontSize: 16,
          }}
        >
          {tab.title}
        </Text>
      </View>
      {<FontAwesome name={"angle-right"} size={30} color={"#666"} />}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  item: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 20,
  },
});

export default ActionButton;
