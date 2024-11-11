import { ItemById } from "@/@types/app";
import { router } from "expo-router";
import { Alert } from "react-native";
import { showMessage } from "react-native-flash-message";

function useDonantion({
  donationItems,
  setDonationItems,
  selectedDate,
  parsedCampaignInfo,
  commentary,
  mutateDonation,
  setErrorMsg,
  selectedTime,
}) {
  const selectItem = (newItem: ItemById) => {
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
    const errorMessages = {
      noItems: "Selecione pelo menos um item para doação.",
      noDate: "Selecione uma data para a doação.",
      noTime: "Selecione um horário para a doação.",
      noDateTime: "Escolha uma data e horário para a doação.",
    };

    const isItemsMissing = donationItems.length === 0;
    const isDateMissing = !selectedDate;
    const isTimeMissing = !selectedTime;

    if (isItemsMissing) {
      setErrorMsg(errorMessages.noItems);
      return false;
    }

    if (isDateMissing && isTimeMissing) {
      setErrorMsg(errorMessages.noDateTime);
      return false;
    }

    if (isDateMissing) {
      setErrorMsg(errorMessages.noDate);
      return false;
    }

    if (isTimeMissing) {
      setErrorMsg(errorMessages.noTime);
      return false;
    }

    setErrorMsg("");
    return true;
  };

  const sendDonation = async (sendItems) => {
    const donation_time = `${selectedDate} ${selectedTime
      .split("-")[0]
      .trim()}`;
    try {
      const postData = {
        campaign_id: parsedCampaignInfo.id,
        donation_time: donation_time + ":00",
        items: sendItems,
        observation: commentary,
      };
      //   donation_time: selectedDate + " 11:56:33",
      console.log(postData);
      await mutateDonation(postData);
      return true;
    } catch (err) {
      Alert.alert(
        "Ops! Ocorreu um erro ao realizar a doação",
        `${err?.response?.data.message}`
      );
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

  return { selectItem, deleteItem, formatedDate, handleConfirm };
}

export default useDonantion;
