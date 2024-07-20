import { useMemo, useState } from "react";
import { Button, TextInput, View } from "react-native";
import getDecoratedText from "./protocols/getDecoratedText";
import parser from "./protocols/parser";

const Editor = () => {
  const [text, setText] = useState("");
  const [astTree, setAstTree] = useState([]);

  const onChangeText = (inputText: string) => {
    const docs = parser(inputText);
    setText(inputText);
    setAstTree(docs);
  };

  const textDecorated = useMemo(() => getDecoratedText(astTree), [astTree]);

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

      <Button
        title="Log"
        onPress={() => {
          console.log(JSON.stringify(astTree));
        }}
      />
    </View>
  );
};

export default Editor;
