import { ItemById } from "@/@types/app";
import { router } from "expo-router";
import { showMessage } from "react-native-flash-message";

function useDonantion({ donationItems, setDonationItems, selectedDate, parsedCampaignInfo, mutateDonation, setErrorMsg }) {

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

    return { selectItem, deleteItem, formatedDate, handleConfirm };
}

export default useDonantion
