<div align="center" style="margin: 30px;">
<a href="https://refine.dev/">
  <img src="https://raw.githubusercontent.com/refinedev/refine/master/logo.png"   style="width:250px;" align="center" />
</a>
<br />
<br />

<div align="center">
    <a href="https://refine.dev">Home Page</a> |
    <a href="https://discord.gg/refine">Discord</a> |
    <a href="https://refine.dev/examples/">Examples</a> | 
    <a href="https://refine.dev/blog/">Blog</a> | 
    <a href="https://refine.dev/docs/">Documentation</a> | 
    <a href="https://github.com/refinedev/refine/projects/1">Roadmap</a>
</div>

</div>
<br/>

<div align="center"><strong>refine</strong> is a <a href="https://reactjs.org/">React</a>-based framework for building internal tools, rapidly. ✨ It ships with <a href="https://ant.design/">Ant Design System</a>, an enterprise-level UI toolkit.</div>

<br />

<div align="center">

[![Discord](https://img.shields.io/discord/837692625737613362.svg?label=&logo=discord&logoColor=ffffff&color=7389D8&labelColor=6A7EC2)](https://discord.gg/UuU3XCc3J5)
![Twitter Follow](https://img.shields.io/twitter/follow/refine_dev?style=social)

<a href="https://www.producthunt.com/posts/refine-3?utm_source=badge-top-post-badge&utm_medium=badge&utm_souce=badge-refine&#0045;3" target="_blank"><img src="https://api.producthunt.com/widgets/embed-image/v1/top-post-badge.svg?post_id=362220&theme=light&period=daily" alt="refine - 100&#0037;&#0032;open&#0032;source&#0032;React&#0032;framework&#0032;to&#0032;build&#0032;web&#0032;apps&#0032;3x&#0032;faster | Product Hunt" style="width: 250px; height: 54px;" width="250" height="54" /></a>

[![Awesome](https://github.com/refinedev/awesome-refine/raw/main/images/badge.svg)](https://github.com/refinedev/awesome-refine)
[![Maintainability](https://api.codeclimate.com/v1/badges/99a65a191bdd26f4601c/maintainability)](https://codeclimate.com/github/pankod/refine/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/99a65a191bdd26f4601c/test_coverage)](https://codeclimate.com/github/pankod/refine/test_coverage)
[![npm version](https://img.shields.io/npm/v/@pankod/refine-mui.svg)](https://www.npmjs.com/package/@pankod/refine-mui)
[![npm](https://img.shields.io/npm/dm/@pankod/refine-mui)](https://www.npmjs.com/package/@pankod/refine-antd)
[![Contributor Covenant](https://img.shields.io/badge/Contributor%20Covenant-2.0-4baaaa.svg)](code_of_conduct.md)

</div>

<div align="center">
  <sub>Created by <a href="https://refine.dev">refine</a></sub>
</div>

## About

[**refine**](https://refine.dev/) offers lots of out-of-the box functionality for rapid development, without compromising extreme customizability. Use-cases include, but are not limited to _admin panels_, _B2B applications_ and _dashboards_.

## Documentation

For more detailed information and usage, refer to the [refine documentation](https://refine.dev/docs/).

## What is refine?

**refine** is a [React](https://reactjs.org/)-based framework for building internal tools, rapidly. :sparkles: It ships with [Ant Design System](https://ant.design/), an enterprise-level UI toolkit.

Refine offers lots of out-of-the box functionality for rapid development, without compromising extreme customizability. Use-cases include, but are not limited to _admin panels_, _B2B applications_ and _dashboards_.

## What is a "headless" Framework?

**refine** is a **headless** React framework, which means all out-of-the-box features(**Routing**, **Networking**, **Authentication**, **Authorization**, **State Management**, **Realtime**, **i18n**, etc.), it can be used without being tied to any UI elements or framework. Also, Ant Design as out-of-the-box is supported.

-   Customization & Extensibility - UI is a completely customizable area and each developer uses different solutions. **refine** features does not restrict or interfere with your UI structure. **refine** allows the you to design and customizable the UI based on their unique use case.

-   Separation of Concerns - **refine** as a framework, is not responsible for your UI and is independent.

-   Maintenance - By removing the API surface to support every UI use case, **refine** easy to use and update/maintain is simple.

###

## Key features

🔥 **Headless** : Works with any UI framework

⚙️ **Zero-configuration**: One-line setup with [superplate](https://github.com/pankod/superplate). It takes less than a minute to start a project.

📦 **Out-of-the-box** : Routing, networking, authentication, state management, i18n and UI.

🔌 **Backend Agnostic** : Connects to any custom backend. Built-in support for [REST API](https://github.com/refinedev/refine/tree/master/packages/simple-rest), [GraphQL](https://github.com/refinedev/refine/tree/master/packages/graphql), [NestJs CRUD](https://github.com/refinedev/refine/tree/master/packages/nestjsx-crud), [Airtable](https://github.com/refinedev/refine/tree/master/packages/airtable), [Strapi](https://github.com/refinedev/refine/tree/master/packages/strapi), [Strapi v4](https://github.com/refinedev/refine/tree/master/packages/strapi-v4), [Strapi GraphQL](https://github.com/refinedev/refine/tree/master/packages/strapi-graphql), [Supabase](https://github.com/refinedev/refine/tree/master/packages/supabase), [Hasura](https://github.com/refinedev/refine/tree/master/packages/hasura), [Appwrite](https://github.com/refinedev/refine/tree/master/packages/appwrite), [Firebase](https://firebase.google.com/), [Directus](https://directus.io/) and [Altogic](https://github.com/refinedev/refine/tree/master/packages/altogic).

📝 **Native Typescript Core** : You can always opt out for plain JavaScript.

🐜 **Enterprise UI** : Works seamlessly with Ant Design System. (Support for multiple UI frameworks is on the Roadmap)

📝 **Boilerplate-free Code** : Keeps your codebase clean and readable.

## Motivation

Higher-level frontend frameworks can save you a lot time, but they typically offer you a trade-off between speed and flexibility.

After many years of experience in developing B2B frontend applications and working with popular frameworks, we came up with a new approach to tackle this dilemma. This is how **refine** is born.

**refine** is a collection of helper `hooks`, `components` and `providers`. They are all decoupled from your UI components and business logic, so they never keep you from customizing your UI or coding your own flow.

As **refine** is totally _unopinionated_ about UI and logic, it's strongly _opinionated_ about three parts of your application:

1. **API Networking**
2. **State Management**
3. **Authentication & Authorization**

We believe, these are the most important components of a data-intensive frontend application and should be handled in a robust way by leveraging industry best practices.

**refine** guarantees you a perfect implementation of these building blocks in your project, so you can focus on your development.

## Architecture

**refine** makes extensive use of [hooks](https://reactjs.org/docs/hooks-reference.html#gatsby-focus-wrapper) as a default way for interacting with your components.
Under the hood, **refine** relies heavily to [React Query](https://react-query.tanstack.com/) for data handling, caching and state management.
Access to external sources and API's happen via providers which are basically plug-in type components for extendibility.

<br/>

<div align="center">
    <img src="https://raw.githubusercontent.com/refinedev/refine/master/documentation/static/img/getting-started/refine_architecture.png" width="400px" />
</div>

## Benchmark

After releasing the first internal versions, we had the chance to migrate some of our _React_ projects to **refine**.
In addition to **shorter development** times and **overall performance gains**, we've measured significant reduction in project size.

**refine** makes your codebase significantly smaller, by eliminating redundant code such as _reducers_, _actions_ and _unit tests_. Below is a size comparison for an example project:

<br/>

<div align="center">
    <img src="https://raw.githubusercontent.com/refinedev/refine/master/documentation/static/img/getting-started/benchmark.png" width="400px" align="center" />
</div>

## Quick Start

Run the **create refine-app** CLI tool with the following command:

```
npm create refine-app tutorial
```

Follow the _CLI wizard_ to select options and start creating your project.

After setup is complete, navigate to the project folder and start your project with:

```
npm run dev
```

Your **refine** application will be accessible at [http://localhost:3000](http://localhost:3000).

Replace the contents of `App.tsx` with the following code:

```tsx title="App.tsx"
import React from "react";
import { Refine, useOne } from "@pankod/refine-core";
import {
    Layout,
    ErrorComponent,
    LightTheme,
    ThemeProvider,
    notificationProvider,
    RefineSnackbarProvider,
    CssBaseline,
    GlobalStyles,
} from "@pankod/refine-mui";
import routerProvider from "@pankod/refine-react-router-v6";
import dataProvider from "@pankod/refine-simple-rest";

const App: React.FC = () => {
    return (
        <ThemeProvider theme={LightTheme}>
            <CssBaseline />
            <GlobalStyles styles={{ html: { WebkitFontSmoothing: "auto" } }} />
            <RefineSnackbarProvider>
                <Refine
                    routerProvider={routerProvider}
                    dataProvider={dataProvider(
                        "https://api.fake-rest.refine.dev",
                    )}
                    notificationProvider={notificationProvider}
                    Layout={Layout}
                    catchAll={<ErrorComponent />}
                    resources={[{ name: "posts", list: PostList }]}
                />
            </RefineSnackbarProvider>
        </ThemeProvider>
    );
};

export const PostList: React.FC = () => {
    const getOne = React.useCallback(useOne, []);
    const columns = React.useMemo<GridColumns<IPost>>(
        () => [
            {
                field: "id",
                headerName: "ID",
                type: "number",
                width: 50,
            },
            { field: "title", headerName: "Title", minWidth: 400, flex: 1 },
            {
                field: "category.id",
                headerName: "Category",
                type: "number",
                headerAlign: "left",
                align: "left",
                minWidth: 250,
                flex: 0.5,
                valueGetter: ({ row }) => {
                    const { data } = getOne<ICategory>({
                        resource: "categories",
                        id: row.category.id,
                    });
                    return data?.data.title;
                },
            },
            { field: "status", headerName: "Status", minWidth: 120, flex: 0.3 },
            {
                field: "actions",
                headerName: "Actions",
                renderCell: function render({ row }) {
                    return <EditButton hideText recordItemId={row.id} />;
                },
                align: "center",
                headerAlign: "center",
                minWidth: 80,
            },
        ],
        [getOne],
    );

    const { dataGridProps } = useDataGrid<IPost>({
        columns,
    });

    return (
        <List>
            <DataGrid {...dataGridProps} autoHeight />
        </List>
    );
};

export default App;
```

```tsx title="interfaces.d.ts"
interface IPost {
    title: string;
    createdAt: string;
    category: { id: number };
}

interface ICategory {
    id: number;
    title: string;
}
```

## Roadmap

You can find Refine's <a href="https://github.com/refinedev/refine/projects/1">Public Roadmap here!</a>

## Stargazers

[![Stargazers repo roster for refinedev/refine](https://reporoster.com/stars/refinedev/refine)](https://github.com/refinedev/refine/stargazers)

## Contribution

If you have a bug to report, do not hesitate to file an issue.

If you are willing to fix an issue or propose a feature; all PRs with clear explanations are welcome and encouraged.

## License

Licensed under the MIT License, Copyright © 2021-present refine

## Special Thanks

[React Admin](https://marmelab.com/react-admin/) has been a great source of ideas and inspiration for refine. Big thanks to friends at [Marmelab](https://marmelab.com) for the amazing work they are doing.
