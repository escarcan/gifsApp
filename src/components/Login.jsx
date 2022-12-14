import { useState } from "react";
import { useLocation } from "wouter";
import { Head } from "./Helmet";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export function Login() {
  const [path, setPath] = useLocation();
  const [state, setUser] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const { email, password } = state;

  const { logUser, logWithGoogle } = useContext(AuthContext);

  const login = async (e) => {
    e.preventDefault();
    try {
      await logUser(email, password);
      setPath("/");
    } catch (error) {
      setError(error.code);
    }
  };

  const handleUser = (evt) => {
    setUser({
      ...state,
      [evt.target.name]: evt.target.value,
    });
  };

  const handleGoogleLogin = async () => {
    const token = await logWithGoogle();
    token == undefined ? null : setPath("/");
  };

  return (
    <>
      <Head title="Login" description="This is the login page" />
      <form onSubmit={login} className="text-black flex flex-col gap-4">
        <input type="text" name="email" onChange={handleUser} />
        <input type="password" name="password" onChange={handleUser} />

        <button type="submit" className="text-white">
          Login
        </button>
      </form>

      <button
        onClick={handleGoogleLogin}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded my-4"
      >
        Login with Google
      </button>

      {error && <p>{error}</p>}
    </>
  );
}
