import { auth } from "firebase-app/config-firebase";
import { onAuthStateChanged } from "firebase/auth";
import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

function AuthProvider(props) {
    const [userInfo, setUserInfo] = useState({});
    const values = { userInfo, setUserInfo };
    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            setUserInfo(user);
        });
    }, []);
    return (
        <AuthContext.Provider {...props} value={values}></AuthContext.Provider>
    );
}

function useAuth() {
    const context = useContext(AuthContext);
    if (context === "undefined")
        throw new Error("useAuth must be used within AuthProvider");
    return context;
}

export { AuthProvider, useAuth };
