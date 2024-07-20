import { Text } from "react-native";

const nodeStyles = {
  "#": { fontSize: 32 },
  "##": { fontSize: 24 },
  "###": { fontSize: 20 },
  "####": { fontSize: 18 },
  "#####": { fontSize: 16 },
  "######": { fontSize: 13 },
};

const renderMarkup = (markup) => (
  <Text style={{ color: "#9ca3af" }}>{markup}</Text>
);

const renderNode = (node) => {
  switch (node.type) {
    case "textgroup":
      return node.children?.map((subNode) => renderNode(subNode));

    case "text":
      return <Text key={node.key}>{node.content}</Text>;

    case "strong":
      const strongMarkup = renderMarkup("**");
      return (
        <Text key={node.key} style={{ fontWeight: 600 }}>
          {strongMarkup}
          {node.children?.map((subNode) => renderNode(subNode))}
          {strongMarkup}
        </Text>
      );

    case "em":
      const emMarkup = renderMarkup("_");
      return (
        <Text key={node.key} style={{ fontStyle: "italic" }}>
          {emMarkup}
          {node.children?.map((subNode) => renderNode(subNode))}
          {emMarkup}
        </Text>
      );

    case "link":
      return (
        <Text key={node.key} style={{ color: "#3b82f6" }}>
          {node.children?.map((subNode) => renderNode(subNode))}
        </Text>
      );

    case "s":
      const strikeMarkup = renderMarkup("~~");
      return (
        <Text key={node.key} style={{ textDecorationLine: "line-through" }}>
          {strikeMarkup}
          {node.children?.map((subNode) => renderNode(subNode))}
          {strikeMarkup}
        </Text>
      );

    case "list_item":
      const isBulletList = node.markup === "-";
      const listItemMarkup = renderMarkup(
        isBulletList ? "-" : `${node.sourceInfo}.`
      );

      return (
        <Text key={node.key}>
          {listItemMarkup}{" "}
          <Text>{node.children?.map((subNode) => renderNode(subNode))}</Text>
        </Text>
      );

    case "softbreak":
      return <Text key={node.key}>{"\n"}</Text>;

    default:
      return null;
  }
};

const getDecoratedText = (astTree) => {
  const textNodes = astTree.map((blockNode) => {
    switch (blockNode.type) {
      case "heading":
        const headingMarkup = renderMarkup(blockNode.markup);
        return (
          <Text key={blockNode.key} style={nodeStyles[blockNode.markup]}>
            {headingMarkup}
            {blockNode?.children?.length ? (
              <Text>
                {" "}
                {blockNode?.children?.map((node) => renderNode(node))}
              </Text>
            ) : null}
          </Text>
        );

      case "paragraph":
        return (
          <Text key={blockNode.key}>
            {blockNode?.children?.map((node) => renderNode(node))}
          </Text>
        );

      case "bullet_list":
      case "ordered_list":
        return (
          <Text key={blockNode.key}>
            {blockNode?.children?.map((node) => renderNode(node))}
          </Text>
        );

      case "blockquote":
        const renderBlockQuote = renderMarkup(">");
        return (
          <Text key={blockNode.key} style={{ backgroundColor: "#fef08a" }}>
            {renderBlockQuote} {getDecoratedText(blockNode.children)}
          </Text>
        );

      case "softbreak":
        return <Text key={blockNode.key}>{"\n"}</Text>;
      default:
        return;
    }
  });

  return textNodes;
};

export default getDecoratedText;
