import { string, ObjectSchema } from "yup";

const userSchema = new ObjectSchema({
  name: string().required("Required"),
  username: string(),
  email: string().email("Enter a valid email adress").required("Required"),
  phone: string().matches(
    RegExp(
      "^(\\+\\d{1,3}( )?)?((\\(\\d{1,3}\\))|\\d{1,3})[- .]?\\d{3,4}[- .]?\\d{4}$"
    ),
    "Not a valid phone number"
  ),
  website: string().url("Not a valid url"),
  city: string(),
  lat: string(),
  lng: string(),
  street: string(),
  suite: string(),
  zipcode: string(),
  bs: string(),
  catchPhrase: string(),
  company_name: string(),
});

export default userSchema;
