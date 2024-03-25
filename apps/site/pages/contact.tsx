//@ts-nocheck
import Cal, { getCalApi } from "@calcom/embed-react";
import Link from "next/link";
import { useEffect } from "react";

const navigation = [
  // { name: "About Us", href: "#" },
  // { name: "Features", href: "#" },
  { name: "Github", href: "https://github.com/Peppermint-Lab/peppermint" },
  { name: "Docs", href: "https://docs.peppermint.sh/" },
];

export default function Contact() {
  useEffect(() => {
    (async function () {
      const cal = await getCalApi();
      cal("ui", {
        styles: { branding: { brandColor: "#000000" } },
        hideEventTypeDetails: false,
        layout: "month_view",
      });
    })();
  }, []);

  return (
    <div className="">
      <header className="bg-white mx-auto text-base max-w-xl mb-36">
        <nav className="flex justify-between py-8" aria-label="Global">
          <div className="flex justify-between lg:flex-1">
            <Link href="/" className="-m-1.5 p-1.5">
              <span className="sm:hidden">🍵</span>
              <span className="hidden sm:block font-bold text-xl">
                🍵 Peppermint Labs
              </span>
            </Link>
          </div>

          <div className="flex gap-x-12">
            {navigation.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-sm font-semibold  text-gray-900"
              >
                {item.name}
              </a>
            ))}
          </div>
        </nav>
      </header>

      <Cal
        calLink="potts/30min"
        style={{ width: "100%", height: "100%", overflow: "scroll" }}
        config={{ layout: "month_view" }}
      />
    </div>
  );
}
