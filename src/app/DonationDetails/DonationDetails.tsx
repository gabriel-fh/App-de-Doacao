import { Donation } from "@/@types/app";
import Badge from "@/components/Badge";
import BannerAvatar from "@/components/BannerAvatar";
import { theme } from "@/Theme/theme";
import { useLocalSearchParams } from "expo-router";
import React, { useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from "react-native";
import * as Calendar from "expo-calendar";

function DonationDetails() {
  const { donation } = useLocalSearchParams<{ donation: string }>();
  const parsedDonationInfo: Donation = JSON.parse(donation);

  console.log(parsedDonationInfo);

  const donationStatus = {
    agended: "Agendada",
    canceled: "Cancelada",
    concluded: "Concluída",
  };

  const donationTime = new Date(
    parsedDonationInfo.donation_time
  ).toLocaleString("pt-BR", { timeZone: "America/Sao_Paulo" });
  const formattedDonationTime = `${donationTime.split(",")[0]} às${donationTime
    .split(",")[1]
    .slice(0, 6)}`;

  const addEventToCalendar = async (title, startDate, endDate) => {
    const calendars = await Calendar.getCalendarsAsync(
      Calendar.EntityTypes.EVENT
    );
    const defaultCalendar =
      calendars.find((calendar) => calendar.isPrimary) || calendars[0];

    if (defaultCalendar) {
      const eventDetails = {
        title,
        startDate: startDate,
        endDate: endDate,
        timeZone: "America/Sao_Paulo",
        allDay: false,
      };

      try {
        const eventId = await Calendar.createEventAsync(
          defaultCalendar.id,
          eventDetails
        );
        return eventId;
      } catch (err) {
        console.error(err);
        throw err;
      }
    } else {
      return false;
    }
  };

  const getCallendarPermission = async () => {
    const { status } = await Calendar.requestCalendarPermissionsAsync();
    if (status === "granted") {
      const eventName = `Doação para ${parsedDonationInfo.campaign.name}`;
      const eventStartTime = new Date(
        donationTime.split(",")[0].split("/").reverse().join("-") +
          "T" +
          donationTime.split(",")[1].trim()
      );
      const eventEndTime = new Date(eventStartTime);
      eventEndTime.setMinutes(eventEndTime.getMinutes() + 30);
      // console.log(eventName, eventStartTime, eventEndTime);

      try {
        const res = await addEventToCalendar(
          eventName,
          eventStartTime,
          eventEndTime
        );

        if (res) {
          Alert.alert(
            "Evento adicionado",
            "O evento foi adicionado ao seu calendário."
          );
        }
      } catch (err) {
        Alert.alert(
          "Ocorreu um erro ao criar evento",
          "Não foi possível adicionar o evento no seu calendário"
        );
      }
    }
  };

  return (
    <ScrollView style={styles.container}>
      <BannerAvatar
        banner={parsedDonationInfo.campaign.banner}
        avatar={parsedDonationInfo.campaign.avatar}
        name={parsedDonationInfo.campaign.name}
      />
      <View style={styles.detailsContainer}>
        <Text style={styles.description}>
          {parsedDonationInfo.campaign.description}
        </Text>

        <Text style={styles.statusText}>
          Situação:{" "}
          <Text
            style={[
              styles.statusValue,
              {
                color:
                  parsedDonationInfo.status === "agended"
                    ? "#d18d0f"
                    : parsedDonationInfo.status === "canceled"
                    ? "#e82626"
                    : "#32CD32",
              },
            ]}
          >
            {donationStatus[parsedDonationInfo.status]}
          </Text>
        </Text>

        <View style={styles.scheduleContainer}>
          <Text style={styles.scheduleText}>
            {parsedDonationInfo.status === "agended"
              ? "Agendada para: "
              : parsedDonationInfo.status === "canceled"
              ? "Cancelada em: "
              : "Concluída em : "}

            <Text style={styles.scheduleValue}>{formattedDonationTime}</Text>
          </Text>
          {parsedDonationInfo.status === "agended" && (
            <TouchableOpacity
              style={styles.saveButton}
              onPress={async () => await getCallendarPermission()}
            >
              <Text style={styles.saveButtonText}>Salvar na agenda</Text>
            </TouchableOpacity>
          )}
        </View>

        <View>
          <Text style={styles.itemsTitle}>Itens para doação:</Text>
          <View style={styles.itemsContainer}>
            {parsedDonationInfo.items.map((item) => (
              <Badge
                key={item.id}
                text={`${item.quantity} x ${item.name}`}
                selected={false}
              />
            ))}
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    borderRadius: 10,
    marginBottom: 12,
  },
  detailsContainer: {
    gap: 8,
    paddingHorizontal: 12,
    marginVertical: 20,
  },
  description: {
    fontSize: 13,
    color: "#595959",
    fontFamily: "Montserrat_500Medium",
  },
  statusText: {
    fontFamily: "Montserrat_600SemiBold",
    fontSize: 18,
    marginVertical: 15,
  },
  statusValue: {
    fontFamily: "Montserrat_500Medium",
  },
  scheduleContainer: {
    marginBottom: 15,
  },
  scheduleText: {
    fontFamily: "Montserrat_600SemiBold",
    fontSize: 18,
  },
  scheduleValue: {
    fontFamily: "Montserrat_500Medium",
    fontSize: 16,
  },
  saveButton: {
    marginTop: 10,
    backgroundColor: theme.secondary,
    paddingHorizontal: 6,
    paddingVertical: 4,
    borderRadius: 6,
    width: 130,
  },
  saveButtonText: {
    color: "#fff",
    fontSize: 14,
    textAlign: "center",
  },
  itemsTitle: {
    fontFamily: "Montserrat_600SemiBold",
    fontSize: 18,
    marginBottom: 15,
  },
  itemsContainer: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },
});

export default DonationDetails;
