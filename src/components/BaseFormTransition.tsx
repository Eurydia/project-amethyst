import { Slide, SlideProps } from "@mui/material";
import { FC } from "react";

export const BaseFormTransition: FC<SlideProps> = (
  props
) => {
  return (
    <Slide
      easing={{
        enter: "ease",
        exit: "ease",
      }}
      appear={false}
      direction="up"
      {...props}
    />
  );
};
