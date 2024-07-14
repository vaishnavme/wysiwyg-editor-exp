import { Editor } from "@/components/Editor";
import { SafeAreaView, Text, View } from "react-native";

const App = () => {
  return (
    <SafeAreaView>
      <Text
        style={{
          fontSize: 20,
          textAlign: "center",
          fontWeight: 500,
        }}
      >
        Editor
      </Text>

      <View
        style={{
          padding: 16,
        }}
      >
        <Editor />
      </View>
    </SafeAreaView>
  );
};

export default App;
