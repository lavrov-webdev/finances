import { TCreateSprintDto } from "@/components/sprints/sprints.types";
import { separateThousand } from "@/helpres";
import { Card } from "@mui/material";
import { useFormContext } from "react-hook-form";

export const StartSprintPreview = () => {
  const form = useFormContext<TCreateSprintDto>();
  form.watch(["envelopes", "startSum"]);
  const envelopes = form.getValues("envelopes");
  const totalSpendPlain = envelopes?.reduce((prev, cur) => {
    return prev + cur.amount;
  }, 0) || 0;
  const totalRemainPlan = form.getValues("startSum") - totalSpendPlain;

  return (
    <div>
      <div style={{ position: "sticky", top: "100px" }}>
        <Card>
          <ul style={{ listStyleType: "none" }}>
            <li>
              Начальная сумма:{" "}
              <b>{separateThousand(form.getValues("startSum"), true)}</b>
            </li>
            <li>
              Планируемые расходы:{" "}
              <b>{separateThousand(totalSpendPlain, true)}</b>
            </li>
            <li>
              Планируемый остаток:{" "}
              <b>{separateThousand(totalRemainPlan, true)}</b>
            </li>
          </ul>
        </Card>
      </div>
    </div>
  );
};
