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
import Institution from "./../Institution/Institution";
import Badge from "@/components/Badge";
import CustomCalendar from "@/components/CustomCalendar";
import PopUp from "@/components/PopUp";
import Picker from "@/components/Picker";
import { CampaignById, ItemById } from "@/@types/app";
import { useMutateDonation } from "@/hooks/Donation/useMutateDonation";
import { showMessage } from "react-native-flash-message";

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

  const [isKeyboardOpen, setIsKeyboardOpen] = useState(false);

  const { mutate: mutateDonation } = useMutateDonation();

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

  const selectItem = (newItem: ItemById) => {
    // Se o item já estiver na lista, remove ele se não adiciona
    if (donationItems.find((item) => item.id === newItem.id)) {
      setDonationItems((prevItems) =>
        prevItems.filter((item) => item.id !== newItem.id)
      );
      return;
    } else {
      setDonationItems((prevItems) => [
        ...prevItems,
        { ...newItem, quantity: 1 },
      ]);
    }
  };

  const deleteItem = (item) => {
    setDonationItems((prevItems) => prevItems.filter((i) => i.id !== item.id));
    if (donationItems.length === 0) {
      router.canGoBack();
    }
  };

  const formatedDate = (date) => {
    return date?.split("-").reverse().join("/");
  };

  const validateFields = () => {
    if (donationItems.length === 0 && !selectedDate) {
      setErrorMsg(
        "Selecione pelo menos um item para doação e escolha uma data"
      );
      return false;
    }

    if (donationItems.length === 0) {
      setErrorMsg("Selecione pelo menos um item para doação");
      return false;
    }

    if (!selectedDate) {
      setErrorMsg("Selecione uma data para a doação");
      return false;
    }

    setErrorMsg("");
    return true;
  };

  const sendDonation = async (sendItems) => {
    try {
      const postData = {
        campaign_id: parsedCampaignInfo.id,
        donation_time: selectedDate + " 11:56:33",
        items: sendItems,
      };

      await mutateDonation(postData);
      return true;
    } catch (err) {
      console.error(err?.response?.data);
      return false;
    }
  };

  const handleConfirm = async () => {
    if (validateFields()) {
      const sendItems = donationItems.map((item) => {
        const { id, quantity } = item;
        return { id, quantity };
      });
      const response = await sendDonation(sendItems);

      if (response) {
        router.navigate("/");
        showMessage({
          message: "Doação realizada com sucesso!",
          type: "none",
          style: {
            backgroundColor: "#13a709",
            height: 60,
            marginTop: 20,
          },
          floating: true,
          titleStyle: {
            color: "white",
            fontSize: 18,
            fontFamily: "Montserrat_600SemiBold",
            marginTop: 7,
            textAlign: "center",
          },
        });
      }

      console.log("Donation response: " + response);
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
                source={{ uri: parsedCampaignInfo.avatar }}
                style={styles.avatar}
                resizeMode="contain"
              />
              <Text style={styles.username}>{parsedCampaignInfo.name}</Text>
            </View>
          </View>
          <View style={{ gap: 25 }}>
            <View style={{ gap: 10 }}>
              <View>
                <Text style={styles.subTitle}>
                  Itens disponíveis para a doação:{" "}
                </Text>
                <ScrollView
                  style={{ maxHeight: 190 }}
                  nestedScrollEnabled={true}
                >
                  <View style={styles.badgeContainer}>
                    {parsedCampaignInfo.necessary_items.map((item) => (
                      <TouchableOpacity
                        key={item?.id}
                        onPress={() => selectItem(item)}
                      >
                        <Badge
                          text={item.name}
                          selected={donationItems.some((i) => i.id === item.id)}
                        />
                      </TouchableOpacity>
                    ))}
                  </View>
                </ScrollView>
              </View>
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
                    <View key={idx} style={styles.item}>
                      <Text
                        style={[styles.text, { maxWidth: "50%" }]}
                        numberOfLines={2}
                      >
                        {item?.name}
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
                          <AddDecrease
                            handleRemoveItem={() => deleteItem(item)}
                            setDonationItems={setDonationItems}
                            currentItem={item}
                          />
                        </View>
                        <TouchableOpacity onPress={() => deleteItem(item)}>
                          <FontAwesome
                            name="trash"
                            color={"#ff0000"}
                            size={20}
                          />
                        </TouchableOpacity>
                      </View>
                    </View>
                  ))}
                </ScrollView>
              )}
            </View>
            <View
              style={{
                borderWidth: 2,
                borderColor: "#0D62AD",
                borderRadius: 10,
                paddingTop: 10,
                position: "relative",
              }}
            >
              <Text
                style={[
                  styles.subTitle,
                  {
                    position: "absolute",
                    top: -14,
                    backgroundColor: "#ffffff",
                    paddingHorizontal: 5,
                    left: 15,
                    fontSize: 17,
                    color: "#0D62AD",
                  },
                ]}
              >
                Observações:
              </Text>

              <TextInput
                placeholder={"Digite suas observações aqui (opcional)"}
                style={{
                  flex: 1,
                  marginRight: 4,
                  padding: 10,
                  borderRadius: 10,
                  textAlignVertical: "top",
                  fontFamily: "Montserrat_500Medium",
                }}
                placeholderTextColor="#545454"
                keyboardType={"default"}
                value={commentary}
                onChangeText={(text) => setCommentary(text)}
                selectionColor={"#0D62AD"}
                numberOfLines={5}
                multiline={true}
                maxLength={250}
              />
            </View>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                gap: 20,
              }}
            >
              <Picker
                title="Data"
                placeholder={formatedDate(selectedDate) || "DD/MM/YY"}
                icon="calendar"
                iconSize={20}
                onPress={() => setShowCalendar(!showCalendar)}
              />
              {showCalendar && (
                <PopUp
                  isVisible={showCalendar}
                  closePopUp={() => setShowCalendar(false)}
                >
                  <CustomCalendar
                    selectedDate={selectedDate}
                    setSelectedDate={setSelectedDate}
                    setShowCalendar={setShowCalendar}
                  />
                </PopUp>
              )}
              <Picker
                title="Hora"
                placeholder="HH:MM"
                icon="clock-o"
                iconSize={20}
                onPress={() => console.log}
              />
            </View>
            <View style={{ paddingBottom: 70 }}>
              <IconText text="R. Gastão Gonçalves, 79 - Santa Rosa, Niterói - RJ, 24240-030">
                <MaterialIcons name="location-pin" size={30} color="#0D62AD" />
              </IconText>
            </View>
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
    height: 22,
    width: 22,
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
