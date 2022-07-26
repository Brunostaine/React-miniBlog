import styles from "./Login.module.css";

import { useState, useEffect } from "react";
import { useAutentication } from "../../hooks/useAutentication";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const { login, error: authError, loading } = useAutentication();

    const handleSubmit = async (e) => {
        e.preventDefault();

        setError("");

        const user = {
            email,
            password,
        };

        const res = await login(user);

        console.log(res);
    };

    useEffect(() => {
        if (authError) {
            setError(authError);
        }
    }, [authError]);
    return (
        <div className={styles.login}>
            <h1>entrar</h1>
            <p>Faça o login para poder utilizar o sistema</p>
            <form onSubmit={handleSubmit}>
                <label>
                    <span>E-mail:</span>
                    <input
                        type="email"
                        name="email"
                        required
                        placeholder="E-mail do usuário"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </label>
                <label>
                    <span>senha:</span>
                    <input
                        type="password"
                        name="password"
                        required
                        placeholder="Insira sua senha"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </label>
                {!loading && <button className="btn">Entrar</button>}
                {loading && (
                    <button className="btn" disabled>
                        Aguarde...
                    </button>
                )}
                {error && <p className="error">{error}</p>}
            </form>
        </div>
    );
};

export default Login;
