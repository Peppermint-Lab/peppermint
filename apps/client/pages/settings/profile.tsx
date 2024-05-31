import { getCookie } from "cookies-next";
import useTranslation from "next-translate/useTranslation";
import { useRouter } from "next/router";
import { useState } from "react";
import { useUser } from "../../store/session";

export default function UserProfile() {
  const { user } = useUser();
  const token = getCookie("session");

  const { t } = useTranslation("peppermint");

  const router = useRouter();

  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [language, setLanguage] = useState(user.language);

  function changeLanguage(locale) {
    setLanguage(locale);
    router.push(router.pathname, router.asPath, {
      locale,
    });
  }

  async function updateProfile() {
    await fetch(`/api/v1/auth/profile`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify({
        id: user.id,
        name: name ? name : user.name,
        email: email ? email : user.email,
        language: language ? language : user.language,
      }),
    });
  }

  return (
    <>
      <div className="py-6 px-4 sm:p-6 lg:pb-8">
        <div>
          <h2 className="text-lg leading-6 font-medium text-gray-900">
            {t("profile")}
          </h2>
          <p className="mt-1 text-sm text-gray-500">{t("profile_desc")}</p>
        </div>

        <div className="mt-6 flex flex-col lg:flex-row">
          <div className="flex-grow space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                {t("name")}
              </label>
              <div className="mt-1 rounded-md shadow-sm flex">
                <input
                  type="text"
                  name="name"
                  id="name"
                  autoComplete="name"
                  className="focus:ring-light-blue-500 focus:border-light-blue-500 flex-grow block w-full min-w-0 rounded-none rounded-r-md sm:text-sm border-gray-300"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                {t("email")}
              </label>
              <div className="mt-1 rounded-md shadow-sm flex">
                <input
                  type="email"
                  name="email"
                  autoComplete="email"
                  className="focus:ring-light-blue-500 focus:border-light-blue-500 flex-grow block w-full min-w-0 rounded-none rounded-r-md sm:text-sm border-gray-300"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                {t("language")}
              </label>
              <div className="mt-1 rounded-md shadow-sm flex">
                <select
                  id="language"
                  name="language"
                  className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                  value={language}
                  onChange={(e) => changeLanguage(e.target.value)}
                >
                  <option value="en">English</option>
                  <option value="de">German</option>
                  <option value="se">Swedish</option>
                  <option value="es">Spanish</option>
                  <option value="no">Norwegian</option>
                  <option value="fr">French</option>
                  <option value="pt">Tagalong</option>
                  <option value="da">Danish</option>
                  <option value="pt">Portuguese</option>
                  <option value="it">Italiano</option>
                  <option value="he">Hebrew</option>
                  <option value="tr">Turkish</option>
                  <option value="hu">Hungarian</option>
                  <option value="th">Thai (ภาษาไทย)</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-4 py-4 px-4 flex justify-end sm:px-6">
        <button
          onClick={async () => {
            await updateProfile();
            router.reload();
          }}
          type="submit"
          className="inline-flex items-center px-4 py-2 border font-semibold border-gray-300 shadow-sm text-xs rounded text-gray-700 bg-white hover:bg-gray-50 "
        >
          {t("save_and_reload")}
        </button>
      </div>
    </>
  );
}
