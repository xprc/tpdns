/**
 * Copyright (c) 2017-present, TomsProject, Inc.
 */

require("dotenv").config();

/** @type {import('@docusaurus/types/src/index').DocusaurusConfig} */
const siteConfig = {
    title: "TPDNS",
    tagline: "下一代DNS服务提供商",
    url: "https://ttdns.net",
    baseUrl: "/",
    projectName: "tpdns",
    organizationName: "ytmo",
    trailingSlash: true,
    favicon: "img/favicon.ico",
    scripts: ["https://platform.twitter.com/widgets.js"],
    presets: [
        [
            "@docusaurus/preset-classic",
            {
                docs: {
                    path: "./docs",
                    sidebarPath: require.resolve("./sidebars.js"),
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
                alt: "TPDNS",
                src: "img/tpdns_logo.png",
            },
            items: [
                {
                    to: "docs/getting-started/overview/",
                    label: "产品",
                    position: "left",
                },
                {
                    to: "docs",
                    label: "解决方案",
                    position: "left",
                    activeBaseRegex: "/^/docs(/)?$/",
                },
                {
                    to: "examples",
                    label: "价格",
                    position: "left",
                },
                {
                    to: "integrations",
                    label: "支持",
                    position: "left",
                },
                { to: "https://blog.ttdns.net", label: "博客", position: "left" },
                {
                    to: "https://github.com/ytmo",
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
                    href: "https://twitter.com/zptmo",
                    position: "right",
                    className: "header-icon-link header-twitter-link",
                },
            ],
        },
        footer: {
            logo: {
                alt: "TPDNS",
                src: "/img/tpdns_logo.png",
            },
            links: [
                {
                    title: "产品",
                    items: [
                        {
                            label: "DNS 解析",
                            to: "docs",
                        },
                        {
                            label: "GeoDNS",
                            to: "docs",
                        },
                    ],
                },
                {
                    title: "解决方案",
                    items: [
                        {
                            label: "融合 DNS",
                            to: "docs",
                        },
                        {
                            label: "GeoDNS",
                            to: "docs",
                        },
                    ],
                },
                {
                    title: "资源",
                    items: [
                        {
                            label: "费用",
                            to: "docs",
                        },
                        {
                            label: "文档",
                            to: "docs",
                        },
                        {
                            label: "博客",
                            to: "https://blog.ttdns.net",
                        },
                    ],
                },
                {
                    title: "公司",
                    items: [
                        {
                            label: "关于我们",
                            to: "about",
                        },
                        {
                            label: "导航页",
                            to: "https://tp.je",
                        },
                    ],
                },
                {
                    title: "__TLINK",
                    items: [
                        {
                            label: "导航页",
                            to: "https://tp.je/",
                        },
                        {
                            label: "服务条款",
                            to: "https://www.projectoms.com/page/terms.html",
                        },
                        {
                            label: "站点状态",
                            to: "https://status.projectoms.com/",
                        },
                        {
                            label: "隐私政策",
                            to: "https://www.projectoms.com/page/privacy.html",
                        },
                        {
                            label: "站点地图",
                            to: "https://ttdns.net/sitemap.xml",
                        },
                    ],
                },
                {
                    title: "__SOCIAL",
                    items: [
                        {
                            href: "https://github.com/ytmo",
                            label: "github",
                        },
                        {
                            href: "https://reddit.com/r/tomsproject",
                            label: "reddit",
                        },
                        {
                            href: "https://twitter.com/zptmo",
                            label: "twitter",
                        },
                        {
                            href: "https://www.linkedin.com/in/ztp/",
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
            "TomsProject Inc.",
            "https://www.projectoms.com",
        ],
        contactEmail: "support@ttdns.net",
        /** ---- */
        /** Live Preview */
        LIVE_PREVIEW_URL:
            process.env.LIVE_PREVIEW_URL ?? "http://localhost:3030/preview",
    },
};

module.exports = siteConfig;
