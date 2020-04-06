# OAuth2 Provider and Client

## Provider

Configure your OAuth 2.0 Provider service to allow clients to skip consent. All other settings can remain default.

## Client

Create a client with the following settings. All other settings can remain default.

| Setting                              | Value                                 |
| ------------------------------------ | ------------------------------------- |
| Client ID                            | sample-app                            |
| Redirection URIs                     | https://app.example.com:9443/callback |
| Scopes                               | openid profile                        |
| Client type                          | Public                                |
| Grant types                          | Authorization Code                    |
| Implied consent                      | Enabled                               |
| Token endpoint authentication method | None                                  |
