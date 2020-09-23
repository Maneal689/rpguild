import React, { useState } from "react";
import { useRecoilValue } from "recoil";

import userState from "../store/user";
import { signin, signup, signinWithGoogle } from "../helpers/auth";

function Home(props: any) {
  const user = useRecoilValue(userState);
  const [email, setemail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [login, setLogin] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  if (user.loading) return <div>loading...</div>;
  return (
    <div className="content">
      <h1>RPGuild</h1>
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          window.alert("Connecting");
          try {
            if (login) {
              await signin(email, password);
            } else {
              await signup(email, password);
            }
          } catch (e) {
            setError(e.message);
          }
        }}
      >
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={email}
          required
          onChange={(e) => setemail(e.target.value)}
          autoComplete="username"
        />
        <input
          type={showPassword ? "text" : "password"}
          name="password"
          placeholder="Mot de passe"
          value={password}
          required
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="current-password"
        />
        <button
          onClick={(e) => {
            e.preventDefault();
            setShowPassword((old) => !old);
          }}
        >
          {showPassword ? "hide" : "show"} password
        </button>
        {error != null && (
          <>
            <br />
            <span>{error}</span>
          </>
        )}
        <br />
        <input type="submit" value={login ? "Se connecter" : "S'inscrire"} />
      </form>
      <span>
        {login ? "Toujours pas de" : "Déjà un"} compte ?{" "}
        <button onClick={() => setLogin((old) => !old)}>
          {login ? "Inscrivez-vous." : "Connectez-vous."}
        </button>
      </span>
      <br />
      Ou{" "}
      <button
        onClick={() => {
          try {
            signinWithGoogle();
          } catch (e) {
            setError(e.message);
          }
        }}
      >
        Se connecter avec Google
      </button>
    </div>
  );
}

export default Home;
