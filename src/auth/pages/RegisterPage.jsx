import { useState } from "react";
import { RootLayout } from "../../layout/RootLayout";
import { useUserContext } from "../../hooks/useUserContext";
import { useNavigate } from "react-router";

export const RegisterPage = () => {
  const { registerWithEmailPassword } = useUserContext();
  const navigate = useNavigate();

  const [email, setEmail] = useState("test@test.com");
  const [password, setPassword] = useState("Abc123!");
  const [displayName, setDisplayName] = useState("Test User");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await registerWithEmailPassword({
      email,
      password,
      displayName,
    });
    //console.log(response);
    if (response.ok) {
      return navigate("/");
    }
  };

  return (
    <RootLayout>
      <h1>Registrarme</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Nombre de usuario"
          value={displayName}
          onChange={(e) => setDisplayName(e.target.value)}
        />
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
        <button type="submit">Registrarme</button>
      </form>
    </RootLayout>
  );
};
