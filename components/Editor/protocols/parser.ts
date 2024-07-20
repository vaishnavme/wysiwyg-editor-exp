import MarkdownIt from "markdown-it";
import Token from "./Token";
import tokensToAST from "./tokenToAST";

const markdownIt = new MarkdownIt({ html: false, linkify: true });

markdownIt.linkify.set({ fuzzyEmail: true, fuzzyIP: true, fuzzyLink: true });

const flatternTokens = (tokens) => {
  const flatTokens = tokens.reduce((acc, cur) => {
    if (cur.type === "inline" && cur.children && cur.children.length > 0) {
      const children = flatternTokens(cur.children);

      while (children.length) {
        acc.push(children.shift());
      }
    } else {
      acc.push(cur);
    }
    return acc;
  }, []);

  return flatTokens;
};

const getCleanTokenType = (token) => {
  const cleanedType = token?.type || null;
  return cleanedType.replace(/_open|_close/g, "");
};

const cleanTokens = (tokens) => {
  let updatedTokens = flatternTokens(tokens);

  const stack = [];

  updatedTokens = updatedTokens.reduce((acc, token) => {
    const cleanedType = getCleanTokenType(token);

    token.type = cleanedType;

    if (token.type === "link" && token.nesting === 1) {
      stack.push(token);
    } else if (
      stack.length > 0 &&
      token.type === "link" &&
      token.nesting === -1
    ) {
      if (stack.some((stackToken) => stackToken.block)) {
        stack[0].type = "blocklink";
        stack[0].block = true;
        token.type = "blocklink";
        token.block = true;
      }

      stack.push(token);

      while (stack.length) {
        acc.push(stack.shift());
      }
    } else if (stack.length > 0) {
      stack.push(token);
    } else {
      acc.push(token);
    }

    return acc;
  }, []);

  return updatedTokens;
};

const groupTextTokens = (tokens) => {
  const result = [];

  let hasGroup = false;
  tokens.forEach((token, index) => {
    if (!token.block && !hasGroup) {
      hasGroup = true;
      result.push(new Token("textgroup", 1));
      result.push(token);
    } else if (!token.block && hasGroup) {
      result.push(token);
    } else if (token.block && hasGroup) {
      hasGroup = false;
      result.push(new Token("textgroup", -1));
      result.push(token);
    } else {
      result.push(token);
    }
  });

  return result;
};

const omitListItemParagraph = (tokens) => {
  // used to ensure that we remove the correct ending paragraph token
  let depth = null;
  return tokens.filter((token, index) => {
    // update depth if we've already removed a starting paragraph token
    if (depth !== null) {
      depth = depth + token.nesting;
    }

    // check for a list_item token followed by paragraph token (to remove)
    if (token.type === "list_item" && token.nesting === 1 && depth === null) {
      const next = index + 1 in tokens ? tokens[index + 1] : null;
      if (next && next.type === "paragraph" && next.nesting === 1) {
        depth = 0;
        return true;
      }
    } else if (token.type === "paragraph") {
      if (token.nesting === 1 && depth === 1) {
        // remove the paragraph token immediately after the list_item token
        return false;
      } else if (token.nesting === -1 && depth === 0) {
        // remove the ending paragraph token; reset depth
        depth = null;
        return false;
      }
    }
    return true;
  });
};

const parser = (string: string) => {
  let tokens = markdownIt.parse(string, {});
  tokens = cleanTokens(tokens);
  tokens = groupTextTokens(tokens);
  tokens = omitListItemParagraph(tokens);

  const astTree = tokensToAST(tokens);

  return astTree;
};

export default parser;
