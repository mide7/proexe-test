import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { FormikHelpers, useFormik } from "formik";

import validationSchema from "../../formikSchemas/userSchema";
import Input from "../../components/Input";
import { User } from "../../utils/interfaces";
import { updateUser } from "../../features/users";
import {
  notifyError,
  notifyInfo,
} from "../../components/Toastify/notification";

interface LocationState {
  data: User;
}

export default function EditUser() {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [initialValues, setinitialValues] = useState({
    id: -1,
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
  });

  async function onSubmit(values: any, formikHelpers: FormikHelpers<any>) {
    formikHelpers.setSubmitting(true);
    try {
      const body = {
        id: values.id,
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
      };
      console.log("body", body);
      dispatch(updateUser(body));
      notifyInfo("User Succesfully Updated");
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

  useEffect(() => {
    if (!location.state) {
      navigate("/", { replace: true });
    } else {
      const { data } = location.state as LocationState;
      setinitialValues({
        id: data.id ? data?.id : -1,
        name: data.name ? data.name : "",
        username: data?.username ? data?.username : "",
        email: data?.email ? data?.email : "",
        phone: data?.phone ? data?.phone : "",
        website: data?.website ? data?.website : "",
        city: data?.address?.city ? data?.address?.city : "",
        lat: data?.address?.geo?.lat ? data?.address?.geo?.lat : "",
        lng: data?.address?.geo?.lng ? data?.address?.geo?.lng : "",
        street: data?.address?.street ? data?.address?.street : "",
        suite: data?.address?.suite ? data?.address?.suite : "",
        zipcode: data?.address?.zipcode ? data?.address?.zipcode : "",
        bs: data?.company?.bs ? data?.company?.bs : "",
        catchPhrase: data?.company?.catchPhrase
          ? data?.company?.catchPhrase
          : "",
        company_name: data?.company?.name ? data?.company?.name : "",
      });
    }
  }, [location.state, navigate]);

  return (
    <div>
      <form onSubmit={formik.handleSubmit} className="novalidate">
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
            <Input
              id={"email"}
              name={"email"}
              formik={formik}
              type={"email"}
              required
            />
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
              {formik.isSubmitting ? "Loading..." : "Edit"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
