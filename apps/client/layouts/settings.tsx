import useTranslation from "next-translate/useTranslation";
import Link from "next/link";
import { useRouter } from "next/router";
import { useUser } from "../store/session";
import { Bell, Key, KeyRound } from "lucide-react";
import { classNames } from "@/shadcn/lib/utils";

export default function Settings({ children }) {
  const router = useRouter();

  const { t } = useTranslation("peppermint");
  const { user } = useUser();

  const linkStyles = {
    active:
      "w-full bg-primary hover:bg-accent rounded-md group border-l-4 px-3 py-2 flex items-center text-sm font-medium",
    inactive:
      "w-full bg-secondary hover:bg-primary rounded-md group mt-1 border-l-4 px-3 py-2 flex items-center text-sm font-medium",
  };

  return (
    <main className="relative pt-8">
      <div className="max-w-screen-xl mx-auto pb-6 px-4 sm:px-6 lg:pb-16 lg:px-8">
        <div className="bg-background rounded-lg shadow overflow-hidden">
          <div className="divide-y lg:grid lg:grid-cols-12 lg:divide-y-0 lg:divide-x">
            <aside className="py-6 px-2 lg:col-span-3">
              <nav className="space-y-2">
                <Link
                  href="/settings/notifications"
                  className={classNames(
                    router.pathname === "/settings/notifications"
                      ? "bg-secondary dark:bg-primary"
                      : "hover:bg-[#F0F3F9] dark:hover:bg-white dark:hover:text-gray-900 ",
                    "group flex items-center gap-x-3 py-2 px-3 rounded-md text-sm font-semibold leading-6"
                  )}
                  aria-current="page"
                >
                  <Bell className="flex-shrink-0  h-5 w-5 text-foreground" />
                  <span className="truncate">{t("notifications")}</span>
                </Link>

                {!user.sso_active && (
                  <Link
                    href="/settings/password"
                    className={classNames(
                      router.pathname === "/settings/password"
                        ? "bg-secondary dark:bg-primary"
                        : "hover:bg-[#F0F3F9] dark:hover:bg-white dark:hover:text-gray-900 ",
                      "group flex items-center gap-x-3 py-2 px-3 rounded-md text-sm font-semibold leading-6"
                    )}
                  >
                    <KeyRound className="flex-shrink-0  h-5 w-5 text-foreground" />
                    <span>{t("reset_password")}</span>
                  </Link>
                )}
              </nav>
            </aside>

            <div className="lg:col-span-9">{children}</div>
          </div>
        </div>
      </div>
    </main>
  );
}
