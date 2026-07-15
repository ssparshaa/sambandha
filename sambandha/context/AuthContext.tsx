import { createContext, useContext, useEffect, useState } from "react";
import Cookies from "js-cookie";
import CryptoJS from "crypto-js";
import { useRouter } from "next/navigation";

interface User {
  _id: string;
  name: string;
  email: string;
  role: string;
  status: string;
}

interface AuthContextType {
  user: User | null;
  isLoggedIn: boolean;
  loading: boolean;
  setUser: (user: User | null) => void;
  updateUser: (user: User | null) => void;
  login: (token: string, user: User) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const token = Cookies.get("token");
    const storedUser = Cookies.get("user");
    const secretKey = process.env.NEXT_PUBLIC_SECRET_KEY;

    if (token && storedUser && secretKey) {
      try {
        const bytes = CryptoJS.AES.decrypt(storedUser, secretKey);
        const parsedUser = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
        setUser(parsedUser);
        setIsLoggedIn(true);
      } catch (err) {
        console.error("Failed to decrypt user", err);
      }
    }

    setLoading(false);
  }, []);

  const updateUser = (newUser: User) => {
    setUser(newUser);
    const secretKey = process.env.NEXT_PUBLIC_SECRET_KEY;
    if (secretKey) {
      const encryptedUser = CryptoJS.AES.encrypt(
        JSON.stringify(newUser),
        secretKey,
      ).toString();
      Cookies.set("user", encryptedUser, { expires: 360 });
    }
  };

  const login = (token: string, user: User) => {
    const secretKey = process.env.NEXT_PUBLIC_SECRET_KEY;

    if (!secretKey) {
      console.error("Encryption key is missing");
      return;
    }

    const encryptedUser = CryptoJS.AES.encrypt(
      JSON.stringify(user),
      secretKey,
    ).toString();

    Cookies.set("token", token, { expires: 360 });
    Cookies.set("user", encryptedUser, { expires: 360 });

    setUser(user);
    setIsLoggedIn(true);
  };

  const logout = () => {
    Cookies.remove("token");
    Cookies.remove("user");
    setUser(null);
    setIsLoggedIn(false);
    router.push("/login");
  };

  return (
    <AuthContext.Provider
      value={{ user, isLoggedIn, loading, updateUser, setUser, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
