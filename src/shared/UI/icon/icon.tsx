import React, {FC} from 'react';

type IconProps = {
  className: string;
  name: string;
  section: string
}

export const Icon: FC<IconProps> = ({name, className, section}): JSX.Element => {
  return (
      <svg className={className}>
        <use xlinkHref={`/sprites/${section}.svg#${name}`}/>
      </svg>
  );
};
