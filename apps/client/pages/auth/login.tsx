import { setCookie } from "cookies-next";
import { useRouter } from "next/router";
import { useState } from "react";

import { useUser } from "../../store/session";

export default function Login({}) {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState("idle");

  const { setUser } = useUser();

  async function postData() {
    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        if (res.user) {
          setCookie("session", res.token);
          setUser(res.user);
          if (res.user.firstLogin) {
            router.push("/onboarding");
          } else {
            router.push("/");
          }
        }
      });
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <a target="_blank" href="https://peppermint.sh/">
          <img
            className="mx-auto h-36 w-auto"
            src="/login.svg"
            alt="peppermint.sh logo"
          />
        </a>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Sign in to your account
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        {status === "loading" ? (
          <div className="text-center mr-4">{/* <Loader size={32} /> */}</div>
        ) : (
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <div className="space-y-6">
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email address
                </label>
                <div className="mt-1">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    onChange={(e) => setEmail(e.target.value)}
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Password
                </label>
                <div className="mt-1">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="password"
                    required
                    onChange={(e) => setPassword(e.target.value)}
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                  />
                </div>
              </div>

              {/* <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                  />
                  <label
                    htmlFor="remember-me"
                    className="ml-2 block text-sm text-gray-900"
                  >
                    Remember me
                  </label>
                </div> 

                 <div className="text-sm">
                  <a
                    href="#"
                    className="font-medium text-indigo-600 hover:text-indigo-500"
                  >
                    Forgot your password?
                  </a>
                </div>
              </div> */}

              <div>
                <button
                  type="submit"
                  onClick={postData}
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                >
                  Sign In
                </button>
              </div>

              {/* {providers.github &&
                process.env.NEXT_PUBLIC_SSO_PROVIDER === "github" && (
                  <div>
                    <button
                      onClick={() => signIn("github")}
                      className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#212529] hover:bg-[#4d4d4d]"
                    >
                      Github
                    </button>
                  </div>
                )}
              {providers.gitlab &&
                process.env.NEXT_PUBLIC_SSO_PROVIDER === "gitlab" && (
                  <div>
                    <button
                      onClick={() => signIn("github")}
                      className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#212529] hover:bg-[#4d4d4d]"
                    >
                      Gitlab
                    </button>
                  </div>
                )}
              {providers["azure-ad"] &&
                process.env.NEXT_PUBLIC_SSO_PROVIDER === "azure-ad" && (
                  <div>
                    <button
                      onClick={() => signIn("github")}
                      className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#00a4ef] hover:bg-[#4d4d4d]"
                    >
                      Azure AD
                    </button>
                  </div>
                )}
              {providers.auth0 &&
                process.env.NEXT_PUBLIC_SSO_PROVIDER === "auth0" && (
                  <div>
                    <button
                      onClick={() => signIn("github")}
                      className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#ee5b6f] hover:bg-[#4d4d4d]"
                    >
                      Auth0
                    </button>
                  </div>
                )} */}
            </div>
          </div>
        )}

        <div className="mt-8 text-center">
          <span className="font-bold">Built with 💚 by Peppermint Labs</span>
        </div>
      </div>
    </div>
  );
}
