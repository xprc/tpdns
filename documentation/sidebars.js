/** @type {import('@docusaurus/plugin-content-docs/src/sidebars/types').Sidebars} */
module.exports = {
    someSidebar: [
        {
            type: "category",
            label: "Getting Started",
            link: {
                type: "generated-index",
                title: "Getting Started",
                slug: "/getting-started",
            },
            items: ["getting-started/overview", "getting-started/quickstart"],
            collapsed: false,
        },
        {
            type: "category",
            label: "Basic Tutorials",
            link: {
                type: "doc",
                id: "tutorials",
            },
            items: [
                "tutorials/ant-design-tutorial",
                "tutorials/chakra-ui-tutorial",
                "tutorials/mantine-tutorial",
                "tutorials/material-ui-tutorial",
                "tutorials/headless-tutorial",
            ],
            collapsed: true,
        },
        {
            type: "category",
            label: "API Reference",
            link: {
                type: "generated-index",
                title: "API Reference",
                slug: "/api-reference",
            },
            items: [
                "api-reference/general-concepts",
                {
                    type: "category",
                    label: "Core API",
                    link: {
                        type: "generated-index",
                        title: "Core API",
                        slug: "/api-reference/core",
                    },
                    items: [
                        {
                            type: "category",
                            label: "Providers",
                            items: [
                                "api-reference/core/providers/accessControl-provider",
                                "api-reference/core/providers/auth-provider",
                                "api-reference/core/providers/audit-log-provider",
                                "api-reference/core/providers/data-provider",
                                "api-reference/core/providers/i18n-provider",
                                "api-reference/core/providers/live-provider",
                                "api-reference/core/providers/notification-provider",
                                "api-reference/core/providers/router-provider",
                            ],
                        },
                        {
                            type: "category",
                            label: "Hooks",
                            items: [
                                {
                                    type: "category",
                                    label: "Access Control",
                                    items: [
                                        "api-reference/core/hooks/accessControl/useCan",
                                    ],
                                },
                                {
                                    type: "category",
                                    label: "Authorization",
                                    items: [
                                        "api-reference/core/hooks/auth/useAuthenticated",
                                        "api-reference/core/hooks/auth/useCheckError",
                                        "api-reference/core/hooks/auth/useGetIdentity",
                                        "api-reference/core/hooks/auth/useLogin",
                                        "api-reference/core/hooks/auth/useLogout",
                                        "api-reference/core/hooks/auth/usePermissions",
                                        "api-reference/core/hooks/auth/useRegister",
                                        "api-reference/core/hooks/auth/useForgotPassword",
                                        "api-reference/core/hooks/auth/useUpdatePassword",
                                    ],
                                },
                                {
                                    type: "category",
                                    label: "Audit Log",
                                    items: [
                                        "api-reference/core/hooks/audit-log/useLog",
                                        "api-reference/core/hooks/audit-log/useLogList",
                                    ],
                                },
                                {
                                    type: "category",
                                    label: "Breadcrumb",
                                    items: [
                                        "api-reference/core/hooks/useBreadcrumb",
                                    ],
                                },
                                {
                                    type: "category",
                                    label: "Data",
                                    items: [
                                        "api-reference/core/hooks/data/useApiUrl",
                                        "api-reference/core/hooks/data/useCreate",
                                        "api-reference/core/hooks/data/useCreateMany",
                                        "api-reference/core/hooks/data/useCustom",
                                        "api-reference/core/hooks/data/useCustomMutation",
                                        "api-reference/core/hooks/data/useDataProvider",
                                        "api-reference/core/hooks/data/useDelete",
                                        "api-reference/core/hooks/data/useDeleteMany",
                                        "api-reference/core/hooks/data/useList",
                                        "api-reference/core/hooks/data/useMany",
                                        "api-reference/core/hooks/data/useOne",
                                        "api-reference/core/hooks/data/useUpdate",
                                        "api-reference/core/hooks/data/useUpdateMany",
                                    ],
                                },
                                {
                                    type: "category",
                                    label: "Field",
                                    items: [
                                        "api-reference/core/hooks/useSelect",
                                    ],
                                },
                                {
                                    type: "category",
                                    label: "Form",
                                    items: ["api-reference/core/hooks/useForm"],
                                },
                                {
                                    type: "category",
                                    label: "Import-Export",
                                    items: [
                                        "api-reference/core/hooks/import-export/useExport",
                                        "api-reference/core/hooks/import-export/useImport",
                                    ],
                                },
                                {
                                    type: "category",
                                    label: "Invalidate",
                                    items: [
                                        "api-reference/core/hooks/invalidate/useInvalidate",
                                    ],
                                },
                                {
                                    type: "category",
                                    label: "Live",
                                    items: [
                                        "api-reference/core/hooks/live/usePublish",
                                        "api-reference/core/hooks/live/useSubscription",
                                    ],
                                },
                                {
                                    type: "category",
                                    label: "Navigation",
                                    items: [
                                        "api-reference/core/hooks/navigation/useNavigation",
                                    ],
                                },
                                {
                                    type: "category",
                                    label: "Notification",
                                    items: [
                                        "api-reference/core/hooks/useNotification",
                                    ],
                                },
                                {
                                    type: "category",
                                    label: "Refine",
                                    items: [
                                        "api-reference/core/hooks/refine/useTitle",
                                    ],
                                },
                                {
                                    type: "category",
                                    label: "Resource",
                                    items: [
                                        "api-reference/core/hooks/resource/useResource",
                                        "api-reference/core/hooks/resource/useResourceWithRoute",
                                    ],
                                },
                                {
                                    type: "category",
                                    label: "Show",
                                    items: [
                                        "api-reference/core/hooks/show/useShow",
                                    ],
                                },
                                {
                                    type: "category",
                                    label: "Table",
                                    items: [
                                        "api-reference/core/hooks/useTable",
                                    ],
                                },
                                {
                                    type: "category",
                                    label: "Translate",
                                    items: [
                                        "api-reference/core/hooks/translate/useGetLocale",
                                        "api-reference/core/hooks/translate/useSetLocale",
                                        "api-reference/core/hooks/translate/useTranslate",
                                    ],
                                },
                                {
                                    type: "category",
                                    label: "UI",
                                    items: [
                                        "api-reference/core/hooks/ui/useModal",
                                        "api-reference/core/hooks/ui/useMenu",
                                    ],
                                },
                            ],
                        },
                        {
                            type: "category",
                            label: "Components",
                            items: [
                                "api-reference/core/components/auth-page",
                                "api-reference/core/components/refine-config",
                                "api-reference/core/components/layout-wrapper",
                                {
                                    type: "category",
                                    label: "Authorization",
                                    items: [
                                        "api-reference/core/components/auth/authenticated",
                                    ],
                                },
                                {
                                    type: "category",
                                    label: "Access Control",
                                    items: [
                                        "api-reference/core/components/accessControl/can-access",
                                    ],
                                },
                            ],
                        },
                        "api-reference/core/interfaceReferences",
                    ],
                },
                {
                    type: "category",
                    label: "Ant Design API",
                    link: {
                        type: "generated-index",
                        title: "Ant Design API",
                        slug: "/api-reference/antd",
                    },
                    items: [
                        {
                            type: "category",
                            label: "Hooks",
                            items: [
                                {
                                    type: "category",
                                    label: "Field",
                                    items: [
                                        "api-reference/antd/hooks/field/useCheckboxGroup",
                                        "api-reference/antd/hooks/field/useRadioGroup",
                                        "api-reference/antd/hooks/field/useSelect",
                                    ],
                                },
                                {
                                    type: "category",
                                    label: "Form",
                                    items: [
                                        "api-reference/antd/hooks/form/useDrawerForm",
                                        "api-reference/antd/hooks/form/useForm",
                                        "api-reference/antd/hooks/form/useModalForm",
                                        "api-reference/antd/hooks/form/useStepsForm",
                                    ],
                                },
                                {
                                    type: "category",
                                    label: "Import",
                                    items: [
                                        "api-reference/antd/hooks/import/useImport",
                                    ],
                                },
                                {
                                    type: "category",
                                    label: "List",
                                    items: [
                                        "api-reference/antd/hooks/list/useSimpleList",
                                    ],
                                },
                                {
                                    type: "category",
                                    label: "Table",
                                    items: [
                                        "api-reference/antd/hooks/table/useEditableTable",
                                        "api-reference/antd/hooks/table/useTable",
                                    ],
                                },
                            ],
                        },
                        {
                            type: "category",
                            label: "Components",
                            items: [
                                "api-reference/antd/components/antd-auth-page",
                                "api-reference/antd/components/inferencer",
                                {
                                    type: "category",
                                    label: "Basic Views",
                                    items: [
                                        "api-reference/antd/components/basic-views/create",
                                        "api-reference/antd/components/basic-views/edit",
                                        "api-reference/antd/components/basic-views/list",
                                        "api-reference/antd/components/basic-views/show",
                                    ],
                                },
                                "api-reference/antd/components/breadcrumb",
                                {
                                    type: "category",
                                    label: "Buttons",
                                    items: [
                                        "api-reference/antd/components/buttons/clone-button",
                                        "api-reference/antd/components/buttons/create-button",
                                        "api-reference/antd/components/buttons/delete-button",
                                        "api-reference/antd/components/buttons/edit-button",
                                        "api-reference/antd/components/buttons/export-button",
                                        "api-reference/antd/components/buttons/import-button",
                                        "api-reference/antd/components/buttons/list-button",
                                        "api-reference/antd/components/buttons/refresh-button",
                                        "api-reference/antd/components/buttons/save-button",
                                        "api-reference/antd/components/buttons/show-button",
                                    ],
                                },
                                {
                                    type: "category",
                                    label: "Fields",
                                    items: [
                                        "api-reference/antd/components/fields/boolean",
                                        "api-reference/antd/components/fields/date",
                                        "api-reference/antd/components/fields/email",
                                        "api-reference/antd/components/fields/file",
                                        "api-reference/antd/components/fields/image",
                                        "api-reference/antd/components/fields/markdown",
                                        "api-reference/antd/components/fields/number",
                                        "api-reference/antd/components/fields/tag",
                                        "api-reference/antd/components/fields/text",
                                        "api-reference/antd/components/fields/url",
                                    ],
                                },
                                "api-reference/antd/components/filter-dropdown",
                                {
                                    type: "category",
                                    label: "Inputs",
                                    items: [
                                        "api-reference/antd/components/inputs/custom-inputs",
                                    ],
                                },
                            ],
                        },
                        {
                            type: "category",
                            label: "Customization",
                            items: [
                                "api-reference/antd/customization/antd-custom-theme",
                                "api-reference/antd/customization/antd-custom-layout",
                                "api-reference/antd/customization/antd-custom-sider",
                            ],
                        },
                    ],
                },

                {
                    type: "category",
                    label: "Chakra UI API",
                    link: {
                        type: "generated-index",
                        title: "Chakra UI API",
                        slug: "/api-reference/chakra-ui",
                    },
                    items: [
                        {
                            type: "category",
                            label: "Components",
                            items: [
                                "api-reference/chakra-ui/components/chakra-auth-page",
                                "api-reference/chakra-ui/components/inferencer",
                                {
                                    type: "category",
                                    label: "Basic Views",
                                    items: [
                                        "api-reference/chakra-ui/components/basic-views/create",
                                        "api-reference/chakra-ui/components/basic-views/edit",
                                        "api-reference/chakra-ui/components/basic-views/list",
                                        "api-reference/chakra-ui/components/basic-views/show",
                                    ],
                                },
                                "api-reference/chakra-ui/components/breadcrumb",
                                {
                                    type: "category",
                                    label: "Buttons",
                                    items: [
                                        "api-reference/chakra-ui/components/buttons/clone-button",
                                        "api-reference/chakra-ui/components/buttons/create-button",
                                        "api-reference/chakra-ui/components/buttons/delete-button",
                                        "api-reference/chakra-ui/components/buttons/edit-button",
                                        "api-reference/chakra-ui/components/buttons/export-button",
                                        "api-reference/chakra-ui/components/buttons/import-button",
                                        "api-reference/chakra-ui/components/buttons/list-button",
                                        "api-reference/chakra-ui/components/buttons/refresh-button",
                                        "api-reference/chakra-ui/components/buttons/save-button",
                                        "api-reference/chakra-ui/components/buttons/show-button",
                                    ],
                                },
                                {
                                    type: "category",
                                    label: "Fields",
                                    items: [
                                        "api-reference/chakra-ui/components/fields/boolean",
                                        "api-reference/chakra-ui/components/fields/date",
                                        "api-reference/chakra-ui/components/fields/email",
                                        "api-reference/chakra-ui/components/fields/file",
                                        "api-reference/chakra-ui/components/fields/markdown",
                                        "api-reference/chakra-ui/components/fields/number",
                                        "api-reference/chakra-ui/components/fields/tag",
                                        "api-reference/chakra-ui/components/fields/text",
                                        "api-reference/chakra-ui/components/fields/url",
                                    ],
                                },
                            ],
                        },
                        {
                            type: "category",
                            label: "Customization",
                            items: [
                                "api-reference/chakra-ui/customization/theme",
                                "api-reference/chakra-ui/customization/layout",
                                "api-reference/chakra-ui/customization/sider",
                            ],
                        },
                    ],
                },

                {
                    type: "category",
                    label: "Mantine API",
                    link: {
                        type: "generated-index",
                        title: "Mantine API",
                        slug: "/api-reference/mantine",
                    },
                    items: [
                        {
                            type: "category",
                            label: "Hooks",
                            items: [
                                {
                                    type: "category",
                                    label: "Form",
                                    items: [
                                        "api-reference/mantine/hooks/form/useDrawerForm",
                                        "api-reference/mantine/hooks/form/useForm",
                                        "api-reference/mantine/hooks/form/useModalForm",
                                        "api-reference/mantine/hooks/form/useStepsForm",
                                    ],
                                },
                                "api-reference/mantine/hooks/useSelect",
                            ],
                        },
                        {
                            type: "category",
                            label: "Components",
                            items: [
                                "api-reference/mantine/components/mantine-auth-page",
                                "api-reference/mantine/components/inferencer",
                                {
                                    type: "category",
                                    label: "Basic Views",
                                    items: [
                                        "api-reference/mantine/components/basic-views/create",
                                        "api-reference/mantine/components/basic-views/edit",
                                        "api-reference/mantine/components/basic-views/list",
                                        "api-reference/mantine/components/basic-views/show",
                                    ],
                                },
                                "api-reference/mantine/components/breadcrumb",
                                {
                                    type: "category",
                                    label: "Buttons",
                                    items: [
                                        "api-reference/mantine/components/buttons/clone-button",
                                        "api-reference/mantine/components/buttons/create-button",
                                        "api-reference/mantine/components/buttons/delete-button",
                                        "api-reference/mantine/components/buttons/edit-button",
                                        "api-reference/mantine/components/buttons/export-button",
                                        "api-reference/mantine/components/buttons/import-button",
                                        "api-reference/mantine/components/buttons/list-button",
                                        "api-reference/mantine/components/buttons/refresh-button",
                                        "api-reference/mantine/components/buttons/save-button",
                                        "api-reference/mantine/components/buttons/show-button",
                                    ],
                                },
                                {
                                    type: "category",
                                    label: "Fields",
                                    items: [
                                        "api-reference/mantine/components/fields/boolean",
                                        "api-reference/mantine/components/fields/date",
                                        "api-reference/mantine/components/fields/email",
                                        "api-reference/mantine/components/fields/file",
                                        "api-reference/mantine/components/fields/markdown",
                                        "api-reference/mantine/components/fields/number",
                                        "api-reference/mantine/components/fields/tag",
                                        "api-reference/mantine/components/fields/text",
                                        "api-reference/mantine/components/fields/url",
                                    ],
                                },
                            ],
                        },
                        {
                            type: "category",
                            label: "Customization",
                            items: [
                                "api-reference/mantine/customization/theme",
                                "api-reference/mantine/customization/layout",
                                "api-reference/mantine/customization/sider",
                            ],
                        },
                    ],
                },

                {
                    type: "category",
                    label: "Material UI API",
                    link: {
                        type: "generated-index",
                        title: "Material UI API",
                        slug: "/api-reference/mui",
                    },
                    items: [
                        {
                            type: "category",
                            label: "Hooks",
                            items: [
                                "api-reference/mui/hooks/useAutocomplete",
                                "api-reference/mui/hooks/useDataGrid",
                            ],
                        },
                        {
                            type: "category",
                            label: "Components",
                            items: [
                                "api-reference/mui/components/mui-auth-page",
                                "api-reference/mui/components/inferencer",
                                {
                                    type: "category",
                                    label: "Basic Views",
                                    items: [
                                        "api-reference/mui/components/basic-views/create",
                                        "api-reference/mui/components/basic-views/edit",
                                        "api-reference/mui/components/basic-views/list",
                                        "api-reference/mui/components/basic-views/show",
                                    ],
                                },
                                "api-reference/mui/components/mui-breadcrumb",
                                {
                                    type: "category",
                                    label: "Buttons",
                                    items: [
                                        "api-reference/mui/components/buttons/clone-button",
                                        "api-reference/mui/components/buttons/create-button",
                                        "api-reference/mui/components/buttons/delete-button",
                                        "api-reference/mui/components/buttons/edit-button",
                                        "api-reference/mui/components/buttons/export-button",
                                        "api-reference/mui/components/buttons/import-button",
                                        "api-reference/mui/components/buttons/list-button",
                                        "api-reference/mui/components/buttons/refresh-button",
                                        "api-reference/mui/components/buttons/save-button",
                                        "api-reference/mui/components/buttons/show-button",
                                    ],
                                },
                                {
                                    type: "category",
                                    label: "Fields",
                                    items: [
                                        "api-reference/mui/components/fields/boolean",
                                        "api-reference/mui/components/fields/date",
                                        "api-reference/mui/components/fields/email",
                                        "api-reference/mui/components/fields/file",
                                        "api-reference/mui/components/fields/markdown",
                                        "api-reference/mui/components/fields/number",
                                        "api-reference/mui/components/fields/tag",
                                        "api-reference/mui/components/fields/text",
                                        "api-reference/mui/components/fields/url",
                                    ],
                                },
                            ],
                        },
                        {
                            type: "category",
                            label: "Customization",
                            items: [
                                "api-reference/mui/customization/mui-custom-theme",
                                "api-reference/mui/customization/mui-custom-layout",
                                "api-reference/mui/customization/mui-custom-sider",
                            ],
                        },
                    ],
                },
            ],
        },
        {
            type: "category",
            label: "Packages",
            link: {
                type: "generated-index",
                title: "Packages",
                slug: "/packages",
            },
            items: [
                "packages/list-of-packages",
                {
                    type: "category",
                    label: "Documentation",
                    link: {
                        type: "generated-index",
                        title: "Documentation",
                        slug: "/packages/documentation",
                    },
                    items: [
                        "packages/documentation/cli",
                        "packages/documentation/command-palette",
                        "packages/documentation/react-table",
                        {
                            type: "category",
                            label: "React Hook Form",
                            items: [
                                "packages/documentation/react-hook-form/useForm",
                                "packages/documentation/react-hook-form/useModalForm",
                                "packages/documentation/react-hook-form/useStepsForm",
                            ],
                        },
                        "packages/documentation/inferencer",
                    ],
                },
            ],
        },
        {
            type: "category",
            label: "Examples",
            link: {
                type: "doc",
                id: "examples/examples",
            },
            items: [
                "examples/real-world-example",
                {
                    type: "category",
                    label: "Access Control",
                    items: [
                        "examples/access-control/casbin",
                        "examples/access-control/cerbos",
                    ],
                },
                {
                    type: "category",
                    label: "Authentication",
                    items: [
                        "examples/authentication/headless",
                        "examples/authentication/antd",
                        "examples/authentication/mui",
                        "examples/authentication/mantine",
                    ],
                },
                {
                    type: "category",
                    label: "Auth Provider",
                    items: [
                        "examples/auth-provider/auth0",
                        "examples/auth-provider/google-auth",
                        "examples/auth-provider/otpLogin",
                    ],
                },
                "examples/antd-calendar-example",
                "examples/command-palette",
                {
                    type: "category",
                    label: "Core",
                    items: [
                        "examples/core/useImport",
                        "examples/core/useModal",
                    ],
                },
                {
                    type: "category",
                    label: "Customization",
                    items: [
                        "examples/customization/customFooter",
                        "examples/customization/customLogin",
                        "examples/customization/customSider",
                        "examples/customization/offLayoutArea",
                        "examples/customization/rtl",
                        "examples/customization/topMenuLayout",
                    ],
                },
                "examples/customPages",
                {
                    type: "category",
                    label: "Data Provider",
                    items: [
                        "examples/data-provider/airtable",
                        "examples/data-provider/altogic",
                        "examples/data-provider/appwrite",
                        "examples/data-provider/directus",
                        "examples/data-provider/elide",
                        "examples/data-provider/hasura",
                        "examples/data-provider/multiple",
                        "examples/data-provider/nestjsxCrud",
                        "examples/data-provider/nhost",
                        "examples/data-provider/strapi",
                        "examples/data-provider/strapi-graphql",
                        "examples/data-provider/strapi-v4",
                        "examples/data-provider/supabase",
                    ],
                },
                "examples/e2e-testing",
                {
                    type: "category",
                    label: "Field",
                    items: [
                        "examples/field/useCheckboxGroup",
                        "examples/field/useRadioGroup",
                        "examples/field/useSelect",
                    ],
                },
                {
                    type: "category",
                    label: "Form",
                    items: [
                        {
                            type: "category",
                            label: "Ant Design",
                            items: [
                                "examples/form/antd/custom-form-validation",
                                "examples/form/antd/useDrawerForm",
                                "examples/form/antd/useForm",
                                "examples/form/antd/useModalForm",
                                "examples/form/antd/useStepsForm",
                            ],
                        },
                        {
                            type: "category",
                            label: "Headless",
                            items: ["examples/form/headless/save-and-continue"],
                        },
                        {
                            type: "category",
                            label: "Mantine",
                            items: [
                                "examples/form/mantine/useDrawerForm",
                                "examples/form/mantine/useForm",
                                "examples/form/mantine/useModalForm",
                                "examples/form/mantine/useStepsForm",
                            ],
                        },
                        {
                            type: "category",
                            label: "Material UI",
                            items: [
                                "examples/form/mui/useDrawerForm",
                                "examples/form/mui/useForm",
                                "examples/form/mui/useModalForm",
                                "examples/form/mui/useStepsForm",
                            ],
                        },
                        {
                            type: "category",
                            label: "React Hook Form",
                            items: [
                                "examples/form/react-hook-form/useForm",
                                "examples/form/react-hook-form/useModalForm",
                                "examples/form/react-hook-form/useStepsForm",
                            ],
                        },
                    ],
                },
                {
                    type: "category",
                    label: "i18n",
                    items: [
                        "examples/i18n/i18n-nextjs",
                        "examples/i18n/i18n-react",
                    ],
                },
                "examples/import-export",
                {
                    type: "category",
                    label: "Inputs",
                    items: [
                        "examples/inputs/customInput",
                        "examples/inputs/datePicker",
                    ],
                },
                "examples/javascript",
                {
                    type: "category",
                    label: "List",
                    items: ["examples/list/useSimpleList"],
                },
                {
                    type: "category",
                    label: "Live Provider",
                    items: ["examples/live-provider/ably"],
                },
                "examples/multi-level-menu/multi-level-menu",
                {
                    type: "category",
                    label: "Multitenancy",
                    items: [
                        "examples/multi-tenancy/appwrite",
                        "examples/multi-tenancy/strapi-v4",
                    ],
                },
                {
                    type: "category",
                    label: "Next.js",
                    items: [
                        "examples/next-js/nextjs",
                        "examples/next-js/nextjs-appdir",
                    ],
                },
                {
                    type: "category",
                    label: "Notification Provider",
                    items: ["examples/notification-provider/react-toastify"],
                },
                /*                 {
                    type: "category",
                    label: "Remix",
                    items: [
                        "examples/remix/remix-antd",
                        "examples/remix/remix-headless",
                    ],
                }, */
                {
                    type: "category",
                    label: "Router Provider",
                    items: ["examples/router-provider/react-location"],
                },
                {
                    type: "category",
                    label: "Search",
                    items: ["examples/search/search"],
                },
                {
                    type: "category",
                    label: "Table",
                    items: [
                        {
                            type: "category",
                            label: "Ant Design",
                            items: [
                                "examples/table/antd/advancedTable",
                                "examples/table/antd/tableFilter",
                                "examples/table/antd/useDeleteMany",
                                "examples/table/antd/useEditableTable",
                                "examples/table/antd/useTable",
                                "examples/table/antd/useUpdateMany",
                            ],
                        },
                        {
                            type: "category",
                            label: "Mantine",
                            items: [
                                "examples/table/mantine/advanced-react-table",
                                "examples/table/mantine/basic",
                            ],
                        },
                        {
                            type: "category",
                            label: "Material UI",
                            items: [
                                "examples/table/mui/advanced",
                                "examples/table/mui/filter",
                                "examples/table/mui/useDataGrid",
                                "examples/table/mui/useDeleteMany",
                                "examples/table/mui/useUpdateMany",
                            ],
                        },
                        {
                            type: "category",
                            label: "React Table",
                            items: [
                                "examples/table/react-table/advanced-react-table",
                                "examples/table/react-table/react-table",
                            ],
                        },
                        {
                            type: "category",
                            label: "Handson Table",
                            items: ["examples/table/handsontable/handsontable"],
                        },
                    ],
                },
                "examples/customTheme",
                {
                    type: "category",
                    label: "UI",
                    items: ["examples/ui/useModal"],
                },
                {
                    type: "category",
                    label: "Upload",
                    items: [
                        {
                            type: "category",
                            label: "Ant Design",
                            items: [
                                "examples/upload/antd/base64",
                                "examples/upload/antd/multipart",
                            ],
                        },
                        {
                            type: "category",
                            label: "Mantine",
                            items: [
                                "examples/upload/mantine/base64",
                                "examples/upload/mantine/multipart",
                            ],
                        },
                        {
                            type: "category",
                            label: "Material UI",
                            items: [
                                "examples/upload/mui/base64",
                                "examples/upload/mui/multipart",
                            ],
                        },
                    ],
                },
                {
                    type: "category",
                    label: "Web3",
                    items: ["examples/web3/web3Login"],
                },
            ],
        },
        {
            type: "category",
            label: "Advanced Tutorials",
            link: {
                type: "generated-index",
                title: "Advanced Tutorials",
                slug: "/advanced-tutorials",
            },
            items: [
                "advanced-tutorials/access-control",
                {
                    type: "category",
                    label: "Auth",
                    items: [
                        "advanced-tutorials/auth/auth0",
                        "advanced-tutorials/auth/azure-ad",
                    ],
                },
                "advanced-tutorials/custom-layout",
                "advanced-tutorials/custom-pages",
                {
                    type: "category",
                    label: "Data Provider",
                    items: [
                        "advanced-tutorials/data-provider/appwrite",
                        "advanced-tutorials/data-provider/graphql",
                        "advanced-tutorials/data-provider/handling-filters",
                        "advanced-tutorials/data-provider/strapi-v4",
                        "advanced-tutorials/data-provider/supabase",
                    ],
                },
                {
                    type: "category",
                    label: "Form",
                    items: [
                        "advanced-tutorials/forms/custom-form-validation",
                        "advanced-tutorials/forms/save-and-continue",
                    ],
                },
                {
                    type: "category",
                    label: "Import - Export",
                    items: [
                        "advanced-tutorials/import-export/csv-export",
                        "advanced-tutorials/import-export/csv-import",
                    ],
                },
                "advanced-tutorials/real-time",
                "advanced-tutorials/multi-level-menu/multi-level-menu",
                {
                    type: "category",
                    label: "Multitenancy",
                    items: [
                        "advanced-tutorials/multi-tenancy/appwrite",
                        "advanced-tutorials/multi-tenancy/strapi-v4",
                    ],
                },
                "advanced-tutorials/mutation-mode",
                {
                    type: "category",
                    label: "Search",
                    items: [
                        "advanced-tutorials/search/list-search",
                        "advanced-tutorials/search/search",
                        "advanced-tutorials/search/table-search",
                    ],
                },
                {
                    type: "category",
                    label: "SSR",
                    items: [
                        "advanced-tutorials/ssr/remix",
                        "advanced-tutorials/ssr/nextjs",
                    ],
                },
                {
                    type: "category",
                    label: "Upload",
                    items: [
                        "advanced-tutorials/upload/base64-upload",
                        "advanced-tutorials/upload/multipart-upload",
                    ],
                },
                {
                    type: "category",
                    label: "Web3",
                    items: ["advanced-tutorials/web3/ethereum-signin"],
                },
            ],
        },
        {
            type: "doc",
            id: "comparison",
            label: "Comparison",
        },
        {
            type: "doc",
            id: "faq",
        },
        {
            type: "doc",
            id: "contributing",
        },
        {
            type: "doc",
            id: "testing",
        },
        {
            type: "doc",
            id: "migration-guide",
        },
        {
            type: "doc",
            id: "licence",
        },
        {
            type: "category",
            label: "Further Readings",
            link: {
                type: "generated-index",
                title: "Further Readings",
                slug: "/further-readings",
            },
            items: [
                "further-readings/benchmarks",
                "further-readings/telemetry",
            ],
        },
    ],
};
