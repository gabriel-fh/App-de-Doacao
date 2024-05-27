import {
  Text,
  StyleSheet,
  ScrollView,
  View,
  Image,
  TouchableOpacity,
  TextInput,
  Keyboard,
} from "react-native";
import React, { useEffect, useState } from "react";
import AddDecrease from "@/components/AddDecrease";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import IconText from "@/components/IconText";
import { router, useLocalSearchParams } from "expo-router";
import FloatButton from "@/components/FloatButton";

type routeParams = {
  items: string | string[];
  selectedDate: string;
  campaignInfo: string;
};

const Donation = () => {
  const { items, selectedDate, campaignInfo } =
    useLocalSearchParams<routeParams>();

  const itemsArray = Array.isArray(items) ? items : items.split(",");
  const [donationItems, setDonationItems] = useState(itemsArray);
  const parsedCampaignInfo = JSON.parse(campaignInfo);

  const [commentary, setCommentary] = useState("");
  const [isKeyboardOpen, setIsKeyboardOpen] = useState(false);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      () => {
        setIsKeyboardOpen(true);
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => {
        setIsKeyboardOpen(false);
      }
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);
  const delteItem = (item) => {
    setDonationItems((prevItems) => prevItems.filter((i) => i !== item));
    if (donationItems.length === 0) {
      router.canGoBack();
    }
  };

  return (
    <View style={{ position: "relative", flex: 1 }}>
      <ScrollView style={{ backgroundColor: "#fff" }}>
        <View style={styles.container}>
          <View>
            <Text style={styles.title}>{parsedCampaignInfo.name}</Text>
            <View style={styles.userContainer}>
              <Image
                source={{ uri: parsedCampaignInfo.institution.image }}
                style={styles.avatar}
                resizeMode="contain"
              />
              <Text style={styles.username}>
                {parsedCampaignInfo.institution.name}
              </Text>
            </View>
          </View>
          <View>
            <Text style={styles.subTitle}>Itens para a doação</Text>
            <ScrollView
              style={{
                maxHeight: 277,
                marginTop: 10,
                backgroundColor: "#eeeeee",
                paddingBottom: 10,
                borderRadius: 10,
              }}
              nestedScrollEnabled={true}
            >
              {donationItems.map((item, idx) => (
                <View key={idx} style={styles.item}>
                  <Text
                    style={[styles.text, { maxWidth: "50%" }]}
                    numberOfLines={2}
                  >
                    {item}
                  </Text>
                  <View
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      gap: 50,
                      alignItems: "center",
                    }}
                  >
                    <View>
                      <AddDecrease handleRemoveItem={() => delteItem(item)} />
                    </View>
                    <TouchableOpacity onPress={() => delteItem(item)}>
                      <FontAwesome name="trash" color={"#ff0000"} size={20} />
                    </TouchableOpacity>
                  </View>
                </View>
              ))}
            </ScrollView>
          </View>
          <View>
            <Text style={styles.subTitle}>Observações:</Text>
            <View>
              <TextInput
                placeholder={"Observações..."}
                style={{
                  flex: 1,
                  marginRight: 4,
                  borderWidth: 2,
                  padding: 10,
                  marginTop: 10,
                  borderColor: "#0D62AD",
                  borderRadius: 10,
                  textAlignVertical: "top",
                }}
                placeholderTextColor="#999"
                keyboardType={"default"}
                value={commentary}
                onChangeText={(text) => setCommentary(text)}
                selectionColor={"#0D62AD"}
                numberOfLines={5}
                multiline={true}
                maxLength={250}
              />
            </View>
          </View>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              gap: 20,
            }}
          >
            <View style={styles.iconText}>
              <FontAwesome name="calendar" size={20} color={"#0D62AD"} />
              <Text style={styles.text}>
                {typeof selectedDate === "string"
                  ? selectedDate.split("-").reverse().join("/")
                  : ""}
              </Text>
            </View>
            <View style={styles.iconText}>
              <FontAwesome name="clock-o" size={22} color={"#0D62AD"} />
              <Text style={styles.text}>HH:MM</Text>
            </View>
          </View>
          <View>
            <IconText text="R. Gastão Gonçalves, 79 - Santa Rosa, Niterói - RJ, 24240-030">
              <MaterialIcons name="location-pin" size={30} color="#0D62AD" />
            </IconText>
          </View>
        </View>
      </ScrollView>
      {!isKeyboardOpen && (
        <View>
          <FloatButton
            onPress={() => console.log}
            text={"Enviar"}
          />
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
    fontSize: 19,
    marginBottom: 10,
  },
  userContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  avatar: {
    height: 25,
    width: 25,
    borderRadius: 50,
  },
  username: {},
  subTitle: {
    fontSize: 17,
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
  },
  iconText: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
});

export default Donation;
