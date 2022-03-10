import React, { useContext, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import "./authentication.css";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import { UserContext } from "../../context/Context";
import { setUserInDb } from "../learn/helper/LearnHelper";
import { MdClose } from "react-icons/md";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const context = useContext(UserContext);
  const history = useHistory();
  const [errorMsg, setErrorMsg] = useState("");

  const handleSignIn = (testemail, testpass, testadmin) => {
    if ((email && password) !== "" || testemail) {
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
            isAdmin: testadmin,
          });
          var user = {
            email: res.user.email,
            uid: res.user.uid,
            isAdmin: testadmin,
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

            <h4 className="p-2">Welcome Back</h4>

            <p>
              Don't have an account,{" "}
              <Link to="signup">
                <span>Sign Up</span>
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
                onClick={handleSignIn}
                className="btn btn-secondary w-100 rounded mt-3"
              >
                Sign In
              </button>

              <button
                type="button"
                onClick={() => {
                  handleSignIn("ramesh@gmail.com", "123456", false);
                }}
                className="btn btn-secondary w-100 rounded mt-3"
              >
                Guest Login
              </button>

              <button
                type="button"
                onClick={() => {
                  handleSignIn("ramesh@gmail.com", "123456", true);
                }}
                className="btn btn-secondary w-100 rounded mt-3"
              >
                Login in as Admin
              </button>
            </form>
          </section>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
