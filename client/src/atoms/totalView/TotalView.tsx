import { FC } from "react";

type TProps = {
  plan: number;
  fact: number;
};
export const TotalView: FC<TProps> = ({ plan, fact }) => {
  return (
    <>
      <b>РП:</b> {plan}
      <b style={{ marginLeft: 8 }}>РФ:</b> {fact}
      <b style={{ marginLeft: 8 }}>ОП:</b> {plan - fact}
    </>
  );
};
