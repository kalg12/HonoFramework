import { themes as prismThemes } from "prism-react-renderer";
import type { Config } from "@docusaurus/types";
import type * as Preset from "@docusaurus/preset-classic";

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const config: Config = {
  title: "Hono API Documentation",
  tagline: "API completa para gestión de usuarios con Hono y SQLite",
  favicon: "img/favicon.ico",

  // Future flags, see https://docusaurus.io/docs/api/docusaurus-config#future
  future: {
    v4: true, // Improve compatibility with the upcoming Docusaurus v4
  },

  // Set the production url of your site here
  url: "https://hono-api-docs.example.com",
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: "/",

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: "lucia", // Usually your GitHub org/user name.
  projectName: "hono-api", // Usually your repo name.

  onBrokenLinks: "throw",

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: "es",
    locales: ["es", "en"],
  },

  presets: [
    [
      "classic",
      {
        docs: {
          sidebarPath: "./sidebars.ts",
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl: "https://github.com/lucia/hono-api/tree/main/docs/",
        },
        blog: {
          showReadingTime: true,
          feedOptions: {
            type: ["rss", "atom"],
            xslt: true,
          },
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl: "https://github.com/lucia/hono-api/tree/main/docs/",
          // Useful options to enforce blogging best practices
          onInlineTags: "warn",
          onInlineAuthors: "warn",
          onUntruncatedBlogPosts: "warn",
        },
        theme: {
          customCss: "./src/css/custom.css",
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    // Replace with your project's social card
    image: "img/docusaurus-social-card.jpg",
    colorMode: {
      respectPrefersColorScheme: true,
    },
    navbar: {
      title: "Hono API",
      logo: {
        alt: "Hono API Logo",
        src: "img/logo.svg",
      },
      items: [
        {
          type: "docSidebar",
          sidebarId: "apiSidebar",
          position: "left",
          label: "Documentación",
        },
        { to: "/blog", label: "Blog", position: "left" },
        {
          href: "https://github.com/kalg12/HonoFramework",
          label: "GitHub",
          position: "right",
        },
      ],
    },
    footer: {
      style: "dark",
      links: [
        {
          title: "Documentación",
          items: [
            {
              label: "Introducción",
              to: "/docs/intro",
            },
            {
              label: "Endpoints",
              to: "/docs/endpoints/get-users",
            },
          ],
        },
        {
          title: "Comunidad",
          items: [
            {
              label: "Stack Overflow",
              href: "https://stackoverflow.com/questions/tagged/hono",
            },
            {
              label: "Discord",
              href: "https://discordapp.com/invite/hono",
            },
            {
              label: "GitHub",
              href: "https://github.com/honojs/hono",
            },
          ],
        },
        {
          title: "Más",
          items: [
            {
              label: "Blog",
              to: "/blog",
            },
            {
              label: "Repositorio",
              href: "https://github.com/kalg12/HonoFramework",
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Hono API.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
      additionalLanguages: ["json", "bash", "javascript", "typescript"],
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
