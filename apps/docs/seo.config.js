const seoConfig = {
  metadataBase: new URL("https://peppermint.sh"),
  title: {
    template: "Peppermint",
    default:
      "Peppermint - Revolutionizing Customer Support for Rapid Resolutions. Your Premier Zendesk Alternative",
  },
  description:
    "Peppermint is revolutionizing customer support for rapid resolutions. Your premier zendesk alternative",
  themeColor: "#F6E458",
  openGraph: {
    images: "/og-image.png",
    url: "https://peppermint.sh",
  },
  manifest: "/site.webmanifest",
  icons: [
    { rel: "icon", url: "/favicon.ico" },
    { rel: "apple-touch-icon", url: "/apple-touch-icon.png" },
    { rel: "mask-icon", url: "/favicon.ico" },
    { rel: "image/x-icon", url: "/favicon.ico" },
  ],
  twitter: {
    site: "@potts_dev",
    creator: "@potts_dev",
  },
};

export default seoConfig;
