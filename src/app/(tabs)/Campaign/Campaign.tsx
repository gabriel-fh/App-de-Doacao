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
  const DATA: TypeCampaign[] = [
    {
      id: 1,
      name: "Campanha 1",
      description: "Descrição da campanha 1",
      avatar: "https://picsum.photos/150",
      donated_items_quantity: 10,
      donated_items_objective: 100,
      date: "2021-09-01",
      banner: "https://picsum.photos/500/210",
    },
    {
      id: 2,
      name: "Campanha 2",
      description: "Descrição da campanha 2",
      avatar: "https://picsum.photos/150",
      donated_items_quantity: 20,
      donated_items_objective: 100,
      date: "2021-05-15",
      banner: "https://picsum.photos/500/210",
    },
    {
      id: 3,
      name: "Campanha 3",
      description: "Descrição da campanha 3",
      avatar: "https://picsum.photos/150",
      donated_items_quantity: 30,
      donated_items_objective: 100,
      date: "2021-11-30",
      banner: "https://picsum.photos/500/210",
    },
    {
      id: 4,
      name: "Campanha 4",
      description: "Descrição da campanha 4",
      avatar: "https://picsum.photos/150",
      donated_items_quantity: 40,
      donated_items_objective: 100,
      date: "2021-10-20",
      banner: "https://picsum.photos/500/210",
    },
    {
      id: 5,
      name: "Campanha 5",
      description: "Descrição da campanha 5",
      avatar: "https://picsum.photos/150",
      donated_items_quantity: 50,
      donated_items_objective: 100,
      date: "2021-08-05",
      banner: "https://picsum.photos/500/210",
    },
  ];

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
            DATA?.map((item, index) => (
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
