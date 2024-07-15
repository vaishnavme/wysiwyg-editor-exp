import { useMemo, useState } from "react";
import { Button, TextInput, View, StyleSheet, Text } from "react-native";
import Markdown from "react-native-markdown-display";
import generateJSON from "./protocols/generateJSON";
import getDecoratedText from "./protocols/getDecoratedText";

const styles = StyleSheet.create({
  text: {
    fontSize: 16,
  },
  bold: {
    fontWeight: "bold",
  },
  italic: {
    fontStyle: "italic",
  },
  code: {
    fontFamily: "monospace",
  },
  heading1: {
    fontSize: 32,
    fontWeight: "bold",
  },
  heading2: {
    fontSize: 28,
    fontWeight: "bold",
  },
  heading3: {
    fontSize: 24,
    fontWeight: "bold",
  },
  heading4: {
    fontSize: 20,
    fontWeight: "bold",
  },
  heading5: {
    fontSize: 18,
    fontWeight: "bold",
  },
  heading6: {
    fontSize: 16,
    fontWeight: "bold",
  },
  link: {
    color: "blue",
  },
});

const customRenderRules = {
  text: (node, children) => <Text style={styles.text}>{node.content}</Text>,
  strong: (node, children) => (
    <Text style={[styles.text, styles.bold]}>{children}</Text>
  ),
  em: (node, children) => (
    <Text style={[styles.text, styles.italic]}>{children}</Text>
  ),
  code_inline: (node, children) => (
    <Text style={[styles.text, styles.code]}>{node.content}</Text>
  ),
  heading1: (node, children) => <Text style={styles.heading1}>{children}</Text>,
  heading2: (node, children) => <Text style={styles.heading2}>{children}</Text>,
  heading3: (node, children) => <Text style={styles.heading3}>{children}</Text>,
  heading4: (node, children) => <Text style={styles.heading4}>{children}</Text>,
  heading5: (node, children) => <Text style={styles.heading5}>{children}</Text>,
  heading6: (node, children) => <Text style={styles.heading6}>{children}</Text>,
  link: (node, children) => <Text style={styles.link}>{children}</Text>,
};

const Editor = () => {
  const [text, setText] = useState("");
  const [jsonDoc, setJsonDocs] = useState([]);

  const onChangeText = (inputText: string) => {
    const docs = generateJSON(inputText);
    setText(inputText);
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
      ></TextInput>

      <Markdown>{text}</Markdown>

      <Button
        title="Log"
        onPress={() => {
          console.log(JSON.stringify(jsonDoc));
        }}
      />
    </View>
  );
};

export default Editor;
