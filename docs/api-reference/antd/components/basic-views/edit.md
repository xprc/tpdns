---
id: edit
title: Edit
swizzle: true
---

import pageHeaderPropsUsage from '@site/static/img/guides-and-concepts/basic-views/edit/pageHeaderPropsUsage.png'
import actionButtonsUsage from '@site/static/img/guides-and-concepts/basic-views/edit/actionButtonsUsage.png'

`<Edit>` provides us a layout for displaying the page. It does not contain any logic but adds extra functionalities like a refresh button.

We will show what `<Edit>` does using properties with examples.

```tsx live hideCode url=http://localhost:3000/posts/edit/2
const { EditButton } = RefineAntd;

interface ICategory {
    id: number;
    title: string;
}

// visible-block-start

interface IPost {
    id: number;
    title: string;
    content: string;
    status: "published" | "draft" | "rejected";
    category: { id: number };
}

import {
    Edit,
    Form,
    Input,
    Select,
    useForm,
    useSelect,
} from "@pankod/refine-antd";

const PostEdit: React.FC<IResourceComponentsProps> = () => {
    const { formProps, saveButtonProps, queryResult } = useForm<IPost>({
        warnWhenUnsavedChanges: true,
    });

    const postData = queryResult?.data?.data;
    const { selectProps: categorySelectProps } = useSelect<ICategory>({
        resource: "categories",
        defaultValue: postData?.category.id,
    });

    return (
        <Edit saveButtonProps={saveButtonProps}>
            <Form {...formProps} layout="vertical">
                <Form.Item
                    label="Title"
                    name="title"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Category"
                    name={["category", "id"]}
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Select {...categorySelectProps} />
                </Form.Item>
                <Form.Item
                    label="Status"
                    name="status"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Select
                        options={[
                            {
                                label: "Published",
                                value: "published",
                            },
                            {
                                label: "Draft",
                                value: "draft",
                            },
                            {
                                label: "Rejected",
                                value: "rejected",
                            },
                        ]}
                    />
                </Form.Item>
            </Form>
        </Edit>
    );
};
// visible-block-end

render(
    <RefineAntdDemo
        initialRoutes={["/posts/edit/2"]}
        resources={[
            {
                name: "posts",
                list: () => (
                    <div>
                        <p>This page is empty.</p>
                        <EditButton recordItemId="2">Edit Item 2</EditButton>
                    </div>
                ),
                edit: PostEdit,
            },
        ]}
    />,
);
```

:::info-tip Swizzle
You can swizzle this component to customize it with the [**refine CLI**](/docs/packages/documentation/cli)
:::

## Properties

### `title`

It allows adding titles inside the `<Edit>` component. if you don't pass title props it uses the "Edit" prefix and singular resource name by default. For example, for the "posts" resource, it will be "Edit post".

```tsx live disableScroll previewHeight=280px url=http://localhost:3000/posts/edit/2
const { EditButton } = RefineAntd;
const { default: simpleRest } = RefineSimpleRest;

const dataProvider = simpleRest("https://api.fake-rest.refine.dev");

const customDataProvider = {
    ...dataProvider,
    deleteOne: async ({ resource, id, variables }) => {
        return {
            data: {},
        };
    },
};

// visible-block-start
import { Edit } from "@pankod/refine-antd";

const PostEdit: React.FC = () => {
    return (
        /* highlight-next-line */
        <Edit title="Custom Title">
            <p>Rest of your page here</p>
        </Edit>
    );
};
// visible-block-end

render(
    <RefineAntdDemo
        initialRoutes={["/posts/edit/2"]}
        resources={[
            {
                name: "posts",
                list: () => (
                    <div>
                        <p>This page is empty.</p>
                        <EditButton recordItemId="2">Edit Item 2</EditButton>
                    </div>
                ),
                edit: PostEdit,
            },
        ]}
    />,
);
```

### `saveButtonProps`

