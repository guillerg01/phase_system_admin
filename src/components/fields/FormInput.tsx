import SkeletonNative from "@/utils/Skeleton/SkeletonNative";
import Tooltip from "@/utils/tooltip";
import { formatPhoneNumber, getErrorMessage } from "@/utils/utils";
import { useState, forwardRef } from "react";
import { Control, Controller, FieldErrors } from "react-hook-form";

interface IProps {
  loading?: boolean;
  errors?: any;
  label?: string;
  placeholder?: string;
  required?: boolean;
  name: string;
  type: "text" | "password" | "number" | "email" | "hidden" | "tel";
  onChange: React.ChangeEventHandler<HTMLInputElement> | undefined;
  onBlur: React.FocusEventHandler<HTMLInputElement> | undefined;
  value: string | number;
  helperText?: string;
  tooltip?: string;
  prefix?: string;
  suffix?: string;
  disabled?: boolean;
  writeInput?: "number" | "text" | "text-number" | "tel" | "price" | "email";
  classNames?: string;
  labelClass?: string;
  width?: string;
  totalWidth?: string;
  minLabel?: string;
  viewDetails?: boolean;
  action?: "edit" | "details" | "create";
  isScheduleHour?: boolean;
  isScheduleMinute?: boolean;
  maxLength?: number;
}

//
interface IPropsControl {
  name: string;
  control: Control<any> | undefined;
  errors?: FieldErrors<any>;
  type: "number" | "text" | "password" | "email" | "hidden" | "tel";
  required?: boolean;
  loading?: boolean;
  placeholder?: string;
  tooltip?: string;
  prefix?: string;
  suffix?: string;
  label?: string;
  disabled?: boolean;
  writeInput?: "number" | "text" | "text-number" | "tel" | "price" | "email";
  classNames?: string;
  labelClass?: string;
  width?: string;
  totalWidth?: string;
  minLabel?: string;
  viewDetails?: boolean;
  action?: "edit" | "details" | "create";
  isScheduleHour?: boolean;
  isScheduleMinute?: boolean;
  maxLength?: number;
}

