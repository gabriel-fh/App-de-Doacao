import {
  Text,
  StyleSheet,
  ScrollView,
  View,
  Image,
  TouchableOpacity,
} from "react-native";
import React from "react";
import AddDecrease from "@/components/AddDecrease";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import IconText from "@/components/IconText";

const Donation = () => {
  return (
    // <View style={{ position: "relative", flex: 1 }}>
    <ScrollView>
      <View style={styles.container}>
        <View>
          <Text style={styles.title}>Campanha do Agasalho</Text>
          <View style={styles.userContainer}>
            <Image
              source={{ uri: "https://picsum.photos/20" }}
              style={styles.avatar}
              resizeMode="contain"
            />
            <Text style={styles.username}>acao.comunitaria.unilasalle</Text>
          </View>
        </View>
        <View>
          <Text style={styles.subTitle}>Selecione itens que deseja doar</Text>
          <Text>Select ??</Text>
          <ScrollView style={{ height: 277, marginVertical: 20 }} nestedScrollEnabled={true}>
            {Array.from({ length: 10 }).map((_, idx) => (
              <View key={idx} style={styles.item}>
                <Text style={styles.text}>Item {idx + 1}</Text>
                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    gap: 50,
                    alignItems: "center",
                  }}
                >
                  <View>
                    <AddDecrease />
                  </View>
                  <TouchableOpacity>
                    <FontAwesome name="trash" color={"#ff0000"} size={20} />
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </ScrollView>
        </View>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <View style={styles.dateTime}>
            <Text style={styles.dateTimeText}>Data</Text>
            {/* <Text style={styles.text}>DD/MM/YYYY</Text> */}
            <View style={styles.iconText}>
              <Text style={{ color: "#666" }}>DD/MM/YYYY</Text>
              <FontAwesome name="calendar" size={20} color={"#0D62AD"} />
            </View>
          </View>
          <View style={styles.dateTime}>
            <Text style={styles.dateTimeText}>Hora</Text>
            {/* <Text style={styles.text}>HH:MM</Text> */}
            <View style={styles.iconText}>
              <Text style={{ color: "#666" }}>HH:MM</Text>
              <FontAwesome name="clock-o" size={20} color={"#0D62AD"} />
            </View>
          </View>
        </View>
        <View>
          <Text style={styles.subTitle}>Local de entrega</Text>
          <View
            style={{
              marginTop: 10,
              backgroundColor: "#fff",
              paddingHorizontal: 10,
              paddingVertical: 10,
              borderRadius: 10,
            }}
          >
            <IconText text="R. Gastão Gonçalves, 79 - Santa Rosa, Niterói - RJ, 24240-030">
              <MaterialIcons name="location-pin" size={30} color="#0D62AD" />
            </IconText>
          </View>
        </View>
      </View>
    </ScrollView>
    // {/* </View> */}
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
  username: {
  },
  subTitle: {
    fontSize: 17,
  },
  item: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: "#ffffff",
    borderRadius: 10,
    marginTop: 10,
  },
  text: {
    fontSize: 15,
  },
  dateTime: {
    position: "relative",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#0D62AD",
    width: 150,
    height: 50,
    borderRadius: 10,
  },
  dateTimeText: {
    position: "absolute",
    top: -14,
    backgroundColor: "#f5f5f5",
    paddingHorizontal: 5,
    left: 15,
    fontSize: 17,
    color: "#0D62AD",
  },
  iconText: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
});

export default Donation;
