// UserContext.js
import { getCookie } from "cookies-next";
import { useRouter } from "next/router";
import posthog from "posthog-js";
import { PostHogProvider } from "posthog-js/react";
import { createContext, useContext, useEffect, useState } from "react";

const UserContext = createContext();

posthog.init(process.env.NEXT_PUBLIC_POSTHOG);

export const SessionProvider = ({ children }) => {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchUserProfile = async () => {
    const token = getCookie("session");
    try {
      await fetch(`/api/v1/auth/profile`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => res.json())
        .then((res) => {
          if (res.user) {
            setUser(res.user);
            setLoading(false);
          } else {
            console.error("Failed to fetch user profile");
            router.push("/auth/login");
          }
        });
    } catch (error) {
      // Handle fetch errors if necessary
      console.error("Error fetching user profile:", error);
      router.push("/auth/login");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserProfile();
  }, [router]);

  return process.env.NEXT_PUBLIC_ENVIRONMENT === "production" &&
    process.env.NEXT_PUBLIC_TELEMETRY === "1" ? (
    <UserContext.Provider value={{ user, setUser, loading, fetchUserProfile }}>
      <PostHogProvider client={posthog}>{children}</PostHogProvider>
    </UserContext.Provider>
  ) : (
    <UserContext.Provider value={{ user, setUser, loading, fetchUserProfile }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
