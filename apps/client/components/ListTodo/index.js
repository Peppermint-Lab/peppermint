import { TrashIcon } from "@heroicons/react/20/solid";
import { getCookie } from "cookies-next";
import useTranslation from "next-translate/useTranslation";
import { useState } from "react";
import { useQuery } from "react-query";

async function getTodos(token) {
  const res = await fetch(`/api/v1/todos/all`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.json();
}

export default function ListTodo() {
  const token = getCookie("session");
  const { t } = useTranslation("peppermint");
  const { status, data, refetch } = useQuery("repoData", () => getTodos(token));

  const [minValue, setMinValue] = useState(0);
  const [maxValue, setMaxValue] = useState(12);
  const [text, setText] = useState("");

  function handleChange(value) {
    if (value <= 1) {
      setMinValue(0);
      setMaxValue(12);
    } else {
      setMinValue(maxValue);
      setMaxValue(value * 12);
    }
  }

  async function onSubmit() {
    await fetch(`/api/v1/todo/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        todo: text,
      }),
    }).then(() => {
      refetch();
      setText("");
    });
  }

  async function deleteTodo(id) {
    await fetch(`/api/v1/todo/${id}/delete`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }).then(() => refetch());
  }

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      onSubmit();
    }
  };

  return (
    <div>
      <div className="flex flex-row w-full">
        <div className="mt-1 relative w-full space-x-2">
          <input
            type="text"
            name="text"
            id="text"
            className="w-full shadow-sm text-gray-900 bg-gray-100 rounded-lg font-semibold border-none focus:outline-none "
            placeholder={t("enter_todo")}
            onChange={(e) => {
              setText(e.target.value);
            }}
            onKeyDown={handleKeyDown}
            value={text}
            onSubmit={() => onSubmit()}
          />
        </div>
      </div>

      {status === "success" && (
        <div>
          <div className="mt-4">
            {data.todos ? (
              data.todos.slice(minValue, maxValue).map((todo) => {
                return (
                  <div
                    className="flex row justify-between mt-1 bg-gray-100 p-2 rounded-lg"
                    key={todo.id}
                  >
                    <span
                      className={
                        todo.done
                          ? "line-through text-sm truncate"
                          : "text-sm font-semibold capitalize truncate"
                      }
                    >
                      {todo.text}
                    </span>
                    <button
                      onClick={() => deleteTodo(todo.id)}
                      type="button"
                      className="float-right   text-red-600 hover:text-red-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                    >
                      <TrashIcon className="h-4 w-4" aria-hidden="true" />
                    </button>
                  </div>
                );
              })
            ) : (
              <p>None Found</p>
            )}
          </div>
          {/* <div  className={data.todos && data.todos.length > 12 ? "mt-4" : "hidden"}>
            <Pagination
              defaultCurrent={1}
              total={12}
              onChange={handleChange}
            />
          </div> */}
        </div>
      )}
    </div>
  );
}
