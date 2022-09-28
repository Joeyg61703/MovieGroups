import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { register, reset } from "../features/auth/authSlice";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
  });

  const { name, email, password, password2 } = formData;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    if (isSuccess || user) {
      navigate("/");
    }

    dispatch(reset());
  }, [user, isError, isSuccess, message, navigate, dispatch]);

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();

    if (password !== password2) {
      toast.error("Passwords do not match");
    } else {
      const userData = {
        name,
        email,
        password,
      };

      dispatch(register(userData));
    }
  };

  return (
    <section
      className="top-rated-movie full-height"
      style={{ backgroundImage: 'url("../../img/bg/tr_movies_bg.jpg")' }}
    >
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-8">
            <div className="section-title text-center mb-25">
              <h2 className="title title-red mt-1">Register</h2>
              <Link to="/" className="underline text-white">
                Back to home
              </Link>
            </div>
          </div>
        </div>
        <div className="row justify-content-center">
          <div className="col-lg-8">
            <div className="tr-movie-menu-active text-center">
              <form
                onSubmit={onSubmit}
                className="d-flex flex-column border border-dark shadow rounded p-5 justify-content-between align-items-center"
                action=""
              >
                <label htmlFor="email">
                  <h2>Email</h2>
                </label>
                <input
                  value={email}
                  onChange={onChange}
                  className="form-input text-center"
                  type="email"
                  id="email"
                  name="email"
                  placeholder="johnsmith@gmail.com"
                />

                <label className="mt-3" htmlFor="username">
                  <h2>Username</h2>
                </label>
                <input
                  value={name}
                  onChange={onChange}
                  className="form-input text-center"
                  type="text"
                  id="name"
                  name="name"
                  placeholder="johnsmith123"
                />

                <label className="mt-3" htmlFor="password">
                  <h2>Password</h2>
                </label>
                <input
                  value={password}
                  onChange={onChange}
                  className="form-input text-center"
                  type="password"
                  id="password"
                  name="password"
                />

                <label className="mt-3" htmlFor="password2">
                  <h2>Confirm Password</h2>
                </label>
                <input
                  value={password2}
                  onChange={onChange}
                  className="form-input text-center"
                  type="password"
                  id="password2"
                  name="password2"
                />

                <button
                  className="form-button d-flex justify-content-center align-items-center mt-5 w-100 "
                  type="submit"
                >
                  Register
                </button>
                <p>
                  Have an account? <br />
                  Login{" "}
                  <Link to="/login">
                    <span className="title-red">here</span>
                  </Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Register;
