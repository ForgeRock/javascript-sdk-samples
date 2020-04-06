# SSL Certificates

Some browser features used by the SDK (e.g. WebAuthn and PKCE) require your application to be running in a secure site. To avoid problems, generate and trust self-signed certificates.

## Generate Certificates

A script is provided to simplify certificate creation.  You'll be prompted to enter a passphrase of your choice four times, twice for the CA cert and twice for the site cert.

```bash
# macOS
sh scripts/create-certs.sh app.example
```

## Trust Certificates

The process for trusting certificates is different for Chrome and Firefox. Note that simply adding a security exception does not guarantee all features will work correctly, so follow the instructions below carefully.

#### Chrome

1. Add the certificates to your keychain:

```bash
# macOS
sudo sh scripts/trust-certs.sh app.example
```

2. **IMPORTANT**: Restart Chrome

#### Firefox

Import the certificate to Firefox:

1. Go to **Preferences > Privacy & Security > Certificates > View Certificates...**
1. On the **Authorities** tab, click **Import...**
1. Select `certs/app.example-ca.pem` and enable option to "Trust this CA to identify websites"
1. **IMPORTANT**: Restart Firefox
