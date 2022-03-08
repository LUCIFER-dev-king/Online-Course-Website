import React, { useContext, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import "./authentication.css";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import { UserContext } from "../../context/Context";
import { setUserInDb } from "../learn/helper/LearnHelper";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const context = useContext(UserContext);
  const history = useHistory();

  const handleSignIn = (testemail, testpass, testadmin) => {
    firebase
      .auth()
      .signInWithEmailAndPassword(
        email === "" ? testemail : email,
        password === "" ? testpass : password
      )
      .then((res) => {
        console.log(res);
        context.setUser({
          email: res.user.email,
          uid: res.user.uid,
          isAdmin: email === "" ? testadmin : isAdmin,
        });
        var user = {
          email: res.user.email,
          uid: res.user.uid,
          isAdmin: email === "" ? testadmin : isAdmin,
        };
        setUserInDb(user);
        localStorage.setItem("user", JSON.stringify(user));
        setTimeout(() => {
          isAdmin ? history.push("/admin") : history.push("/learn");
        }, 1500);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="container fluid">
      <div className="explore">
        <Link to="/learn">Explore</Link>
      </div>
      <div className="row">
        <div className="col-md-4 offset-md-4 mt-5">
          <section className="text-center">
            <h1>E-LEARN</h1>

            <h4 className="p-2">Welcome Back</h4>

            <p>
              Don't have an account,
              <Link to="signup">
                <span>Sign Up</span>
              </Link>
            </p>
          </section>

          <section className="p-4">
            <form action="">
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
              <input
                type="checkbox"
                className="form-checkbox-input"
                value={isAdmin}
                onChange={(e) => setIsAdmin((prev) => !prev)}
                id="checkBox"
              />
              <label htmlFor="checkBox" className="form-check-box px-2 pt-2">
                Are your Teacher?
              </label>
              <button
                type="button"
                onClick={handleSignIn}
                className="btn btn-secondary w-100 rounded mt-3"
              >
                Sign In
              </button>

              <button
                type="button"
                onClick={() => {
                  handleSignIn("ramesh@gmail.com", "123456", true);
                }}
                className="btn btn-secondary w-100 rounded mt-3"
              >
                Guest Login
              </button>
            </form>
          </section>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
