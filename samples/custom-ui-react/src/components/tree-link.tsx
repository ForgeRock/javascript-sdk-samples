import * as React from 'react';

interface Props {
  text: string;
  tree: string;
  onClick: (name: string) => void;
}

function TreeLink(props: Props) {
  return (
    <a href="#" onClick={() => props.onClick(props.tree)}>
      {props.text}
    </a>
  );
}

export default TreeLink;
