import { useRouter } from "next/router";

import { getCookie } from "cookies-next";
import Link from "next/link";
import { useUser } from "../store/session";

// if admin -> set up a new user -> set up a new client -> set up a webhook -> set up an Email Queue
// if user -> new password -> check user info like name etc

export default function Home() {
  const router = useRouter();

  const { user } = useUser();
  const token = getCookie("session");

  return (
    <div className="bg-gray-200">
      <div className="flex justify-center align-center h-screen items-center">
        <div className="bg-white shadow-xl rounded-lg p-8">
          <div className="flex justify-between items-center min-w-[700px]">
            <div className="flex flex-col">
              <h1 className="text-2xl font-bold">Peppermint </h1>
              <p className="text-gray-600">
                Welcome to Peppermint! A fully open sourced ticket management
                system.
              </p>
            </div>
          </div>
          <div className="mt-4 ">
            <div className="flex flex-col space-y-4">
              <div className="border p-2 rounded-md border-dashed flex flex-row space-x-4 items-center">
                <img src="/github.svg" className="h-10 w-10" />
                <div className="flex flex-col align-center w-[36em]">
                  <span className="font-bold text-lg">Github</span>
                  <span className="max-w-lg">
                    Being an open source project, all of our source code can be
                    housed here. If you ever face a bug or are unsure about
                    something.
                  </span>
                </div>
                <Link
                  target="_blank"
                  href="https://github.com/Peppermint-Lab/peppermint"
                  className="rounded-md bg-gray-600 px-2.5  hover:text-white py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-gray-500 "
                >
                  Check it out
                </Link>
              </div>
              <div className="border p-2 rounded-md border-dashed flex flex-row space-x-4 items-center">
                <img src="/logo.svg" className="h-10 w-10" />
                <div className="flex flex-col align-center w-[36em]">
                  <span className="font-bold text-lg">Docs</span>
                  <span className="max-w-lg">
                    Documentation for Peppermint can be found here.
                  </span>
                </div>
                <Link
                  target="_blank"
                  href="https://github.com/Peppermint-Lab/peppermint"
                  className="rounded-md bg-green-600 px-2.5 py-1.5 text-sm font-semibold hover:text-white text-white shadow-sm hover:bg-green-500 "
                >
                  Check it out
                </Link>
              </div>
              <div className="border p-2 rounded-md border-dashed flex flex-row space-x-4 items-center ">
                <img src="/discord.svg" className="h-10 w-10" />
                <div className="flex flex-col align-center w-[36em]">
                  <span className="font-bold text-lg">Discord</span>
                  <span className="max-w-lg">
                    Join our discord server to get help from the community or
                    the developers.
                  </span>
                </div>
                <Link
                  target="_blank"
                  href="https://discord.gg/zbTy8nuHnK"
                  className="rounded-md bg-blue-600 px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 "
                >
                  Check it out
                </Link>
              </div>
              {/* <div className="border p-2 rounded-md border-dashed flex flex-row space-x-4 items-center">
                <img src="/github.svg" className="h-10 w-10" />
                <div className="flex flex-col align-center w-[36em]">
                  <span className="font-bold text-lg">Roadmap</span>
                  <span className="max-w-lg">
                    Being an open source project, all of our source code can be
                    housed here. If you ever face a bug or are unsure about
                    something.
                  </span>
                </div>
                <Link
                  href="https://github.com/Peppermint-Lab/peppermint"
                  className="rounded-md bg-gray-600 px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-gray-500 "
                >
                  Check it out
                </Link>
              </div> */}
            </div>
          </div>
          <div className="float-right mt-4">
            <button
              className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg"
              onClick={() => router.push("/")}
            >
              To Dashboard
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
