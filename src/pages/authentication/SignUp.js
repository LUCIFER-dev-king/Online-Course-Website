import React, { useState, useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import firebase from "firebase/compat/app";
import "firebase/auth";
import { UserContext } from "../../context/Context";
import { setUserInDb } from "../learn/helper/LearnHelper";
import { MdClose } from "react-icons/md";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const context = useContext(UserContext);
  const [errorMsg, setErrorMsg] = useState("");
  const history = useHistory();

  const handleSignUpSubmit = (event) => {
    event.preventDefault();
    if (email && password && name) {
      firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then((res) => {
          res.user.updateProfile({
            displayName: name,
          });
          context.setUser({
            email: res.user.email,
            uid: res.user.uid,
            isAdmin: false,
          });
          var user = {
            email: res.user.email,
            uid: res.user.uid,
            isAdmin: false,
          };
          setUserInDb(user);
          localStorage.setItem("user", JSON.stringify(user));
          history.push("/learn");
        })
        .catch((err) => {
          console.log("Error:", err.message);
          setErrorMsg(err.message.replace("Firebase:", ""));
        });
    } else {
      setErrorMsg("Please enter email and password");
    }
  };

  return (
    <div className="container fluid">
      <div className="explore-btn">
        <Link className="explore-btn-text" to="/learn">
          Explore
        </Link>
      </div>
      <div className="row">
        <div className="col-md-4 offset-md-4 mt-5">
          <section className="text-center">
            <h1>E-LEARN</h1>

            <h4 className="p-2">Create your account</h4>

            <p>
              Already have an account,{" "}
              <Link to="signin">
                <span>Sign In</span>
              </Link>
            </p>
          </section>
          {errorMsg !== "" && (
            <section class="px-4 pt-4">
              <div class="w-100 bg-gray rounded shadow p-2">
                <MdClose className="fs-4 fw-bold text-danger" />
                {errorMsg}
              </div>
            </section>
          )}

          <section className="p-4">
            <form action="">
              <label className="p-1" htmlFor="name">
                Name
              </label>
              <input
                type="text"
                name="name"
                id="name"
                className="form-control p-2"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <label className="p-1" htmlFor="email">
                Email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                className="form-control p-2"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <label className="p-1 mt-2" htmlFor="password">
                Password
              </label>
              <input
                type="password"
                name="password"
                id="password"
                className="form-control p-2"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              <button
                type="button"
                className="btn btn-secondary w-100 rounded mt-3"
                onClick={handleSignUpSubmit}
              >
                Sign Up
              </button>
            </form>
          </section>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
