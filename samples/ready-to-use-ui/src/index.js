async function start() {
  // Configure the SDK using values from .env and optional
  // tree override from querystring
  const url = new URL(window.location.href);
  forgerock.Config.set({
    clientId: '__CLIENT_ID__',
    realmPath: '__REALM_PATH__',
    redirectUri: '__REDIRECT_URI__',
    scope: '__SCOPE__',
    serverConfig: {
      baseUrl: '__AM_URL__',
      timeout: 10000,
    },
    tree: url.searchParams.get('tree') || '__TREE__',
  });

  // Invoke the default SDK UI and authenticate the user
  const frui = new forgerock.FRUI();
  const result = await frui.getSession();

  if (result.type === 'LoginSuccess') {
    // Show the session token while we get an access token
    const sessionTokenHtml = `Session token:<br/>${result.getSessionToken()}`;
    showMessage(`${sessionTokenHtml}<br/><br/>
      Getting access token...`);

    // Get an access token and show it
    const tokens = await forgerock.TokenManager.getTokens();
    showMessage(`${sessionTokenHtml}<br/><br/>
      Access token:<br/>${tokens.accessToken}<br/><br/>
      Logging out in 3 seconds...`);

    // Auto-logout after 3 seconds
    setTimeout(async () => {
      await forgerock.FRUser.logout();
      window.location.reload(true);
    }, 3000);
  } else {
    showMessage(`Failure: ${result.getMessage()}`);
  }
}

function showMessage(html) {
  document.getElementById('fr-ui').innerHTML = html;
}

window.addEventListener('load', start);
