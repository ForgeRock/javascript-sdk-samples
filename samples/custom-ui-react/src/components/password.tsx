import { CallbackType, FRStep, PasswordCallback, ValidatedCreatePasswordCallback } from '@forgerock/javascript-sdk';
import * as React from 'react';

interface Props {
  step: FRStep;
  onSubmit: (step: FRStep) => void;
}

function Password(props: Props) {
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
      <input type="password" placeholder="Password" onChange={setPassword} className={className} autoFocus={true} />
      <button onClick={onSubmit} className="btn btn-primary">
        Submit
      </button>
    </>
  );
}

export default Password;
