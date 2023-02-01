import { useState } from "react";
import { useNavigate } from "react-router";
import { useUserContext } from "../../hooks/useUserContext";
import { RootLayout } from "../../layout/RootLayout";

export const LoginPage = () => {
  const { loginWithEmailAndPassword, signInWithGoogle } = useUserContext();

  const navigate = useNavigate();
  const [email, setEmail] = useState("test@test.com");
  const [password, setPassword] = useState("Abc123!");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await loginWithEmailAndPassword({
      email,
      password,
    });

    //console.log(response);
    if (response.ok) {
      return navigate("/");
    }
  };

  const handleGoogleLogin = async () => {
    const response = await signInWithGoogle();
    //console.log(response);
    if (response.ok) {
      return navigate("/");
    }
  };

  return (
    <RootLayout>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          value={email}
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login</button> |
        <button type="button" onClick={handleGoogleLogin}>
          Login con Google
        </button>
      </form>
    </RootLayout>
  );
};
