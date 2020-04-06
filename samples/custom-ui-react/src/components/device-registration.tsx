import { CallbackType, FRStep, FRWebAuthn, HiddenValueCallback } from '@forgerock/javascript-sdk';
import * as React from 'react';

interface Props {
  step: FRStep;
  onSubmit: (step: FRStep) => void;
}

function DeviceRegistration(props: Props) {
  const outcomeCallback = props.step.getCallbackOfType<HiddenValueCallback>(CallbackType.HiddenValueCallback);
  const outcome = outcomeCallback.getInputValue();

  if (outcome !== 'webAuthnOutcome') {
    return (
      <>
        <p>Verifying...</p>
      </>
    );
  }

  FRWebAuthn.register(props.step).then((step) => props.onSubmit(step));
  return (
    <>
      <p>Please complete your security device registration...</p>
    </>
  );
}

export default DeviceRegistration;
