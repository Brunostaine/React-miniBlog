import "./App.css";

import { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";

import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import { AuthProvider } from "./context/AuthContext";
import About from "./pages/About/About";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import { useAutentication } from "./hooks/useAutentication";
import { onAuthStateChanged } from "firebase/auth";
import CreatePost from "./pages/CreatePost/CreatePost";
import Dashbord from "./pages/Dashbord/Dashbord";

function App() {
    const [user, setUser] = useState(undefined);
    const { auth } = useAutentication();

    const loadingUser = user === undefined;

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            setUser(user);
        });
    });

    if (loadingUser) {
        return <p>Carregando...</p>;
    }
    return (
        <div className="App">
            <AuthProvider value={{ user }}>
                <BrowserRouter>
                    <Navbar />
                    <div className="container">
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/about" element={<About />} />
                            <Route path="/login" element={!user ? <Login /> : <Navigate to="/" />} />
                            <Route
                                path="/register"
                                element={!user ? <Register /> : <Navigate to="/" />}
                            />
                            <Route
                                path="/posts/create"
                                element={user ? <CreatePost /> : <Navigate to="/login" />}
                            />
                            <Route
                                path="/dashbord"
                                element={user ? <Dashbord /> : <Navigate to="/login" />}
                            />
                        </Routes>
                    </div>
                    <Footer />
                </BrowserRouter>
            </AuthProvider>
        </div>
    );
}

export default App;
