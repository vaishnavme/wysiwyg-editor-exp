import { Text } from "react-native";

const nodeStyles = {
  "**": { fontWeight: 600 },
  _: { fontStyle: "italic" },
  "*": { fontStyle: "italic" },
  "~~": { textDecorationLine: "line-through" },
  linkify: { color: "#3b82f6", fontWeight: 500 },
};

const getDecoratedText = (jsonDocs = []) => {
  const textNodes = jsonDocs.map((blockNode, index) => {
    const nestedNodes = blockNode?.children || [];
    const markupStack = [];

    if (blockNode?.type === "softbreak") {
      return <Text key={`block-node-${index + 1}`}>{"\n\n"}</Text>;
    }

    if (!nestedNodes.length) return null;

    return nestedNodes.map((node, index) => {
      const nodeKeyId = `child-node-${index + 1}`;

      let nodeStyle = {};
      const isMarkup = !!node?.markup && !!node?.tag;

      if (isMarkup) {
        if (node?.type?.endsWith("_open")) {
          markupStack.push(node.markup);
        } else if (node?.type?.endsWith("_close")) {
          markupStack.pop();
        }
      }

      if (markupStack.length) {
        nodeStyle = markupStack.map((x) => nodeStyles[x]);
      }

      if (isMarkup && node?.tag !== "a") {
        return (
          <Text key={nodeKeyId} style={{ color: "#a1a1aa" }}>
            {node.markup}
          </Text>
        );
      }

      return (
        <Text key={nodeKeyId} style={nodeStyle}>
          {node.content}
        </Text>
      );
    });
  });

  return textNodes;
};

export default getDecoratedText;
