---
id: useTable
title: useTable
---

import tableSorting from '@site/static/img/hooks/useTable/table-sorting.gif';
import filters from '@site/static/img/hooks/useTable/filters.gif';

By using useTable, you are able to get properties that are compatible with Ant Design [`<Table>`](https://ant.design/components/table/) component. All features such as sorting, filtering and pagination comes as out of box.

## Basic usage

Lets say that the data we are going to show on the table came like this from the endpoint:

```json title="https://api.fake-rest.refine.dev/posts"
[
    {
        "id": 182,
        "title": "A aspernatur rerum molestiae.",
        "content": "Natus molestias incidunt voluptatibus. Libero delectus facilis...",
        "status": "published"
    },
    {
        "id": 989,
        "title": "A molestiae vel voluptatem enim.",
        "content": "Voluptas consequatur quia beatae. Ipsa est qui culpa deleniti...",
        "status": "draft",
        "createdAt": "2020-01-28T02:57:58.892Z"
    }
]
```

If we want to make a sorting page where we show the `id`, `title` and `content` values:

```tsx title="/src/pages/posts/list.tsx"
import { List, Table, TextField, useTable } from "@pankod/refine-antd";

export const PostList: React.FC = () => {
    // highlight-next-line
    const { tableProps } = useTable<IPost>();

    return (
        <List>
            // highlight-start
            <Table {...tableProps} rowKey="id">
                <Table.Column dataIndex="id" title="ID" />
                <Table.Column dataIndex="title" title="Title" />
                <Table.Column dataIndex="content" title="Content" />
            </Table>
            // highlight-end
        </List>
    );
};

interface IPost {
    id: number;
    title: string;
    content: string;
    status: "published" | "draft" | "rejected";
}
```

:::tip
In a page in resource given to `<Refine>` component, `useTable` decides which sources are going to be shown automatically.
If you want to show the data that comes from the endpoint of another `resource` . You can do so with the `resource: string` option in the option object that the `useTable(options)` hook takes.
If the `resource` option is given, `syncWithLocation` will not work.

`useTable` uses `useMany` while pulling data from the given resource.
:::

## Listing

<br />

:::info
If you want to make a change in the pagination of the `<Table>`. You should pass the pagination object of the `tableProps` to the pagination property of the `<Table>` as below.

```tsx
const { tableProps } = useTable<IPost>();

<Table
    {...tableProps}
    rowKey="id"
    // highlight-start
    pagination={{
        ...tableProps.pagination,
        position: ["bottomCenter"],
        size: "small",
    }}
    // highlight-end
>
    ...
</Table>;
```

:::

:::info
To disable pagination, you can set `hasPagination` property to `false` which is `true` by default. If `hasPagination` has set to `false`, pagination elements will be hidden in the `<Table/>`. If you want to handle the pagination on the client-side you can override the `pagination` property in `tableProps`.
:::

## Sorting

If we want to give a column the sorting property, the corresponding `<Table.Column>` component must be given the [sorter](https://ant.design/components/table/#components-table-demo-head) property.

```tsx title="/src/pages/posts/list.tsx"
import {
    List,
    Table,
    TextField,
    useTable,
    // highlight-next-line
    getDefaultSortOrder,
} from "@pankod/refine-antd";

export const PostList: React.FC = () => {
    // highlight-next-line
    const { tableProps, sorter } = useTable<IPost>();

    return (
        <List>
            <Table {...tableProps} rowKey="id">
                <Table.Column
                    dataIndex="id"
                    title="ID"
                    render={(value) => <TextField value={value} />}
                    // highlight-start
                    sorter
                    defaultSortOrder={getDefaultSortOrder("id", sorter)}
                    // highlight-end
                />
                <Table.Column
                    dataIndex="title"
                    title="Title"
                    render={(value) => <TextField value={value} />}
                    // highlight-start
                    sorter={{ multiple: 1 }}
                    defaultSortOrder={getDefaultSortOrder("title", sorter)}
                    // highlight-end
                />
                <Table.Column dataIndex="content" title="Content" />
            </Table>
        </List>
    );
};
```

:::caution

During the sorting process, the `key` property of your `<Column />` component is used as the property name in the API request. If your Column component does not have a `key` value, the `dataIndex` property is used.
It can be used when your DataIndex and your sorting key are different.

:::

:::tip
When using multiple sorting, `multiple` value we had given to the `sorter` property specifies the priority of this column in sorting.
:::

<div class="img-container">
    <div class="window">
        <div class="control red"></div>
        <div class="control orange"></div>
        <div class="control green"></div>
    </div>
    <img src={tableSorting} alt="Table sorting in action" />
</div>

### Initial sort status

```ts title="/src/pages/posts/list.tsx"
const { tableProps, sorter } = useTable<IPost>({
    // highlight-start
    initialSorter: [
        {
            field: "title",
            order: "asc",
        },
    ],
    // highlight-end
});
```

By using `initialSorter` setting, you can select which `field` is going to start with which sorting status (`"asc"` or `"desc"`).

:::caution
If you're using the `initialSorter`, don't forget to add `getDefaultSortOrder` to your `<Table.Column>` component. Otherwise, during filter and paging operations, the `initialSorter` might be lost.

```tsx
...
<Table.Column
    dataIndex="title"
    title="Title"
    sorter={{ multiple: 2 }}
    // highlight-next-line
    defaultSortOrder={getDefaultSortOrder("title", sorter)}
/>
...
```

:::

## Filtering

Every `post` that comes from endpoint has a `status` value. This value can either be `published` or `draft`. We can show the `status` value with a Ant Design `<TagField>`:

```tsx title="/src/pages/posts/list.tsx"
...
<Table.Column
    dataIndex="status"
    title="Status"
    render={(value) => <TagField value={value} />}
/>
...
```

We can use the `filterDropdown` property to make filtering based on the `status` value. In order to do this, we need to put the filtering form inside the `<FilterDropdown>` component and pass the properties coming to the function to these component's properties:

```tsx title="/src/pages/posts/list.tsx"
import {
    List,
    Table,
    // highlight-start
    Radio,
    FilterDropdown,
    // highlight-end
    TagField,
    useTable,
    getDefaultSortOrder,
} from "@pankod/refine-antd";

export const PostList: React.FC = () => {
    const { tableProps, sorter } = useTable<IPost>({
        initialSorter: [
            {
                field: "title",
                order: "asc",
            },
        ],
    });

    return (
        <List>
            <Table {...tableProps} rowKey="id">
                <Table.Column dataIndex="id" title="ID" sorter />
                <Table.Column
                    dataIndex="title"
                    title="Title"
                    sorter={{ multiple: 2 }}
                    defaultSortOrder={getDefaultSortOrder("title", sorter)}
                />
                <Table.Column
                    dataIndex="content"
                    title="Content"
                    sorter={{ multiple: 1 }}
                />
                <Table.Column
                    dataIndex="status"
                    title="Status"
                    render={(value) => <TagField value={value} />}
                    // highlight-start
                    filterDropdown={(props) => (
                        <FilterDropdown {...props}>
                            <Radio.Group>
                                <Radio value="published">Published</Radio>
                                <Radio value="draft">Draft</Radio>
                                <Radio value="rejected">Rejected</Radio>
                            </Radio.Group>
                        </FilterDropdown>
                    )}
                    // highlight-end
                />
            </Table>
        </List>
    );
};
```

<div class="img-container">
    <div class="window">
        <div class="control red"></div>
        <div class="control orange"></div>
        <div class="control green"></div>
    </div>
    <img src={filters} alt="Table filtering in action" />
</div>

### Default filter value

In order to set a default filter value, you can use the `initialFilter` option of the `useTable(options)` hook.

```ts title="/src/pages/posts/list.tsx"
const { tableProps, sorter, filters } = useTable<IPost>({
    initialSorter: [
        {
            field: "title",
            order: "asc",
        },
    ],
    initialFilter: [
        {
            field: "status",
            operator: "eq",
            value: "draft",
        },
    ],
});
```

If you give default filter values, `defaultFilteredValue` property needs to be properly given to the relevant `<Table.Column>` components so that those filter fields come with default values when the page is opened.

```tsx title="/src/pages/posts/list.tsx"
// highlight-next-line
import { getDefaultFilter } from "@pankod/refine-core";
import {
    List,
    Table,
    Radio,
    FilterDropdown,
    TagField,
    useTable,
    getDefaultSortOrder,
} from "@pankod/refine-antd";

export const PostList: React.FC = () => {
    const { tableProps, sorter, filters } = useTable<IPost>({
        initialSorter: [
            {
                field: "title",
                order: "asc",
            },
        ],
        // highlight-start
        initialFilter: [
            {
                field: "status",
                operator: "eq",
                value: "draft",
            },
        ],
        // highlight-end
    });

    return (
        <List>
            <Table {...tableProps} rowKey="id">
                <Table.Column dataIndex="id" title="ID" sorter />
                <Table.Column
                    dataIndex="title"
                    title="Title"
                    sorter={{ multiple: 2 }}
                    defaultSortOrder={getDefaultSortOrder("title", sorter)}
                />
                <Table.Column
                    dataIndex="content"
                    title="Content"
                    sorter={{ multiple: 1 }}
                />
                <Table.Column
                    dataIndex="status"
                    title="Status"
                    render={(value) => <TagField value={value} />}
                    filterDropdown={(props) => (
                        <FilterDropdown {...props}>
                            <Radio.Group>
                                <Radio value="published">Published</Radio>
                                <Radio value="draft">Draft</Radio>
                                <Radio value="rejected">Rejected</Radio>
                            </Radio.Group>
                        </FilterDropdown>
                    )}
                    // highlight-next-line
                    defaultFilteredValue={getDefaultFilter("status", filters)}
                />
            </Table>
        </List>
    );
};
```

:::tip
Filters we give to `initialFilter` are default filters. In order to prevent filters from being changed, `permanentFilter` must be used instead of `initialFilter`.
:::

## API

### Properties

<PropsTable module="@pankod/refine-antd/useTable"/>

### Type Parameters

| Property         | Desription                                                   | Type                       | Default                    |
| ---------------- | ------------------------------------------------------------ | -------------------------- | -------------------------- |
| TData            | Result data of the query. Extends [`BaseRecord`][baserecord] | [`BaseRecord`][baserecord] | [`BaseRecord`][baserecord] |
| TError           | Custom error object that extends [`HttpError`][httperror]    | [`HttpError`][httperror]   | [`HttpError`][httperror]   |
| TSearchVariables | Values for search params                                     |                            | `{}`                       |

### Return values

| Property         | Description                                 | Type                                                                                                                                                    |
| ---------------- | ------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- |
| searchFormProps  | Ant Design [`<Form>`][form] props           | [`FormProps<TSearchVariables>`][form]                                                                                                                   |
| tableProps       | Ant Design [`<Table>`][table] props         | [`TableProps<TData>`][table]                                                                                                                            |
| tableQueryResult | Result of the `react-query`'s `useQuery`    | [`QueryObserverResult<{`<br/>` data: TData[];`<br/>` total: number; },`<br/>` TError>`][usequery]                                                       |
| sorter           | Current sorting state                       | [`CrudSorting`][crudsorting]                                                                                                                            |
| filters          | Current filters state                       | [`CrudFilters`][crudfilters]                                                                                                                            |
| setFilters       | A function that accepts a new filter state  | - `(filters: CrudFilters, behavior?: "merge" \| "replace" = "merge") => void` <br/> - `(setter: (previousFilters: CrudFilters) => CrudFilters) => void` |
| setSorter        | A function that accepts a new sorter state. | `(sorter: CrudSorting) => void`                                                                                                                         |

<br />

## Live StackBlitz Example

<iframe loading="lazy" src="https://stackblitz.com/github/refinedev/refine/tree/master/examples/table/antd/useTable?embed=1&view=preview&theme=dark&preset=node&ctl=1"
     style={{width: "100%", height:"80vh", border: "0px", borderRadius: "8px", overflow:"hidden"}}
     title="refine-use-table-example"
     allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
     sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
   ></iframe>

[table]: https://ant.design/components/table/#API
[form]: https://ant.design/components/form/#API
[usequery]: https://react-query.tanstack.com/reference/useQuery
[baserecord]: /api-reference/core/interfaces.md#baserecord
[crudsorting]: /api-reference/core/interfaces.md#crudsorting
[crudfilters]: /api-reference/core/interfaces.md#crudfilters
[httperror]: /api-reference/core/interfaces.md#httperror
[table search]: /advanced-tutorials/search/table-search.md
[refine swl]: /api-reference/core/components/refine-config.md#syncwithlocation
