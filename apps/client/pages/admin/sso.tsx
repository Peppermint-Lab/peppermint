import { ExclamationTriangleIcon } from "@heroicons/react/20/solid";
import { getCookie } from "cookies-next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function SSO() {
  const router = useRouter();

  const [isloading, setIsLoading] = useState(true);
  const [enabled, setEnabled] = useState(false);
  const [provider, setProvider] = useState("");
  const [clientId, setClientId] = useState("");
  const [clientSecret, setClientSecret] = useState("");
  const [tenantId, setTenantId] = useState("");
  const [issuer, setIssuer] = useState("");
  const [redirectUri, setRedirectUri] = useState(
    `${window.location.origin}/auth/oauth`
  );
  const [sso, setSSO] = useState<any>();

  async function postData() {
    await fetch(`/api/v1/config/sso/provider`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getCookie("session")}`,
      },
      body: JSON.stringify({
        name: provider,
        client_id: clientId,
        client_secret: clientSecret,
        tenantId,
        issuer,
        redirect_uri: redirectUri,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.success) {
          router.reload();
        }
      });
  }

  async function deleteConfig() {
    await fetch(`/api/v1/config/sso/provider`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${getCookie("session")}`,
      },
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.success) {
          router.reload();
        }
      });
  }

  async function checkState() {
    await fetch(`/api/v1/config/sso/enabled`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getCookie("session")}`,
      },
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.success) {
          setEnabled(res.sso);

          if (res.sso) {
            setClientId(res.provider.clientId);
          }
          setSSO(res.provider);

          setIsLoading(false);
        }
      });
  }

  console.log(provider);

  useEffect(() => {
    checkState();
  }, []);

  return (
    <main className="flex-1">
      <div className="relative max-w-4xl mx-auto md:px-8 xl:px-0">
        <div className="pt-10 pb-16">
          <div className="px-4 sm:px-6 md:px-0">
            <h1 className="text-3xl font-extrabold text-gray-900  dark:text-white">
              SSO Settings
            </h1>
          </div>
          <div className="px-4 sm:px-6 md:px-0 my-4">
            <div className="mb-6">
              {enabled ? (
                <div className="rounded-md bg-green-50 p-4">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <ExclamationTriangleIcon
                        className="h-5 w-5 text-green-400"
                        aria-hidden="true"
                      />
                    </div>
                    <div className="ml-3">
                      <h3 className="text-sm font-medium text-green-800">
                        SSO is enabled & configured
                      </h3>
                      <div className="mt-2 text-sm text-green-700">
                        <p>The config you supplied is working as intended.</p>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="rounded-md bg-yellow-50 p-4">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <ExclamationTriangleIcon
                        className="h-5 w-5 text-yellow-400"
                        aria-hidden="true"
                      />
                    </div>
                    <div className="ml-3">
                      <h3 className="text-sm font-medium text-yellow-800">
                        No Active SSO Settings found
                      </h3>
                      <div className="mt-2 text-sm text-yellow-700">
                        <p>
                          Please either create and submit an sso config or
                          activate your old one.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
            <div className="py-6 bg-white shadow-md p-4 rounded-md">
              {!isloading && !enabled ? (
                <>
                  <div>
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
                        value={provider || ""}
                      >
                        {provider === "" && (
                          <option value="" disabled>
                            Please select an option
                          </option>
                        )}
                        <option value="github">Github</option>
                        {/* <option value="discord">Discord</option>
                        <option value="gitlab">Gitlab</option>
                        <option value="google">Google</option> */}
                      </select>
                    </div>
                  </div>
                  {provider !== "" && (
                    <div className="space-y-4 mt-4">
                      <div>
                        <span className="text-xl font-bold text-black capitalize">
                          {provider} SSO settings
                        </span>
                      </div>
                      <div>
                        <label
                          htmlFor="clientIdddd"
                          className="block text-sm font-medium leading-6 text-gray-900"
                        >
                          Client Id
                        </label>
                        <div className="mt-2">
                          <input
                            type="text"
                            name="clientIdddd"
                            id="clientIdddd"
                            autoComplete="new-password"
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            onChange={(e) => setClientId(e.target.value)}
                          />
                        </div>
                      </div>
                      <div>
                        <label
                          htmlFor="secret"
                          className="block text-sm font-medium leading-6 text-gray-900"
                        >
                          Client Secret
                        </label>
                        <div className="mt-2">
                          <input
                            type="text"
                            name="secret"
                            id="secret"
                            autoComplete="new-password"
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            onChange={(e) => setClientSecret(e.target.value)}
                          />
                        </div>
                      </div>
                      <div>
                        <label
                          htmlFor="redirecturi"
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
                      {provider === "azure_ad" && (
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
                </>
              ) : (
                sso !== undefined && (
                  <div className="p-4">
                    <div>
                      <div className="flex flex-col space-y-2">
                        <span className="text-xl font-bold capitalize">
                          {sso.name} SSO settings
                        </span>
                        <span className="text-sm">
                          Below are the settings for your active ouath based SSO
                          set up. This set up is <strong>ORG WIDE</strong>, and
                          affects all users. Take caution when updating these
                          values.
                        </span>
                      </div>
                      <div className="space-y-4 mt-4">
                        <div>
                          <label
                            htmlFor="clientId"
                            className="block text-sm font-medium leading-6 text-gray-900"
                          >
                            Client Id
                          </label>
                          <div className="mt-2">
                            <input
                              type="text"
                              name="clientId"
                              id="clientId"
                              autoComplete="new-password"
                              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                              onChange={(e) => setClientId(e.target.value)}
                              value={clientId}
                              defaultValue={sso?.client_id}
                            />
                          </div>
                        </div>
                        <div>
                          <label
                            htmlFor="secret"
                            className="block text-sm font-medium leading-6 text-gray-900"
                          >
                            Client Secret
                          </label>
                          <div className="mt-2">
                            <input
                              type="password"
                              name="secret"
                              id="secret"
                              autoComplete="new-password"
                              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                              onChange={(e) => setClientSecret(e.target.value)}
                            />
                          </div>
                        </div>
                        <div>
                          <label
                            htmlFor="redirecturi"
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
                        {sso.name === "azure_ad" && (
                          <div>
                            <label
                              htmlFor="tennantId"
                              className="block text-sm font-medium leading-6 text-gray-900"
                            >
                              tenantId
                            </label>
                            <div className="mt-2">
                              <input
                                type="text"
                                name="tennantId"
                                id="tennantId"
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                onChange={(e) => setTenantId(e.target.value)}
                              />
                            </div>
                          </div>
                        )}
                        {sso.name === "Auth0" && (
                          <div>
                            <label
                              htmlFor="email"
                              className="block text-sm font-medium leading-6 text-gray-900"
                            >
                              Issuer
                            </label>
                            <div className="mt-2">
                              <input
                                type="text"
                                name="issuer"
                                id="issuer"
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                onChange={(e) => setIssuer(e.target.value)}
                              />
                            </div>
                          </div>
                        )}

                        <div className="mt-12 flex items-center justify-between gap-x-6">
                          <button
                            type="submit"
                            onClick={() => deleteConfig()}
                            className="rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
                          >
                            Delete Config
                          </button>
                          <button
                            type="submit"
                            onClick={() => postData()}
                            className="rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
                          >
                            Update Config
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
