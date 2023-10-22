import { separateThousand } from "@/helpres";
import { FC } from "react";

type TProps = {
  plan: number;
  fact: number;
};
export const TotalView: FC<TProps> = ({ plan, fact }) => {
  return (
    <>
      <b>РП:</b> {separateThousand(plan)}
      <b style={{ marginLeft: 8 }}>РФ:</b> {separateThousand(fact)}
      <b style={{ marginLeft: 8 }}>ОП:</b> {separateThousand(plan - fact)}
    </>
  );
};
