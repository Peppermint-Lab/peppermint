import { setCookie } from "cookies-next";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function Login() {
  const router = useRouter();

  async function check() {
    if (router.query.code) {
      const sso = await fetch(
        `/api/v1/auth/sso/login/callback?code=${router.query.code}`
      ).then((res) => res.json());

      if (!sso.success) {
        router.push("/auth/login?error=account_not_found");
      } else {
        setandRedirect(sso.token);
      }
    }
  }

  function setandRedirect(token) {
    setCookie("session", token, { maxAge: 60 * 6 * 24 });
    router.push("/onboarding");
  }

  useEffect(() => {
    check();
  }, [router]);

  return <div></div>;
}