const FormInputField = forwardRef<HTMLInputElement, IProps>(
  ({ ...props }: IProps, ref) => {
    const [showPassword, setShowPassword] = useState(false);
    const toggleShowPassword = () => {
      setShowPassword(!showPassword);
    };
    const {
      errors,
      classNames,
      placeholder,
      name,
      type,
      required,
      label,
      ...more
    } = props;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      let newValue = e.target.value;

      if (more.writeInput === "email") {
        newValue = newValue.replace(/[^0-9a-zA-Z@.+]/g, "");
      } else if (more.writeInput === "number") {
        // Solo permitir números y punto decimal
        newValue = newValue.replace(/[^0-9.]/g, "");
        // Evitar múltiples puntos decimales
        const parts = newValue.split(".");
        if (parts.length > 2) {
          newValue = parts[0] + "." + parts.slice(1).join("");
        }
      } else if (more.writeInput === "text") {
        // Permitir solo letras
        newValue = newValue.replace(/[^A-Za-z' ']/g, "");
      } else if (more.writeInput === "text-number") {
        // Permitir letras y números
        newValue = newValue.replace(/[^A-Za-z0-9'@. ]/g, "");
      } else if (more.writeInput === "tel") {
        newValue = formatPhoneNumber(newValue);
      } else if (more.writeInput === "price") {
        // Solo permitir números y punto decimal
        newValue = newValue.replace(/[^0-9.]/g, "");
        // Evitar múltiples puntos decimales
        const parts = newValue.split(".");
        if (parts.length > 2) {
          newValue = parts[0] + "." + parts.slice(1).join("");
        }
        // Remover ceros a la izquierda
        if (!newValue.includes(".")) {
          newValue = String(Number(newValue));
        } else {
          const [integer, decimal] = newValue.split(".");
          newValue = `${String(Number(integer))}.${decimal}`;
        }
        // Mantener el 0 cuando el campo está vacío
        if (newValue === "0" && e.target.value === "0") {
          newValue = "0";
        }
      }

      if (more.isScheduleHour) {
        newValue =
          newValue.length === 3
            ? newValue.replace(/^0+/, "")
            : newValue.length === 1
            ? `0${newValue}`
            : newValue;

        if (Number(newValue) > 12) {
          newValue = newValue.slice(0, -1);
        }

        if (Number(newValue) < 1) {
          newValue = "";
        }

        newValue = newValue.replace(/[eE]/g, "");
      }

      if (more.isScheduleMinute) {
        newValue =
          newValue.length === 3
            ? newValue.replace(/^0+/, "")
            : newValue.length === 1
            ? `0${newValue}`
            : newValue === "60"
            ? "00"
            : newValue;

        if (Number(newValue) > 59) {
          newValue = newValue.slice(0, -1);
        }
        if (Number(newValue) < 0) {
          newValue = newValue.slice(0, -1);
        }
        newValue = newValue.replace(/[eE]/g, "");
      }

      more.onChange &&
        more.onChange({ ...e, target: { ...e.target, value: newValue } });
    };

    return (
      <div className={`${more.totalWidth ?? "w-full"}`}>
        {more.loading ? (
          <SkeletonNative />
        ) : (
          <>
            <div
              className={`flex w-full  ${
                props.action === "edit" || props.action === "details"
                  ? "flex-col md:items-start"
                  : "md:flex-row md:items-center flex-col"
              }   items-start justify-between`}
            >
              <div
                className={`${
                  props.minLabel ?? "min-w-44"
                }  flex  flex-col items-start font-filson-pro-medium font-medium text-primaymidnigth text-base justify-between`}
              >
                {label !== "" && (
                  <label
                    className={`block text-[0.9375rem] font-filson-pro-medium  font-medium text-primaymidnigth  mb-1 
                   dark:text-slate-300`}
                    htmlFor={name}
                  >
                    {label}{" "}
                    {required && <span className="text-rose-500">*</span>}
                  </label>
                )}
                {more.tooltip && (
                  <Tooltip className="ml-2" bg="light" size="sm">
                    <div className="text-sm text-slate-200">{more.tooltip}</div>
                  </Tooltip>
                )}
              </div>
              <div className={`${more.width ?? "w-full"} flex-wrap `}>
                {props.action !== "details" ? (
                  <div
                    className={`${
                      more.prefix || more.suffix || type === "password"
                        ? "relative  min-h-[10px]"
                        : ""
                    }`}
                  >
                    <input
                      id={name}
                      ref={ref}
                      onChange={handleChange}
                      name={name}
                      className={`flex-1 bg-primaybonewhite  font-filson-pro-bold font-bold text-xs rounded-md h-10 pl-2  border-1 ${
                        props.disabled
                          ? "text-gray-400 dark:text-gray-400"
                          : "text-primaymidnigth"
                      }  ${classNames ?? "form-input w-full"} ${
                        errors &&
                        getErrorMessage(name, errors) &&
                        "border-rose-300"
                      } ${more.prefix && "pl-8"} ${more.suffix && "pr-8"}`}
                      type={
                        type === "password" && showPassword
                          ? "text"
                          : type === "password" && !showPassword
                          ? "password"
                          : type
                      }
                      placeholder={placeholder}
                      onBlur={more.onBlur}
                      value={more.value}
                      disabled={props.disabled}
                      maxLength={props.maxLength}
                    />
                    {type === "password" && (
                      <button
                        type={"button"}
                        className={
                          "absolute top-1/2 right-0 transform -translate-y-1/2 px-3"
                        }
                        onClick={() => toggleShowPassword()}
                      >
                        {!showPassword ? (
                          <svg
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <g clipPath="url(#clip0_493_2931)">
                              <path
                                d="M12 6.50005C14.76 6.50005 17 8.74005 17 11.5001C17 12.0101 16.9 12.5001 16.76 12.9601L19.82 16.0201C21.21 14.7901 22.31 13.2501 23 11.4901C21.27 7.11005 17 4.00005 12 4.00005C10.73 4.00005 9.51 4.20005 8.36 4.57005L10.53 6.74005C11 6.60005 11.49 6.50005 12 6.50005ZM2.71 3.16005C2.32 3.55005 2.32 4.18005 2.71 4.57005L4.68 6.54005C3.06 7.83005 1.77 9.53005 1 11.5001C2.73 15.8901 7 19.0001 12 19.0001C13.52 19.0001 14.97 18.7001 16.31 18.1801L19.03 20.9001C19.42 21.2901 20.05 21.2901 20.44 20.9001C20.83 20.5101 20.83 19.8801 20.44 19.4901L4.13 3.16005C3.74 2.77005 3.1 2.77005 2.71 3.16005ZM12 16.5001C9.24 16.5001 7 14.2601 7 11.5001C7 10.7301 7.18 10.0001 7.49 9.36005L9.06 10.9301C9.03 11.1101 9 11.3001 9 11.5001C9 13.1601 10.34 14.5001 12 14.5001C12.2 14.5001 12.38 14.4701 12.57 14.4301L14.14 16.0001C13.49 16.3201 12.77 16.5001 12 16.5001ZM14.97 11.1701C14.82 9.77005 13.72 8.68005 12.33 8.53005L14.97 11.1701Z"
                                fill="#CBD5E1"
                              />
                            </g>
                            <defs>
                              <clipPath id="clip0_493_2931">
                                <rect width="24" height="24" fill="white" />
                              </clipPath>
                            </defs>
                          </svg>
                        ) : (
                          <svg
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <g clipPath="url(#clip0_454_2596)">
                              <path
                                d="M12 6C15.79 6 19.17 8.13 20.82 11.5C19.17 14.87 15.79 17 12 17C8.21 17 4.83 14.87 3.18 11.5C4.83 8.13 8.21 6 12 6ZM12 4C7 4 2.73 7.11 1 11.5C2.73 15.89 7 19 12 19C17 19 21.27 15.89 23 11.5C21.27 7.11 17 4 12 4ZM12 9C13.38 9 14.5 10.12 14.5 11.5C14.5 12.88 13.38 14 12 14C10.62 14 9.5 12.88 9.5 11.5C9.5 10.12 10.62 9 12 9ZM12 7C9.52 7 7.5 9.02 7.5 11.5C7.5 13.98 9.52 16 12 16C14.48 16 16.5 13.98 16.5 11.5C16.5 9.02 14.48 7 12 7Z"
                                fill="#94A3B8"
                              />
                            </g>
                            <defs>
                              <clipPath id="clip0_454_2596">
                                <rect width="24" height="24" fill="white" />
                              </clipPath>
                            </defs>
                          </svg>
                        )}
                      </button>
                    )}
                  </div>
                ) : (
                  <div className="text-[#6E6B6B] text-[1rem] font-filsonPro">
                    {props.type === "password" ? "**********" : more.value}
                  </div>
                )}
                {getErrorMessage(name, errors) && (
                  <div className="text-xs pt-1 text-rose-500">
                    {getErrorMessage(name, errors)}
                  </div>
                )}

                {(more.prefix || more.suffix) && (
                  <div
                    className={`absolute inset-0 ${
                      more.prefix && props.labelClass && props.labelClass
                    } ${
                      more.prefix ? "right-auto ml-2" : "left-auto"
                    } flex items-center pointer-events-none`}
                  >
                    {more.prefix ||
                      (more.suffix && (
                        <span
                          className={`text-sm text-slate-400 dark:text-slate-500 font-medium px-3`}
                        >
                          {more.prefix ?? more.suffix}
                        </span>
                      ))}
                  </div>
                )}
              </div>
            </div>

            {more.helperText && (
              <div className="text-xs mt-1">{more.helperText}</div>
            )}
          </>
        )}
      </div>
    );
  }
);

FormInputField.displayName = "FormInputField";

export default function FormInput({
  name,
  isScheduleHour,
  isScheduleMinute,
  control,
  type,
  errors,
  required,
  loading,
  placeholder,
  tooltip,
  suffix,
  prefix,
  label,
  disabled,
  writeInput,
  classNames,
  labelClass,
  width,
  totalWidth,
  minLabel,
  viewDetails,
  action,
  maxLength,
}: IPropsControl) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <FormInputField
          {...field}
          name={field.name}
          onBlur={field.onBlur}
          onChange={field.onChange}
          value={field.value}
          type={type}
          required={required}
          label={label}
          errors={errors}
          loading={loading}
          placeholder={placeholder}
          tooltip={tooltip}
          suffix={suffix}
          prefix={prefix}
          disabled={disabled}
          writeInput={writeInput}
          classNames={classNames}
          labelClass={labelClass}
          width={width}
          totalWidth={totalWidth}
          minLabel={minLabel}
          viewDetails={viewDetails}
          action={action}
          isScheduleHour={isScheduleHour}
          isScheduleMinute={isScheduleMinute}
          maxLength={maxLength}
        />
      )}
    />
  );
}
