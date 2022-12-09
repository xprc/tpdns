---
id: edit-button
title: Edit
---

import editButton from '@site/static/img/guides-and-concepts/components/buttons/edit/edit.png';

`<EditButton>` uses Ant Design's [`<Button>`](https://ant.design/components/button/) component. It uses the `edit` method from [`useNavigation`](/api-references/hooks/navigation/useNavigation.md) under the hood. It can be useful when redirecting the app to the edit page with the record id route of resource.

## Usage

```tsx
import {
    List,
    Table,
    useTable,
    // highlight-next-line
    EditButton,
} from "@pankod/refine";

export const PostList: React.FC = () => {
    const { tableProps } = useTable<IPost>();

    return (
        <List>
            <Table {...tableProps} rowKey="id">
                <Table.Column dataIndex="id" title="ID" />
                <Table.Column dataIndex="title" title="Title" />
                <Table.Column<IPost>
                    title="Actions"
                    dataIndex="actions"
                    key="actions"
                    render={(_, record) => (
                        // highlight-next-line
                        <EditButton size="small" recordItemId={record.id} />
                    )}
                />
            </Table>
        </List>
    );
};

interface IPost {
    id: string;
    title: string;
}
```

Will look like this:

<div class="img-container">
    <div class="window">
        <div class="control red"></div>
        <div class="control orange"></div>
        <div class="control green"></div>
    </div>
    <img src={editButton} alt="Default edit button" />
</div>

## Properties

### `recordItemId`

`recordItemId` is used to append the record id to the end of the route path.

```tsx 
import { EditButton } from "@pankod/refine";

export const MyEditComponent = () => {
    return <EditButton resourceName="posts" recordItemId="1" />;
};
```

Clicking the button will trigger the `edit` method of [`useNavigation`](/api-references/hooks/navigation/useNavigation.md) and then redirect the app to `/posts/edit/1`.

:::note
`<EditButton>` component reads the id information from the route by default.
:::

### `resourceName`

Redirection endpoint(`resourceName/edit`) is defined by `resourceName` property. By default, `<EditButton>` uses `name` property of the resource object as an endpoint to redirect after clicking.

```tsx 
import { EditButton } from "@pankod/refine";

export const MyEditComponent = () => {
    return <EditButton resourceName="categories" recordItemId="2" />;
};
```

Clicking the button will trigger the `edit` method of [`useNavigation`](/api-references/hooks/navigation/useNavigation.md) and then redirect the app to `/categories/edit/2`.

### `hideText`

It is used to show and not show the text of the button. When `true`, only the button icon is visible.

```tsx 
import { EditButton } from "@pankod/refine";

export const MyEditComponent = () => {
    return <EditButton hideText />;
};
```

### `ignoreAccessControlProvider`

It is used to skip access control for the button so that it doesn't check for access control. This is relevant only when an [`accessControlProvider`](/api-references/providers/accessControl-provider.md) is provided to [`<Refine/>`](/api-references/components/refine-config.md)

```tsx 
import { EditButton } from "@pankod/refine";

export const MyListComponent = () => {
    return <EditButton ignoreAccessControlProvider />;
};
```

## API Reference

### Properties

| Property                    | Description                                      | Type                                                                                                                                 | Default                                                          |
| --------------------------- | ------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------ | ---------------------------------------------------------------- |
| props                       | Ant Design button properties                     | [`ButtonProps`](https://ant.design/components/button/#API) & `{ resourceName?: string; recordItemId?: string; hideText?: boolean; }` |                                                                  |
| resourceName                | Determines which resource to use for redirection | `string`                                                                                                                             | Resource name that it reads from route                           |
| recordItemId                | Adds `id` to the end of the URL                  | `string`                                                                                                                             | Record id that it reads from route                               |
| hideText                    | Allows to hide button text                       | `boolean`                                                                                                                            | `false`                                                          |
| ignoreAccessControlProvider | Skip access control                              | `boolean`                                                                                                                            | `false`                                                          |
| children                    | Sets the button text                             | `ReactNode`                                                                                                                          | `"Edit"`                                                         |
| icon                        | Sets the icon component of button                | `ReactNode`                                                                                                                          | [`<EditOutlined />`](https://ant.design/components/icon/)        |
| onClick                     | Sets the handler to handle click event           | `(event) => void`                                                                                                                    | Triggers navigation for redirection to the edit page of resource |
