import { CallbackType, ChoiceCallback, FRStep } from '@forgerock/javascript-sdk';
import * as React from 'react';

interface Props {
  step: FRStep;
  onSubmit: (step: FRStep) => void;
}

function PasswordlessChoice(props: Props) {
  const setAnswer = (answer: string) => {
    const choiceCallback = props.step.getCallbackOfType<ChoiceCallback>(CallbackType.ChoiceCallback);
    choiceCallback.setChoiceValue(answer);
    props.onSubmit(props.step);
  };

  const onYes = () => setAnswer('Yes');
  const onNo = () => setAnswer('No');

  return (
    <>
      <p>Would you like to register a security device?</p>
      <button onClick={onYes} className="btn btn-primary mb-2">
        Yes
      </button>
      <button onClick={onNo} className="btn btn-primary">
        No
      </button>
    </>
  );
}

export default PasswordlessChoice;
