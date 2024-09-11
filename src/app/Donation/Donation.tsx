import { Text, StyleSheet, ScrollView, View } from "react-native";
import React, { useState } from "react";
import { useLocalSearchParams } from "expo-router";
import FloatButton from "@/components/FloatButton";
import Picker from "@/components/Picker";
import { CampaignById, ItemById } from "@/@types/app";
import { useMutateDonation } from "@/hooks/Donation/useMutateDonation";
import CacheImage from "@/components/CacheImage";
import DonationItem from "@/components/Donation/DonationItem";
import useKeyboard from "@/hooks/Keyboard/useKeyboard";
import useDonantion from "@/hooks/Donation/useDonantion";
import Observation from "@/components/Donation/Observation";
import DatePicker from "@/components/Donation/DatePicker";
import AvailableItems from "@/components/Donation/AvailableItems";
import AddressInfo from "@/components/Donation/AddressInfo";

type routeParams = {
  necessary_items: string | string[];
  selectedDate: string;
  campaignInfo: string;
};

const Donation = () => {
  const { campaignInfo } = useLocalSearchParams<routeParams>();
  const parsedCampaignInfo: CampaignById = JSON.parse(campaignInfo);

  const [donationItems, setDonationItems] = useState<ItemById[]>([]);
  const [showCalendar, setShowCalendar] = useState(false);
  const [commentary, setCommentary] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [selectedDate, setSelectedDate] = useState();

  const { mutate: mutateDonation } = useMutateDonation();

  const { isKeyboardOpen } = useKeyboard();

  const { selectItem, deleteItem, formatedDate, handleConfirm } = useDonantion({
    selectedDate,
    donationItems,
    parsedCampaignInfo,
    setErrorMsg,
    mutateDonation,
    setDonationItems,
  });

  return (
    <View style={{ position: "relative", flex: 1 }}>
      <ScrollView style={{ backgroundColor: "#fff" }}>
        <View style={styles.container}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 10,
            }}
          >
            <CacheImage
              source={{ uri: parsedCampaignInfo.avatar }}
              style={styles.avatar}
              resizeMode="contain"
            />
            <Text style={styles.title}>{parsedCampaignInfo.name}</Text>
          </View>
          <View style={{ gap: 25 }}>
            <View style={{ gap: 10 }}>
              <AvailableItems
                donationItems={donationItems}
                parsedCampaignInfo={parsedCampaignInfo}
                selectItem={selectItem}
              />

              {donationItems.length > 0 && (
                <ScrollView
                  style={{
                    maxHeight: 190,
                    marginTop: 10,
                    backgroundColor: "#E2E8F0",
                    paddingBottom: 10,
                    borderRadius: 10,
                  }}
                  nestedScrollEnabled={true}
                >
                  {donationItems.map((item, idx) => (
                    <React.Fragment key={idx}>
                      <DonationItem
                        item={item}
                        deleteItem={deleteItem}
                        setDonationItems={setDonationItems}
                      />
                    </React.Fragment>
                  ))}
                </ScrollView>
              )}
            </View>

            <Observation
              commentary={commentary}
              setCommentary={setCommentary}
            />

            <View
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                gap: 20,
              }}
            >
              <DatePicker
                formatedDate={formatedDate}
                selectedDate={selectedDate}
                setSelectedDate={setSelectedDate}
                showCalendar={showCalendar}
                setShowCalendar={setShowCalendar}
              />

              <Picker
                title="Hora"
                placeholder="HH:MM"
                icon="clock-o"
                iconSize={20}
                onPress={() => console.log("batom")}
              />
            </View>

            {parsedCampaignInfo.addressess &&
              parsedCampaignInfo.addressess.map((address, idx) => {
                return <AddressInfo addressess={address} />;
              })}
          </View>
        </View>
      </ScrollView>
      {!isKeyboardOpen && (
        <View
          style={{
            height: errorMsg ? 95 : "auto",
            display: "flex",
            backgroundColor: "#ffffff",
          }}
        >
          {errorMsg && (
            <Text
              style={{
                color: "red",
                fontFamily: "Montserrat_500Medium",
                textAlign: "center",
                paddingHorizontal: 12,
              }}
            >
              {errorMsg}
            </Text>
          )}
          <FloatButton onPress={() => handleConfirm()} text={"Enviar"} />
        </View>
      )}
    </View>
  );
};

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
    borderColor: "#0D62AD",
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

export default Donation;
