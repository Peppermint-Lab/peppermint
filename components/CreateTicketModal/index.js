import React, { useState, useEffect, Fragment, useRef } from "react";
import { Select, Form, Input, Radio, Space } from "antd";
import { Dialog, Transition } from "@headlessui/react";

export default function CreateTicketModal() {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [company, setCompany] = useState();
  const [engineer, setEngineer] = useState();
  const [email, setEmail] = useState("");
  const [issue, setIssue] = useState("");
  const [priority, setPriority] = useState("Normal");
  const [options, setOptions] = useState([]);
  const [users, setUsers] = useState([]);

  const cancelButtonRef = useRef(null);

  const [form] = Form.useForm();
  const { Option } = Select;

  const fetchClients = async () => {
    await fetch(`/api/v1/client/allclients`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((res) => {
        if (res) {
          setOptions(res.clients);
        }
      });
  };

  async function getUsers() {
    try {
      await fetch(`/api/v1/auth/getAllUsers`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((res) => {
          if (res) {
            setUsers(res.users);
          }
        });
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchClients();
    getUsers();
  }, []);

  const search = options ? (
    options.map((d) => <Option key={d.id}>{d.name}</Option>)
  ) : (
    <Option key="no_id">
      <p>Please refresh</p>
    </Option>
  );

  const userSearch = users ? (
    users.map((d) => (
      <Option key={d.id}>{d.firstName + " " + d.lastName}</Option>
    ))
  ) : (
    <Option key="no_id">
      <p>Please refresh</p>
    </Option>
  );

  return (
    <div>
      <div>
        <button
          onClick={() => setOpen(true)}
          type="button"
          className="group flex items-center px-2 py-2 text-sm font-medium w-full rounded-md hover:bg-green-400 hover:text-white"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 mr-3 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
            />
          </svg>
          <span className="text-white ">Create Ticket</span>
        </button>
      </div>

      <Transition.Root show={open} as={Fragment}>
        <Dialog
          as="div"
          className="fixed z-10 inset-0 overflow-y-auto"
          initialFocus={cancelButtonRef}
          onClose={setOpen}
        >
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
            </Transition.Child>

            {/* This element is to trick the browser into centering the modal contents. */}
            <span
              className="hidden sm:inline-block sm:align-middle sm:h-screen"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-3xl sm:w-full sm:p-6">
                <div>
                  <div>
                    <h1 className="text-xl text-center m2 p2 font-bold">
                      New Ticket
                    </h1>

                    <div className="mt-4 space-y-4">
                      <input
                        type="text"
                        id="name"
                        placeholder="Enter name here..."
                        name="name"
                        onChange={(e) => setName(e.target.value)}
                        className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      />

                      <input
                        type="text"
                        name="email"
                        placeholder="Enter email here...."
                        onChange={(e) => setEmail(e.target.value)}
                        className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      />

                      <Select
                        bordered={false}
                        showSearch
                        placeholder="Select a client"
                        optionFilterProp="children"
                        onChange={setCompany}
                        filterOption={(input, option) =>
                          option.children
                            .toLowerCase()
                            .indexOf(input.toLowerCase()) >= 0
                        }
                      >
                        {search}
                      </Select>

                      <Select
                        bordered={false}
                        showSearch
                        placeholder="Select a Engineer"
                        optionFilterProp="children"
                        onChange={setEngineer}
                        filterOption={(input, option) =>
                          option.children
                            .toLowerCase()
                            .indexOf(input.toLowerCase()) >= 0
                        }
                      >
                        {userSearch}
                      </Select>

                      <Input.TextArea
                        rows={5}
                        onChange={(e) => setIssue(e.target.value)}
                      />

                      <Radio.Group
                        buttonStyle="solid"
                        value={priority}
                        onChange={(e) => setPriority(e.target.value)}
                        className="mx-auto"
                      >
                        <Space>
                          <Radio.Button value="Low">Low</Radio.Button>
                          <Radio.Button value="Normal">Normal</Radio.Button>
                          <Radio.Button value="High" className="bg-red">
                            High
                          </Radio.Button>
                        </Space>
                      </Radio.Group>
                    </div>

                    <div className="mt-5 sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-3 sm:grid-flow-row-dense mx-auto ">
                      <button
                        onClick={() => {
                          createTicket(
                            name,
                            email,
                            company,
                            issue,
                            priority,
                            engineer
                          );
                          form.resetFields();
                          setOpen(false);
                        }}
                        type="button"
                        className="w-1/2 mx-auto  inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:col-start-2 sm:text-sm"
                      >
                        Create Ticket
                      </button>
                      <button
                        onClick={() => {
                          setOpen(false);
                        }}
                        type="button"
                        className="mt-3 w-1/2  mx-auto inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:col-start-1 sm:text-sm"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>
    </div>
  );
}
