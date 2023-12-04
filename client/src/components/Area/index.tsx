import React from "react";
import { Sec } from "./styled";

type Props = {
  children: React.ReactNode
}

function Area({ children }: Props){
  return (
    <Sec>
      {children}
    </Sec>
  );
}

export default Area;