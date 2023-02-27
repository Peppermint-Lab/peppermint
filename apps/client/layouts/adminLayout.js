import useTranslation from "next-translate/useTranslation";
import Link from "next/link";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function AdminLayout({ children }) {
  const { t, lang } = useTranslation("peppermint");

  const navigation = [
    {
      name: t("sl_users"),
      href: "/admin/auth",
    },
    {
      name: t("sl_clients"),
      href: "/admin/clients",
    },
    {
      name: t("sl_settings"),
      href: "/admin/settings",
    }
  ];

  return (
    <div className="flex divide-x-2 h-[85vh]">
      <div className="flex w-32 mt-6 ">
        <nav className="space-y-1" aria-label="Sidebar">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={classNames(
                item.current
                  ? "bg-gray-100 text-gray-900"
                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-900",
                "flex items-center px-3 py-2 text-sm font-medium rounded-md"
              )}
              aria-current={item.current ? "page" : undefined}
            >
              <span className="truncate">{item.name}</span>
            </Link>
          ))}
        </nav>
      </div>
      <div className="flex-1">{children}</div>
    </div>
  );
}
