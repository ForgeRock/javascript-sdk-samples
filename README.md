# ForgeRock JavaScript SDK Samples

This repository contains samples that demonstrate common scenarios for integrating the [ForgeRock JavaScript SDK](https://github.com/ForgeRock/forgerock-javascript-sdk). In addition to sample application code, you'll find scripts and reference materials to help set up your ForgeRock Identity Platform environment quickly and correctly.

## Setting up Your Environment

To avoid browser security issues, the samples should be run in a "production-like" environment. Specifically, we'll use a fake domain of app.example.com with trusted, self-signed certificates and address CORS concerns.

You will also need to configure OAuth 2.0 and authentication trees that will be leveraged by the samples.

- [Domain resolution](setup/dns.md)
- [SSL certificates](setup/certs.md)
- [Cross-Origin Resource Sharing (CORS)](setup/cors.md)
- [OAuth 2.0 provider and client](setup/oauth.md)
- [Authentication trees](setup/auth-trees.md)

## Sample Apps

Samples are provided as individual, self-contained projects.

- [Ready-to-use UI](samples/ready-to-use-ui/README.md)  
  Use the SDK's UI for the lowest-effort integration
- [Custom UI in React](samples/custom-ui-react/README.md)  
  Take control of the user experience with a custom React application
- [Older browser support](samples/polyfills/README.md)  
  Add support for IE11 using polyfills
- [Transactional authorization](samples/trans-auth/README.md) (coming soon)  
  Reduce friction using "step-up" authorization for specific operations
  

## References

- [ForgeRock JavaScript SDK documentation](https://sdks.forgerock.com/javascript/index/)