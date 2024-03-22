/* eslint-disable react/no-unescaped-entities */
import {
  BellAlertIcon,
  ChevronRightIcon,
  CloudArrowUpIcon,
  GlobeEuropeAfricaIcon,
  InboxIcon,
  LightBulbIcon,
  LockClosedIcon,
  UserIcon,
} from "@heroicons/react/20/solid";
import { Bars3Icon } from "@heroicons/react/24/outline";
import { useState } from "react";

const navigation = [
  // { name: "About Us", href: "#" },
  // { name: "Features", href: "#" },
  { name: "Github", href: "https://github.com/Peppermint-Lab/peppermint" },
  { name: "Docs", href: "https://docs.peppermint.sh/" },
];

const footer = {
  // solutions: [
  //   { name: "Self Hosted", href: "#" },
  //   { name: "Linode", href: "" },
  // ],
  support: [
    { name: "Documentation", href: "https://docs.peppermint.sh/" },
    { name: "Discord", href: "https://discord.gg/fs4j39FWfm" },
  ],
  company: [
    { name: "About", href: "#" },
    // { name: "Blog", href: "#" },
    // { name: "Press", href: "#" },
    // { name: "Investors", href: "#" },
    // { name: "Open", href: "#" },
  ],
  social: [
    {
      name: "Twitter",
      href: "https://twitter.com/potts_dev",
      icon: (props: any) => (
        <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
          <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
        </svg>
      ),
    },
    {
      name: "GitHub",
      href: "https://github.com/Peppermint-Lab/peppermint/",
      icon: (props: any) => (
        <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
          <path
            fillRule="evenodd"
            d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
            clipRule="evenodd"
          />
        </svg>
      ),
    },
    // {
    //   name: "YouTube",
    //   href: "#",
    //   icon: (props: any) => (
    //     <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
    //       <path
    //         fillRule="evenodd"
    //         d="M19.812 5.418c.861.23 1.538.907 1.768 1.768C21.998 8.746 22 12 22 12s0 3.255-.418 4.814a2.504 2.504 0 0 1-1.768 1.768c-1.56.419-7.814.419-7.814.419s-6.255 0-7.814-.419a2.505 2.505 0 0 1-1.768-1.768C2 15.255 2 12 2 12s0-3.255.417-4.814a2.507 2.507 0 0 1 1.768-1.768C5.744 5 11.998 5 11.998 5s6.255 0 7.814.418ZM15.194 12 10 15V9l5.194 3Z"
    //         clipRule="evenodd"
    //       />
    //     </svg>
    //   ),
    // },
  ],
};

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
    embed: `<iframe width="560" height="315" src="https://www.youtube.com/embed/LORGa1zV2us" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>`,
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
    embed: `<iframe width="560" height="315" src="https://www.youtube.com/embed/Kq0BMVhbFkA" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>`,
  },
];

const stats = [
  { label: "Docker Pulls", value: "99k+" },
  { label: "Github Stars", value: "1.1k" },
  { label: "Weekly Active Users", value: "212" },
];

const features = [
  {
    name: "Notifications",
    description:
      "Hook up peppermint to third party services using webhooks and various third party providers alongside emails.",
    href: "#",
    icon: BellAlertIcon,
  },
  {
    name: "Email Fetching",
    description:
      "Set up mailbox's to allow your customers to email you directly and have it automatically create a ticket",
    href: "#",
    icon: InboxIcon,
  },
  {
    name: "Single Sign On",
    description:
      "Enable single sign on for all your users to allow for shared authentication via multiple providers.",
    href: "#",
    icon: LockClosedIcon,
  },
];

