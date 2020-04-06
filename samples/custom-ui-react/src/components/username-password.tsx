import {
  CallbackType,
  FRStep,
  NameCallback,
  PasswordCallback,
  ValidatedCreatePasswordCallback,
  ValidatedCreateUsernameCallback,
} from '@forgerock/javascript-sdk';
import * as React from 'react';

interface Props {
  step: FRStep;
  onSubmit: (step: FRStep) => void;
}

function UsernamePassword(props: Props) {
  const setUsername = (e: React.ChangeEvent<HTMLInputElement>) => {
    const usernameCallbacks = [
      ...props.step.getCallbacksOfType<ValidatedCreateUsernameCallback>(CallbackType.ValidatedCreateUsernameCallback),
      ...props.step.getCallbacksOfType<NameCallback>(CallbackType.NameCallback),
    ];
    usernameCallbacks[0].setName(e.target.value);
  };

  const setPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    const passwordsCallback = [
      ...props.step.getCallbacksOfType<ValidatedCreatePasswordCallback>(CallbackType.ValidatedCreatePasswordCallback),
      ...props.step.getCallbacksOfType<PasswordCallback>(CallbackType.PasswordCallback),
    ];
    passwordsCallback[0].setPassword(e.target.value);
  };

  const onSubmit = () => {
    props.onSubmit(props.step);
  };

  const className = 'form-control mb-2';

  return (
    <>
      <p>{props.step.getHeader()}</p>
      <input type="text" placeholder="Username" onChange={setUsername} className={className} autoFocus={true} />
      <input type="password" placeholder="Password" onChange={setPassword} className={className} />
      <button onClick={onSubmit} className="btn btn-primary">
        Submit
      </button>
    </>
  );
}

export default UsernamePassword;
