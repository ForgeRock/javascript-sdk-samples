import { CallbackType, FRStep, FRWebAuthn, MetadataCallback, WebAuthnStepType } from '@forgerock/javascript-sdk';

// Stages used by your application
enum Stage {
  DeviceAuthentication = 'DeviceAuthentication',
  DeviceRegistration = 'DeviceRegistration',
  Password = 'Password',
  PasswordlessChoice = 'PasswordlessChoice',
  Username = 'Username',
  UsernamePassword = 'UsernamePassword',
  Unknown = 'Unknown',
}

// Defines the shape of a metadata callback used for defining "stage"
interface MetadataCallbackStage {
  stage: Stage;
}

// Progressively attempts to determine "stage" with three different approaches.
// In your application, you'd likely use only one of these approaches.
function getStage(step: FRStep): Stage {
  // Approach #1
  // AM 7.0 users can leverage the page node "stage" property.
  if (step.getStage()) {
    return step.getStage() as Stage;
  }

  // Approach #2
  // AM 6.5 users can use a metadata callback to specify "stage".
  const metadataCallbacks = step.getCallbacksOfType<MetadataCallback>(CallbackType.MetadataCallback);
  if (metadataCallbacks.length > 0) {
    const metadataStage = getStageFromCallback(metadataCallbacks[0]);
    if (metadataStage !== Stage.Unknown) {
      return metadataStage;
    }
  }

  // Approach #3
  // Inspect the callbacks present to determine "stage".
  const choiceCallbacks = step.getCallbacksOfType(CallbackType.ChoiceCallback);
  const usernameCallbacks = [
    ...step.getCallbacksOfType(CallbackType.ValidatedCreateUsernameCallback),
    ...step.getCallbacksOfType(CallbackType.NameCallback),
  ];
  const passwordCallbacks = [
    ...step.getCallbacksOfType(CallbackType.ValidatedCreatePasswordCallback),
    ...step.getCallbacksOfType(CallbackType.PasswordCallback),
  ];
  if (usernameCallbacks.length > 0 && passwordCallbacks.length > 0) {
    return Stage.UsernamePassword;
  } else if (usernameCallbacks.length > 0) {
    return Stage.Username;
  } else if (passwordCallbacks.length > 0) {
    return Stage.Password;
  } else if (choiceCallbacks.length > 0) {
    return Stage.PasswordlessChoice;
  } else if (metadataCallbacks.length > 0) {
    const webAuthnStepType = FRWebAuthn.getWebAuthnStepType(step);
    if (webAuthnStepType === WebAuthnStepType.Authentication) {
      return Stage.DeviceAuthentication;
    } else if (webAuthnStepType === WebAuthnStepType.Registration) {
      return Stage.DeviceRegistration;
    }
  }

  return Stage.Unknown;
}

function getStageFromCallback(callback: MetadataCallback): Stage {
  const value = callback.getOutputValue('data');
  const valueIsObject = typeof value === 'object' && value !== null;
  const valueIsStage = valueIsObject && Object.getOwnPropertyNames(value).indexOf('stage') !== -1;
  return valueIsStage ? (value as MetadataCallbackStage).stage : Stage.Unknown;
}

export { getStage, Stage };
