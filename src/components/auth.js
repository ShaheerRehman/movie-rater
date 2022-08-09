import React, { useState, useEffect } from "react";
import API from "../api-service";
import { useCookies } from "react-cookie";

function Auth() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useCookies(["mr-token"]);
  const [isLoginView, setIsLoginView] = useState(true);
  const disabled = username.length === 0 || password.length === 0;

  useEffect(() => {
    if (token["mr-token"]) window.location.href = "/movies";
  }, [token]);

  const loginClicked = (event) => {
    event.preventDefault();
    API.loginUser({ username, password })
      .then((resp) => setToken("mr-token", resp.token))
      .catch((error) => console.log(error));
  };

  const registerClicked = (event) => {
    event.preventDefault();
    API.registerUser({ username, password })
      .then(() => loginClicked())
      .catch((error) => console.log(error));
  };

  return (
    <div className="App px-3 text-white">
      <div className="max-w-screen-xl px-4 py-16 mx-auto sm:px-6 lg:px-8">
        <div className="max-w-lg mx-auto text-center">
          {isLoginView ? (
            <>
              <h1 className="text-2xl font-bold sm:text-3xl">Login!</h1>

              <p className="mt-4 text-gray-500">
                Login to your account to start rating movies and to get access
                to many more features.
              </p>
            </>
          ) : (
            <>
              <h1 className="text-2xl font-bold sm:text-3xl">Sign Up!</h1>

              <p className="mt-4 text-gray-500">
                Create your account to start rating movies and to get access to
                many more features.
              </p>
            </>
          )}
        </div>

        <form
          // onSubmit={loginClicked}
          className="max-w-md mx-auto mt-8 mb-0 space-y-4"
        >
          <div>
            <label htmlFor="username" className="sr-only">
              Username
            </label>

            <div className="relative">
              {isLoginView ? (
                <input
                  type="text"
                  className="w-full p-4 pr-12 text-md border-gray-200 rounded-lg shadow-lg text-black"
                  placeholder="Enter username"
                  onChange={(evt) => setUsername(evt.target.value)}
                />
              ) : (
                <input
                  type="text"
                  className="w-full p-4 pr-12 text-md border-gray-200 rounded-lg shadow-lg text-black"
                  placeholder="Set your username"
                  onChange={(evt) => setUsername(evt.target.value)}
                />
              )}
            </div>
          </div>

          <div>
            <label htmlFor="password" className="sr-only">
              Password
            </label>
            <div className="relative">
              {isLoginView ? (
                <input
                  type="password"
                  className="w-full p-4 pr-12 text-md border-gray-200 rounded-lg shadow-lg text-black"
                  placeholder="Enter password"
                  onChange={(evt) => setPassword(evt.target.value)}
                />
              ) : (
                <input
                  type="password"
                  className="w-full p-4 pr-12 text-md border-gray-200 rounded-lg shadow-lg text-black"
                  placeholder="Set your password"
                  onChange={(evt) => setPassword(evt.target.value)}
                />
              )}
            </div>
          </div>

          <div className="flex items-center justify-center py-3">
            {isLoginView ? (
              <button
                type="submit"
                className="inline-block px-5 py-3 ml-3 text-md font-medium text-white bg-blue-500 rounded-lg"
                disabled={disabled}
                onClick={loginClicked}
              >
                Sign in
              </button>
            ) : (
              <button
                type="submit"
                className="inline-block px-5 py-3 ml-3 text-md font-medium text-white bg-blue-500 rounded-lg"
                disabled={disabled}
                onClick={registerClicked}
              >
                Sign up
              </button>
            )}
          </div>
          <div className="flex items-center justify-center">
            {isLoginView ? (
              <p>
                Don't have an account?{" "}
                <a onClick={() => setIsLoginView(false)}>Register here.</a>
              </p>
            ) : (
              <p>
                Have an account?{" "}
                <a onClick={() => setIsLoginView(true)}>Login here.</a>
              </p>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
export default Auth;
