import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import Create from "../ticket/Create";
// import useDarkMode from "../../hooks/useDarkMode";

import logo from './pmint.svg'

const Header = () => {
  const history = useHistory();
  // const [colorTheme, setTheme] = useDarkMode();

  const [expanded, setExpanded] = useState(false);
  const [show, setShow] = useState(false);
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")) || '' );

  function logout() {
    localStorage.clear();
    history.push("/login");
  }

  return (
    <div>
      <div className="">
        <header className="pb-16 bg-gradient-to-r from-green-800 to-green-400">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:max-w-7xl lg:px-8">
            <div className="relative flex flex-wrap items-center justify-center lg:justify-between">
              <div className="absolute left-0 py-5 flex-shrink-0 lg:static">
                <Link to='https://pmint.dev/'>
                  <span className="sr-only">Logo should be here?</span>
                  <img 
                  className="h-8"
                  src={logo}
                  alt="Logo logo"
                  />
                </Link>
              </div>

              <div className="hidden lg:ml-4 lg:flex lg:items-center lg:py-5 lg:pr-0.5">
                <Create />
                <div className="ml-4 relative flex-shrink-0">
                  <div>
                    <button
                      type="button"
                      className="bg-white rounded-full flex text-sm ring-2 ring-white ring-opacity-20 focus:outline-none focus:ring-opacity-100"
                      id="user-menu"
                      onClick={() => setExpanded(!expanded)}
                      aria-expanded="false"
                      aria-haspopup="true"
                    >
                      <span className="sr-only">Open user menu</span>
                      <span class="inline-flex items-center justify-center h-6 w-6 rounded-full bg-gray-500">
                        <span class="text-xs font-medium leading-none text-white">
                          {user ? user.name[0] : ''}
                        </span>
                      </span>
                    </button>
                  </div>

                  <div
                    className={`${
                      expanded
                        ? "origin-top-right z-40 absolute -right-2 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
                        : "hidden"
                    }`}
                    role="menu"
                    aria-orientation="vertical"
                    aria-labelledby="user-menu"
                  >
                    <Link
                      to="/settings"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full"
                      role="menuitem"
                    >
                      Settings
                    </Link>
                    <Link
                      onClick={() => logout()}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full float-left	"
                      role="menuitem"
                    >
                      Sign out
                    </Link>
                  </div>
                </div>
              </div>

              <div className="w-full py-5 lg:border-t lg:border-white lg:border-opacity-20 px-12 lg:px-0 mt-3">
                <div className="lg:grid lg:grid-cols-3 lg:gap-8 lg:items-center">
                  <div className="hidden lg:block lg:col-span-2">
                    <nav className="flex space-x-4">
                      <Link
                        to="/"
                        className="text-white text-sm font-medium rounded-md bg-white bg-opacity-0 px-3 py-2 hover:bg-opacity-10"
                        aria-current="page"
                      >
                        Dashboard
                      </Link>

                      <Link
                        to="/tickets"
                        className="text-cyan-100 text-sm font-medium rounded-md bg-white bg-opacity-0 px-3 py-2 hover:bg-opacity-10"
                        aria-current="false"
                      >
                        Tickets
                      </Link>

                      <Link
                        to="/history"
                        className="text-cyan-100 text-sm font-medium rounded-md bg-white bg-opacity-0 px-3 py-2 hover:bg-opacity-10"
                        aria-current="false"
                      >
                        History
                      </Link>

                      <Link
                        to='/admin/dashboard'
                        className={user.role === 'admin' ? 'text-cyan-100 text-sm font-medium rounded-md bg-white bg-opacity-0 px-3 py-2 hover:bg-opacity-10' : 'hidden'}
                        aria-current="false"
                      >
                        Admin
                      </Link>
                    </nav>
                  </div>
                </div>
              </div>

              <div className="absolute right-0 flex-shrink-0 lg:hidden">
                <button
                  type="button"
                  onClick={() => setShow(!show)}
                  className={`"bg-transparent p-2 rounded-md inline-flex items-center justify-center text-cyan-200 hover:text-white hover:bg-white hover:bg-opacity-10 focus:outline-none focus:ring-2 focus:ring-white" `}
                  aria-expanded="false"
                >
                  <span className="sr-only">Open main menu</span>

                  <svg
                    className="block h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>

                  <svg
                    className="hidden h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          <div className="lg:hidden">
            <div
              className={`${
                show
                  ? "z-30 absolute top-0 inset-x-0 max-w-3xl mx-auto w-full p-2 transition transform origin-to"
                  : "hidden"
              }`}
            >
              <div
                className={`${
                  show
                    ? "rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 bg-white divide-y divide-gray-200"
                    : "hidden"
                }`}
              >
                <div className="pt-3 pb-2">
                  <div className="flex items-center justify-between px-4">
                    <div>
                      <img
                        className="h-8 w-auto"
                        src="https://tailwindui.com/img/logos/workflow-mark-cyan-600.svg"
                        alt="Workflow"
                      />
                    </div>
                    <div className="-mr-2">
                      <button
                        onClick={() => setShow(!show)}
                        type="button"
                        className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-cyan-500"
                      >
                        <span className="sr-only">Close menu</span>
                        <svg
                          className="h-6 w-6"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          aria-hidden="true"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                  <div className="mt-3 px-2 space-y-1">
                    <Create />
                    <Link
                      to="/"
                      className="block rounded-md px-3 py-2 text-base text-gray-900 font-medium hover:bg-gray-100 hover:text-gray-800"
                    >
                      Dashboard
                    </Link>
                    <Link
                      to="/tickets"
                      className="block rounded-md px-3 py-2 text-base text-gray-900 font-medium hover:bg-gray-100 hover:text-gray-800"
                    >
                      Tickets
                    </Link>
                    <Link
                      to="/history"
                      className="block rounded-md px-3 py-2 text-base text-gray-900 font-medium hover:bg-gray-100 hover:text-gray-800"
                    >
                      History
                    </Link>
                    <Link
                      to='/admin/dashboard'
                      className="block rounded-md px-3 py-2 text-base text-gray-900 font-medium hover:bg-gray-100 hover:text-gray-800"
                    >
                      Admin
                    </Link>
                  </div>
                </div>
                <div className="pt-4 pb-2">
                  <div className="flex items-center px-5">
                    <div className="flex-shrink-0">
                      <span className="sr-only">Open user menu</span>
                      <span class="inline-flex items-center justify-center h-6 w-6 rounded-full bg-gray-500">
                        <span class="text-xs font-medium leading-none text-white">
                        {user ? user.name[0] : ''}
                        </span>
                      </span>
                    </div>
                    <div className="ml-3 min-w-0 flex-1">
                      <div className="text-base font-medium text-gray-800 truncate">
                        {user.name}
                      </div>
                      <div className="text-sm font-medium text-gray-500 truncate">
                        {user.email}
                      </div>
                    </div>
                  </div>
                  <div className="mt-3 px-2 space-y-1">
                    <Link
                      to="/settings"
                      className="block rounded-md px-3 py-2 text-base text-gray-900 font-medium hover:bg-gray-100 hover:text-gray-800"
                    >
                      Settings
                    </Link>
                    <Link className="block rounded-md px-3 py-2 text-base text-gray-900 font-medium hover:bg-gray-100 hover:text-gray-800">
                      Sign out
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </header>
      </div>
    </div>
  );
};

export default Header;
