# Shared ESLint config

This repository contains our ESLint config, shared by all JavaScript-based projects.

## Usage in a project

The config is available for installation as a [public npm package](https://www.npmjs.com/package/eslint-plugin-swarmia-dev).

## Development

Often you'll want to develop this repo by testing how your changes would affect the linting results of another repo.

Assuming you'll want to do that in the `frontend` repo, and you have this repo checked out next to it, what you'll want to do over in `frontend` is:

    rm -rf node_modules/eslint-plugin-swarmia-dev/ && ln -s ../../eslint/ node_modules/eslint-plugin-swarmia-dev

Finally, you'll need to make sure the `eslint` working copy has all its dependencies installed locally:

    cd node_modules/eslint-plugin-swarmia-dev
    npm install

It's best to do this via the new symlink instead of `cd ../eslint` to ensure the same node version is used in eslint and the repo to be tested.

You can now successfully `npm run lint` in the `frontend` repo, while making changes here.

**Note** that the following methods **DO NOT WORK**, even if they should be the "official" ways to install local packages:

    # Don't do this:
    npm install eslint-plugin-swarmia-dev@file:../eslint/
    npm install ../eslint

Feel free to improve these instructions if you figure out why.

## Developing custom rules

To see how the AST you're matching against looks like, paste your code sample to <https://astexplorer.net/> and select either `@babel/parser` or `@typescript-eslint/parser`.

## Releasing changes

Make sure you've logged-in to NPM (`npm login --auth-type=legacy`) using the `swarmia` user before running the commands below.

After a new PR has been merged to `master`:

    ./contrib/create-release minor # or "patch" or "major"
    ./contrib/create-bump-prs

<!-- test PR -->
