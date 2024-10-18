import { cn } from "@/shadcn/lib/utils";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/shadcn/ui/alert-dialog";
import { Button } from "@/shadcn/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/shadcn/ui/card";
import { getCookie } from "cookies-next";
import { BellRing, Check } from "lucide-react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Authentication() {
  const router = useRouter();

  const [isloading, setIsLoading] = useState(true);
  const [enabled, setEnabled] = useState(false);
  const [provider, setProvider] = useState("");
  const [clientId, setClientId] = useState("");
  const [clientSecret, setClientSecret] = useState("");
  const [tenantId, setTenantId] = useState("");
  const [issuer, setIssuer] = useState("");
  const [redirectUri, setRedirectUri] = useState("");
  const [providerType, setProviderType] = useState("");
  const [jwtSecret, setJwtSecret] = useState("");

  async function postData() {
    if (providerType === "oidc") {
      await fetch(`/api/v1/config/authentication/oidc/update`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getCookie("session")}`,
        },
        body: JSON.stringify({
          issuer,
          redirectUri,
          clientId,
        }),
      })
        .then((res) => res.json())
        .then((res) => {
          if (res.success) {
            router.reload();
          }
        });
    } else {
      await fetch(`/api/v1/config/auth/oauth`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getCookie("session")}`,
        },
        body: JSON.stringify({
          name: provider,
          redirectUri,
          clientId,
          clientSecret,
        }),
      })
        .then((res) => res.json())
        .then((res) => {
          if (res.success) {
            router.reload();
          }
        });
    }
  }

  async function deleteData() {
    await fetch(`/api/v1/config/authentication`, {
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
    await fetch(`/api/v1/config/authentication/check`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getCookie("session")}`,
      },
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.success && res.sso) {
          setEnabled(res.sso);
          setProvider(res.provider);
        } else {
          setEnabled(false);
        }
      });
  }

  async function setUri() {
    if (providerType === "oidc") {
      setRedirectUri(`${window.location.origin}/auth/oidc`);
    } else {
      setRedirectUri(`${window.location.origin}/auth/oauth`);
    }
  }

  useEffect(() => {
    checkState();
  }, []);

  useEffect(() => {
    setUri();
  }, [providerType]);

  return (
    <main className="flex-1">
      <div className="relative max-w-4xl mx-auto md:px-8 xl:px-0">
        <div className="pt-10 pb-16">
          <div className="px-4 sm:px-6 md:px-0">
            <h1 className="text-3xl font-extrabold text-foreground ">
              Authentication Settings
            </h1>
          </div>
          <div className="px-4 sm:px-6 md:px-0 my-4">
            {enabled ? (
              <div className="flex justify-center mt-16">
                <Card className={cn("w-[380px]")}>
                  <CardHeader>
                    <CardTitle className="capitalize">
                      {provider} settings
                    </CardTitle>
                    <CardDescription>
                      Manage your {provider} config
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="grid gap-4"></CardContent>
                  <CardFooter>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button className="w-full bg-red-500">
                          <Check className="mr-2 h-4 w-4" /> delete
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>
                            Are you absolutely sure?
                          </AlertDialogTitle>
                          <AlertDialogDescription>
                            This action cannot be undone. This will permanently
                            delete your account and remove your data from our
                            servers.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction onClick={() => deleteData()}>
                            Continue
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </CardFooter>
                </Card>
              </div>
            ) : (
              <div>
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
                    <option value="oauth" disabled>
                      OAuth
                    </option>
                    <option value="saml" disabled>
                      SAML - coming soon
                    </option>
                  </select>
                </div>
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
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
