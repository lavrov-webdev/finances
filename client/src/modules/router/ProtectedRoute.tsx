import React, { FC } from "react";
import { Navigate, useLocation } from "react-router-dom";

import { useAuthStore } from "@/modules/auth";

export const ProtectedRoute: FC<{ children: React.ReactNode }> = ({ children }) => {
    const authStore = useAuthStore()
    const location = useLocation()

    const redirect = `/auth/signin?redirect=${location.pathname}`

    return authStore.isAuthorized ? <>{children}</> : <Navigate to={redirect} />


}
