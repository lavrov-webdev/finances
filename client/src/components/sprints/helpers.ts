import { TGetSprintWithEnvelopesAndTransactionsDto } from "."


const getPositiveEnvelopeRemainings = (sprint: TGetSprintWithEnvelopesAndTransactionsDto) => {
    return sprint.envelopes.reduce((prev, cur) => {
        const remain = cur.amount - cur.transactions.reduce((prev, cur) => prev + cur.amount, 0)
        if (remain > 0) return prev + remain
        return prev
    }, 0)
}

const getNegativeEnvelopeRemainings = (sprint: TGetSprintWithEnvelopesAndTransactionsDto) => {
    return sprint.envelopes.reduce((prev, cur) => {
        const remain = cur.amount - cur.transactions.reduce((prev, cur) => prev + cur.amount, 0)
        if (remain < 0) return prev + remain
        return prev
    }, 0)
}

export const treatSprintInfo = (sprint: TGetSprintWithEnvelopesAndTransactionsDto) => {
    const { startSum, currentBalance } = sprint
    const totalSpendings = sprint.startSum - sprint.currentBalance
    const startPlan = sprint.envelopes.reduce((prev, cur) => prev + cur.amount, 0)
    const startPlanRemain = startSum - startPlan
    const planRemain = getPositiveEnvelopeRemainings(sprint)
    const currentPlanRemain = startPlanRemain + getNegativeEnvelopeRemainings(sprint)

    return {
        currentBalance,
        startSum,
        totalSpendings,
        startPlan,
        startPlanRemain,
        planRemain,
        currentPlanRemain
    }
}