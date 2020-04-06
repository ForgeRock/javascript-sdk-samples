import * as React from 'react';

interface Props {
  index: number;
  isDefault: boolean;
  text: string;
  onClick: (index: number) => void;
}

function ChoiceButton(props: Props) {
  const onClick = () => {
    props.onClick(props.index);
  };

  const className = `d-block mb-2 btn btn-${props.isDefault ? 'primary' : 'secondary'}`;

  return (
    <button onClick={onClick} className={className}>
      {props.text}
    </button>
  );
}

export default ChoiceButton;
