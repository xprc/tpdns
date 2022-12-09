---
id: list
title: List
swizzle: true
---

```tsx live shared
setRefineProps({
    notificationProvider: RefineMantine.notificationProvider,
    Layout: RefineMantine.Layout,
    Sider: () => null,
});

const Wrapper = ({ children }) => {
    return (
        <RefineMantine.MantineProvider
            theme={RefineMantine.LightTheme}
            withNormalizeCSS
            withGlobalStyles
        >
            <RefineMantine.Global
                styles={{ body: { WebkitFontSmoothing: "auto" } }}
            />
            <RefineMantine.NotificationsProvider position="top-right">
                {children}
            </RefineMantine.NotificationsProvider>
        </RefineMantine.MantineProvider>
    );
};

interface ICategory {
    id: number;
    title: string;
}

interface IPost {
    id: number;
    title: string;
    content: string;
    status: "published" | "draft" | "rejected";
    category: { id: number };
}
```

`<List>` provides us a layout to display the page. It does not contain any logic but adds extra functionalities like a create button or giving the page titles.

We will show what `<List>` does using properties with examples.

```tsx live url=http://localhost:3000/posts previewHeight=420px hideCode
setInitialRoutes(["/posts"]);
import { Refine } from "@pankod/refine-core";
import routerProvider from "@pankod/refine-react-router-v6";
import dataProvider from "@pankod/refine-simple-rest";

// visible-block-start
import { List, DateField, Table, Pagination } from "@pankod/refine-mantine";
import { useTable, ColumnDef, flexRender } from "@pankod/refine-react-table";

const PostList: React.FC = () => {
    const columns = React.useMemo<ColumnDef<IPost>[]>(
        () => [
            {
                id: "id",
                header: "ID",
                accessorKey: "id",
            },
            {
                id: "title",
                header: "Title",
                accessorKey: "title",
            },
            {
                id: "status",
                header: "Status",
                accessorKey: "status",
            },
            {
                id: "createdAt",
                header: "Created At",
                accessorKey: "createdAt",
                cell: function render({ getValue }) {
                    return (
                        <DateField value={getValue() as string} format="LLL" />
                    );
                },
            },
        ],
        [],
    );

    const {
        getHeaderGroups,
        getRowModel,
        refineCore: { setCurrent, pageCount, current },
    } = useTable({
        columns,
    });

    return (
        <List>
            <Table>
                <thead>
                    {getHeaderGroups().map((headerGroup) => (
                        <tr key={headerGroup.id}>
                            {headerGroup.headers.map((header) => (
                                <th key={header.id}>
                                    {header.isPlaceholder
                                        ? null
                                        : flexRender(
                                              header.column.columnDef.header,
                                              header.getContext(),
                                          )}
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody>
                    {getRowModel().rows.map((row) => (
                        <tr key={row.id}>
                            {row.getVisibleCells().map((cell) => (
                                <td key={cell.id}>
                                    {flexRender(
                                        cell.column.columnDef.cell,
                                        cell.getContext(),
                                    )}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </Table>
            <br />
            <Pagination
                position="right"
                total={pageCount}
                page={current}
                onChange={setCurrent}
            />
        </List>
    );
};
// visible-block-end

const App = () => {
    return (
        <Refine
            routerProvider={routerProvider}
            dataProvider={dataProvider("https://api.fake-rest.refine.dev")}
            resources={[
                {
                    name: "posts",
                    list: PostList,
                },
            ]}
        />
    );
};
render(
    <Wrapper>
        <App />
    </Wrapper>,
);
```

:::info-tip Swizzle
You can swizzle this component to customize it with the [**refine CLI**](/docs/packages/documentation/cli)
:::

## Properties

### `title`

It allows adding a title for the `<List>` component. if you don't pass title props, it uses plural form of resource name by default.

