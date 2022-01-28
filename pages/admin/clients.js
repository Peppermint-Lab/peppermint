import React from "react";
import { useQuery } from "react-query";
import { Popconfirm } from "antd";
import {
  useTable,
  useFilters,
  useGlobalFilter,
  usePagination,
} from "react-table";
import ClientNotesModal from "../../components/ClientNotesModal";
import CreateClient from "../../components/CreateClientModal";
import UpdateClientModal from "../../components/UpdateClientModal";

const fetchAllClients = async () => {
  const res = await fetch("/api/v1/clients/all");
  return res.json();
};

function DefaultColumnFilter({ column: { filterValue, setFilter } }) {
  return (
    <input
      className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
      type="text"
      value={filterValue || ""}
      onChange={(e) => {
        setFilter(e.target.value || undefined); // Set undefined to remove the filter entirely
      }}
      placeholder="Type to filter"
    />
  );
}
function Table({ columns, data }) {
  const filterTypes = React.useMemo(
    () => ({
      // Add a new fuzzyTextFilterFn filter type.
      // fuzzyText: fuzzyTextFilterFn,
      // Or, override the default text filter to use
      // "startWith"
      text: (rows, id, filterValue) =>
        rows.filter((row) => {
          const rowValue = row.values[id];
          return rowValue !== undefined
            ? String(rowValue)
                .toLowerCase()
                .startsWith(String(filterValue).toLowerCase())
            : true;
        }),
    }),
    []
  );

  const defaultColumn = React.useMemo(
    () => ({
      // Let's set up our default Filter UI
      Filter: DefaultColumnFilter,
    }),
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    canPreviousPage,
    canNextPage,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize },
  } = useTable(
    {
      columns,
      data,
      defaultColumn, // Be sure to pass the defaultColumn option
      filterTypes,
      initialState: {
        pageIndex: 0,
      },
    },
    useFilters, // useFilters!
    useGlobalFilter,
    usePagination
  );

  return (
    <div className="overflow-x-auto md:-mx-6 lg:-mx-8">
      <div className="py-2 align-middle inline-block min-w-full md:px-6 lg:px-8">
        <div className="shadow overflow-hidden border-b border-gray-200 md:rounded-lg">
          <table
            {...getTableProps()}
            className="min-w-full divide-y divide-gray-200"
          >
            <thead className="bg-gray-50">
              {headerGroups.map((headerGroup) => (
                <tr
                  {...headerGroup.getHeaderGroupProps()}
                  key={headerGroup.headers.map((header) => header.id)}
                >
                  {headerGroup.headers.map((column) =>
                    column.hideHeader === false ? null : (
                      <th
                        {...column.getHeaderProps()}
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        {column.render("Header")}
                        {/* Render the columns filter UI */}
                        <div>
                          {column.canFilter ? column.render("Filter") : null}
                        </div>
                      </th>
                    )
                  )}
                </tr>
              ))}
            </thead>
            <tbody {...getTableBodyProps()}>
              {page.map((row, i) => {
                prepareRow(row);
                return (
                  <tr {...row.getRowProps()} className="bg-white">
                    {row.cells.map((cell) => (
                      <td
                        className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900"
                        {...cell.getCellProps()}
                      >
                        {cell.render("Cell")}
                      </td>
                    ))}
                  </tr>
                );
              })}
            </tbody>
          </table>

          <nav
            className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6"
            aria-label="Pagination"
          >
            <div className="hidden sm:block">
              <div className="flex flex-row flex-nowrap w-full space-x-2">
                <p
                  htmlFor="location"
                  className="block text-sm font-medium text-gray-700 mt-4"
                >
                  Show
                </p>
                <select
                  id="location"
                  name="location"
                  className="block w-full pl-3 pr-10 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                  value={pageSize}
                  onChange={(e) => {
                    setPageSize(Number(e.target.value));
                  }}
                >
                  {[10, 20, 30, 40, 50].map((pageSize) => (
                    <option key={pageSize} value={pageSize}>
                      {pageSize}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="flex-1 flex justify-between sm:justify-end">
              <button
                className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                type="button"
                onClick={() => previousPage()}
                disabled={!canPreviousPage}
              >
                Previous
              </button>
              <button
                className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                type="button"
                onClick={() => nextPage()}
                disabled={!canNextPage}
              >
                Next
              </button>
            </div>
          </nav>
        </div>
      </div>
    </div>
  );
}

export default function Clients() {
  const { data, status, refetch } = useQuery(
    "fetchAllClients",
    fetchAllClients
  );

  //   async function deleteClient(id) {
  //     try {
  //       await fetch(`/api/v1/clients/${id}/delete-client`, {
  //         method: "DELETE",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //       })
  //         .then((response) => response.json())
  //         .then(() => {
  //           refetch;
  //         });
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   }

  const columns = React.useMemo(() => [
    {
      Header: "Client Name",
      accessor: "name",
      width: 10,
      id: "client_name",
    },
    {
      Header: "Contact Name",
      accessor: "contactName",
      id: "contactName",
    },
    {
      Header: "",
      id: "actions",
      Cell: ({ row, value }) => {
        return (
          <div className="space-x-4 flex flex-row">
            <UpdateClientModal client={row.original} />
            <ClientNotesModal notes={row.original.notes} id={row.original.id} />
          </div>
        );
      },
    },
  ]);

  return (
    <div>
      <main
        className="relative z-0 overflow-y-auto focus:outline-none"
        tabIndex="0"
      >
        <div className="py-6">
          <div className="flex flex-row max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
            <h1 className="text-2xl font-semibold text-gray-900">Clients</h1>
            <div className="ml-3">
              <CreateClient />
            </div>
          </div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
            <div className="py-4">
              {status === "loading" && (
                <div className="min-h-screen flex flex-col justify-center items-center py-12 sm:px-6 lg:px-8">
                  <h2> Loading data ... </h2>
                </div>
              )}

              {status === "error" && (
                <div className="min-h-screen flex flex-col justify-center items-center py-12 sm:px-6 lg:px-8">
                  <h2 className="text-2xl font-bold">
                    {" "}
                    Error fetching data ...{" "}
                  </h2>
                </div>
              )}

              {status === "success" && (
                <div>
                  <div className="hidden sm:block">
                    <Table columns={columns} data={data.clients} />
                  </div>

                  <div className="sm:hidden">
                    {data.clients.map((client) => (
                      <div
                        key={client.id}
                        className="flex flex-col text-center bg-white rounded-lg shadow mt-4"
                      >
                        <div className="flex-1 flex flex-col p-8">
                          <h3 className=" text-gray-900 text-sm font-medium">
                            {client.name}
                          </h3>
                          <dl className="mt-1 flex-grow flex flex-col justify-between">
                            <dd className="text-gray-500 text-sm">
                              {client.number}
                            </dd>
                            <dt className="sr-only">Role</dt>
                            <dd className="mt-3">
                              <span>
                                Primary Contact - {client.contactName}
                              </span>
                            </dd>
                          </dl>
                        </div>
                        <div className="space-x-4 align-middle flex flex-row justify-center -mt-8 mb-4">
                          <UpdateClientModal client={client} />
                          <ClientNotesModal
                            notes={client.notes}
                            id={client.id}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
