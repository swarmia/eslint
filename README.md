# Shared eslint config

This repository contains our ESLint config, shared by all JavaScript-based projects.

## Usage in a project

The config is available for installation as a [public npm package](https://www.npmjs.com/package/eslint-config-swarmia).

## Releasing changes

```
git checkout master
npm version patch # or "minor" or "major"
git push --tags
npm publish
```

