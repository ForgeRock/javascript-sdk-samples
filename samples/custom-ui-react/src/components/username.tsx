import { CallbackType, FRStep, NameCallback, ValidatedCreateUsernameCallback } from '@forgerock/javascript-sdk';
import * as React from 'react';

interface Props {
  step: FRStep;
  onSubmit: (step: FRStep) => void;
}

function Username(props: Props) {
  const setUsername = (e: React.ChangeEvent<HTMLInputElement>) => {
    const usernameCallbacks = [
      ...props.step.getCallbacksOfType<ValidatedCreateUsernameCallback>(CallbackType.ValidatedCreateUsernameCallback),
      ...props.step.getCallbacksOfType<NameCallback>(CallbackType.NameCallback),
    ];
    usernameCallbacks[0].setName(e.target.value);
  };

  const onSubmit = () => {
    props.onSubmit(props.step);
  };

  const className = 'form-control mb-2';

  return (
    <>
      <p>{props.step.getHeader()}</p>
      <input type="text" placeholder="Username" onChange={setUsername} className={className} autoFocus={true} />
      <button onClick={onSubmit} className="btn btn-primary">
        Submit
      </button>
    </>
  );
}

export default Username;
