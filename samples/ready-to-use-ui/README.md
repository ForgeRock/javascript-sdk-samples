# Ready-to-Use UI

This sample demonstrates the most simple way to integrate the SDK, which is consuming the compiled bundle as an external script. Minor CSS customizations have been made to show how the default experience can be branded.

When the sample is built, the compiled SDK is copied from the `npm` package and renamed to `fr-sdk-ui.js`.

**Notable Files**

| File         | Purpose                        |
| ------------ | ------------------------------ |
| src/index.js | Invokes and configures the SDK |
| custom.css   | Light CSS customizations       |

## Running the Sample

```bash
# Install npm dependencies
npm i

# Build the sample and start the web server
npm start
```

Open https://forgerock-sdk.local:9443 in your browser.
