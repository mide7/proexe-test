import { FormikHelpers, useFormik } from "formik";
import validationSchema from "../../formikSchemas/userSchema";
import Input from "../../components/Input";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addUser } from "../../features/users";
import { useRef } from "react";
import { base_url } from "../../utils/constants";
import {
  notifyError,
  notifySuccess,
} from "../../components/Toastify/notification";

export default function CreateUser() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const currentPageRef = useRef<any>(null);

  const initialValues = {
    name: "",
    username: "",
    email: "",
    phone: "",
    website: "",
    city: "",
    lat: "",
    lng: "",
    street: "",
    suite: "",
    zipcode: "",
    bs: "",
    catchPhrase: "",
    company_name: "",
  };

  async function onSubmit(values: any, formikHelpers: FormikHelpers<any>) {
    formikHelpers.setSubmitting(true);
    try {
      const res = await fetch(base_url, {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: values.name,
          username: values.username,
          email: values.email,
          phone: values.phone,
          website: values.website,
          address: {
            city: values.city,
            geo: { lat: values.lat, lng: values.lng },
            street: values.street,
            suite: values.suite,
            zipcode: values.zipcode,
          },
          company: {
            bs: values.bs,
            catchPhrase: values.catchPhrase,
            name: values.company_name,
          },
        }),
      });
      const data = await res.json();
      dispatch(addUser(data));
      notifySuccess("User Created Successfully");
      navigate("/", { replace: true });
    } catch (error: any) {
      notifyError(error.message);
      window.scrollTo(0, 0);
    } finally {
      formikHelpers.setSubmitting(false);
    }
  }

  const formik = useFormik({
    initialValues,
    onSubmit,
    validationSchema,
    enableReinitialize: true,
  });

  return (
    <div ref={currentPageRef}>
      <form onSubmit={formik.handleSubmit}>
        <div className="row">
          <div className="col-md-6">
            <Input id={"name"} name={"name"} formik={formik} required />
          </div>
          <div className="col-md-6">
            <Input id={"username"} name={"username"} formik={formik} />
          </div>
        </div>

        <div className="row">
          <div className="col-md-6">
            <Input id={"email"} name={"email"} formik={formik} required />
          </div>
          <div className="col-md-6">
            <Input id={"phone"} name={"phone"} formik={formik} type="tel" />
          </div>
        </div>

        <div className="row">
          <div className="col-md-6">
            <Input id={"website"} name={"website"} formik={formik} />
          </div>
          <div className="col-md-6">
            <Input id={"city"} name={"city"} formik={formik} type="tel" />
          </div>
        </div>

        <div className="row">
          <div className="col-md-6">
            <Input id={"lat"} name={"lat"} label={"latitude"} formik={formik} />
          </div>
          <div className="col-md-6">
            <Input
              id={"lng"}
              name={"lng"}
              label={"longitude"}
              formik={formik}
              type="tel"
            />
          </div>
        </div>

        <div className="row">
          <div className="col-md-6">
            <Input id={"street"} name={"street"} formik={formik} />
          </div>
          <div className="col-md-6">
            <Input id={"suite"} name={"suite"} formik={formik} type="tel" />
          </div>
        </div>

        <div className="row">
          <div className="col-md-6">
            <Input
              id={"zipcode"}
              name={"zipcode"}
              label={"Zip Code"}
              formik={formik}
            />
          </div>
          <div className="col-md-6">
            <Input
              id={"bs"}
              name={"bs"}
              label={"Company's Bs"}
              formik={formik}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-md-6">
            <Input
              id={"company_name"}
              name={"company_name"}
              label={"company name"}
              formik={formik}
            />
          </div>
          <div className="col-md-6">
            <Input
              id={"catchPhrase"}
              name={"catchPhrase"}
              label={"catch phrase"}
              formik={formik}
              type="tel"
            />
          </div>
        </div>

        <div className="row">
          <div className="col d-flex gap-3 mt-3 justify-content-end">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => navigate("/")}
              disabled={formik.isSubmitting}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn btn-primary"
              disabled={formik.isSubmitting}
            >
              {formik.isSubmitting ? "Loading..." : "Add"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
