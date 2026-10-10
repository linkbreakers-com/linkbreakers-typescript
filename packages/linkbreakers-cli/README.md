# linkbreakers-cli

Official command line interface for the [Linkbreakers](https://linkbreakers.com) API, packaged for npm.

```bash
npm install -g linkbreakers-cli
linkbreakers version
```

On install, this package downloads the prebuilt `linkbreakers` binary for your platform (macOS, Linux and Windows on x64 or arm64) from [GitHub Releases](https://github.com/linkbreakers-com/linkbreakers-cli/releases) and verifies its SHA-256 against the release `checksums.txt`. It installs the release with the same version as the package; if that release is not published yet, it installs the latest release instead. If the download is skipped (for example with `--ignore-scripts`), it happens on first run instead.

Looking for the TypeScript SDK? That is the [`linkbreakers`](https://www.npmjs.com/package/linkbreakers) package.

## Quick start

```bash
export LINKBREAKERS_TOKEN=...   # workspace API token from the dashboard
linkbreakers links create --destination https://example.com --wait-for-qrcode
linkbreakers raw GET "/v1/visitors?pageSize=50"
```

Update with `npm install -g linkbreakers-cli@latest`.

Full docs: https://linkbreakers.com/cli and https://github.com/linkbreakers-com/linkbreakers-cli
