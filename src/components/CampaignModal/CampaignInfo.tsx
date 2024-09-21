import React from "react";
import { View, Text, Linking, StyleSheet } from "react-native";
import IconText from "@/components/IconText";
import AntDesign from "react-native-vector-icons/AntDesign";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Foundation from "react-native-vector-icons/Foundation";
import { Address } from "@/@types/app";
import { theme } from "@/Theme/theme";

const CampaignInfo = ({ addressess }: { addressess: Address[] }) => {
  const openTelephone = () => {
    Linking.openURL(`tel: (21) 99999-9999`);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.subtitle}>Onde realizar as Doações?</Text>
      <View style={{ gap: 16, marginTop: 6 }}>
        <IconText text="07:00 - 16:30">
          <AntDesign name="clockcircle" size={20} color={theme.primary} />
        </IconText>

        <IconText text="(21) 99999-9999" onPress={openTelephone}>
          <Foundation name="telephone" size={28} color={theme.primary} />
        </IconText>

        <View>
          <IconText text="Endereços de entrega" arrow>
            <MaterialIcons name="location-pin" size={30} color={theme.primary} />
          </IconText>
          <View style={{ paddingLeft: 8, marginTop: 10 }}>
            {addressess.map((item) => (
              <Text style={styles.addressess} key={item.id}>
                {item.street} - {item.city} - {item.state}, {item.zipcode}
              </Text>
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
