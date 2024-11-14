import * as Updates from "expo-updates";

export const useUpdate = () => {
  const checkForUpdate = async () => {
    try {
      const update = await Updates.checkForUpdateAsync();
      if (update.isAvailable) {
        await Updates.fetchUpdateAsync();
        await Updates.reloadAsync();
        console.log("Update available, fetching and reloading app...");
      }
      console.log("No updates available");
    } catch (error) {
      console.log(`Error fetching latest Expo update: ${error}`);
    }
  };

  return {
    checkForUpdate,
  };
};
