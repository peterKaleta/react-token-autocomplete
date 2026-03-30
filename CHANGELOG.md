# Changelog

## 0.5.4

### Fixed

- **#11** — Pin `underscore.string` to `3.3.4` to prevent `ReferenceError: makeString is not defined` in strict mode environments (bug was present in `3.2.0`–`3.2.2`, fixed upstream in `3.2.3`)
- **#15** — Update `radium` to `^0.19.6` which adds proper ES6 class support. Note: the pre-built `dist/` still contains the older bundled radium; if you are using React 0.14 or newer, please upgrade to **v1.0.0** which is a full rewrite with no Radium dependency
- Add `peerDependencies` explicitly declaring `react: "0.13.x"` so package managers warn when used with incompatible React versions

### Note on React compatibility

`0.x` only supports **React 0.13**. For React 14, 15, 16, 17, 18, or 19 use [v1.0.0](https://github.com/peterKaleta/react-token-autocomplete/releases/tag/v1.0.0) which is a full modern rewrite.
