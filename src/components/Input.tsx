import { FormikProps } from "formik";

interface input {
  id: string;
  name: string;
  label?: string;
  type?: "password" | "number" | "text" | "email" | "tel";
  formik?: FormikProps<any>;
  required?: boolean;
}

export default function Input({
  id,
  name,
  label,
  type,
  formik,
  required,
}: input) {
  const myError =
    formik?.errors[name] && formik?.touched[name] ? formik.errors[name] : null;
  return (
    <div className="mb-3">
      <label
        htmlFor={id}
        className={`form-label text-capitalize ${myError && "text-danger"}`}
      >
        {label ?? name}{" "}
        {required ? <span className="text-danger">*</span> : null}
      </label>
      <input
        type={type ? type : "text"}
        className={`form-control ${myError && "border border-danger"}`}
        id={id}
        value={formik?.values[name]}
        onChange={formik?.handleChange}
        onBlur={formik?.handleBlur}
      />
      <div className="text-danger">{myError}</div>
    </div>
  );
}
