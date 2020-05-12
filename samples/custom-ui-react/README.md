# Custom UI in React

This sample shows how to consume the core SDK in a React app to have full control over the UI. It's designed to support two of the Express built-in trees: "UsernamePassword" and "PasswordlessWebAuthn".

**Notable Files**

| File                  | Purpose                                                                                    |
| --------------------- | ------------------------------------------------------------------------------------------ |
| src/stage.ts          | Helper function to determine which UI is required for the current authentication tree step |
| src/app.tsx           | Renders parts of the UI not specific to an authentication stage                            |
| src/components/\*.tsx | Stage-specific UI                                                                          |

## Running the Sample

```bash
# Install npm dependencies
npm i

# Build the sample and start the web server
npm start
```

Open https://app.example.com:9443 in your browser.
