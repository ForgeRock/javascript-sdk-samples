import {
  Config,
  ConfigOptions,
  FRAuth,
  FRLoginFailure,
  FRLoginSuccess,
  FRStep,
  FRUser,
  OAuth2Tokens,
  StepType,
  TokenManager,
} from '@forgerock/javascript-sdk';
import * as React from 'react';
import DeviceAuthentication from './components/device-authentication';
import DeviceRegistration from './components/device-registration';
import Password from './components/password';
import PasswordlessChoice from './components/passwordless-choice';
import TreeLink from './components/tree-link';
import Username from './components/username';
import UsernamePassword from './components/username-password';
import { getStage, Stage } from './stage';

interface State {
  currentTree?: string;
  error?: Error;
  step?: FRStep | FRLoginSuccess | FRLoginFailure;
  tokens?: OAuth2Tokens;
}

class App extends React.Component<{}, State> {
  // Placeholders are updated by webpack.
  private defaultConfig: ConfigOptions = {
    clientId: '__CLIENT_ID__',
    realmPath: '__REALM_PATH__',
    redirectUri: '__REDIRECT_URI__',
    scope: '__SCOPE__',
    serverConfig: {
      baseUrl: '__AM_URL__',
      timeout: 10000,
    },
    tree: '__TREE__',
  };

  constructor(props: {}) {
    super(props);
    this.state = { currentTree: this.defaultConfig.tree };
  }

  componentDidMount() {
    this.startTree();
  }

  startTree = (tree?: string) => {
    this.setState({ currentTree: tree || this.state.currentTree }, () => {
      Config.set({ ...this.defaultConfig, tree: this.state.currentTree });
      this.nextStep();
    });
  };

  nextStep = async (previousStep?: FRStep) => {
    this.setState({ error: undefined }, async () => {
      try {
        // Proceed to the next step in the authentication flow
        const nextStep = await FRAuth.next(previousStep);
        this.setState({ step: nextStep });

        // If we successfully authenticated, get OAuth tokens
        if (nextStep.type === StepType.LoginSuccess) {
          const tokens = await TokenManager.getTokens({ forceRenew: true });
          this.setState({ tokens });
        }
      } catch (error) {
        this.setState({ error });
      }
    });
  };

  signOut = async () => {
    await FRUser.logout();
    this.startTree();
  };

  render() {
    const step = this.state.step;

    // No step yet, so still loading
    if (!step) {
      return <p>Hold tight...</p>;
    }

    // Unexpected error
    if (this.state.error) {
      return (
        <>
          <p>Huh, that wasn't expected. {this.state.error.message}</p>
          <button onClick={() => this.startTree()} className="btn btn-primary">
            Try again
          </button>
        </>
      );
    }

    // We're authenticated
    if (step.type === StepType.LoginSuccess) {
      return (
        <>
          <p>
            Yay, here's your session token!
            <code>{step.getSessionToken()}</code>
          </p>
          {this.state.tokens && (
            <p>
              And here's your access token!
              <code>{this.state.tokens.accessToken}</code>
            </p>
          )}
          <button onClick={this.signOut} className="btn btn-primary">
            Sign out
          </button>
        </>
      );
    }

    // Authentication failed
    if (step.type === StepType.LoginFailure) {
      return (
        <>
          <p>Bummer. {step.getReason()}</p>
          <button onClick={() => this.startTree()} className="btn btn-primary">
            Start over
          </button>
        </>
      );
    }

    // Haven't finished authenticating yet, so render the component for this stage
    return (
      <>
        <p>
          <TreeLink text="Login" tree="Login" onClick={this.startTree} />
          <span style={{ margin: '0 0.5em' }}>|</span>
          <TreeLink text="Passwordless" tree="WebAuthn" onClick={this.startTree} />
          <span style={{ margin: '0 0.5em' }}>|</span>
          <TreeLink text="Register (not supported)" tree="BasicRegistration" onClick={this.startTree} />
        </p>
        <div className="stages">
          <p style={{ fontSize: '1rem' }}>{this.renderStage(step)}</p>
        </div>
      </>
    );
  }

  private renderStage = (step: FRStep) => {
    const stage = getStage(step);
    switch (stage) {
      case Stage.UsernamePassword:
        return <UsernamePassword step={step} onSubmit={this.nextStep} />;
      case Stage.Username:
        return <Username step={step} onSubmit={this.nextStep} />;
      case Stage.Password:
        return <Password step={step} onSubmit={this.nextStep} />;
      case Stage.PasswordlessChoice:
        return <PasswordlessChoice step={step} onSubmit={this.nextStep} />;
      case Stage.DeviceAuthentication:
        return <DeviceAuthentication step={step} onSubmit={this.nextStep} />;
      case Stage.DeviceRegistration:
        return <DeviceRegistration step={step} onSubmit={this.nextStep} />;
      default:
        return undefined;
    }
  };
}

export default App;
