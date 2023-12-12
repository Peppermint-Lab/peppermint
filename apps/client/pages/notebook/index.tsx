import { getCookie } from "cookies-next";
import useTranslation from "next-translate/useTranslation";
import { useRouter } from "next/router";
import { useQuery } from "react-query";

async function fetchNotebooks(token) {
  const res = await fetch(`/api/v1/notebooks/all`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  return res.json();
}

export default function NoteBooksIndex() {
  const { t } = useTranslation("peppermint");

  const token = getCookie("session");
  const { data, status, error, refetch } = useQuery("getUsersNotebooks", () =>
    fetchNotebooks(token)
  );

  const router = useRouter();

  async function deleteNotebook(id) {
    if (window.confirm("Do you really want to delete this notebook?")) {
      const res = await fetch(`/api/v1/note/${id}/delete`).then((res) =>
        res.json()
      );
      console.log(res);
      refetch();
    }
  }

  return (
    <div className="px-4 py-4 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-base font-semibold leading-6 text-gray-900 dark:text-white">
            {t("notebooks")}
          </h1>
          <p className="mt-2 text-sm text-gray-700 dark:text-white">
            {t("notebooks_description")}
          </p>
        </div>
      </div>
    </div>
  );
}
