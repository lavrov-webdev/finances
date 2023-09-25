import {useFormContext} from "react-hook-form";
import {Snackbar, Alert} from "@mui/material";
import {useEffect, useState} from "react";

export const AuthFormSnackBar = () => {
    const form = useFormContext()
    const [isOpen, setIsOpen] = useState(false)
    useEffect(() => {
        const isRootError = !!form.formState.errors.root
        setIsOpen(isRootError)
    }, [form.formState.errors.root])

    const onClose = () => {
        setIsOpen(false)
        setTimeout(() => {
            form.clearErrors("root")
        }, 400)
    }
    return <Snackbar
        open={isOpen}
        autoHideDuration={6000}
        onClose={onClose}
        anchorOrigin={{
            vertical: "top",
            horizontal: "center"
        }}
    >
        <Alert onClose={onClose} severity="error">{form.formState.errors.root?.message}</Alert>
    </Snackbar>
}