import { FC } from "react";

type TProps = {
  plan: number;
  fact: number;
};
export const TotalView: FC<TProps> = ({ plan, fact }) => {
  return (
    <>
      {plan} | {fact} | {plan - fact}
    </>
  );
};
