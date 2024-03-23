import useTranslation from "next-translate/useTranslation";
import Link from "next/link";
import { useRouter } from "next/router";
import { useUser } from "../store/session";

function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}

export default function AdminLayout({ children }: any) {
  const { t, lang } = useTranslation("peppermint");
  const router = useRouter();

  const { user } = useUser();

  if (user && !user.isAdmin) {
    return (
      <div className="flex items-center justify-center h-screen">
        <h1 className="text-4xl font-bold">You are not an admin</h1>
      </div>
    );
  }

  const navigation = [
    {
      name: t("sl_users"),
      href: "/admin/users/internal",
      current: router.pathname === "/admin/users/internal",
    },
    {
      name: t("sl_clients"),
      href: "/admin/clients",
      current: router.pathname === "/admin/clients",
    },
    {
      name: "Email Queues",
      href: "/admin/email-queues",
      current: router.pathname === "/admin/email-queues",
    },
    {
      name: "Webhooks",
      href: "/admin/webhooks",
      current: router.pathname === "/admin/webhooks",
    },
    {
      name: "Outbound Emails",
      href: "/admin/email",
      current: router.pathname === "/admin/email",
    },
    {
      name: "Email Templates",
      href: "/admin/email/templates",
      current: router.pathname === "/admin/email/templates",
    },
    {
      name: "SSO",
      href: "/admin/sso",
      current: router.pathname === "/admin/sso",
    },
  ];

  return (
    <div className="flex w-full p-4">
      <div className="flex xl:divide-x-2 w-full h-[85vh] max-w-10xl pr-4">
        <div className="hidden md:flex w-56 mt-11 pr-4">
          <nav className="space-y-1 w-full pr-4" aria-label="Sidebar">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={classNames(
                  item.current
                    ? "bg-green-500 text-white hover:text-white"
                    : "text-gray-800 dark:text-white hover:bg-gray-200 dark:hover:bg-green-600 hover:text-gray-900",
                  "flex items-center px-3 py-2 text-sm font-medium rounded-md w-full"
                )}
                aria-current={item.current ? "page" : undefined}
              >
                <span className="truncate">{item.name}</span>
              </Link>
            ))}
          </nav>
        </div>

        <div className="flex-1 px-6 xl:w-[800px] overflow-y-scroll ">
          {children}
        </div>
      </div>
    </div>
  );
}
