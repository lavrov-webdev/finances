import { useQuery } from "@tanstack/react-query"
import { Box, Typography } from "@mui/material";
import { separateThousand } from "@/helpres";
import { SumInfo, Envelope } from "../components";
import { FC } from "react";
import { useParams } from "react-router-dom";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import { treatSprintInfo } from "../helpers";
import { getSprintById, SPRINTS_QUERY_KEY } from "..";

export const SprintPage: FC = () => {
    const params = useParams()
    const getSprintInfo = useQuery({
        queryFn: () => {
            if (!params.id) throw new Error("Can't open sprint page without ID param")
            return getSprintById(+params.id)
        },
        queryKey: [SPRINTS_QUERY_KEY, params?.id ? params.id : ''],
    });
    if (!getSprintInfo.data) return null

    const treatedSprintInfo = treatSprintInfo(getSprintInfo.data)

    return (
        <Grid2 container columns={2} gap={6}>
            <Grid2>
                <Box maxWidth={300} borderRight="1px solid">
                    <Box mb={4}>
                        <Typography fontWeight={400} variant="h2">
                            {separateThousand(treatedSprintInfo.currentBalance, true)}
                        </Typography>
                        <Typography variant="h4">Текущий баланс</Typography>
                    </Box>
                    <SumInfo sum={treatedSprintInfo.startSum} text="Стартовая сумма" />
                    <SumInfo sum={treatedSprintInfo.startPlan} text="Стартовый план" />
                    <SumInfo sum={treatedSprintInfo.startPlanRemain} text="Плановый остаток на старте" />
                    <SumInfo sum={treatedSprintInfo.totalSpendings} text="Общие расходы" />
                    <SumInfo sum={treatedSprintInfo.planRemain} text="Осталось по плану" />
                    <SumInfo sum={treatedSprintInfo.currentPlanRemain} text="Фактический плановый остаток" />
                </Box>
            </Grid2>
            <Grid2>
                <Box mb={2} fontWeight={500}>
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                        <span>Категория</span>
                        <span>План</span>
                        <span>Расходы</span>
                        <span>Остаток</span>
                        <span />
                    </div>
                </Box>
                {getSprintInfo.data.envelopes.map(envelope => <Envelope key={envelope.id} envelope={envelope} />)}
            </Grid2>
        </Grid2>
    )
}