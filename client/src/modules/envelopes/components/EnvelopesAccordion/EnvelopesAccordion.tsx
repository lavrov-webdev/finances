import { Box } from "@mui/material"
import { FC } from "react"

import { TGetEnvelopeWithTransactionsDto } from "../.."
import { Envelope } from "./Envelope"

type TProps = {
    envelopes: TGetEnvelopeWithTransactionsDto[]
}

export const EnvelopesAccordion: FC<TProps> = ({ envelopes }) => {
    return (
        <>
            <Box mb={2} fontWeight={500}>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <span>Категория</span>
                    <span>План</span>
                    <span>Расходы</span>
                    <span>Остаток</span>
                    <span />
                </div>
            </Box>
            {envelopes.map(envelope => <Envelope key={envelope.id} envelope={envelope} />)}
        </>
    )
}