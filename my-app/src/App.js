import "./App.css";
import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage, FieldArray } from "formik";
import ErrorText from "./ErrorText";

function App() {
  const formValues = {
    name: "Billa", //make sure this name is same name in the "name" field of input
    pass: "Ranga",
    social: {
      fb: "nahi",
      twitter: "nahi",
    },
    phoneNumbers: ["999999999999", "8888888888888888"],
    friends: ["Bila", "Ranga", "Baasha"],
  };

  const [init, setInit] = useState(null);
  const initialValues = {
    name: "", //make sure this name is same name in the "name" field of input
    pass: "",
    social: {
      fb: "",
      twitter: "",
    },
    phoneNumbers: ["", ""],
    friends: [""],
  };

  const onSubmit = (e, d) => {
    console.log("submitting", e, d);
    d.setSubmitting(true);
  };

  const validate = (values) => {
    let errors = {}; //must always return an object
    if (!values.name) {
      errors.name = "Required"; //name must be the same for name field in the component
    }
    if (!values.pass) {
      errors.pass = "Required";
    } else if (values.pass.length < 5) {
      errors.pass = "Too short";
    }

    return errors; //must return error object
  };

  const validateFacebook = (value) => {
    let errorMessage;
    if (!value) errorMessage = "Required";
    return errorMessage;
  };

  const validateHelper = (formik, fieldName, isField) => {
    console.log("errs", formik.errors);
    if (isField) {
      formik.setFieldTouched(fieldName);
      formik.validateField(fieldName);
    } else {
      formik.setTouched({
        pass: true,
        name: true,
        phoneNumbers: [true, true],
        social: { fb: true },
      });
      formik.validateForm();
    }
  };
  return (
    <div className="App">
      <h1>Vanakkam Makkale</h1>
      <Formik
        initialValues={init || initialValues}
        onSubmit={onSubmit}
        validate={validate}
        onReset={(props) => {
          console.log("ref", props);
        }}
        enableReinitialize //important for reinitialising data into forms. ie loading already existing data into
      >
        {(formik) => {
          return (
            <Form>
              <Field type="text" name="name" placeholder="name" />
              <br />
              <ErrorMessage name="name" component={ErrorText} />
              <br />
              <Field type="password" name="pass" placeholder="password" />
              <br />
              <ErrorMessage name="pass">
                {(props) => {
                  return <div>{props}</div>;
                }}
              </ErrorMessage>
              <br />
              <Field
                name="social.fb"
                validate={validateFacebook}
                placeholder="FB"
              />
              <ErrorMessage name="social.fb" component={ErrorText} />
              <br />
              <Field name="social.twitter" placeholder="twitter" />
              <br />
              <h4>Contact details</h4>
              <Field name="phoneNumbers[0]" placeholder="**********" />
              <ErrorMessage name="phoneNumbers[0]" component={ErrorText} />
              <br />
              <Field name="phoneNumbers[1]" placeholder="**********" />
              <ErrorMessage name="phoneNumbers[1]" component={ErrorText} />
              <br />
              <h4>Friends List</h4>
              <FieldArray name="friends">
                {(props) => {
                  const { push, remove, form } = props;
                  const { values } = form;
                  const { friends } = values;
                  return friends.map((f, idx) => {
                    return (
                      <div key={idx}>
                        <Field
                          name={`friends[${idx}]`}
                          placeholder={`Friend - ${idx + 1}`}
                        />
                        {idx === friends.length - 1 ? (
                          <button type="button" onClick={() => push("")}>
                            {" "}
                            +{" "}
                          </button>
                        ) : null}
                        {idx !== 0 ? (
                          <button type="button" onClick={() => remove(idx)}>
                            {" "}
                            -{" "}
                          </button>
                        ) : null}
                      </div>
                    );
                  });
                }}
              </FieldArray>
              <button
                type="button"
                onClick={() => validateHelper(formik, "pass", true)}
              >
                Validate passwoed
              </button>
              <button
                type="button"
                onClick={() => validateHelper(formik, "", false)}
              >
                Validate all
              </button>
              <button type="button" onClick={() => setInit(formValues)}>
                Load form data
              </button>
              <input type="submit" disabled={formik.isSubmitting}></input>
              <input type="reset"></input>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
}

export default App;
