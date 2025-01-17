// @ts-check
// `@type` JSDoc annotations allow editor autocompletion and type checking
// (when paired with `@ts-check`).
// There are various equivalent ways to declare your Docusaurus config.
// See: https://docusaurus.io/docs/api/docusaurus-config

import {themes as prismThemes} from 'prism-react-renderer';

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Godot Rapier Physics',
  tagline: '2D and 3D Physics Plugin for Godot 4 with better stability, performance, no ghost collisions and liquids',
  favicon: 'img/rapier.jpg',

  // Set the production url of your site here
  url: 'https://rapier.appsinacup.com',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'appsinacup', // Usually your GitHub org/user name.
  projectName: 'godot-rapier-physics', // Usually your repo name.

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: './sidebars.js',
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      image: 'img/rapier_banner.jpg',
      navbar: {
        title: 'Godot Rapier Physics',
        logo: {
          alt: 'Rapier Logo',
          src: 'img/rapier.jpg',
        },
        items: [
          {
            type: 'docSidebar',
            sidebarId: 'tutorialSidebar',
            position: 'left',
            label: 'Documentation',
          },
          {
            href: 'https://github.com/sponsors/appsinacup',
            label: 'Donate',
            position: 'right',
            className: 'header-button-donate'
          },
          {
            href: 'https://discord.gg/56dMud8HYn',
            label: 'Discord',
            position: 'right',
            className: 'header-button-donate'
          },
          {
            href: 'https://rapier.rs',
            label: 'Rapier Lib',
            position: 'right',
          },
          {
            href: 'https://appsinacup.com',
            label: 'Apps In A Cup',
            position: 'right',
          },
          {
            href: 'https://github.com/appsinacup/godot-rapier-physics',
            label: 'GitHub',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Docs',
            items: [
              {
                label: 'Tutorial',
                to: '/docs/intro',
              },
            ],
          },
          {
            title: 'Community',
            items: [
              {
                label: 'Discord',
                href: 'https://discord.gg/56dMud8HYn',
              },
            ],
          },
          {
            title: 'More',
            items: [
              {
                label: 'Rapier Lib',
                href: 'https://rapier.rs',
              },
              {
                label: 'Apps In A Cup',
                href: 'https://appsinacup.com',
              },
              {
                label: 'GitHub',
                href: 'https://github.com/appsinacup/godot-rapier-physics',
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} Appsinacup, Inc. Built with Docusaurus.`,
      },
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
      },
    }),
};

export default config;
