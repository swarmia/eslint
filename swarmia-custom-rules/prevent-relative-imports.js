const path = require("path");

module.exports = {
  meta: {
    type: "problem",
    docs: {
      description:
        "Prevents use of relative imports, and suggests absolute import paths as fixes",
    },
    fixable: "code",
    schema: [], // this rule uses no options
  },
  create: (context) => ({
    ImportDeclaration(node) {
      if (node.source.type !== "Literal") return; // not a string path -> don't care
      if (!node.source.value.match(/^\./)) return; // not a relative import -> don't care
      const newPath = path
        .join(path.dirname(context.getFilename()), node.source.value)
        .replace(context.getCwd() + "/", "");
      context.report({
        node,
        message: `Replace relative import "${node.source.value}" with absolute import "${newPath}"`,
        fix: (fixer) => fixer.replaceText(node.source, `'${newPath}'`),
      });
    },
  }),
};
