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
import { Campaign as TypeCampaign, Item } from "@/@types/app";

const Campaign = () => {

  const scrollViewRef = useRef<ScrollView>(null);
  const [showButton, setShowButton] = useState(false);
  const [donationItems, setDonationItems] = useState<Item[]>([]);
  const [searchParam, setSearchParam] = useState<string>("");

  const { data: campaigns, isLoading } = useSearchCampaign(
    searchParam,
    donationItems
  );

  const screenHeight = Dimensions.get("window").height;

  const handleScroll = (event) => {
    const offsetY = event.nativeEvent.contentOffset.y;
    if (offsetY > screenHeight * 0.4) {
      setShowButton(true);
    } else {
      setShowButton(false);
    }
  };

  const selectItem = (newItem: Item) => {
    // Se o item já estiver na lista, remove ele se não adiciona
    if (donationItems.includes(newItem)) {
      setDonationItems((prevItems) =>
        prevItems.filter((item) => item !== newItem)
      );
      return;
    } else {
      setDonationItems((prevItems) => [...prevItems, newItem]);
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

          <FilterSelect donationItems={donationItems} selectItem={selectItem} />
        </View>

        <View style={{ gap: 10, flex: 1, height: isLoading && 500 }}>
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
            campaigns?.map((item, index) => (
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
});

export default Campaign;
