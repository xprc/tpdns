---
id: useExport
title: useExport
---

`useExport` hook allows you to make your resources exportable.

This hook accepts [`export-to-csv`][export-to-csv]'s options to create `CSV` files.

```ts
import { useExport } from "@pankod/refine-core";

const { triggerExport, isLoading } = useExport(options);
```

## Usage

Let's say that we have an endpoint like this:

```json title="https://api.fake-rest.refine.dev/posts"
[
    {
        "id": 1,
        "title": "Tempora nesciunt sunt temporibus.",
        "slug": "quisquam-in-dolore",
        "content": "Id qui nostrum hic nostrum voluptatem...",
        "status": "rejected",
    },
    {
        "id": 2,
        "title": "Omnis est quis reiciendis blanditiis.",
        "slug": "deleniti-voluptas-tempore",
        "content": "Laudantium eos ut consequuntur dignissimos...",
        "status": "published",
    },
    ...
]
```

To enable export functionality for this endpoint, we can use the `useExport` hook to create an export button.

```tsx title="src/pages/posts/list.tsx"
import {
    // highlight-start
    useExport,
    ExportButton,
    // highlight-end
} from "@pankod/refine-core";

import { List, Table, useTable } from "@pankod/refine-antd";

export const PostList: React.FC = () => {
    const { tableProps } = useTable<IPost>();

    // highlight-next-line
    const { triggerExport, isLoading } = useExport<IPost>();

    return (
        <List
            pageHeaderProps={{
                extra: (
                    // highlight-next-line
                    <ExportButton onClick={triggerExport} loading={isLoading} />
                ),
            }}
        >
            <Table {...tableProps} rowKey="id">
                <Table.Column dataIndex="id" title="ID" />
                <Table.Column dataIndex="title" title="Title" />
            </Table>
        </List>
    );
};

interface IPost {
    id: number;
    title: string;
    content: string;
    slug: string;
    status: "published" | "draft" | "rejected";
}
```

:::info
In the examples, instead of [<Button\>][button], [<ExportButton\>][exportbutton] is used. [<ExportButton\>][exportbutton] is nothing more than a default Ant Design [<Button\>][button] with an icon and a default text.

[Refer to ExportButton docs for more detailed information. &#8594][exportbutton]
:::
<br />

When the user clicks this button, `triggerExport` fetches all the data in the resource and downloads it as a `CSV` file with these contents in it:

```csv title="Posts-2021-06-29-14-40-14.csv"
id,title,slug,content,status,categoryId,userId
1,"Tempora nesciunt sunt temporibus.","quisquam-in-dolore","Id qui nostrum hic nostrum voluptatem...","rejected",2,1
2,"Omnis est quis reiciendis blanditiis.","deleniti-voluptas-tempore","Laudantium eos ut consequuntur dignissimos...","published",24,39
...
```

### Handling Relational Data

You can run a mapping function for all entries before they are saved. This is useful in cases of being required to reference relational data or saving files in a specific way to process them in different applications etc.
This mapping function is similar to the mapping function of [`useImport`][useimport#handling-relational-data].

Let's assume that we have this endpoint with some relational data in it:

```json
[
 {
    "id": 2,
    "title": "Et architecto et aut ex.",
    "slug": "dolorum-et-quia",
    "content": "Reprehenderit qui voluptatem in cum qui odio et.",
    "category": {
      "id": 35
    },
    "user": {
      "id": 10
    },
    "status": "published",
  },
  {
    "id": 3,
    "title": "Quam maiores officia suscipit quia vel asperiores nisi non excepturi.",
    "slug": "delectus-laborum-provident",
    "content": "Placeat eos esse.",
    "category": {
      "id": 4
    },
    "user": {
      "id": 50
    },
    "status": "published",
  },
  ...
]
```

We have the `category` and `user` fields as possible relational data keys. Their data is out of the responsibility of this export operation. We want to save their id's without any other related data. It may be required to export and backup those entities separately.

We can save `category.id` as `categoryId` and `user.id` as `userId`. Thus using a mapping function that looks like this:

```ts
const { triggerExport, isLoading } = useExport<IPost>({
    mapData: (item) => {
        return {
            id: item.id,
            title: item.title,
            slug: item.slug,
            content: item.content,
            status: item.status,
            categoryId: item.category.id,
            userId: item.user.id,
        };
    },
});

interface ICategory {
    id: number;
    title: string;
}

interface IUser {
    id: number;
}

interface IPost {
    id: number;
    title: string;
    content: string;
    slug: string;
    status: "published" | "draft" | "rejected";
    category: { id: number };
    user: IUser;
}
```

Such an `IPost` may should work fine:

This is all you need to handle mapping.

:::tip
You can pass more options to further customize the exporting process.  
[Refer to export-to-csv docs for more detailed information. &#8594][export-to-csv]
:::

## API Reference

### `useExport` Options

<PropsTable module="@pankod/refine-core/useExport" />

### `useExport` Return Values

| Key           | Description                                | Type               |
| ------------- | ------------------------------------------ | ------------------ |
| isLoading     | Shows true when there is an export process | `boolean`          |
| triggerExport | When invoked, starts the exporting process | `async () => void` |

### Type Parameters

| Property   | Desription                                                                 | Default                    |
| ---------- | -------------------------------------------------------------------------- | -------------------------- |
| TData      | Result type of the data query type that extends [`BaseRecord`][baserecord] | [`BaseRecord`][baserecord] |
| TVariables | Values for params                                                          | `any`                      |

[button]: https://ant.design/components/button/
[exportbutton]: /api-reference/antd/components/buttons/export.md
[useimport]: /api-reference/core/hooks/import-export/useImport.md
[useimport#handling-relational-data]: /api-reference/core/hooks/import-export/useImport.md#handling-relational-data
[export-to-csv]: https://github.com/alexcaza/export-to-csv
[export-to-csv#api]: https://github.com/alexcaza/export-to-csv#api
[baserecord]: /api-reference/core/interfaces.md#baserecord
[crudsorting]: /api-reference/core/interfaces.md#crudsorting
[crudfilters]: /api-reference/core/interfaces.md#crudfilters
