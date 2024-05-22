import { View } from "react-native";
import React from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import CampaignCard from "src/components/CampaignCard";

const index = () => {
  const top = useSafeAreaInsets().top;
  return (
    <View>
      <CampaignCard />
    </View>
  );
};

export default index;
