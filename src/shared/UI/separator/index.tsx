import React, {FC} from 'react';
import * as SeparatorPrimitive from '@radix-ui/react-separator';
import {SeparatorProps} from "@radix-ui/react-separator";

export const Separator:FC<SeparatorProps> = (props) => {
  return (
      <SeparatorPrimitive.Root {...props} />
  );
};
