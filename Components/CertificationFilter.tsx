import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { updateCertifications } from "../redux/flowSlice";
import { RootState } from "../redux/store";
import { Colors } from "../constants";

const certifications = ["G", "PG", "PG-13", "R"];

const CertificationFilter = () => {
  const dispatch = useDispatch();
  const selectedCertifications = useSelector(
    (state: RootState) => state.flow.certifications
  );

  const toggleCertification = (cert: string) => {
    dispatch(updateCertifications(cert));
  };

  return (
    <View style={{ padding: 10, display: "flex", flexDirection: "row" }}>
      {certifications.map((cert) => (
        <TouchableOpacity
          key={cert}
          onPress={() => toggleCertification(cert)}
          style={{
            padding: 10,
            marginHorizontal: 5,
            backgroundColor: selectedCertifications.includes(cert)
              ? Colors.primary
              : Colors.secondary,
            borderRadius: 5,
          }}
        >
          <Text
            style={{
              color: selectedCertifications.includes(cert)
                ? Colors.background
                : Colors.primary,
              fontWeight: "bold",
            }}
          >
            {cert}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default CertificationFilter;
