import markdownIt from "markdown-it";

const markdown = new markdownIt({ html: false, linkify: true, breaks: true });

const softbreak = {
  type: "softbreak",
  tag: "br",
  attrs: null,
  map: null,
  nesting: 0,
  level: 0,
  children: null,
  content: "",
  markup: "",
  info: "",
  meta: null,
  block: false,
  hidden: false,
};

const generateJSON = (text: string) => {
  const parsedTokens = markdown.parse(text, {});

  const tokens = [];

  // parsedTokens.forEach((token, index) => {
  //   const prevToken = parsedTokens[index - 1];
  //   const currentToken = token;

  //   if (prevToken && currentToken) {
  //     switch (currentToken.type) {
  //       case "paragraph_open":
  //         if (prevToken.type === "paragraph_close") {
  //           tokens.push({ ...softbreak, spacing: "\n\n" });
  //         }
  //         break;

  //       // case "list_item_open": {
  //       //   if (prevToken.type === "list_item_close") {
  //       //     tokens.push({ ...softbreak, spacing: "\n" });
  //       //   }
  //       //   break;
  //       // }
  //       default:
  //         break;
  //     }
  //   }

  //   tokens.push(token);
  // });

  return tokens;
};

export default generateJSON;
