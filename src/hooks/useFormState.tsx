import { SelectChangeEvent, TextFieldProps } from "@mui/material";
import { useCallback, useMemo, useState } from "react";
import { camelToNormal } from "../utils/string";

type Field = {
  value: string;
  vaidator: (
    val: string,
    state: {
      [key: string]: {
        value: string;
        isValid: boolean;
        error: string | null;
        isTouched: boolean;
      };
    }
  ) => { isValid: boolean; error: string | null };
  error: string | null;
  isValid: boolean;
  isTouched: boolean;
};

type Props = {
  fields: { [key: string]: Omit<Field, "error" | "isValid" | "isTouched"> };
  onSubmit: (values: {
    [key: string]: Omit<Field, "isValid" | "vaidator">;
  }) => void;
  onError: (errors: { [key: string]: string | null }) => void;
};

const useFormState = ({ fields, onSubmit, onError }: Props) => {
  const [inputs, setInputs] = useState(() =>
    Object.entries(fields).reduce((inputs, [key, field]) => {
      const { error, isValid } = field.vaidator(field.value, {});
      return {
        ...inputs,
        [key]: {
          ...field,
          error: error,
          isValid: isValid,
          isTouched: false,
        },
      };
    }, {} as { [key: string]: Field })
  );

  const fieldsForComponent = useMemo(
    () =>
      Object.entries(inputs).reduce(
        (state, [key, field]) => ({
          ...state,
          [key]: {
            value: field.value,
            isValid: field.isValid,
            error: field.error,
            isTouched: field.isTouched,
          },
        }),
        {} as {
          [key: string]: {
            value: string;
            isValid: boolean;
            error: string | null;
            isTouched: boolean;
          };
        }
      ),
    [inputs]
  );

  const registerInput = useCallback(
    (
      key: keyof typeof inputs,
      type?: TextFieldProps["type"],
      excludeProps?: string[]
    ) => {
      const isError = !inputs[key].isValid && inputs[key].isTouched;
      const fieldProps = {
        name: key.toString(),
        fullWidth: true,
        onChange: (
          e:
            | React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
            | SelectChangeEvent
        ) =>
          setInputs((inputs) => {
            const { error, isValid } = inputs[key].vaidator(
              e.target.value,
              fieldsForComponent
            );
            return {
              ...inputs,
              [key]: {
                value: e.target.value,
                error: error,
                isValid,
                vaidator: inputs[key].vaidator,
                isTouched: true,
              },
            };
          }),
        label: camelToNormal(key.toString()),
        value: inputs[key].value,
        size: "small" as TextFieldProps["size"],
        type,
        error: isError,
        helperText: isError ? inputs[key].error : "",
      };

      if (excludeProps && excludeProps?.length > 0) {
        return Object.entries(fieldProps)
          .filter(([key]) => !excludeProps.includes(key))
          .reduce(
            (all, [key, values]) => ({ ...all, [key]: values }),
            {} as typeof fieldProps
          );
      }

      return fieldProps;
    },
    [fieldsForComponent, inputs]
  );

  const isFormValid = Object.values(inputs).every((field) => field.isValid);

  const handleSubmit = useCallback(() => {
    setInputs(
      Object.entries(inputs).reduce((inputs, [key, field]) => {
        const { error, isValid } = field.vaidator(
          field.value,
          fieldsForComponent
        );
        return {
          ...inputs,
          [key]: {
            ...field,
            error: error,
            isValid: isValid,
            isTouched: true,
          },
        };
      }, {} as { [key: string]: Field })
    );

    if (isFormValid) {
      onSubmit(fieldsForComponent);
    } else {
      onError(
        Object.entries(fieldsForComponent).reduce(
          (errors, [key, field]) => ({ ...errors, [key]: field.error }),
          {} as { [key: string]: string | null }
        )
      );
    }
  }, [fieldsForComponent, inputs, isFormValid, onError, onSubmit]);

  return {
    fields: fieldsForComponent,
    isFormValid,
    registerInput,
    handleSubmit,
  };
};

export default useFormState;