The `<Edit>` component has a save button by default. If you want to customize this button you can use the `saveButtonProps` property like the code below.

Clicking on the save button will submit your form.

[Refer to the `<SaveButton>` documentation for detailed usage. &#8594](/api-reference/antd/components/buttons/save.md)

```tsx live disableScroll previewHeight=280px url=http://localhost:3000/posts/edit/2
const { EditButton } = RefineAntd;

// visible-block-start
import { Edit } from "@pankod/refine-antd";

const PostEdit: React.FC = () => {
    return (
        /* highlight-next-line */
        <Edit saveButtonProps={{ size: "small" }}>
            <p>Rest of your page here</p>
        </Edit>
    );
};
// visible-block-end

render(
    <RefineAntdDemo
        initialRoutes={["/posts/edit/2"]}
        resources={[
            {
                name: "posts",
                list: () => (
                    <div>
                        <p>This page is empty.</p>
                        <EditButton />
                    </div>
                ),
                edit: PostEdit,
            },
        ]}
    />,
);
```

### `canDelete` and `deleteButtonProps`

`canDelete` allows us to add the delete button inside the `<Edit>` component. If the resource has the `canDelete` property,refine adds the delete button by default. If you want to customize this button you can use the `deleteButtonProps` property like the code below.

When clicked on, the delete button executes the `useDelete` method provided by the `dataProvider`.

[Refer to the `<DeleteButton>` documentation for detailed usage. &#8594](/api-reference/antd/components/buttons/delete.md)

```tsx live disableScroll previewHeight=280px url=http://localhost:3000/posts/edit/2
const { EditButton } = RefineAntd;
const { default: simpleRest } = RefineSimpleRest;

const dataProvider = simpleRest("https://api.fake-rest.refine.dev");

const customDataProvider = {
    ...dataProvider,
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

// visible-block-start
import { Edit } from "@pankod/refine-antd";
import { usePermissions } from "@pankod/refine-core";

const PostEdit: React.FC = () => {
    const { data: permissionsData } = usePermissions();
    return (
        <Edit
            /* highlight-start */
            canDelete={permissionsData?.includes("admin")}
            deleteButtonProps={{ size: "small" }}
            /* highlight-end */
            saveButtonProps={{ size: "small" }}
        >
            <p>Rest of your page here</p>
        </Edit>
    );
};
// visible-block-end

render(
    <RefineAntdDemo
        authProvider={authProvider}
        dataProvider={customDataProvider}
        initialRoutes={["/posts/edit/2"]}
        resources={[
            {
                name: "posts",
                list: () => (
                    <div>
                        <p>This page is empty.</p>
                        <EditButton>Edit Item 2</EditButton>
                    </div>
                ),
                edit: PostEdit,
            },
        ]}
    />,
);
```

[Refer to the `usePermission` documentation for detailed usage. &#8594](/api-reference/core/hooks/auth/usePermissions.md)

### `resource`

`<Edit>` component reads the `resource` information from the route by default. This default behavior will not work on custom pages. If you want to use the `<Edit>` component in a custom page, you can use the `resource` property.

[Refer to the custom pages documentation for detailed usage. &#8594](/advanced-tutorials/custom-pages.md)

```tsx live disableScroll previewHeight=280px url=http://localhost:3000/custom/2
setInitialRoutes(["/custom/2"]);

// visible-block-start
import { Refine } from "@pankod/refine-core";
import { Edit } from "@pankod/refine-antd";
import routerProvider from "@pankod/refine-react-router-v6";
import dataProvider from "@pankod/refine-simple-rest";

const CustomPage: React.FC = () => {
    return (
        /* highlight-next-line */
        <Edit resource="posts">
            <p>Rest of your page here</p>
        </Edit>
    );
};

const App: React.FC = () => {
    return (
        <Refine
            routerProvider={{
                ...routerProvider,
                // highlight-start
                routes: [
                    {
                        element: <CustomPage />,
                        path: "/custom/:id",
                    },
                ],
                // highlight-end
            }}
            dataProvider={dataProvider("https://api.fake-rest.refine.dev")}
            resources={[{ name: "posts" }]}
        />
    );
};
// visible-block-end

render(<App />);
```

### `recordItemId`

The `<Edit>` component reads the `id` information from the route by default. `recordItemId` is used when it cannot read from the URL(when used on a custom page, modal or drawer).

```tsx live disableScroll previewHeight=280px url=http://localhost:3000/posts/edit/2
const { EditButton } = RefineAntd;

// visible-block-start
import { Edit, useModalForm, Modal, Button } from "@pankod/refine-antd";

const PostEdit: React.FC = () => {
    const { modalProps, id, show } = useModalForm({
        action: "edit",
    });

    return (
        <div>
            <Button onClick={() => show()}>Edit Button</Button>
            <Modal {...modalProps}>
                {/* highlight-next-line */}
                <Edit recordItemId={id}>
                    <p>Rest of your page here</p>
                </Edit>
            </Modal>
        </div>
    );
};
// visible-block-end

render(
    <RefineAntdDemo
        initialRoutes={["/posts/edit/2"]}
        resources={[
            {
                name: "posts",
                list: () => (
                    <div>
                        <p>This page is empty.</p>
                        <EditButton recordItemId="2">Edit Item 2</EditButton>
                    </div>
                ),
                edit: PostEdit,
            },
        ]}
    />,
);
```

:::note
The `<Edit>` component needs the `id` information for the `<RefreshButton>` to work properly.
:::

### `mutationMode`

Determines which mode mutation will have while executing `<DeleteButton>` .

[Refer to the mutation mode docs for further information. &#8594](/advanced-tutorials/mutation-mode.md)

```tsx live hideCode url=http://localhost:3000/posts/edit/2
const { EditButton } = RefineAntd;

interface ICategory {
    id: number;
    title: string;
}

// visible-block-start

interface IPost {
    id: number;
    title: string;
    content: string;
    status: "published" | "draft" | "rejected";
    category: { id: number };
}

import {
    Edit,
    Form,
    Input,
    Select,
    useForm,
    useSelect,
} from "@pankod/refine-antd";

const PostEdit: React.FC<IResourceComponentsProps> = () => {
    const { formProps, saveButtonProps, queryResult } = useForm<IPost>({
        warnWhenUnsavedChanges: true,
    });

    const postData = queryResult?.data?.data;
    const { selectProps: categorySelectProps } = useSelect<ICategory>({
        resource: "categories",
        defaultValue: postData?.category.id,
    });

    return (
        <Edit
            /* highlight-next-line */
            mutationMode="undoable"
            canDelete
            saveButtonProps={saveButtonProps}
        >
            <Form {...formProps} layout="vertical">
                <Form.Item
                    label="Title"
                    name="title"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Category"
                    name={["category", "id"]}
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Select {...categorySelectProps} />
                </Form.Item>
                <Form.Item
                    label="Status"
                    name="status"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Select
                        options={[
                            {
                                label: "Published",
                                value: "published",
                            },
                            {
                                label: "Draft",
                                value: "draft",
                            },
                            {
                                label: "Rejected",
                                value: "rejected",
                            },
                        ]}
                    />
                </Form.Item>
            </Form>
        </Edit>
    );
};
// visible-block-end

render(
    <RefineAntdDemo
        initialRoutes={["/posts/edit/2"]}
        resources={[
            {
                name: "posts",
                list: () => (
                    <div>
                        <p>This page is empty.</p>
                        <EditButton recordItemId="2">Edit Item 2</EditButton>
                    </div>
                ),
                edit: PostEdit,
            },
        ]}
    />,
);
```

### `dataProviderName`

If not specified, Refine will use the default data provider. If you have multiple data providers and want to use a different one, you can use the `dataProviderName` property.

```tsx
import { Refine } from "@pankod/refine-core";
import { Edit } from "@pankod/refine-antd";
import routerProvider from "@pankod/refine-react-router-v6";
import dataProvider from "@pankod/refine-simple-rest";

// highlight-start
const PostEdit = () => {
    return <Edit dataProviderName="other">...</Edit>;
};
// highlight-end

export const App: React.FC = () => {
    return (
        <Refine
            routerProvider={routerProvider}
            // highlight-start
            dataProvider={{
                default: dataProvider("https://api.fake-rest.refine.dev/"),
                other: dataProvider("https://other-api.fake-rest.refine.dev/"),
            }}
            // highlight-end
            resources={[{ name: "posts", edit: PostEdit }]}
        />
    );
};
```

### `goBack`

To customize the back button or to disable it, you can use the `goBack` property.

```tsx live disableScroll previewHeight=280px url=http://localhost:3000/posts/edit/2
const { EditButton } = RefineAntd;

// visible-block-start
import { Edit, Icons } from "@pankod/refine-antd";

const PostEdit: React.FC = () => {
    return (
        /* highlight-next-line */
        <Edit goBack={<Icons.SmileOutlined />}>
            <p>Rest of your page here</p>
        </Edit>
    );
};
// visible-block-end

render(
    <RefineAntdDemo
        initialRoutes={["/posts", "/posts/edit/2"]}
        resources={[
            {
                name: "posts",
                list: () => (
                    <div>
                        <p>This page is empty.</p>
                        <EditButton>Edit Item 2</EditButton>
                    </div>
                ),
                edit: PostEdit,
            },
        ]}
    />,
);
```

### `isLoading`

To toggle the loading state of the `<Edit/>` component, you can use the `isLoading` property.

```tsx live disableScroll previewHeight=280px url=http://localhost:3000/posts/edit/2
const { EditButton } = RefineAntd;

// visible-block-start
import { Edit } from "@pankod/refine-antd";

const PostEdit: React.FC = () => {
    return (
        /* highlight-next-line */
        <Edit isLoading={true}>
            <p>Rest of your page here</p>
        </Edit>
    );
};
// visible-block-end

render(
    <RefineAntdDemo
        initialRoutes={["/posts/edit/2"]}
        resources={[
            {
                name: "posts",
                list: () => (
                    <div>
                        <p>This page is empty.</p>
                        <EditButton />
                    </div>
                ),
                edit: PostEdit,
            },
        ]}
    />,
);
```

### `breadcrumb`

To customize or disable the breadcrumb, you can use the `breadcrumb` property. By default it uses the `Breadcrumb` component from `@pankod/refine-antd` package.

[Refer to the `Breadcrumb` documentation for detailed usage. &#8594](/api-reference/antd/components/breadcrumb.md)

:::tip
This feature can be managed globally via the `<Refine>` component's [options](/docs/api-reference/core/components/refine-config/#breadcrumb)
:::

```tsx live disableScroll previewHeight=280px url=http://localhost:3000/posts/edit/2
const { EditButton } = RefineAntd;

// visible-block-start
import { Edit, Breadcrumb } from "@pankod/refine-antd";

const PostEdit: React.FC = () => {
    return (
        <Edit
            // highlight-start
            breadcrumb={
                <div
                    style={{
                        padding: "3px 6px",
                        border: "2px dashed cornflowerblue",
                    }}
                >
                    <Breadcrumb />
                </div>
            }
            // highlight-end
        >
            <p>Rest of your page here</p>
        </Edit>
    );
};
// visible-block-end

render(
    <RefineAntdDemo
        initialRoutes={["/posts/edit"]}
        resources={[
            {
                name: "posts",
                list: () => (
                    <div>
                        <p>This page is empty.</p>
                        <EditButton />
                    </div>
                ),
                edit: PostEdit,
            },
        ]}
    />,
);
```

### `wrapperProps`

If you want to customize the wrapper of the `<Edit/>` component, you can use the `wrapperProps` property. For `@pankod/refine-antd` wrapper elements are simple `<div/>`s and `wrapperProps` can get every attribute that `<div/>` can get.

```tsx live disableScroll previewHeight=280px url=http://localhost:3000/posts/edit/2
const { EditButton } = RefineAntd;

// visible-block-start
import { Edit } from "@pankod/refine-antd";

const PostEdit: React.FC = () => {
    return (
        <Edit
            // highlight-start
            wrapperProps={{
                style: {
                    backgroundColor: "cornflowerblue",
                    padding: "16px",
                },
            }}
            // highlight-end
        >
            <p>Rest of your page here</p>
        </Edit>
    );
};
// visible-block-end

render(
    <RefineAntdDemo
        initialRoutes={["/posts/edit"]}
        resources={[
            {
                name: "posts",
                list: () => (
                    <div>
                        <p>This page is empty.</p>
                        <EditButton />
                    </div>
                ),
                edit: PostEdit,
            },
        ]}
    />,
);
```

### `headerProps`

If you want to customize the header of the `<Edit/>` component, you can use the `headerProps` property.

[Refer to the `PageHeader` documentation from Ant Design for detailed usage. &#8594](https://ant.design/components/page-header/)

```tsx live disableScroll previewHeight=280px url=http://localhost:3000/posts/edit/2
const { EditButton } = RefineAntd;

// visible-block-start
import { Edit } from "@pankod/refine-antd";

const PostEdit: React.FC = () => {
    return (
        <Edit
            // highlight-start
            headerProps={{
                subTitle: "This is a subtitle",
                style: {
                    backgroundColor: "cornflowerblue",
                    padding: "16px",
                },
            }}
            // highlight-end
        >
            <p>Rest of your page here</p>
        </Edit>
    );
};
// visible-block-end

render(
    <RefineAntdDemo
        initialRoutes={["/posts/edit/2"]}
        resources={[
            {
                name: "posts",
                list: () => (
                    <div>
                        <p>This page is empty.</p>
                        <EditButton />
                    </div>
                ),
                edit: PostEdit,
            },
        ]}
    />,
);
```

### `contentProps`

If you want to customize the content of the `<Edit/>` component, you can use the `contentProps` property.

[Refer to the `Card` documentation from Ant Design for detailed usage. &#8594](https://ant.design/components/card/)

```tsx live disableScroll previewHeight=280px url=http://localhost:3000/posts/edit/2
const { EditButton } = RefineAntd;

// visible-block-start
import { Edit } from "@pankod/refine-antd";

const PostEdit: React.FC = () => {
    return (
        <Edit
            // highlight-start
            contentProps={{
                style: {
                    backgroundColor: "cornflowerblue",
                    padding: "16px",
                },
            }}
            // highlight-end
        >
            <p>Rest of your page here</p>
        </Edit>
    );
};
// visible-block-end

render(
    <RefineAntdDemo
        initialRoutes={["/posts/edit"]}
        resources={[
            {
                name: "posts",
                list: () => (
                    <div>
                        <p>This page is empty.</p>
                        <EditButton />
                    </div>
                ),
                edit: PostEdit,
            },
        ]}
    />,
);
```

### `headerButtons`

You can customize the buttons at the header by using the `headerButtons` property. It accepts `React.ReactNode` or a render function `({ defaultButtons }) => React.ReactNode` which you can use to keep the existing buttons and add your own.

```tsx live disableScroll previewHeight=280px url=http://localhost:3000/posts/edit/2
const { EditButton } = RefineAntd;

// visible-block-start
import { Edit, Button } from "@pankod/refine-antd";

const PostEdit: React.FC = () => {
    return (
        <Edit
            // highlight-start
            headerButtons={({ defaultButtons }) => (
                <>
                    {defaultButtons}
                    <Button type="primary">Custom Button</Button>
                </>
            )}
            // highlight-end
        >
            <p>Rest of your page here</p>
        </Edit>
    );
};
// visible-block-end

render(
    <RefineAntdDemo
        initialRoutes={["/posts/edit/2"]}
        resources={[
            {
                name: "posts",
                list: () => (
                    <div>
                        <p>This page is empty.</p>
                        <EditButton />
                    </div>
                ),
                edit: PostEdit,
            },
        ]}
    />,
);
```

### `headerButtonProps`

You can customize the wrapper element of the buttons at the header by using the `headerButtonProps` property.

[Refer to the `Space` documentation from Ant Design for detailed usage. &#8594](https://ant.design/components/space/)

```tsx live disableScroll previewHeight=280px url=http://localhost:3000/posts/edit/2
const { EditButton } = RefineAntd;

// visible-block-start
import { Edit, Button } from "@pankod/refine-antd";

const PostEdit: React.FC = () => {
    return (
        <Edit
            // highlight-start
            headerButtonProps={{
                style: {
                    backgroundColor: "cornflowerblue",
                    padding: "16px",
                },
            }}
            // highlight-end
            headerButtons={<Button type="primary">Custom Button</Button>}
        >
            <p>Rest of your page here</p>
        </Edit>
    );
};
// visible-block-end

render(
    <RefineAntdDemo
        initialRoutes={["/posts/edit"]}
        resources={[
            {
                name: "posts",
                list: () => (
                    <div>
                        <p>This page is empty.</p>
                        <EditButton />
                    </div>
                ),
                edit: PostEdit,
            },
        ]}
    />,
);
```

### `footerButtons`

You can customize the buttons at the footer by using the `footerButtons` property. It accepts `React.ReactNode` or a render function `({ defaultButtons }) => React.ReactNode` which you can use to keep the existing buttons and add your own.

```tsx live disableScroll previewHeight=280px url=http://localhost:3000/posts/edit/2
const { EditButton } = RefineAntd;

// visible-block-start
import { Edit, Button } from "@pankod/refine-antd";

const PostEdit: React.FC = () => {
    return (
        <Edit
            // highlight-start
            footerButtons={({ defaultButtons }) => (
                <>
                    {defaultButtons}
                    <Button type="primary">Custom Button</Button>
                </>
            )}
            // highlight-end
        >
            <p>Rest of your page here</p>
        </Edit>
    );
};
// visible-block-end

render(
    <RefineAntdDemo
        initialRoutes={["/posts/edit"]}
        resources={[
            {
                name: "posts",
                list: () => (
                    <div>
                        <p>This page is empty.</p>
                        <EditButton />
                    </div>
                ),
                edit: PostEdit,
            },
        ]}
    />,
);
```

### `footerButtonProps`

You can customize the wrapper element of the buttons at the footer by using the `footerButtonProps` property.

[Refer to the `Space` documentation from Ant Design for detailed usage. &#8594](https://ant.design/components/space/)

```tsx live disableScroll previewHeight=280px url=http://localhost:3000/posts/edit/2
const { EditButton } = RefineAntd;

// visible-block-start
import { Edit, Button } from "@pankod/refine-antd";

const PostEdit: React.FC = () => {
    return (
        <Edit
            // highlight-start
            footerButtonProps={{
                style: {
                    // hide-start
                    float: "right",
                    marginRight: 24,
                    // hide-end
                    backgroundColor: "cornflowerblue",
                    padding: "16px",
                },
            }}
            // highlight-end
        >
            <p>Rest of your page here</p>
        </Edit>
    );
};
// visible-block-end

render(
    <RefineAntdDemo
        initialRoutes={["/posts/edit"]}
        resources={[
            {
                name: "posts",
                list: () => (
                    <div>
                        <p>This page is empty.</p>
                        <EditButton />
                    </div>
                ),
                edit: PostEdit,
            },
        ]}
    />,
);
```

### ~~`actionButtons`~~

:::caution Deprecated
Use `headerButtons` or `footerButtons` instead.
:::

`<Edit>` uses the Ant Design [`<Card>`](https://ant.design/components/card) component. The `action` property of the `<Card>` component shows `<SaveButton>` or `<DeleteButton>` based on your resource definition in the `resources` property you pass to `<Refine>`. If you want to use other things instead of these buttons, you can use the `actionButton` property like the code below.

```tsx
import { Edit, Button } from "@pankod/refine-antd";

export const EditPage: React.FC = () => {
    return (
        <Edit
            actionButtons={
                <>
                    <Button type="primary">Custom Button 1</Button>
                    <Button size="small">Custom Button 2</Button>
                </>
            }
        >
            ...
        </Edit>
    );
};
```

<br/>
<div class="img-container">
    <div class="window">
        <div class="control red"></div>
        <div class="control orange"></div>
        <div class="control green"></div>
    </div>
    <img src={actionButtonsUsage} alt="actionButton Usage" />
</div>
<br/>

### ~~`pageHeaderProps`~~

:::caution Deprecated
Use `headerProps`, `wrapperProps` or `contentProps` instead.
:::

`<Edit>` uses the Ant Design [`<PageHeader>`](https://ant.design/components/page-header/#API) components, which means that you can customize the properties of `pageHeaderProps`.

By default, the `extra` property of the `<PageHeader>` component shows `<RefreshButton>` or `<ListButton>` based on your resource definition in the `resources` property you pass to `<Refine>` and the `breadcrumb` property shows [`<Breadcrumb>`][breadcrumb-component] component.

```tsx
import { Edit } from "@pankod/refine-antd";

export const EditPage: React.FC = () => {
    return (
        <Edit
            pageHeaderProps={{
                onBack: () => console.log("Hello, refine"),
                subTitle: "Subtitle",
            }}
        >
            ...
        </Edit>
    );
};
```

<br/>
<div class="img-container">
    <div class="window">
        <div class="control red"></div>
        <div class="control orange"></div>
        <div class="control green"></div>
    </div>
    <img src={pageHeaderPropsUsage} alt="pageHeaderProps Usage"/>
</div>
<br/>

:::caution
`<Edit>` component needs the `id` information for work properly so if you use the `<Edit>` component in custom pages, you should pass the `recordItemId` property.
:::

## API Reference
### Properties

<PropsTable module="@pankod/refine-antd/Edit" 
contentProps-type="[`CardProps`](https://ant.design/components/card/#API)"
headerProps-type="[`PageHeaderProps`](https://ant.design/components/page-header/#API)"
headerButtons-default="[`ListButton`](https://refine.dev/docs/api-reference/antd/components/buttons/list-button/) and [`RefreshButton`](https://refine.dev/docs/api-reference/antd/components/buttons/refresh-button/)"
headerButtonProps-type="[`SpaceProps`](https://ant.design/components/space/)"
deleteButtonProps-type="[`DeleteButtonProps`](/docs/api-reference/antd/components/buttons/delete-button/)"
saveButtonProps-type="[`SaveButtonProps`](https://refine.dev/docs/api-reference/antd/components/buttons/save-button/)"
footerButtons-default="[`SaveButton`](https://refine.dev/docs/api-reference/antd/components/buttons/save-button/) and [`DeleteButton`](https://refine.dev/docs/api-reference/antd/components/buttons/delete-button/)"
footerButtonsProps-type="[`SpaceProps`](https://ant.design/components/space/)"
breadcrumb-default="[`<Breadcrumb>`](https://ant.design/components/breadcrumb/)"
goBack-default="`<ArrowLeft />`" 
goBack-type="`ReactNode`"
/>

> `*`: These properties have default values in `RefineContext` and can also be set on the **<[Refine](/api-reference/core/components/refine-config.md)>** component.

[breadcrumb-component]: /api-reference/antd/components/breadcrumb.md
