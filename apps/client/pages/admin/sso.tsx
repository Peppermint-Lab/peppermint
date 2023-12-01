import { useRouter } from "next/router";
import { useState } from "react";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function SSO() {
  const router = useRouter();

  const [enabled, setEnabled] = useState(false);
  const [provider, setProvider] = useState("");
  const [clientId, setClientId] = useState("");
  const [clientSecret, setClientSecret] = useState("");
  const [tenantId, setTenantId] = useState("");
  const [issuer, setIssuer] = useState("");
  const [redirectUri, setRedirectUri] = useState(
    `${window.location.origin}/auth/oauth`
  );

  async function postData() {
    const res = await fetch("/api/v1/admin/sso/update", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        provider,
        clientId,
        clientSecret,
        tenantId,
        issuer,
      }),
    })
      .then((res) => res.json())
      .then(() => {
        // handle success or error
      });
  }

  return (
    <main className="flex-1">
      <div className="relative max-w-4xl mx-auto md:px-8 xl:px-0">
        <div className="pt-10 pb-16">
          <div className="px-4 sm:px-6 md:px-0">
            <h1 className="text-3xl font-extrabold text-gray-900">
              SSO Settings
            </h1>
          </div>
          <div className="px-4 sm:px-6 md:px-0 my-4">
            <div className="py-6 bg-white shadow-md p-4 rounded-md">
              <div className="w-full lg:w-1/2">
                <h2 className="text-base font-semibold leading-7 text-gray-900">
                  Provider
                </h2>
                <p className="mt-1 text-sm leading-6 text-gray-600">
                  Which provider would you like to use?
                </p>
                <select
                  id="provider"
                  name="provider"
                  onChange={(e) => setProvider(e.target.value)}
                  className="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  defaultValue=""
                >
                  {provider === undefined && (
                    <option>Please select an option</option>
                  )}
                  <option>Azure Active Directory</option>
                  <option>Auth0</option>
                  <option>Github</option>
                  <option>Discord</option>
                  <option>Gitlab</option>
                  <option>Google</option>
                </select>
              </div>
              {provider !== undefined && (
                <div className="space-y-4 mt-4">
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Client Id
                    </label>
                    <div className="mt-2">
                      <input
                        type="email"
                        name="email"
                        id="email"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        onChange={(e) => setClientId(e.target.value)}
                      />
                    </div>
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Client Secret
                    </label>
                    <div className="mt-2">
                      <input
                        type="email"
                        name="email"
                        id="email"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        onChange={(e) => setClientSecret(e.target.value)}
                      />
                    </div>
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Redirect Uri
                    </label>
                    <div className="mt-2">
                      <input
                        type="text"
                        id="redirecturi"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        onChange={(e) => setRedirectUri(e.target.value)}
                        value={redirectUri}
                      />
                    </div>
                  </div>
                  {provider === "Azure Active Directory" && (
                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        tenantId
                      </label>
                      <div className="mt-2">
                        <input
                          type="email"
                          name="email"
                          id="email"
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          onChange={(e) => setTenantId(e.target.value)}
                        />
                      </div>
                    </div>
                  )}
                  {provider === "Auth0" && (
                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Issuer
                      </label>
                      <div className="mt-2">
                        <input
                          type="email"
                          name="email"
                          id="email"
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          onChange={(e) => setIssuer(e.target.value)}
                        />
                      </div>
                    </div>
                  )}

                  <div className="mt-6 flex items-center justify-end gap-x-6">
                    <button
                      type="submit"
                      onClick={() => postData()}
                      className="rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
                    >
                      Save
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
