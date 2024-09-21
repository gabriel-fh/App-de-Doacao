import React from "react";
import {
  View,
  ScrollView,
  TouchableOpacity,
  Text,
  StyleSheet,
} from "react-native";
import Badge from "../Badge";
import { CampaignById, ItemById } from "@/@types/app";
import { theme } from "@/Theme/theme";

function AvailableItems({
  parsedCampaignInfo,
  donationItems,
  selectItem,
}: {
  parsedCampaignInfo: CampaignById;
  donationItems: ItemById[];
  selectItem: (newItem: ItemById) => void;
}) {
    
  return (
    <View>
      <Text style={styles.subTitle}>Itens disponíveis para a doação: </Text>
      <ScrollView style={{ maxHeight: 190 }} nestedScrollEnabled={true}>
        <View style={styles.badgeContainer}>
          {parsedCampaignInfo.necessary_items.map((item) => (
            <TouchableOpacity key={item?.id} onPress={() => selectItem(item)}>
              <Badge
                text={item.name}
                selected={donationItems.some((i) => i.id === item.id)}
              />
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 12,
    paddingVertical: 20,
    gap: 20,
  },
  title: {
    fontSize: 20,
    marginBottom: 4,
    fontFamily: "Montserrat_600SemiBold",
  },
  userContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginTop: 7,
  },
  avatar: {
    height: 40,
    width: 40,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: theme.primary,
  },
  username: {
    fontSize: 14,
    fontFamily: "Montserrat_600SemiBold",
  },
  subTitle: {
    fontSize: 17,
    fontFamily: "Montserrat_600SemiBold",
  },
  badgeContainer: {
    marginTop: 10,
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },
  item: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 10,
    marginTop: 10,
  },
  text: {
    fontSize: 16,
    fontFamily: "Montserrat_500Medium",
  },
  iconText: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
});

export default AvailableItems;
