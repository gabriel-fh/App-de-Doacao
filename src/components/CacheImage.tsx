import React, { useEffect, useState } from "react";
import { Image } from "react-native";
import * as FileSystem from "expo-file-system";

function CacheImage({
  source,
  style,
  ...props
}: {
  source: { uri: string };
  style?: any;
  [key: string]: any;
}) {
  const [localSource, setLocalSource] = useState<{ uri: string }>(null);

  useEffect(() => {
    async function fetchImage() {
      if (source.uri) {
        const name = source.uri.split("/").pop();
        const path = `${FileSystem.cacheDirectory}${name}`;
        const image = await FileSystem.getInfoAsync(path);
        if (image.exists) {
          setLocalSource({
            uri: image.uri,
          });
        } else {
          await FileSystem.downloadAsync(source.uri, path);
          setLocalSource({
            uri: source.uri,
          });
        }
      }
    }
    fetchImage();
  }, [source.uri]);

  return (
    <Image
      style={style}
      source={localSource ? localSource : source}
      {...props}
    />
  );
}

export default CacheImage;
