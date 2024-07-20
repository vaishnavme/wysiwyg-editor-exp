import { View, Text } from "react-native";

const ModalHeader = (props) => {
  const { title } = props;

  return (
    <View
      style={{
        borderBottomWidth: 1,
        borderColor: "#e5e7eb",
        paddingVertical: 16,
      }}
    >
      <Text
        style={{
          fontSize: 16,
          fontWeight: 500,
          textAlign: "center",
        }}
      >
        {title}
      </Text>
    </View>
  );
};

export default ModalHeader;
