import { ScrollView, View } from "react-native";
import Animated, { FadeIn, FadeOut } from "react-native-reanimated";
import { ResultItemContainer, SkeletonBox, SkeletonLayout } from "./styles";
import {
  POSTER_WIDTH,
  TEXT_BOX_WIDTH,
  SERVICE_ICON_SIZE,
  SERVICE_CONTAINER_WIDTH,
  width,
} from "./constants";

const SkeletonList = () => {
  return (
    <Animated.View
      entering={FadeIn.duration(300)}
      exiting={FadeOut.duration(300)}
      style={{ flex: 1, flexGrow: 1 }}
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ flexGrow: 1 }}
        style={{ width: width }}
      >
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((value) => {
          return (
            <ResultItemContainer key={`skeleton-list-item-${value}`}>
              <SkeletonLayout>
                <SkeletonBox
                  width={POSTER_WIDTH}
                  height={POSTER_WIDTH * 1.5}
                  skeletonStyle={{
                    backgroundColor: "#252942",
                  }}
                />
                <SkeletonBox
                  width={TEXT_BOX_WIDTH}
                  height={60}
                  skeletonStyle={{
                    backgroundColor: "#252942",
                  }}
                />
                <View
                  style={{
                    width: SERVICE_CONTAINER_WIDTH,
                    alignItems: "center",
                  }}
                >
                  <SkeletonBox
                    width={SERVICE_ICON_SIZE}
                    height={SERVICE_ICON_SIZE}
                    skeletonStyle={{
                      backgroundColor: "#252942",
                      borderRadius: 5,
                    }}
                  />
                </View>
              </SkeletonLayout>
            </ResultItemContainer>
          );
        })}
      </ScrollView>
    </Animated.View>
  );
};

export default SkeletonList;
