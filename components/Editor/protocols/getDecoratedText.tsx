import { Text } from "react-native";

const nodeStyles = {
  "**": { fontWeight: 600 },
  _: { fontStyle: "italic" },
  "*": { fontStyle: "italic" },
  "~~": { textDecorationLine: "line-through" },
  linkify: { color: "#3b82f6", fontWeight: 500 },
};

const renderNode = ({ node, index, markupStack = [] }) => {
  if (!node) return null;

  const nodeKeyId = `node-key-${index + 1}`;

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

  if (node.type === "text") {
    return (
      <Text key={nodeKeyId} style={nodeStyle}>
        {node.content}
      </Text>
    );
  }

  if (node.type === "softbreak") {
    return <Text key={nodeKeyId}>{"\n"}</Text>;
  }

  return null;
};

const getDecoratedText = (jsonDocs = []) => {
  const textNodes = jsonDocs.map((blockNode, index) => {
    const markupStack = [];

    const blockNodeKeyId = `block-node-keyId-${index + 1}`;

    switch (blockNode.type) {
      case "inline":
        return blockNode.children.map((node, index) =>
          renderNode({ node, index, markupStack })
        );

      case "list_item_open":
        return renderNode({
          node: { ...blockNode, markup: "- " },
          index,
          markupStack,
        });

      case "softbreak":
        return <Text key={blockNodeKeyId}>{blockNode.spacing}</Text>;

      default:
        return null;
    }
  });

  return textNodes;
};

export default getDecoratedText;
