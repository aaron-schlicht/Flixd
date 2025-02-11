import { View, Switch, FlatList, Dimensions } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../redux/store";
import { Colors, imageBasePath } from "../../constants";
import { Flex } from "./Layouts";
import { H4, Paragraph } from "./Typography";
import ServicesSelect from "../ServicesSelect";
import { Image } from "expo-image";
import { updateServiceSelect } from "../../redux/flowSlice";
const width = Dimensions.get("screen").width;

const ServicesFilter = () => {
  const selectedServices = useSelector(
    (state: RootState) => state.movies.selectedServices
  );
  const isServiceSelected = useSelector(
    (state: RootState) => state.flow.useStreamingServices
  );
  const dispatch = useDispatch();

  return (
    <View style={{ padding: 20 }}>
      <Flex style={{ alignItems: "center" }}>
        <Switch
          trackColor={{ false: Colors.secondary, true: Colors.primary }}
          thumbColor={"white"}
          onValueChange={(value) => {
            dispatch(updateServiceSelect(value));
          }}
          value={isServiceSelected}
        />
        <Paragraph style={{ fontWeight: "bold", paddingLeft: 10 }}>
          Only show content from my services
        </Paragraph>
      </Flex>
      <View
        style={{
          marginTop: 15,
          padding: 15,
          backgroundColor: Colors.secondary,
          borderRadius: 20,
        }}
      >
        <FlatList
          horizontal
          contentContainerStyle={{ gap: 10 }}
          data={selectedServices}
          renderItem={({ item }) => {
            return (
              <View>
                <Image
                  source={{ uri: `${imageBasePath}${item.logo_path}` }}
                  style={{ width: 30, height: 30, borderRadius: 5 }}
                />
              </View>
            );
          }}
        />
      </View>
    </View>
  );
};

export default ServicesFilter;
