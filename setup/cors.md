# Cross-Origin Resource Sharing (CORS)

In order for a web application to make requests to the authentication tree and OAuth 2.0 endpoints, [Cross-Origin Resource Sharing (CORS)](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS) must be configured in ForgeRock Identity Platform.

## Version 7.0

ForgeRock AM 7.0 introduces a new dynamic CORS Service. A script is provided to configure the service via its REST API.

```bash
sh scripts/set-cors.sh <am_url> <username> <password> <app_url>
```

For example:

```bash
sh scripts/set-cors.sh \
  http://default.iam.example.com/am \
  amadmin \
  password \
  https://app.example.com:9443
```

## Older Versions

Prior to ForgeRock AM 7.0, CORS was configured via an XML file located in the installation folder (e.g. `<install_dir>/webapps/ROOT/WEB-INF/web.xml`).

Enable the CORSFilter as shown here:

```xml
...
<filter>
    <filter-name>CORSFilter</filter-name>
    <filter-class>org.forgerock.openam.cors.CORSFilter</filter-class>
    <init-param>
        <description>...</description>
        <param-name>methods</param-name>
        <param-value>HEAD,DELETE,POST,GET,PUT,PATCH</param-value>
    </init-param>
    <init-param>
        <description>...</description>
        <param-name>origins</param-name>
        <param-value>https://app.example.com:9443</param-value>
    </init-param>
    <init-param>
        <description>...</description>
        <param-name>allowCredentials</param-name>
        <param-value>true</param-value>
    </init-param>
    <init-param>
        <description>...</description>
        <param-name>headers</param-name>
        <param-value>*</param-value>
    </init-param>
    <init-param>
        <description>...</description>
        <param-name>maxAge</param-name>
        <param-value>600</param-value>
    </init-param>
</filter>
<filter-mapping>
    <filter-name>CORSFilter</filter-name>
    <url-pattern>/oauth2/*</url-pattern>
</filter-mapping>
    <filter-mapping>
    <filter-name>CORSFilter</filter-name>
    <url-pattern>/json/*</url-pattern>
</filter-mapping>
...
```
