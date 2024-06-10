import useTranslation from "next-translate/useTranslation";
import Link from "next/link";
import { useRouter } from "next/router";
import { useUser } from "../store/session";

export default function Settings({ children }) {
  const router = useRouter();

  const { t } = useTranslation("peppermint");
  const { user } = useUser();

  const linkStyles = {
    active:
      "w-full bg-teal-50 border-teal-500 text-teal-700 hover:bg-teal-50 hover:text-teal-700 group border-l-4 px-3 py-2 flex items-center text-sm font-medium",
    inactive:
      "w-full border-transparent text-gray-900 hover:bg-gray-50 hover:text-gray-900 group mt-1 border-l-4 px-3 py-2 flex items-center text-sm font-medium",
  };

  return (
    <main className="relative mt-8">
      <div className="max-w-screen-xl mx-auto pb-6 px-4 sm:px-6 lg:pb-16 lg:px-8">
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="divide-y divide-gray-200 lg:grid lg:grid-cols-12 lg:divide-y-0 lg:divide-x">
            <aside className="py-6 lg:col-span-3">
              <nav>
                <Link
                  href="/settings/notifications"
                  className={
                    router.pathname === "/settings/notifications"
                      ? linkStyles.active
                      : linkStyles.inactive
                  }
                  aria-current="page"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    stroke-width="2"
                    className="flex-shrink-0 -ml-1 mr-3 h-6 w-6"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                    />
                  </svg>
                  <span className="truncate">{t("notifications")}</span>
                </Link>

                {!user.sso_active && (
                  <Link
                    href="/settings/password"
                    className={
                      router.pathname === "/settings/password"
                        ? linkStyles.active
                        : linkStyles.inactive
                    }
                  >
                    <svg
                      className=" flex-shrink-0 -ml-1 mr-3 h-6 w-6"
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
                        d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"
                      />
                    </svg>
                    <span className="truncate">{t("reset_password")}</span>
                  </Link>
                )}
              </nav>
            </aside>

            <div className=" lg:col-span-9">{children}</div>
          </div>
        </div>
      </div>
    </main>
  );
}
