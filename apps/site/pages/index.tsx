/* eslint-disable react/no-unescaped-entities */
// @ts-nocheck
import {
  BellAlertIcon,
  ChevronRightIcon,
  GlobeEuropeAfricaIcon,
  InboxIcon,
  LightBulbIcon,
  LockClosedIcon,
  UserIcon,
} from "@heroicons/react/20/solid";

const navigation = [
  { name: "Github", href: "https://github.com/Peppermint-Lab/peppermint" },
  { name: "Docs", href: "https://docs.peppermint.sh/" },
  { name: "Discord", href: "https://discord.gg/cyj86Ncygn" },
];

const posts = [
  {
    id: 1,
    title: "DB Tech's Alpha review 2022",
    href: "#",
    description: "",
    date: "8th Feb 2022",
    datetime: "2022-02-08",
    author: {
      name: "DB Tech",
      role: "Content Creator / Youtuber",
      href: "https://www.youtube.com/@DBTechYT",
      imageUrl:
        "https://yt3.googleusercontent.com/RZiSgwDX07SVLpo6Vl1eSGIG07ws3tbgSyFY9XWn0nq9Y-NCxttzuONG4L6FRGehcdoOVoHYaw=s176-c-k-c0x00ffffff-no-rj",
    },
    embed: `<iframe src="https://www.youtube.com/embed/LORGa1zV2us" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>`,
  },
  {
    id: 2,
    title: "Host your own HelpDesk",
    href: "https://youtu.be/Kq0BMVhbFkA",
    description: "",
    date: "30th Mar 2023 ",
    datetime: "2023-03-30",
    author: {
      name: "Network Chuck",
      role: "Content Creator / Youtuber",
      href: "https://www.youtube.com/@NetworkChuck",
      imageUrl:
        "https://yt3.googleusercontent.com/ytc/AL5GRJW5XsaEbRr2gFUPOzr8i0iVyS7vihYNp0sAKXsrBA=s176-c-k-c0x00ffffff-no-rj",
    },
    embed: `<iframe src="https://www.youtube.com/embed/Kq0BMVhbFkA" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>`,
  },
];

const stats = [
  { label: "Docker Pulls", value: "120k+" },
  { label: "Github Stars", value: "1.3k" },
  { label: "Weekly Active Users", value: "550" },
];

const features = [
  {
    name: "Notifications",
    description:
      "Connect Peppermint to third-party services using webhooks and various providers, including email integration.",
    href: "#",
    icon: BellAlertIcon,
  },
  {
    name: "Email Fetching",
    description:
      "Configure mailboxes to facilitate direct customer emails, automatically converting them into tickets for efficient management.",
    href: "#",
    icon: InboxIcon,
  },
  {
    name: "Single Sign On",
    description:
      "Implement single sign-on (SSO) for all users to enable shared authentication across multiple providers.",
    href: "#",
    icon: LockClosedIcon,
  },
];

const features2 = [
  {
    name: "Location",
    description:
      "Peppermint is designed to be hosted in any environment, offering all of its core features without requiring an internet connection.",
    icon: GlobeEuropeAfricaIcon,
  },
  {
    name: "Data Ownership",
    description:
      "Peppermint ensures customer app data remains private by never transferring it to external servers. All data is securely stored locally on your server.",
    icon: LockClosedIcon,
  },
  {
    name: "Lightweight",
    description:
      "Peppermint is designed to be lightweight and fast, making it suitable for running on low-end hardware with minimal resource usage. This allows for cost-effective hosting on a low-end VPS or even a Raspberry Pi.",
    icon: LightBulbIcon,
  },
  {
    name: "Customer First",
    description:
      "Peppermint is customer-centric, enabling us to provide the best features by actively listening to and addressing our customer's needs.",
    icon: UserIcon,
  },
];

