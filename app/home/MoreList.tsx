import React, { useMemo, useState } from "react";
import { ActivityIndicator } from "react-native";
import { useLocalSearchParams } from "expo-router";

import { View, Background, Text } from "@/components/Themed";
import CoverMasonry from "@/components/Masonry/CoverMasonry";
import BackNavbar from "@/components/Navbars/BackNavbar";
import TopGradient from "@/components/Gradients/TopGradient";

import { useFetchVisualNovelData } from "@/Functions/FetchUtils";
import { vnsToCovers } from "@/Functions/ConvertToCovers";

export default function MoreList() {
  const [opacity, setOpacity] = useState<number>(1);

  const { headerTitle, apiOptions } = useLocalSearchParams();

  const parsedApiOptions = useMemo(() => {
    return JSON.parse(apiOptions as string);
  }, [apiOptions]);

  const vnData = useFetchVisualNovelData(parsedApiOptions);

  const formattedVnsCovers = vnsToCovers(vnData.data?.results ?? []);

  return (
    <Background className="flex-1">
      {vnData.loading ? (
        <View className="justify-center h-screen">
          <ActivityIndicator size="large" color="#FFFFFF" />
        </View>
      ) : (
        vnData.data && (
          <>
            <CoverMasonry
              vnsData={formattedVnsCovers}
              topBarOverwrite={setOpacity}
              extraHeaderTopPadding={35 + 13}
              header={<Text className="text-4xl font-bold">{headerTitle}</Text>}
              footer={
                <View>
                  {vnData.data.results.length >= 100 && (
                    <Text className="self-center">
                      Currently only the first 100 results are shown.
                    </Text>
                  )}
                </View>
              }
              extraFooterBottomPadding={13}
            />
          </>
        )
      )}
      <BackNavbar opacity={opacity} />
      <TopGradient />
    </Background>
  );
}
