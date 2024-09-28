import React from "react";
import { View, Text, Linking, StyleSheet } from "react-native";
import IconText from "@/components/IconText";
import AntDesign from "react-native-vector-icons/AntDesign";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Foundation from "react-native-vector-icons/Foundation";
import { Address } from "@/@types/app";
import { theme } from "@/Theme/theme";

const CampaignInfo = ({ addressess, phone }: { addressess: Address[], phone:string }) => {
  
  const formatedPhone = phone.replace("+55", "").replace(/(\d{2})(\d{5})(\d{4})/, "($1) $2-$3");

  const openTelephone = () => {
    Linking.openURL(`tel: ${phone}`);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.subtitle}>Onde realizar as Doações?</Text>
      <View style={{ gap: 16, marginTop: 6 }}>
        <IconText text="07:00 - 16:30">
          <AntDesign name="clockcircle" size={20} color={theme.primary} />
        </IconText>

        <IconText text={`${formatedPhone}`} onPress={openTelephone}>
          <Foundation name="telephone" size={28} color={theme.primary} />
        </IconText>

        <View>
          <IconText text="Endereços de entrega">
            <MaterialIcons
              name="location-pin"
              size={30}
              color={theme.primary}
            />
          </IconText>
          <View style={{ paddingLeft: 8, marginTop: 10, gap: 12 }}>
            {addressess.map((item) => (
              <View
                key={item.id}
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  width: "95%",
                }}
              >
                <Text
                  style={{
                    fontFamily: "Montserrat_900Black",
                    fontSize: 20,
                    color: "#595959",
                  }}
                >
                  •{" "}
                </Text>
                <Text style={styles.addressess} key={item.id}>
                  {item.street}, {item.city}, {item.state},{" "}
                  {item.zipcode.includes("-")
                    ? item.zipcode
                    : item.zipcode.replace(/(\d{5})(\d{3})/, "$1-$2")}
                </Text>
              </View>
            ))}
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { gap: 12, marginTop: 9 },
  subtitle: {
    fontSize: 18,
    marginTop: 4,
    fontFamily: "Montserrat_600SemiBold",
  },
  addressess: {
    fontFamily: "Montserrat_500Medium",
    fontSize: 14,
    color: "#595959",
  },
});

export default CampaignInfo;