```tsx live url=http://localhost:3000/posts previewHeight=280px
setInitialRoutes(["/posts"]);
import { Refine } from "@pankod/refine-core";
import routerProvider from "@pankod/refine-react-router-v6";
import dataProvider from "@pankod/refine-simple-rest";

// visible-block-start
import { List, Title } from "@pankod/refine-mantine";

const PostList: React.FC = () => {
    return (
        /* highlight-next-line */
        <List title={<Title order={3}>Custom Title</Title>}>
            <p>Rest of your page here</p>
        </List>
    );
};
// visible-block-end

const App = () => {
    return (
        <Refine
            routerProvider={routerProvider}
            dataProvider={dataProvider("https://api.fake-rest.refine.dev")}
            resources={[
                {
                    name: "posts",
                    list: PostList,
                },
            ]}
        />
    );
};
render(
    <Wrapper>
        <App />
    </Wrapper>,
);
```

### `resource`

`<List>` component reads the `resource` information from the route by default. This default behavior will not work on custom pages. If you want to use the `<List>` component in a custom page, you can use the `resource` prop.

[Refer to the custom pages documentation for detailed usage. &#8594](/advanced-tutorials/custom-pages.md)

```tsx live url=http://localhost:3000/custom previewHeight=280px
setInitialRoutes(["/custom"]);

// visible-block-start
import { Refine } from "@pankod/refine-core";
import { List, Layout } from "@pankod/refine-mantine";
import routerProvider from "@pankod/refine-react-router-v6";
import dataProvider from "@pankod/refine-simple-rest";

const CustomPage: React.FC = () => {
    return (
        /* highlight-next-line */
        <List resource="categories">
            <p>Rest of your page here</p>
        </List>
    );
};
// visible-block-end

const App = () => {
    return (
        <Refine
            routerProvider={{
                ...routerProvider,
                // highlight-start
                routes: [
                    {
                        element: <CustomPage />,
                        path: "/custom",
                    },
                ],
                // highlight-end
            }}
            Layout={Layout}
            dataProvider={dataProvider("https://api.fake-rest.refine.dev")}
            resources={[{ name: "posts" }]}
        />
    );
};
render(
    <Wrapper>
        <App />
    </Wrapper>,
);
```

### `canCreate` and `createButtonProps`

`canCreate` allows us to add the create button inside the `<List>` component. If resource is passed a create component, **refine** adds the create button by default. If you want to customize this button you can use `createButtonProps` property like the code below.

Create button redirects to the create page of the resource according to the value it reads from the URL.

```tsx live url=http://localhost:3000/posts previewHeight=280px
setInitialRoutes(["/posts"]);
import { Refine } from "@pankod/refine-core";
import routerProvider from "@pankod/refine-react-router-v6";
import dataProvider from "@pankod/refine-simple-rest";

// visible-block-start
import { List } from "@pankod/refine-mantine";
import { usePermissions } from "@pankod/refine-core";

const PostList: React.FC = () => {
    const { data: permissionsData } = usePermissions();
    return (
        <List
            /* highlight-start */
            canCreate={permissionsData?.includes("admin")}
            createButtonProps={{ variant: "subtle" }}
            /* highlight-end */
        >
            <p>Rest of your page here</p>
        </List>
    );
};
// visible-block-end

const App = () => {
    const simpleRestDataProvider = dataProvider(
        "https://api.fake-rest.refine.dev",
    );

    const customDataProvider = {
        ...simpleRestDataProvider,
        deleteOne: async ({ resource, id, variables }) => {
            return {
                data: {},
            };
        },
    };

    const authProvider = {
        login: () => Promise.resolve(),
        logout: () => Promise.resolve(),
        checkAuth: () => Promise.resolve(),
        checkError: () => Promise.resolve(),
        getPermissions: () => Promise.resolve("admin"),
        getUserIdentity: () => Promise.resolve(),
    };

    return (
        <Refine
            routerProvider={routerProvider}
            dataProvider={customDataProvider}
            authProvider={authProvider}
            resources={[
                {
                    name: "posts",
                    list: PostList,
                },
            ]}
        />
    );
};
render(
    <Wrapper>
        <App />
    </Wrapper>,
);
```

### `breadcrumb`

To customize or disable the breadcrumb, you can use the `breadcrumb` property. By default it uses the `Breadcrumb` component from `@pankod/refine-mantine` package.

[Refer to the `Breadcrumb` documentation for detailed usage. &#8594](/api-reference/mantine/components/breadcrumb.md)

:::tip
This feature can be managed globally via the `<Refine>` component's [options](/docs/api-reference/core/components/refine-config/#breadcrumb)
:::

```tsx live url=http://localhost:3000/posts previewHeight=280px
setInitialRoutes(["/posts"]);
import { Refine } from "@pankod/refine-core";
import routerProvider from "@pankod/refine-react-router-v6";
import dataProvider from "@pankod/refine-simple-rest";

// visible-block-start
import { List } from "@pankod/refine-mantine";

const CustomBreadcrumb: React.FC = () => {
    return (
        <p
            style={{
                padding: "3px 6px",
                border: "2px dashed cornflowerblue",
            }}
        >
            My Custom Breadcrumb
        </p>
    );
};

const PostList: React.FC = () => {
    return (
        <List
            // highlight-start
            breadcrumb={<CustomBreadcrumb />}
            // highlight-end
        >
            <p>Rest of your page here</p>
        </List>
    );
};
// visible-block-end

const App = () => {
    return (
        <Refine
            routerProvider={routerProvider}
            dataProvider={dataProvider("https://api.fake-rest.refine.dev")}
            resources={[
                {
                    name: "posts",
                    list: PostList,
                },
            ]}
        />
    );
};
render(
    <Wrapper>
        <App />
    </Wrapper>,
);
```

### `wrapperProps`

If you want to customize the wrapper of the `<List/>` component, you can use the `wrapperProps` property. For `@pankod/refine-mantine` wrapper element is `<Card>`s and `wrapperProps` can get every attribute that `<Card>` can get.

[Refer to the `Card` documentation from Mantine for detailed usage. &#8594](https://mantine.dev/core/card/)

```tsx live url=http://localhost:3000/posts previewHeight=280px
setInitialRoutes(["/posts"]);
import { Refine } from "@pankod/refine-core";
import routerProvider from "@pankod/refine-react-router-v6";
import dataProvider from "@pankod/refine-simple-rest";

// visible-block-start
import { List } from "@pankod/refine-mantine";

const PostList: React.FC = () => {
    return (
        <List
            // highlight-start
            wrapperProps={{
                style: {
                    border: "2px dashed cornflowerblue",
                    padding: "16px",
                },
            }}
            // highlight-end
        >
            <p>Rest of your page here</p>
        </List>
    );
};
// visible-block-end

const App = () => {
    return (
        <Refine
            routerProvider={routerProvider}
            dataProvider={dataProvider("https://api.fake-rest.refine.dev")}
            resources={[
                {
                    name: "posts",
                    list: PostList,
                },
            ]}
        />
    );
};
render(
    <Wrapper>
        <App />
    </Wrapper>,
);
```

### `headerProps`

If you want to customize the header of the `<List/>` component, you can use the `headerProps` property.

[Refer to the `Group` documentation from Mantine for detailed usage. &#8594](https://mantine.dev/core/group/)

```tsx live url=http://localhost:3000/posts previewHeight=280px
setInitialRoutes(["/posts"]);
import { Refine } from "@pankod/refine-core";
import routerProvider from "@pankod/refine-react-router-v6";
import dataProvider from "@pankod/refine-simple-rest";

// visible-block-start
import { List } from "@pankod/refine-mantine";

const PostList: React.FC = () => {
    return (
        <List
            // highlight-start
            headerProps={{
                style: {
                    border: "2px dashed cornflowerblue",
                    padding: "16px",
                },
            }}
            // highlight-end
        >
            <p>Rest of your page here</p>
        </List>
    );
};
// visible-block-end

const App = () => {
    return (
        <Refine
            routerProvider={routerProvider}
            dataProvider={dataProvider("https://api.fake-rest.refine.dev")}
            resources={[
                {
                    name: "posts",
                    list: PostList,
                },
            ]}
        />
    );
};
render(
    <Wrapper>
        <App />
    </Wrapper>,
);
```

### `contentProps`

If you want to customize the content of the `<List/>` component, you can use the `contentProps` property.

[Refer to the `Box` documentation from Mantine for detailed usage. &#8594](https://mantine.dev/core/box/)

```tsx live url=http://localhost:3000/posts previewHeight=280px
setInitialRoutes(["/posts"]);
import { Refine } from "@pankod/refine-core";
import routerProvider from "@pankod/refine-react-router-v6";
import dataProvider from "@pankod/refine-simple-rest";

// visible-block-start
import { List } from "@pankod/refine-mantine";

const PostList: React.FC = () => {
    return (
        <List
            // highlight-start
            contentProps={{
                style: {
                    border: "2px dashed cornflowerblue",
                    padding: "16px",
                },
            }}
            // highlight-end
        >
            <p>Rest of your page here</p>
        </List>
    );
};
// visible-block-end

const App = () => {
    return (
        <Refine
            routerProvider={routerProvider}
            dataProvider={dataProvider("https://api.fake-rest.refine.dev")}
            resources={[
                {
                    name: "posts",
                    list: PostList,
                },
            ]}
        />
    );
};
render(
    <Wrapper>
        <App />
    </Wrapper>,
);
```

### `headerButtons`

You can customize the buttons at the header by using the `headerButtons` property. It accepts `React.ReactNode` or a render function `({ defaultButtons }) => React.ReactNode` which you can use to keep the existing buttons and add your own.

```tsx live url=http://localhost:3000/posts previewHeight=280px
setInitialRoutes(["/posts"]);
import { Refine } from "@pankod/refine-core";
import routerProvider from "@pankod/refine-react-router-v6";
import dataProvider from "@pankod/refine-simple-rest";

// visible-block-start
import { List, Button } from "@pankod/refine-mantine";

const PostList: React.FC = () => {
    return (
        <List
            // highlight-start
            headerButtons={({ defaultButtons }) => (
                <>
                    {defaultButtons}
                    <Button variant="outline" type="primary">
                        Custom Button
                    </Button>
                </>
            )}
            // highlight-end
        >
            <p>Rest of your page here</p>
        </List>
    );
};
// visible-block-end

const App = () => {
    return (
        <Refine
            routerProvider={routerProvider}
            dataProvider={dataProvider("https://api.fake-rest.refine.dev")}
            resources={[
                {
                    name: "posts",
                    list: PostList,
                },
            ]}
        />
    );
};
render(
    <Wrapper>
        <App />
    </Wrapper>,
);
```

### `headerButtonProps`

You can customize the wrapper element of the buttons at the header by using the `headerButtonProps` property.

[Refer to the `Group` documentation from Mantine for detailed usage. &#8594](https://mantine.dev/core/group/)

```tsx live url=http://localhost:3000/posts previewHeight=280px
setInitialRoutes(["/posts"]);
import { Refine } from "@pankod/refine-core";
import routerProvider from "@pankod/refine-react-router-v6";
import dataProvider from "@pankod/refine-simple-rest";

// visible-block-start
import { List, Button } from "@pankod/refine-mantine";

const PostList: React.FC = () => {
    return (
        <List
            // highlight-start
            headerButtonProps={{
                style: {
                    border: "2px dashed cornflowerblue",
                    padding: "16px",
                },
            }}
            // highlight-end
            headerButtons={
                <Button variant="outline" type="primary">
                    Custom Button
                </Button>
            }
        >
            <p>Rest of your page here</p>
        </List>
    );
};
// visible-block-end

const App = () => {
    return (
        <Refine
            routerProvider={routerProvider}
            dataProvider={dataProvider("https://api.fake-rest.refine.dev")}
            resources={[
                {
                    name: "posts",
                    list: PostList,
                },
            ]}
        />
    );
};
render(
    <Wrapper>
        <App />
    </Wrapper>,
);
```

## API Reference

### Props

<PropsTable module="@pankod/refine-mantine/List" title-default="`<Title order={3}>{resource.name}</Title>`" />
