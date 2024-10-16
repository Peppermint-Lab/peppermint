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
  const [providerType, setProviderType] = useState(""); // New state for provider type
  const [jwtSecret, setJwtSecret] = useState(""); // Added state for jwtSecret

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

  useEffect(() => {
    checkState();
  }, []);

  return (
    <main className="flex-1">
      <div className="relative max-w-4xl mx-auto md:px-8 xl:px-0">
        <div className="pt-10 pb-16">
          <div className="px-4 sm:px-6 md:px-0">
            <h1 className="text-3xl font-extrabold text-gray-900  dark:text-white">
              Authentication Settings
            </h1>
          </div>
          <div className="px-4 sm:px-6 md:px-0 my-4">
            <div className="mb-6">
              <select
                id="providerType"
                name="providerType"
                onChange={(e) => setProviderType(e.target.value)}
                className="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
                value={providerType || ""}
              >
                <option value="" disabled>
                  Please select a provider type
                </option>
                <option value="oidc">OIDC</option>
                <option value="oauth">OAuth</option>
                <option value="saml" disabled>
                  SAML - coming soon
                </option>
              </select>
            </div>
            {/* Existing code for displaying provider settings based on selection */}
            {providerType && (
              <div className="space-y-4 mt-4">
                <h2 className="text-base font-semibold leading-7 text-gray-900">
                  {providerType.toUpperCase()} Settings
                </h2>
                {providerType === "oidc" && (
                  <>
                    <div>
                      <label
                        htmlFor="issuer"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Issuer
                      </label>
                      <input
                        type="text"
                        id="issuer"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        onChange={(e) => setIssuer(e.target.value)}
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="clientId"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Client Id
                      </label>
                      <input
                        type="text"
                        id="clientId"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        onChange={(e) => setClientId(e.target.value)}
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="clientSecret"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Client Secret
                      </label>
                      <input
                        type="text"
                        id="clientSecret"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        onChange={(e) => setClientSecret(e.target.value)}
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="redirectUri"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Redirect URI
                      </label>
                      <input
                        type="text"
                        id="redirectUri"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        onChange={(e) => setRedirectUri(e.target.value)}
                        value={redirectUri}
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="jwtSecret"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        JWT Secret
                      </label>
                      <input
                        type="text"
                        id="jwtSecret"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        onChange={(e) => setJwtSecret(e.target.value)}
                      />
                    </div>
                  </>
                )}
                {providerType === "oauth" && (
                  <>
                    <div className="space-y-4 mt-2">
                      <div>
                        <label
                          htmlFor="clientId"
                          className="block text-sm font-medium leading-6 text-gray-900"
                        >
                          Client Id
                        </label>
                        <input
                          type="text"
                          id="clientId"
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          onChange={(e) => setClientId(e.target.value)}
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="clientId"
                          className="block text-sm font-medium leading-6 text-gray-900"
                        >
                          Client Secret
                        </label>
                        <input
                          type="text"
                          id="clientId"
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          onChange={(e) => setClientId(e.target.value)}
                        />
                      </div>

                      <div>
                        <label
                          htmlFor="clientId"
                          className="block text-sm font-medium leading-6 text-gray-900"
                        >
                          Redirect URI
                        </label>
                        <input
                          type="text"
                          id="clientId"
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          onChange={(e) => setClientId(e.target.value)}
                        />
                      </div>
                    </div>
                  </>
                )}
                {/* Example for SAML */}
                {/* {providerType === "saml" && (
                  <>
                    <div>
                      <label htmlFor="samlField" className="block text-sm font-medium leading-6 text-gray-900">
                        SAML Field
                      </label>
                      <input
                        type="text"
                        id="samlField"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        onChange={(e) => setSomeSamlField(e.target.value)} // Adjust as needed
                      />
                    </div>
                  </>
                )} */}
                {/* Save button */}
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
    </main>
  );
}
