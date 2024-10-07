import { Slide } from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";
import { forwardRef, Ref } from "react";

export const BaseFormTransition = forwardRef(
  function Transition(
    props: TransitionProps & {
      children: React.ReactElement<any, any>;
    },
    ref: Ref<unknown>
  ) {
    return (
      <Slide
        direction="up"
        ref={ref}
        {...props}
      />
    );
  }
);
