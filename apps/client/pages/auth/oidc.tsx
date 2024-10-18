import { setCookie } from "cookies-next";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function Login() {
  const router = useRouter();

  async function check() {
    if (router.query.code) {
      const sso = await fetch(
        `/api/v1/auth/oidc/callback?state=${router.query.state}&code=${router.query.code}&session_state=${router.query.session_state}&iss=${router.query.iss}`
      ).then((res) => res.json());

      if (!sso.success) {
        router.push("/auth/login?error=account_not_found");
      } else {
        setandRedirect(sso.token, sso.onboarding);
      }
    }
  }

  function setandRedirect(token: string, onboarding: boolean) {
    setCookie("session", token, { maxAge: 60 * 6 * 24 });
    router.push(onboarding ? "/onboarding" : "/");
  }

  useEffect(() => {
    check();
  }, [router]);

  return <div></div>;
}
