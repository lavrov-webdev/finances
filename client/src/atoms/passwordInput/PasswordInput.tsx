import {Visibility, VisibilityOff} from "@mui/icons-material";
import {
    FormControl,
    FormHelperText,
    IconButton,
    InputAdornment,
    InputLabel,
    InputProps,
    OutlinedInput
} from "@mui/material";
import {FC, useReducer} from "react";
import {useFormContext} from "react-hook-form";

type TProps = {
    name: string,
    label: string
} & InputProps
export const PasswordInput: FC<TProps> = ({name, label, ...rest}) => {
    const [isShowPass, togglePass] = useReducer(p => !p, false)
    const form = useFormContext()
    const error = form.formState.errors[name]?.message
    return <FormControl variant="outlined">
        <InputLabel htmlFor={name + label}>{label}</InputLabel>
        <OutlinedInput
            {...form.register(name)}
            error={!!error}
            {...rest}
            id={name + label}
            label={label}
            type={isShowPass ? 'text' : 'password'}
            endAdornment={
                <InputAdornment position="end">
                    <IconButton
                        aria-label="toggle password visibility"
                        onClick={togglePass}
                    >
                        {isShowPass ? <VisibilityOff/> : <Visibility/>}
                    </IconButton>
                </InputAdornment>
            }/>
        {error && <FormHelperText error={!!error}>
            {error.toString()}
        </FormHelperText>}
    </FormControl>
}