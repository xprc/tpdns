/**
 * Copyright (c) 2017-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

require("dotenv").config();

const redirectJson = require("./redirects.json");

/** @type {import('@docusaurus/types/src/index').DocusaurusConfig} */
const siteConfig = {
    title: "refine",
    tagline: "Build your React-based CRUD applications, without constraints",
    url: "https://refine.dev",
    baseUrl: "/",
    projectName: "refine",
    organizationName: "refinedev",
    trailingSlash: true,
    favicon: "img/refine_favicon.png",
    scripts: ["https://platform.twitter.com/widgets.js"],
    presets: [
        [
            "@docusaurus/preset-classic",
            {
                docs: {
                    path: "./docs",
                    sidebarPath: require.resolve("./sidebars.js"),
                    editUrl:
                        "https://github.com/refinedev/refine/tree/master/documentation",
                    showLastUpdateAuthor: true,
                    showLastUpdateTime: true,
                    versions: {
                        current: {
                            label: "3.xx.xx",
                        },
                    },
                    lastVersion: "current",
                    admonitions: {
                        tag: ":::",
                        keywords: [
                            "note",
                            "tip",
                            "info-tip",
                            "info",
                            "caution",
                            "danger",
                        ],
                    },
                },
                blog: false,
                theme: {
                    customCss: [
                        require.resolve("./src/css/custom.css"),
                        require.resolve("./src/css/split-pane.css"),
                        require.resolve("./src/css/demo-page.css"),
                    ],
                },
                gtag: {
                    trackingID: "G-27Z1WY952H",
                },
            },
        ],
    ],
    plugins: [
        [
            "@docusaurus/plugin-client-redirects",
            {
                redirects: redirectJson.redirects,
            },
        ],
        [
            "docusaurus-plugin-copy",
            {
                id: "Copy Workers",
                path: "static/workers",
                context: "workers",
                include: ["**/*.{js}"],
            },
        ],
        async function tailwindcss() {
            return {
                name: "docusaurus-tailwindcss",
                configurePostCss(postcssOptions) {
                    postcssOptions.plugins.push(require("tailwindcss"));
                    postcssOptions.plugins.push(require("autoprefixer"));
                    return postcssOptions;
                },
            };
        },
        "./plugins/docgen.js",
        "./plugins/examples.js",
        [
            "./plugins/blog-plugin.js",
            {
                blogTitle: "Blog",
                blogDescription: "A Docusaurus powered blog!",
                routeBasePath: "/blog",
                postsPerPage: 12,
                blogSidebarTitle: "All posts",
                blogSidebarCount: 0,
                feedOptions: {
                    type: "all",
                    copyright: `Copyright © ${new Date().getFullYear()} refine.`,
                },
            },
        ],
        "./plugins/intercom.js",
    ],
    themeConfig: {
        prism: {
            magicComments: [
                // Remember to extend the default highlight class name as well!
                {
                    className: "theme-code-block-highlighted-line",
                    line: "highlight-next-line",
                    block: { start: "highlight-start", end: "highlight-end" },
                },
                {
                    className: "code-block-hidden",
                    line: "hide-next-line",
                    block: { start: "hide-start", end: "hide-end" },
                },
            ],
        },
        image: "img/refine_social_new.png",
        algolia: {
            appId: "KRR9VEUPCT",
            apiKey: "cd0188125dcd31fb4b011b5e536d963a",
            indexName: "refine",
            contextualSearch: true,
        },
        metadata: [
            {
                name: "keywords",
                content:
                    "react-admin, react-framework, internal-tool, admin-panel, ant-design, material ui, mui",
            },
        ],
        navbar: {
            logo: {
                alt: "refine",
                src: "img/refine_logo.png",
            },
            items: [
                {
                    to: "docs/getting-started/overview/",
                    label: "Docs",
                    position: "left",
                },
                {
                    to: "docs",
                    label: "Tutorial",
                    position: "left",
                    activeBaseRegex: "/^/docs(/)?$/",
                },
                {
                    to: "examples",
                    label: "Examples",
                    position: "left",
                },
                {
                    to: "integrations",
                    label: "Integrations",
                    position: "left",
                },
                { to: "blog", label: "Blog", position: "left" },
                {
                    to: "https://github.com/refinedev/refine",
                    label: "GitHub",
                    position: "left",
                },
                {
                    to: "https://store.refine.dev",
                    label: "Store 🎁",
                    position: "left",
                },
                {
                    type: "docsVersionDropdown",
                    position: "right",
                    dropdownActiveClassDisabled: true,
                },
                {
                    href: "https://github.com/refinedev/refine",
                    position: "right",
                    className: "header-icon-link header-github-link",
                },
                {
                    href: "https://discord.gg/refine",
                    position: "right",
                    className: "header-icon-link header-discord-link",
                },
                {
                    href: "https://twitter.com/refine_dev",
                    position: "right",
                    className: "header-icon-link header-twitter-link",
                },
            ],
        },
        footer: {
            logo: {
                alt: "refine",
                src: "/img/refine_logo.png",
            },
            links: [
                {
                    title: "Resources",
                    items: [
                        {
                            label: "Getting Started",
                            to: "docs/getting-started/overview",
                        },
                        {
                            label: "Tutorials",
                            to: "docs",
                        },
                        {
                            label: "Blog",
                            to: "blog",
                        },
                    ],
                },
                {
                    title: "Product",
                    items: [
                        {
                            label: "Examples",
                            to: "examples",
                        },
                        {
                            label: "Integrations",
                            to: "integrations",
                        },
                        {
                            label: "Become an Expert",
                            to: "become-a-refine-expert",
                        },
                    ],
                },
                {
                    title: "Company",
                    items: [
                        {
                            label: "About",
                            to: "about",
                        },
                        {
                            label: "Store 🎁",
                            to: "https://store.refine.dev",
                        },
                    ],
                },
                {
                    title: "__LEGAL",
                    items: [
                        {
                            label: "License",
                            to: "https://github.com/refinedev/refine/blob/next/LICENSE",
                        },
                        // {
                        //     label: "Terms",
                        //     to: "/enterprise",
                        // },
                        // {
                        //     label: "Privacy",
                        //     to: "/privacy-policy",
                        // },
                        // {
                        //     label: "info@refine.dev",
                        //     to: "mailto:info@refine.dev",
                        // },
                    ],
                },
                {
                    title: "__SOCIAL",
                    items: [
                        {
                            href: "https://github.com/refinedev/refine",
                            label: "github",
                        },
                        {
                            href: "https://discord.gg/refine",
                            label: "discord",
                        },
                        {
                            href: "https://reddit.com/r/refine",
                            label: "reddit",
                        },
                        {
                            href: "https://twitter.com/refine_dev",
                            label: "twitter",
                        },
                        {
                            href: "https://www.linkedin.com/company/refine-dev",
                            label: "linkedin",
                        },
                    ],
                },
            ],
        },
    },
    customFields: {
        /** Footer Fields */
        footerDescription:
            '<strong style="font-weight:700;">refine</strong> is a React-based framework for the rapid development of web applications. It eliminates the repetitive tasks demanded by <strong style="font-weight:700;">CRUD</strong> operations and provides industry standard solutions.',
        contactTitle: "Contact",
        contactDescription: [
            "Refine Dev Corporation",
            "256 Chapman Road STE 105-4 Newark, DE 19702",
        ],
        contactEmail: "info@refine.dev",
        /** ---- */
        /** Live Preview */
        LIVE_PREVIEW_URL:
            process.env.LIVE_PREVIEW_URL ?? "http://localhost:3030/preview",
    },
};

module.exports = siteConfig;
