import { useMemo, useState } from "react";
import { TextInput, View } from "react-native";
import generateJSON from "./protocols/generateJSON";
import getDecoratedText from "./protocols/getDecoratedText";

const Editor = () => {
  const [text, setText] = useState("");
  const [jsonDoc, setJsonDocs] = useState([]);

  const onChangeText = (inputText: string) => {
    setText(inputText);

    const docs = generateJSON(inputText);
    setJsonDocs(docs);
  };

  const textDecorated = useMemo(() => getDecoratedText(jsonDoc), [jsonDoc]);

  return (
    <View>
      <TextInput
        multiline
        onChangeText={onChangeText}
        style={{
          borderColor: "#dbeafe",
          borderWidth: 4,
          borderRadius: 8,
          padding: 4,
          fontSize: 20,
        }}
      >
        {textDecorated}
      </TextInput>
    </View>
  );
};

export default Editor;
