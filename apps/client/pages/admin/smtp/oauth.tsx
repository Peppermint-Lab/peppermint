import { getCookie, setCookie } from "cookies-next";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function Login() {
  const router = useRouter();

  async function check() {
    if (router.query.code) {
      await fetch(
        `/api/v1/config/email/oauth/gmail?code=${router.query.code}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getCookie("session")}`,
          },
        }
      )
        .then((res) => res.json())
        .then((res) => {
          if (res.success) {
            router.push("/admin/smtp");
          }
        });
    }
  }

  useEffect(() => {
    check();
  }, [router]);

  return <div></div>;
}
