import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/form.scss";
import axios from "axios";
import Alert from "../alert/Alert";
import { parseErrors } from "../../utils/parseErrors";

export default function forgot_password() {
  const [email, setEmail] = useState("");
  const [alert, setAlert] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault(); //prevent default form submission

    const data = {
      email,
    };

    try {
      //make a post request to the backend api
      const res = await axios.post(
        "http://localhost:1337/api/auth/forgot-password",
        data
      );

      //reset out state
      setEmail("");

      //nset success alert
      setAlert({
        type: "success",
        message: "Please check your email for further instructions.",
      });
    } catch (err) {
      setAlert(parseErrors(err));
    }
  };

  return (
    <>
      <Alert data={alert} />
      <form className="form form--page" onSubmit={handleSubmit}>
        <div className="form__group form__group--page">
          <label className="form__label">Email</label>
          <input
            className="form__field"
            type="text"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="form__group form__group--page">
          <input className="form__btn" type="submit" value="Login" />
        </div>

        <footer>
          Have an account? <Link to="/login">Login</Link>
        </footer>
      </form>
    </>
  );
}
