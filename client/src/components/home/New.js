import { useState, useContext, useEffect } from "react";
import {
  CheckCircleIcon,
  OfficeBuildingIcon,
  ArrowRightIcon,
} from "@heroicons/react/solid";
import ListTodo from "../todos/ListTodo";

import { GlobalContext } from "../../Context/GlobalState";

const New = () => {
  const { addTodo } = useContext(GlobalContext);

  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user")) || ""
  );
  const [openTickets, setOpenTickets] = useState();
  const [completedTickets, setCompletedTickets] = useState();
  const [file, setFile] = useState([]);

  const [text, setText] = useState("");

  const onSubmit = () => {
    addTodo(text);
  };

  async function getOpenTickets() {
    await fetch(`/api/v1/data/openTickets`, {
      method: "get",
      headers: {
        ContentType: "application/json",
      },
    })
      .then((res) => res.json())
      .then((res) => {
        setOpenTickets(res.results);
      });
  }

  async function getCompletedTickets() {
    await fetch(`/api/v1/data/completedTickets`, {
      method: "get",
      headers: {
        ContentType: "application/json",
      },
    })
      .then((res) => res.json())
      .then((res) => {
        setCompletedTickets(res.result);
      });
  }

  useEffect(() => {
    getOpenTickets();
    getCompletedTickets();
  }, []);

  return (
    <div>
      <main className="p-1">
        {/* Page header */}
        <div className="bg-white shadow">
          <div className="px-4 sm:px-6 lg:max-w-6xl lg:mx-auto lg:px-8">
            <div className="py-6 md:flex md:items-center md:justify-between lg:border-t lg:border-gray-200">
              <div className="flex-1 min-w-0">
                {/* Profile */}
                <div className="flex items-center">
                  <span className="hidden sm:inline-flex items-center justify-center h-12 w-12 rounded-full bg-gray-500">
                    <span className="text-lg font-medium leading-none text-white">
                      JA
                    </span>
                  </span>
                  <div>
                    <div className="flex items-center">
                      <span className="inline-flex items-center justify-center h-12 w-12 rounded-full bg-gray-500 sm:hidden">
                        <span className="text-lg font-medium leading-none text-white">
                          JA
                        </span>
                      </span>
                      <h1 className="ml-3 text-2xl font-bold leading-7 text-gray-900 sm:leading-9 sm:truncate">
                        Good morning, {user.firstName + " " + user.lastName}
                      </h1>
                    </div>
                    <dl className="mt-6 flex flex-col sm:ml-3 sm:mt-1 sm:flex-row sm:flex-wrap">
                      <dt className="sr-only">Company</dt>
                      <dd className="flex items-center text-sm text-gray-500 font-medium capitalize sm:mr-6">
                        <OfficeBuildingIcon
                          className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400"
                          aria-hidden="true"
                        />
                        Duke street studio
                      </dd>
                      <dt className="sr-only">Account status</dt>
                      <dd className="mt-3 flex items-center text-sm text-gray-500 font-medium sm:mr-6 sm:mt-0 capitalize">
                        <CheckCircleIcon
                          className="flex-shrink-0 mr-1.5 h-5 w-5 text-green-400"
                          aria-hidden="true"
                        />
                        {user.isAdmin ? "Admin" : "Engineer"}
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div>
          <dl className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-3">
            <div className="px-4 py-5 bg-white shadow rounded-lg overflow-hidden sm:p-6">
              <dt className="text-sm font-medium text-gray-500 truncate">
                Open Tickets
              </dt>
              <dd className="mt-1 text-3xl font-semibold text-gray-900">
                {openTickets}
              </dd>
            </div>
            <div className="px-4 py-5 bg-white shadow rounded-lg overflow-hidden sm:p-6">
              <dt className="text-sm font-medium text-gray-500 truncate">
                Completed Tickets
              </dt>
              <dd className="mt-1 text-3xl font-semibold text-gray-900">
                {completedTickets}
              </dd>
            </div>
            <div className="px-4 py-5 bg-white shadow rounded-lg overflow-hidden sm:p-6">
              <dt className="text-sm font-medium text-gray-500 truncate">
                Third Option
              </dt>
              <dd className="mt-1 text-3xl font-semibold text-gray-900">
                null
              </dd>
            </div>
          </dl>
        </div>

        <div className="bg-white overflow-hidden shadow sm:rounded-lg mt-5 w-1/2 h-full">
          <div className="px-2 sm:px-6 lg:max-w-6xl lg:mx-auto lg:px-4">
            <div className="px-2 py-5 sm:p-6">
              <div>
                <h1 className="font-bold leading-7 text-gray-900">Todo List</h1>
              </div>
              <div className="flex flex-row items-center w-full">
                <div className="mt-1 relative rounded-md shadow-sm w-full">
                  <input
                    type="text"
                    name="email"
                    id="email"
                    className="block w-full pr-10 text-gray-900 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm rounded-md"
                    placeholder="Enter todo here..."
                    onChange={(e) => {
                      setText(e.target.value);
                    }}
                  />
                </div>
                <button onClick={() => onSubmit()}>
                  <ArrowRightIcon className="h-6 w-6 mx-auto -mr-8" />
                </button>
              </div>
              <ListTodo />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default New;
