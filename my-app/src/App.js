import logo from "./logo.svg";
import "./App.css";
import { useFormik } from "formik";

function App() {
  const formik = useFormik({
    initialValues: {
      name: "", //make sure this name is same name in the "name" field of input
      pass: "",
    },
    onSubmit: (e) => {
      console.log(e);
      formik.handleReset(); //to refresh the data after submitting
    },
  });
  return (
    <div className="App">
      <h1>Vanakkam makkale!!!</h1>
      <form onSubmit={formik.handleSubmit}>
        <input
          type="text"
          name="name"
          onChange={formik.handleChange}
          value={formik.values.name}
        />
        <br />
        <input
          type="password"
          name="pass"
          onChange={formik.handleChange}
          value={formik.values.pass}
        />
        <br />
        <input type="submit"></input>
      </form>
    </div>
  );
}

export default App;
