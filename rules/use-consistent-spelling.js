const corrections = [
  // Simple search & replace:
  ["PR's", "PRs"],
  [/git hub/i, "GitHub"],
  // Short strings need to be between word boundaries to limit false positives:
  [/\b[Pp]r\b/, "PR"],
  [/\bslack\b/, "Slack"],
  [/\bjira\b/, "Jira"],
  [/\bgithub\b/, "GitHub"],
  // Some cases depend on context, e.g. is this the first word(s) of a sentence:
  ["Pull Request", ["pull request", "Pull request"]],
];

module.exports = {
  meta: {
    type: "problem",
    docs: {
      description:
        "Looks for common misspellings of common terms, in strings that are potentially user-visible",
    },
    fixable: "code",
    schema: [], // this rule uses no options
  },
  create: (context) => ({
    Literal: matcher(context),
    JSXText: matcher(context),
  }),
};

function matcher(context) {
  return (node) => {
    if (
      typeof node.value !== "string" || // not a string literal -> don't care
      !node.value.match(/\s/) || // string doesn't include any whitespace -> probably not a user-visible string
      context.getFilename().match(/\.test\.tsx?$/) || // it's annoying to nag about consistent spelling in test code -> don't
      node.value.match(/https?:\/\//i) // looks like a URL
    ) {
      return; // this looks like a false positive
    }
    corrections.forEach(([search, replace]) => {
      const match = node.value.match(search);
      if (match) {
        if (typeof replace === "string") {
          context.report({
            node,
            message: `Replace inconsistent spelling of "${match[0]}" with "${replace}"`,
            fix: (fixer) => {
              return fixer.replaceTextRange(
                [
                  node.range[0] + match.index + 1,
                  node.range[0] + match.index + match[0].length + 1,
                ],
                replace
              );
            },
          });
        } else {
          const options = replace.map((r) => `"${r}"`).join(" or ");
          context.report({
            node,
            message: `Replace inconsistent spelling of "${match[0]}" with ${options}`,
          });
        }
      }
    });
  };
}
