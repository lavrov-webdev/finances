import { DevTool } from "@hookform/devtools";
import { useFormContext } from "react-hook-form";

export const FormDevTool = () => {
  const { control } = useFormContext();
  return import.meta.env.DEV ? <DevTool control={control} /> : null;
};
