import { CallbackType, FRStep, FRWebAuthn, HiddenValueCallback } from '@forgerock/javascript-sdk';
import * as React from 'react';

interface Props {
  step: FRStep;
  onSubmit: (step: FRStep) => void;
}

function DeviceAuthentication(props: Props) {
  const outcomeCallback = props.step.getCallbackOfType<HiddenValueCallback>(CallbackType.HiddenValueCallback);
  const outcome = outcomeCallback.getInputValue();

  if (outcome !== 'webAuthnOutcome') {
    return (
      <>
        <p>Verifying...</p>
      </>
    );
  }

  FRWebAuthn.authenticate(props.step).then((step) => props.onSubmit(step));
  return (
    <>
      <p>Please complete authentication using your security device...</p>
    </>
  );
}

export default DeviceAuthentication;