export default function Home() {

  return (
    <div className="sm:min-h-screen mx-6 sm:mx-0">
      <header className="bg-white mx-auto text-base max-w-xl">
        <nav className="flex justify-between py-8" aria-label="Global">
          <div className="flex justify-between lg:flex-1">
            <div className="-m-1.5 p-1.5">
              <span className="sm:hidden">🍵</span>
              <span className="hidden sm:block font-bold text-xl">
                🍵 Peppermint Labs
              </span>
            </div>
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

      <div className="relative isolate overflow-hidden bg-white mx-auto max-w-xl">
        <div className="max-w-xl">
          <div className="hidden sm:mb-4 sm:flex">
            <div className="">
              <a
                href="https://github.com/Peppermint-Lab/peppermint/releases"
                className="inline-flex space-x-6"
                target="_blank"
              >
                <span className="rounded-full bg-indigo-500/10 px-3 py-1 text-sm font-semibold leading-6 text-indigo-400 ring-1 ring-inset ring-indigo-500/20">
                  What's new -
                  <span className="ml-1 inline-flex items-center space-x-2 text-sm font-medium leading-6 ">
                    <span>Version 0.4.5 is live! 🚀</span>
                    <ChevronRightIcon
                      className="h-5 w-5 text-gray-500"
                      aria-hidden="true"
                    />
                  </span>
                </span>
              </a>
            </div>
          </div>

          <div className="">
            <span className="text-2xl font-bold tracking-tight text-gray-900 ">
              Elevate Your Customer Support
            </span>
            <div className="mt-4 flex flex-col ">
              <div className="">
                <p className="text-base text-gray-800">
                  Peppermint offers a refreshing approach to customer support in
                  a cost-conscious world.
                </p>
              </div>
              <div className="my-6 space-x-4 flex flex-row">
                <a
                  href="https://docs.peppermint.sh/docker"
                  className="rounded-md px-3.5 py-2.5 text-sm bg-green-600  text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
                  target="_blank"
                >
                  Get started
                </a>
                <a
                  href="/contact"
                  className="px-3.5 py-2.5 text-sm font-semibold text-gray-900  hover:underline "
                  target="_blank"
                >
                  Get in touch
                </a>
              </div>
            </div>
          </div>
        </div>

        <div>
          <img
            className="h-full w-full rounded-md shadow-lg my-4"
            src="/dashboard.jpeg"
            alt="landing page screenshot of dashboard"
          />
        </div>
      </div>

      <div className="max-w-xl mx-auto mt-4">
        <div className="mx-auto max-w-xl mt-4 lg:max-w-none">
          <dl className="">
            {features.map((feature) => (
              <div key={feature.name} className="relative flex-col flex mt-4">
                <dt className="flex items-center gap-x-3 text-base font-semibold text-white max-w-[98px] mt-1">
                  <feature.icon
                    className="h-5 w-5 flex-none text-green-600"
                    aria-hidden="true"
                  />
                  <span className="text-gray-900 whitespace-nowrap">
                    {feature.name}
                  </span>
                </dt>
                <dd className="flex flex-auto flex-col mt-1 text-sm sm:text-base  text-gray-900">
                  <p className="flex-auto">{feature.description}</p>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>

      <div className="max-w-xl mx-auto mt-4">
        <dl className="space-y-4 flex flex-col md:flex-row md:space-x-12">
          {stats.map((stat) => (
            <div key={stat.label} className="flex flex-col-reverse ">
              <dt className="text-base leading-7 text-gray-600">
                {stat.label}
              </dt>
              <dd className="text-5xl font-semibold tracking-tight text-gray-900">
                {stat.value}
              </dd>
            </div>
          ))}
        </dl>
      </div>

      <div className="bg-white py-4 max-w-xl mx-auto">
        <dl className="mx-auto mt-4 flex flex-col  text-base leading-7 text-gray-300 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:gap-x-16">
          {features2.map((feature) => (
            <div key={feature.name} className="relative flex-col flex mt-4">
              <dt className="flex items-center gap-x-3 text-base font-semibold text-white max-w-[98px] mt-1">
                <feature.icon
                  className="h-5 w-5 flex-none text-green-600"
                  aria-hidden="true"
                />
                <span className="text-gray-900 whitespace-nowrap">
                  {feature.name}
                </span>
              </dt>
              <dd className="flex flex-auto flex-col text-base  text-gray-900">
                <p className="flex-auto">{feature.description}</p>
              </dd>
            </div>
          ))}
        </dl>
      </div>

      <div className="bg-white py-12 mx-auto max-w-xl ">
        <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-none">
          <h2 className="text-xl font-bold tracking-tight text-gray-900 ">
            Our mission
          </h2>
          <div className="mt-6 flex flex-col gap-x-8 gap-y-20 lg:flex-row">
            <div className="lg:w-full lg:max-w-2xl lg:flex-auto">
              <p className="text-base text-gray-600">
                Peppermint aims to bridge the gap between rich features and
                affordability. We strive to provide a wide range of tools,
                functionalities, and user experiences without imposing excessive
                costs on our users.
              </p>
              <p className="mt-4 max-w-xl text-base  text-gray-700">
                The project's core values focus on empowering users through a
                platform that prioritizes quality and usability without
                compromising affordability. This inclusive approach enables
                individuals and organizations with diverse budgetary constraints
                to access a feature-rich software solution without compromising
                performance or affordability.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white">
        <div className="mx-auto max-w-xl">
          <div className="">
            <h2 className="text-xl font-bold tracking-tight text-gray-900 ">
              Video Reviews
            </h2>
            <p className="text-base leading-8 text-gray-800">
              Check out these great videos showcasing peppermint and its
              features.
            </p>
          </div>
          <div className="mx-auto mt-4 flex flex-col max-w-2xl grid-cols-1 gap-x-8 gap-y-8 border-t border-gray-200 pt-5 sm:pt-8 lg:mx-0 lg:max-w-none lg:grid-cols-2">
            {posts.map((post) => (
              <article
                key={post.id}
                className="flex max-w-xl flex-col items-start justify-between"
              >
                <div className="flex items-center gap-x-4 text-xs">
                  <time dateTime={post.datetime} className="text-gray-500">
                    {post.date}
                  </time>
                </div>
                <div className="group relative">
                  <h3 className="text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
                    <a href={post.href}>
                      <span className="absolute inset-0" />
                      {post.title}
                    </a>
                  </h3>
                  <div className="mt-5 line-clamp-3 text-sm leading-6 text-gray-600 max-w-full">
                    <div
                      className="max-w-full relative w-[350px] sm:w-full"
                      dangerouslySetInnerHTML={{ __html: post.embed }}
                    ></div>
                  </div>
                </div>
                <div className="relative mt-4 flex items-center gap-x-4">
                  <img
                    src={post.author.imageUrl}
                    alt=""
                    className="h-10 w-10 rounded-full bg-gray-50"
                  />
                  <div className="text-sm leading-6">
                    <p className="font-semibold text-gray-900">
                      <a href={post.author.href}>
                        <span className="absolute inset-0" />
                        {post.author.name}
                      </a>
                    </p>
                    <p className="text-gray-600">{post.author.role}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>

      <footer className="bg-white" aria-labelledby="footer-heading">
        <div className="mx-auto max-w-7xl px-6 pb-8 pt-16 sm:pt-24 lg:px-8 lg:pt-32">
          <div className="mt-16 border-t border-gray-900/10 pt-8 sm:mt-20 lg:mt-24">
            <p className="text-xs leading-5 text-gray-500">
              &copy; 2024 Peppermint Labs Ltd. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
