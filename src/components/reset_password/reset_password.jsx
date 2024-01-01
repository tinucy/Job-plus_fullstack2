import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/form.scss";
import axios from "axios";
import Alert from "../alert/Alert";
import { parseErrors } from "../../utils/parseErrors";
import { useNavigate, useLocation } from "react-router-dom";

export default function reset_password() {
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [alert, setAlert] = useState({});

  const navigate = useNavigate();
  const location = useLocation();

  const searchParams = new URLSearchParams(location.search);
  const code = searchParams.get("code");

  console.log("code:", code);

  const handleSubmit = async (e) => {
    e.preventDefault(); //prevent default form submission

    const data = {
      passwordConfirmation,
      password,
      code,
    };

    try {
      //make a post request to the backend api
      const res = await axios.post(
        "http://localhost:1337/api/auth/reset-password",
        data
      );

      //reset out state
      setPasswordConfirmation("");
      setPassword("");

      //navigate to the login page
      navigate("/login");
    } catch (err) {
      setAlert(parseErrors(err));
    }
  };

  return (
    <>
      <Alert data={alert} />
      <form className="form form--page" onSubmit={handleSubmit}>
        <div className="form__group form__group--page">
          <label className="form__label">Password</label>
          <input
            className="form__field"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div className="form__group form__group--page">
          <label className="form__label">Confirm Password</label>
          <input
            className="form__field"
            type="password"
            placeholder="Confirm Password"
            value={passwordConfirmation}
            onChange={(e) => setPasswordConfirmation(e.target.value)}
          />
        </div>

        <div className="form__group form__group--page">
          <input className="form__btn" type="submit" value="Reset Password" />
        </div>

        <footer>
          Remember your password? <Link to="/login">Login</Link>
        </footer>
      </form>
    </>
  );
}
