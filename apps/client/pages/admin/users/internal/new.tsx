import { notifications } from "@mantine/notifications";
import { Button, Flex, Select, Switch, Text } from "@radix-ui/themes";
import { getCookie } from "cookies-next";
import { useRouter } from "next/router";
import { useState } from "react";

export default function CreateUser() {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [admin, setAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [auth, setAuth] = useState(undefined);

  const router = useRouter();

  async function createUser() {
    await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/v1/auth/user/register`,
      {
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
        }),
      }
    )
      .then((res) => res.json())
      .then((res) => {
        if (res.success === true) {
          router.push("/admin/internal/users");
          notifications.show({
            title: "User created successfully",
            message: "The action was processed correctly! 💚",
          });
        } else {
          notifications.show({
            title: "There has been an error ",
            message: "Whoops! please wait and try again! 🤥",
            color: "red",
          });
        }
      });
  }

  async function checkAuth() {
    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/auth/check`, {
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
              <h1 className="text-3xl font-extrabold text-gray-900">
                Add a new user
              </h1>
            </div>
          </div>
          <div className="bg-white p-6 rounded-md shadow-lg">
            <Flex gap="5" direction="column" align="start">
              <div className="w-1/2">
                <label className="text-gray-900 font-bold">Name</label>
                <input
                  type="text"
                  className="px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 block w-full sm:text-sm"
                  placeholder="John Doe"
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="w-1/2">
                <label className="text-gray-900 font-bold">Email</label>
                <input
                  type="text"
                  className="px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 block w-full sm:text-sm"
                  placeholder="John Doe"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              {auth === "password" && (
                <div className="w-1/2">
                  <label className="text-gray-900 font-bold">Password</label>
                  <input
                    type="text"
                    className="px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 block w-full sm:text-sm"
                    placeholder=""
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              )}
              <div className="w-1/2 flex flex-col">
                <label className="text-gray-900 font-bold">Language</label>
                <Select.Root defaultValue="en">
                  <Select.Trigger />
                  <Select.Content>
                    <Select.Group>
                      <Select.Label>Locale</Select.Label>
                      <Select.Item value="en">English</Select.Item>
                      <Select.Item value="fr">French</Select.Item>
                      <Select.Item value="es">Spanish</Select.Item>
                      <Select.Item value="de">German</Select.Item>
                      <Select.Item value="pt">Portuguease</Select.Item>
                      <Select.Item value="da">Danish</Select.Item>
                      <Select.Item value="no">Norweigan</Select.Item>
                      <Select.Item value="se">Swedish</Select.Item>
                      <Select.Item value="tl">Tag</Select.Item>
                    </Select.Group>
                  </Select.Content>
                </Select.Root>
              </div>
              <Text as="label" size="2">
                <Flex gap="2">
                  <Switch /> Admin
                </Flex>
              </Text>
              <div className="flex justify-end w-full " onClick={createUser}>
                <Button>Submit</Button>
              </div>
            </Flex>
          </div>
        </div>
      </main>
    </div>
  );
}
