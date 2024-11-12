import { Dimensions, ScrollView } from "react-native";
import Animated, { FadeIn, FadeOut } from "react-native-reanimated";
import { ResultItemContainer, SkeletonBox, SkeletonLayout } from "./styles";
const { width } = Dimensions.get("screen");

const SkeletonList = () => {
  return (
    <Animated.View
      entering={FadeIn.duration(300)}
      exiting={FadeOut.duration(300)}
      style={{ flex: 1, width: width }}
    >
      <ScrollView showsVerticalScrollIndicator={false} style={{ width: width }}>
        {[1, 2, 3, 4, 5, 6].map((value) => {
          return (
            <ResultItemContainer key={`skeleton-list-item-${value}`}>
              <SkeletonLayout>
                <SkeletonBox
                  width={50}
                  height={75}
                  skeletonStyle={{
                    backgroundColor: "#252942",
                  }}
                />
                <SkeletonBox
                  width={width * 0.6}
                  height={60}
                  skeletonStyle={{
                    backgroundColor: "#252942",
                  }}
                />
                <SkeletonBox
                  width={35}
                  height={35}
                  skeletonStyle={{
                    backgroundColor: "#252942",
                  }}
                />
              </SkeletonLayout>
            </ResultItemContainer>
          );
        })}
      </ScrollView>
    </Animated.View>
  );
};

export default SkeletonList;
