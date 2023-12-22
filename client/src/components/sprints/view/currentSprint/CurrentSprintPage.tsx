import { useQuery } from "@tanstack/react-query"
import { getCurrentSprint } from "../../sprints.api"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

export const CurrentSprintPage = () => {
    const currentSprint = useQuery({
        queryFn: getCurrentSprint,
        queryKey: []
    })
    const navigate = useNavigate()

    useEffect(() => {
        if (currentSprint.data?.id) {
            console.log({id: currentSprint.data.id})
            navigate(`/sprints/${currentSprint.data.id}`)
        }
    }, [currentSprint.data?.id, navigate])
    return (
        <div> CurrentSprint </div>
    )
}