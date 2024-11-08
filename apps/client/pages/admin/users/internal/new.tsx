import { Switch } from "@headlessui/react";
import { Flex } from "@radix-ui/themes";
import { getCookie } from "cookies-next";
import { useRouter } from "next/router";
import { useState } from "react";
import { useUser } from "../../../../store/session";
import { toast } from "@/shadcn/hooks/use-toast";

export default function CreateUser() {
  const [isLoading, setIsLoading] = useState(false);
  const [auth, setAuth] = useState(undefined);

  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [admin, setAdmin] = useState(false);
  const [language, setLanguage] = useState("en");

  const { user } = useUser();

  const router = useRouter();

  async function createUser() {
    await fetch(`/api/v1/auth/user/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + getCookie("session"),
      },
      body: JSON.stringify({
        password,
        email,
        name,
        admin,
        language,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.success === true) {
          router.push("/admin/users/internal");
          toast({
            variant: "default",
            title: "Success",
            description: "User updated succesfully",
          });
        } else {
          toast({
            variant: "destructive",
            title: "There has been an error ",
            description: "Whoops! please wait and try again!",
          });
        }
      });
  }

  async function checkAuth() {
    await fetch(`/api/v1/auth/check`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + getCookie("session"),
      },
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.success === true) {
          setAuth(res.auth);
          setIsLoading(false);
        } else {
        }
      });
  }

  return (
    <div>
      <main className="flex-1">
        <div className="relative max-w-4xl mx-auto md:px-8 xl:px-0">
          <div className="pt-10 pb-6 divide-y-2">
            <div className="px-4 sm:px-6 md:px-0">
              <h1 className="text-3xl font-extrabold text-foreground">
                Add a new user
              </h1>
            </div>
          </div>
          <div className="">
            <Flex gap="4" direction="column" align="start">
              <div className="w-1/2">
                <label className="text-foreground font-bold">Name</label>
                <input
                  type="text"
                  className="px-3 py-2 text-foreground bg-transparent border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 block w-full sm:text-sm"
                  placeholder="John Doe"
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="w-1/2">
                <label className="text-foreground font-bold">Email</label>
                <input
                  type="text"
                  className="px-3 py-2 text-foreground bg-transparent border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 block w-full sm:text-sm"
                  placeholder="John.Doe@test.com"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              {!user.sso_active && (
                <div className="w-1/2">
                  <label className="text-foreground font-bold">Password</label>
                  <input
                    type="text"
                    className="px-3 py-2 text-foreground bg-transparent border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 block w-full sm:text-sm"
                    placeholder=""
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              )}
              <div className="w-1/2 flex flex-col">
                <label className="text-foreground font-bold">Language</label>
                <select
                  id="language"
                  name="language"
                  className="mt-1 text-foreground bg-transparent block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                >
                  <option value="en">English</option>
                  <option value="de">German</option>
                  <option value="se">Swedish</option>
                  <option value="es">Spanish</option>
                  <option value="no">Norwegian</option>
                  <option value="fr">French</option>
                  <option value="pt">Tagalong</option>
                  <option value="da">Danish</option>
                  <option value="pt">Portuguese</option>
                  <option value="it">Italiano</option>
                  <option value="he">Hebrew</option>
                  <option value="tr">Turkish</option>
                  <option value="hu">Hungarian</option>
                  <option value="th">Thai (ภาษาไทย)</option>
                  <option value="zh-CN">Simplified Chinese (简体中文)</option>
                </select>
              </div>
              <div>
                <label className="text-foreground font-bold">Admin User</label>
                <div className="flex flex-row space-x-2 items-center">
                  <Switch
                    checked={admin}
                    onChange={setAdmin}
                    className={`${
                      admin ? "bg-blue-600" : "bg-gray-200"
                    } relative inline-flex h-6 w-11 items-center rounded-full`}
                  >
                    <span className="sr-only">Enable notifications</span>
                    <span
                      className={`${
                        admin ? "translate-x-6" : "translate-x-1"
                      } inline-block h-4 w-4 transform rounded-full bg-white transition`}
                    />
                  </Switch>
                </div>
              </div>
              <div
                className="flex justify-end w-full "
                onClick={() => createUser()}
              >
                <button
                  type="button"
                  className="rounded-md bg-green-600 px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-green-500"
                >
                  Create User
                </button>
              </div>
            </Flex>
          </div>
        </div>
      </main>
    </div>
  );
}