const features2 = [
  {
    name: "Location",
    description:
      "Peppermint can be hosted anywhere and all of its core features available without the need to access the internet.",
    icon: GlobeEuropeAfricaIcon,
  },
  {
    name: "Data Ownership",
    description:
      "Peppermint never transfers any customer app data to its servers. All data is stored locally on your server.",
    icon: LockClosedIcon,
  },
  {
    name: "Lightweight",
    description:
      "Peppermint is built to be lightweight and fast, allowing it to run on low end hardware and low usage. Reduce cost by hosting on a low end VPS or even a raspberry pi.",
    icon: LightBulbIcon,
  },
  {
    name: "Customer First",
    description:
      "Peppermint is developed with the customer in mind. Allowing us to offer the best features possible by listening to what our customers need.",
    icon: UserIcon,
  },
];

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="">
      <header className="bg-white mx-auto max-w-7xl">
        <nav
          className="flex items-center justify-between p-6 lg:px-8"
          aria-label="Global"
        >
          <div className="flex lg:flex-1">
            <a href="#" className="-m-1.5 p-1.5">
              <span className="sr-only">Peppermint Labs</span>
              {/* <img
                className="h-8 w-auto"
                src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                alt=""
              /> */}
              <span className="font-bold text-2xl">🍵 Peppermint Labs</span>
            </a>
          </div>
          <div className="flex lg:hidden">
            <button
              type="button"
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
              onClick={() => setMobileMenuOpen(true)}
            >
              <span className="sr-only">Open main menu</span>
              <Bars3Icon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <div className="hidden lg:flex lg:gap-x-12">
            {navigation.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-sm font-semibold leading-6 text-gray-900"
              >
                {item.name}
              </a>
            ))}
          </div>
          <div className="hidden lg:flex lg:flex-1 lg:justify-end">
            {/* <a
              href="#"
              className="text-sm font-semibold leading-6 text-gray-900"
            >
              Log in <span aria-hidden="true">&rarr;</span>
            </a> */}
          </div>
        </nav>
        {/* <Dialog
          as="div"
          className="lg:hidden"
          open={mobileMenuOpen}
          onClose={setMobileMenuOpen}
        >
          <div className="fixed inset-0 z-10" />
          <Dialog.Panel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
            <div className="flex items-center justify-between">
              <a href="#" className="-m-1.5 p-1.5">
                <span className="sr-only">Your Company</span>
                <img
                  className="h-8 w-auto"
                  src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                  alt=""
                />
              </a>
              <button
                type="button"
                className="-m-2.5 rounded-md p-2.5 text-gray-700"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span className="sr-only">Close menu</span>
                <XMarkIcon className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>
            <div className="mt-6 flow-root">
              <div className="-my-6 divide-y divide-gray-500/10">
                <div className="space-y-2 py-6">
                  {navigation.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                    >
                      {item.name}
                    </a>
                  ))}
                </div>
                <div className="py-6">
                  <a
                    href="#"
                    className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                  >
                    Log in
                  </a>
                </div>
              </div>
            </div>
          </Dialog.Panel>
        </Dialog> */}
      </header>

      <div className="relative isolate overflow-hidden bg-white mx-auto max-w-7xl">
        <div className="mx-auto max-w-2xl pb-32 pt-20">
          <div className="hidden sm:mb-8 sm:flex sm:justify-center">
            <div className="mt-24 sm:mt-32 lg:mt-16">
              <a
                href="https://github.com/Peppermint-Lab/peppermint/releases"
                className="inline-flex space-x-6"
                target="_blank"
              >
                <span className="rounded-full bg-indigo-500/10 px-3 py-1 text-sm font-semibold leading-6 text-indigo-400 ring-1 ring-inset ring-indigo-500/20">
                  What's new
                </span>
                <span className="inline-flex items-center space-x-2 text-sm font-medium leading-6 ">
                  <span>v0.4 shipped</span>
                  <ChevronRightIcon
                    className="h-5 w-5 text-gray-500"
                    aria-hidden="true"
                  />
                </span>
              </a>
            </div>
          </div>
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
              Control your customer support
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              In a world of ever growing costs, Peppermint is here to help.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <a
                href="https://docs.peppermint.sh/docker"
                className="rounded-md bg-green-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
                target="_blank"
              >
                Get started
              </a>
              {/* <a
                href="#"
                className="text-sm font-semibold leading-6 text-gray-900"
              >
                Learn more <span aria-hidden="true">→</span>
              </a> */}
            </div>
          </div>
        </div>
      </div>

      <div className="bg-gray-900 py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center">
            <h2 className="text-base font-semibold leading-7 text-indigo-400">
              The core of your customer support
            </h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Don't let requests go unseen
            </p>
            <p className="mt-6 text-lg leading-8 text-gray-300">
              A central location for your helpdesk Allowing you to have a
              complete picture of each customer, so you can offer the right
              support.
            </p>
          </div>
          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
            <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
              {features.map((feature) => (
                <div key={feature.name} className="flex flex-col">
                  <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-white">
                    <feature.icon
                      className="h-5 w-5 flex-none text-indigo-400"
                      aria-hidden="true"
                    />
                    {feature.name}
                  </dt>
                  <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-300">
                    <p className="flex-auto">{feature.description}</p>
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>

      <div className="bg-white py-12 sm:py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:mx-0">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Video Reviews
            </h2>
            <p className="mt-2 text-lg leading-8 text-gray-600">
              Some excellent videos that shows an overview of peppermint and its
              features.
            </p>
          </div>
          <div className="mx-auto mt-4 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-8 border-t border-gray-200 pt-5 sm:pt-8 lg:mx-0 lg:max-w-none lg:grid-cols-2">
            {posts.map((post) => (
              <article
                key={post.id}
                className="flex max-w-xl flex-col items-start justify-between"
              >
                <div className="flex items-center gap-x-4 text-xs">
                  <time dateTime={post.datetime} className="text-gray-500">
                    {post.date}
                  </time>
                  {/* <a
                    href={post.category.href}
                    className="relative z-10 rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-100"
                  >
                    {post.category.title}
                  </a> */}
                </div>
                <div className="group relative">
                  <h3 className="text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
                    <a href={post.href}>
                      <span className="absolute inset-0" />
                      {post.title}
                    </a>
                  </h3>
                  <p className="mt-5 line-clamp-3 text-sm leading-6 text-gray-600">
                    <span
                      dangerouslySetInnerHTML={{ __html: post.embed }}
                    ></span>
                  </p>
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

      {/* <section className="bg-gray-900 py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto grid max-w-2xl grid-cols-1 lg:mx-0 lg:max-w-none lg:grid-cols-2">
            <div className="flex flex-col pb-10 sm:pb-16 lg:pb-0 lg:pr-8 xl:pr-20">
              <img
                className="h-12 self-start"
                src="https://tailwindui.com/img/logos/tuple-logo-white.svg"
                alt=""
              />
              <figure className="mt-10 flex flex-auto flex-col justify-between">
                <blockquote className="text-lg leading-8 text-white">
                  <p>
                    “Amet amet eget scelerisque tellus sit neque faucibus non
                    eleifend. Integer eu praesent at a. Ornare arcu gravida
                    natoque erat et cursus tortor consequat at. Vulputate
                    gravida sociis enim nullam ultricies habitant malesuada
                    lorem ac. Tincidunt urna dui pellentesque sagittis.”
                  </p>
                </blockquote>
                <figcaption className="mt-10 flex items-center gap-x-6">
                  <img
                    className="h-14 w-14 rounded-full bg-gray-800"
                    src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                    alt=""
                  />
                  <div className="text-base">
                    <div className="font-semibold text-white">Judith Black</div>
                    <div className="mt-1 text-gray-400">CEO of Tuple</div>
                  </div>
                </figcaption>
              </figure>
            </div>
            <div className="flex flex-col border-t border-white/10 pt-10 sm:pt-16 lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0 xl:pl-20">
              <img
                className="h-12 self-start"
                src="https://tailwindui.com/img/logos/reform-logo-white.svg"
                alt=""
              />
              <figure className="mt-10 flex flex-auto flex-col justify-between">
                <blockquote className="text-lg leading-8 text-white">
                  <p>
                    “Excepteur veniam labore ullamco eiusmod. Pariatur consequat
                    proident duis dolore nulla veniam reprehenderit nisi officia
                    voluptate incididunt exercitation exercitation elit. Nostrud
                    veniam sint dolor nisi ullamco.”
                  </p>
                </blockquote>
                <figcaption className="mt-10 flex items-center gap-x-6">
                  <img
                    className="h-14 w-14 rounded-full bg-gray-800"
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                    alt=""
                  />
                  <div className="text-base">
                    <div className="font-semibold text-white">
                      Joseph Rodriguez
                    </div>
                    <div className="mt-1 text-gray-400">CEO of Reform</div>
                  </div>
                </figcaption>
              </figure>
            </div>
          </div>
        </div>
      </section> */}

      <div className="bg-gray-900 py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:mx-0">
            <h2 className="text-base font-semibold leading-7 text-indigo-400">
              Everything you need
            </h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Take back your control
            </p>
            <p className="mt-6 text-lg leading-8 text-gray-300">
              Peppermint is a solution to the ever growing cost of todays
              corprate world. Think of us as the costco of helpdesk software. In
              a world of ever growing costs, Peppermint is here to help.
            </p>
          </div>
          <dl className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-8 text-base leading-7 text-gray-300 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:gap-x-16">
            {features2.map((feature) => (
              <div key={feature.name} className="relative pl-9 flex-col flex">
                <dt className="inline font-semibold text-white">
                  <feature.icon
                    className="absolute left-1 top-1 h-5 w-5 text-indigo-500"
                    aria-hidden="true"
                  />
                  {feature.name}
                </dt>{" "}
                <dd className="inline">{feature.description}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>

      <div className="bg-white py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-none">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Our mission
            </h2>
            <div className="mt-6 flex flex-col gap-x-8 gap-y-20 lg:flex-row">
              <div className="lg:w-full lg:max-w-2xl lg:flex-auto">
                <p className="text-xl leading-8 text-gray-600">
                  Peppermint sets out to bridge the gap between features and
                  cost. t, Peppermint seeks to offer a robust and comprehensive
                  array of tools, functionalities, and user experiences without
                  burdening users with exorbitant expenses.
                </p>
                <p className="mt-10 max-w-xl text-base leading-7 text-gray-700">
                  The project's ethos lies in empowering users by providing a
                  platform that doesn't compromise on quality and usability
                  while maintaining a reasonable cost structure. This approach
                  fosters inclusivity, allowing individuals and organizations
                  with varying budgetary constraints to benefit from a
                  feature-rich software solution without sacrificing performance
                  or breaking the bank.
                </p>
              </div>
              <div className="lg:flex lg:flex-auto lg:justify-center">
                <dl className="w-64 space-y-8 xl:w-80">
                  {stats.map((stat) => (
                    <div
                      key={stat.label}
                      className="flex flex-col-reverse gap-y-4"
                    >
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
            </div>
          </div>
        </div>
      </div>

      <div className="overflow-hidden bg-gray-900 py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2">
            <div className="lg:pr-8 lg:pt-4">
              <div className="lg:max-w-lg">
                <h2 className="text-base font-semibold leading-7 text-indigo-400">
                  Deploy faster
                </h2>
                <p className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl">
                  One click installs in the cloud
                </p>
                <p className="mt-6 text-lg leading-8 text-gray-300">
                  Peppermint is built to be hosted in a docker container, which
                  can be easily scaled through k8's. In addition to this you can
                  host peppermint through pm2 or even locally with NodeJS
                </p>
                <dl className="mt-10 max-w-xl space-y-8 text-base leading-7 text-gray-300 lg:max-w-none">
                  <div className="relative pl-9">
                    <dt className="inline font-semibold text-white">
                      <CloudArrowUpIcon
                        className="absolute left-1 top-1 h-5 w-5 text-indigo-500"
                        aria-hidden="true"
                      />
                      Linode
                    </dt>
                    <dd className="">
                      Linode is a great cloud provider that offers the
                      installilation of peppermint through the click of a
                      button.
                    </dd>
                  </div>
                </dl>
                <dl className="mt-10 max-w-xl space-y-8 text-base leading-7 text-gray-300 lg:max-w-none">
                  <div className="relative pl-9">
                    <dt className="inline font-semibold text-white">
                      <CloudArrowUpIcon
                        className="absolute left-1 top-1 h-5 w-5 text-indigo-500"
                        aria-hidden="true"
                      />
                      Hostinger VPS
                    </dt>
                    <dd className="">
                      Hostinger VPS offers peak performance with AMD CPU, and
                      NVMe storage, competitive pricing, automatic backups, and
                      manual snapshots.
                    </dd>
                  </div>
                </dl>
                <dl className="mt-10 max-w-xl space-y-8 text-base leading-7 text-gray-300 lg:max-w-none">
                  <div className="relative pl-9">
                    <dt className="inline font-semibold text-white">
                      <CloudArrowUpIcon
                        className="absolute left-1 top-1 h-5 w-5 text-indigo-500"
                        aria-hidden="true"
                      />
                      Roqitt Hosting
                    </dt>
                    <dd className="">
                      Roqitt Hosting offer lightning fast & secure ssd web
                      hosting. The UK based enterprise offer peppermint through
                      there new one click marketplace.
                    </dd>
                  </div>
                </dl>
              </div>
            </div>
            <img
              src="/dash.png"
              alt="Product screenshot"
              className="w-[48rem] max-w-none rounded-xl shadow-xl ring-1 ring-white/10 sm:w-[57rem] md:-ml-4 lg:-ml-0"
              width={2432}
              height={1442}
            />
          </div>
        </div>
      </div>

      <footer className="bg-white" aria-labelledby="footer-heading">
        <h2 id="footer-heading" className="sr-only">
          Footer
        </h2>
        <div className="mx-auto max-w-7xl px-6 pb-8 pt-16 sm:pt-24 lg:px-8 lg:pt-32">
          <div className="xl:grid xl:grid-cols-3 xl:gap-8">
            <div className="space-y-8">
              <div>
                <span className="text-8xl">🍵</span>
              </div>
              <p className="text-sm leading-6 text-gray-600">
                Aiming to bridge the gap of features and cost.
              </p>
              <div className="flex space-x-6">
                {/* {footer.social.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className="text-gray-400 hover:text-gray-500"
                  >
                    <span className="sr-only">{item.name}</span>
                    <item.icon className="h-6 w-6" aria-hidden="true" />
                  </a>
                ))} */}

              </div>
            </div>
            <div className="mt-16 grid grid-cols-2 gap-8 xl:col-span-2 xl:mt-0">
              <div className="md:grid md:grid-cols-2 md:gap-8">
                {/* <div>
                  <h3 className="text-sm font-semibold leading-6 text-gray-900">
                    Solutions
                  </h3>
                  <ul role="list" className="mt-6 space-y-4">
                    {footer.solutions.map((item) => (
                      <li key={item.name}>
                        <a
                          href={item.href}
                          className="text-sm leading-6 text-gray-600 hover:text-gray-900"
                        >
                          {item.name}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div> */}
                <div className="mt-10 md:mt-0">
                  <h3 className="text-sm font-semibold leading-6 text-gray-900">
                    Support
                  </h3>
                  <ul role="list" className="mt-6 space-y-4">
                    {footer.support.map((item) => (
                      <li key={item.name}>
                        <a
                          href={item.href}
                          className="text-sm leading-6 text-gray-600 hover:text-gray-900"
                        >
                          {item.name}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="md:grid md:grid-cols-2 md:gap-8">
                <div>
                  <h3 className="text-sm font-semibold leading-6 text-gray-900">
                    Company
                  </h3>
                  <ul role="list" className="mt-6 space-y-4">
                    {footer.company.map((item) => (
                      <li key={item.name}>
                        <a
                          href={item.href}
                          className="text-sm leading-6 text-gray-600 hover:text-gray-900"
                        >
                          {item.name}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-16 border-t border-gray-900/10 pt-8 sm:mt-20 lg:mt-24">
            <p className="text-xs leading-5 text-gray-500">
              &copy; 2023 Peppermint Labs Ltd. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
