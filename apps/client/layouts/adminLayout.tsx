import useTranslation from "next-translate/useTranslation";
import Link from "next/link";
import { useRouter } from "next/router";

function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}

export default function AdminLayout({ children }: any) {
  const { t, lang } = useTranslation("peppermint");
  const router = useRouter();

  console.log("router.pathname", router.pathname);

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
    // {
    //   name: "Notifications",
    //   href: "/admin/notifications",
    // },
  ];

  return (
    <div className="flex md:divide-x-2 h-[85vh]">
      <div className="hidden md:flex w-56 mt-11">
        <nav className="space-y-1 w-full pr-4" aria-label="Sidebar">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={classNames(
                item.current
                  ? "bg-green-500 text-white hover:text-white"
                  : "text-gray-800 hover:bg-gray-200 hover:text-gray-900",
                "flex items-center px-3 py-2 text-sm font-medium rounded-md w-full"
              )}
              aria-current={item.current ? "page" : undefined}
            >
              <span className="truncate">{item.name}</span>
            </Link>
          ))}
        </nav>
      </div>
      <div className="flex-1 px-4">{children}</div>
    </div>
  );
}
