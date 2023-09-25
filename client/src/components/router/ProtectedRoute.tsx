import React, { FC } from "react";
import { useAuthStore } from "../auth";
import { Navigate, useLocation } from "react-router-dom";

export const ProtectedRoute: FC<{ children: React.ReactNode }> = ({ children }) => {
    const authStore = useAuthStore()
    const location = useLocation()

    const redirect = `/auth/signin?redirect=${location.pathname}`

    return authStore.isAuthorized ? <>{children}</> : <Navigate to={redirect} />


}
