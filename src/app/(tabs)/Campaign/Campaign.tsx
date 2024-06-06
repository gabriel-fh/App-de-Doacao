import {
  View,
  ScrollView,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
} from "react-native";
import React, { useRef, useState } from "react";
import CampaignCard from "@/components/CampaignCard";
import BackToTopButton from "@/components/BackToTopButton";
import Searchbar from "@/components/Searchbar";
import FilterSelect from "@/components/FilterSelect";
import { useSearchCampaign } from "@/hooks/Campaign/useSearchCampaigns";
import { theme } from "@/Theme/theme";

const Campaign = () => {
  const scrollViewRef = useRef<ScrollView>(null);
  const [showButton, setShowButton] = useState(false);

  const [searchParam, setSearchParam] = useState<string>("");

  const { data: campaigns, isLoading } = useSearchCampaign(searchParam);

  const screenHeight = Dimensions.get("window").height;

  const handleScroll = (event) => {
    const offsetY = event.nativeEvent.contentOffset.y;
    if (offsetY > screenHeight * 0.4) {
      setShowButton(true);
    } else {
      setShowButton(false);
    }
  };

  return (
    <View style={{ position: "relative", flex: 1 }}>
      <ScrollView
        style={styles.container}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        contentContainerStyle={{
          justifyContent: "center",
          alignItems: "center",
          paddingVertical: 20,
          paddingHorizontal: 12,
        }}
        ref={scrollViewRef}
      >
        <View style={styles.filters}>
          <Searchbar
            searchParam={searchParam}
            setSearchParam={setSearchParam}
          />

          <FilterSelect />
        </View>

        <View style={{ gap: 10, flex: 1 }}>
          {isLoading ? (
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
                paddingTop: 40,
              }}
            >
              <ActivityIndicator size="large" color={theme.primary} />
            </View>
          ) : (
            campaigns.map((item, index) => (
              <CampaignCard key={index} campaign={item} />
            ))
          )}
        </View>
      </ScrollView>
      <BackToTopButton scrollViewRef={scrollViewRef} showButton={showButton} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  filters: {
    flex: 1,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 20,
  },
  searchbar: {
    backgroundColor: "#fff",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 8,
    borderColor: "#8e98de",
    borderWidth: 2,
    borderRadius: 10,
    maxHeight: 50,
    flex: 1,
    paddingLeft: 12,
    marginBottom: 12,
  },
  textInput: {
    marginVertical: 8,
    fontSize: 16,
    flex: 1,
  },
  iconView: {
    backgroundColor: "#8e98de",
    borderRadius: 10,
    height: "110%",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 12,
  },
  itemFilter: {
    flexDirection: "row",
    gap: 8,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#8e98de",
    borderRadius: 10,
    paddingHorizontal: 16,
    maxHeight: 50,
  },
  itemText: {
    fontSize: 16,
    color: "#fff",
  },
});

export default Campaign;
