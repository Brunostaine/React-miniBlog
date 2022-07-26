import { db } from "../firebase/config";

import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut, updateProfile } from 'firebase/auth';
import { useEffect, useState } from 'react';

export const useAutentication = () => {
    const [error, setError] = useState("");
    const [loading, setLoading] = useState("");

    // cleanup
    const [cancelled, setCancelled] = useState(false);

    const auth = getAuth();

    function checkIfCancelled() {
        if (cancelled) {
            return;
        }
    }

    // Register

    const createUser = async (data) => {
        checkIfCancelled();

        setLoading(true);
        setError(null);

        try {
            const { user } = await createUserWithEmailAndPassword(auth, data.email, data.password);

            await updateProfile(user, {
                displayName: data.displayName,
            });

            setLoading(false);

            return user;
        } catch (error) {
            console.log(error.message);
            console.log(typeof error.message);

            let systemErrorMessage;

            if (error.message.includes("Password")) {
                systemErrorMessage = "A senha precisa conter pelo menos 6 caracteres.";
            } else if (error.message.includes("email-already")) {
                systemErrorMessage = "E-mail já cadastrado.";
            } else {
                systemErrorMessage = "Ocorreu um erro, por favor tente mais tarde.";
            }

            setLoading(false);
            setError(systemErrorMessage);
        }
    };

    // Logout

    const logout = () => {
        checkIfCancelled()

        signOut(auth)
    }

    //  Login 

    const login = async (data) => {
        checkIfCancelled()

        setLoading(true)
        setError(false)

        try {

            await signInWithEmailAndPassword(auth, data.email, data.password)
            setLoading(false)
        } 
        
        catch (error) {

            let systemErrorMessage;

            if (error.message.includes("user-not-found")) {
                systemErrorMessage = "Usuário não encontrado."
            } else if (error.message.includes("wrong-password")) {
                systemErrorMessage = "Senha incorreta."
            } else {
                systemErrorMessage = "Ocorreu um erro, por favor tente mais tarde."
            }

            setError(systemErrorMessage)
            setLoading(false)
        }
    }

    useEffect(() => {
        return () => setCancelled(true);
    }, []);

    return {
        auth,
        createUser,
        error,
        loading,
        logout,
        login,
    };
};
