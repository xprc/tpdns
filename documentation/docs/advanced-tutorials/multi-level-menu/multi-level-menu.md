---
id: multi-level-menu
title: Multi Level Menu
sidebar_label: Multi Level Menu
---

import multiLevelMenu from '@site/static/img/guides-and-concepts/multi-level-menu/multi-level-menu.png';

This document is related to how to create a multi-level menu for **refine** applications.

### What is Multi-level Menu?

The multi-level menu is a great way to organize your sider menu items. You can create groups and sub menus to keep your menu items organized. This makes it easy to find the menu items you are looking for.

## Usage

To do this, it is necessary to create an object array with the following [resources properties](/api-reference/core/interfaces.md#resourceitemprops):

```tsx title="src/App.tsx"
        <Refine
           ...
            resources={[
                {
                    // highlight-start
                    name: "CMS",
                    // highlight-end
                },
                {
                    // highlight-start
                    name: "posts",
                    parentName: "CMS",
                    // highlight-end
                    list: PostList,
                    create: PostCreate,
                    edit: PostEdit,
                    show: PostShow,
                },
                {
                    // highlight-start
                    name: "category",
                    parentName: "CMS",
                    // highlight-end
                    list: CategoryList,
                    create: CategoryCreate,
                    edit: CategoryEdit,
                    canDelete: true,
                },
            ]}
        />
```

:::tip

The `parentName` you give in the resource objects must be strictly equal to the resource name you want to group under.<br />
A resource given as a group can only have a `name` and a `parentName`. They should not have other props such as list, edit, create etc.

:::

:::caution

Since your Next.js applications are routing file-based, you need to manage the nested routes yourself. If you use Nested resources only for grouping Menu items in `Sider` and you don't need nested routes, you can give `route` option as a single level routing when defining your `resource`.

```tsx title="pages/_app.tsx"
        <Refine
           ...
            resources={[
                {
                    name: "CMS",
                },
                {
                    name: "posts",
                    parentName: "CMS",
                    // highlight-next-line
                    options: { route: "posts" },
                    list: PostList,
                    create: PostCreate,
                    edit: PostEdit,
                    show: PostShow,
                },
                {
                    name: "category",
                    parentName: "CMS",
                    // highlight-next-line
                    options: { route: "category" },
                    list: CategoryList,
                    create: CategoryCreate,
                    edit: CategoryEdit,
                    canDelete: true,
                },
            ]}
        />
```

:::

### Headless

If you want to create your multi-level menu without any UI framework integration, [`useMenu`](/api-reference/core/hooks/ui/useMenu.md) hook gives your resources. The `createTreeView` helper from refine core allows you to create a tree for your headless sider.

```tsx title="src/components/layout/sider/index.tsx"
//highlight-next-line
import { useMenu } from "@pankod/refine-core";

export const Sider: React.FC = () => {
    //highlight-next-line
    const { menuItems, selectedKey, defaultOpenKeys } = useMenu();

    // Here create your Sider to your UI choice
};
```

```tsx title="example output"

// console.log(menuItems);
[
    {
        name: "CMS",
        route: "CMS",
        ...
        children: [
            {
                name: "posts",
                route: "CMS/posts",
                ...
                children: [],
            },
            {
                name: "category",
                route: "CMS/category",
                ...
                children: [],
            },
        ],
    },
];
```

<br/>

### Ant Design

The Sider component allows you to create the groups you want in the sider menu. By default, the sider will group menu items by their top-level heading. However, you can also add sub menu items to each group via `parentName`.

This gives you more control over the side menu, and allows you to customize it to better suit your needs.

<div class="img-container">
    <div class="window">
        <div class="control red"></div>
        <div class="control orange"></div>
        <div class="control green"></div>
    </div>
    <img src={multiLevelMenu} alt="multiLevelMenu" />
</div>
<br />

<br/>

## Live StackBlitz Example

You can review the example to examine the multi-level menu concept in more detail.

[View Source](https://github.com/refinedev/refine/tree/master/examples/multi-level-menu)

<iframe loading="lazy" src="https://stackblitz.com/github/refinedev/refine/tree/master/examples/multi-level-menu?embed=1&view=preview&theme=dark&preset=node&ctl=1"
    style={{width: "100%", height:"80vh", border: "0px", borderRadius: "8px", overflow:"hidden"}}
    title="refine-multi-level-menu-example"
></iframe>
