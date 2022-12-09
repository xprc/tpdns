---
id: useSimpleList
title: useSimpleList
---

import useSimpleList from '@site/static/img/guides-and-concepts/hooks/useSimpleList/useSimpleList.png';

By using `useSimpleList` you get props for your records from API in accordance with Ant Design `<List>` component. All features such as pagination, sorting come out of the box.

[Refer to Ant Design docs for `<List>` component information &#8594][header]

## Usage

Let's assume that the data we will show in the table comes from the endpoint as follows:

```json title="https://api.fake-rest.refine.dev/posts"
[
    {
        "id": 182,
        "title": "A aspernatur rerum molestiae.",
        "content": "Natus molestias incidunt voluptatibus. Libero delectus facilis...",
        "hit": 992123,
        "category": {
            "id": 1,
            "title": "Navigating"
        }
    },
    {
        "id": 989,
        "title": "A molestiae vel voluptatem enim.",
        "content": "Voluptas consequatur quia beatae. Ipsa est qui culpa deleniti...",
        "hit": 29876,
        "category": {
            "id": 2,
            "title": "Empowering"
        }
    }
]
```

If we want to make a listing page where we show the `title`, `content`, `hit` and `category.title` values:

```tsx 
import {
    PageHeader,
    Typography,
    useMany,
    AntdList,
    useSimpleList,
    NumberField,
    Space,
} from "@pankod/refine";

export const PostList: React.FC = () => {
    const { Text } = Typography;

// highlight-start
    const { listProps } = useSimpleList<IPost>({
        initialSorter: [
            {
                field: "id",
                order: "asc",
            },
        ],
        pagination: {
            pageSize: 6,
        },
    });
// highlight-end

    const categoryIds =
        listProps?.dataSource?.map((item) => item.category.id) ?? [];

    const { data } = useMany<ICategory>({
        resource: "categories",
        ids: categoryIds,
        queryOptions: {
            enabled: categoryIds.length > 0,
        },
    });

// highlight-start
    const renderItem = (item: IPost) => {
        const { title, hit, content } = item;

        const categoryTitle = data?.data.find(
            (category: ICategory) => category.id === item.category.id,
        )?.title;

        return (
            <AntdList.Item
                actions={[
                    <Space key={item.id} direction="vertical" align="end">
                        <NumberField
                            value={hit}
                            options={{
                                // @ts-ignore
                                notation: "compact",
                            }}
                        />
                        <Text>{categoryTitle}</Text>
                    </Space>,
                ]}
            >
                <AntdList.Item.Meta title={title} description={content} />
            </AntdList.Item>
        );
    };
// highlight-end

    return (
        <PageHeader ghost={false} title="Posts">
// highlight-next-line
            <AntdList {...listProps} renderItem={renderItem} />
        </PageHeader>
    );
};

interface IPost {
    id: string;
    title: string;
    content: string;
    hit: number;
    category: ICategory;
}

interface ICategory {
    id: string;
    title: string;
}
```

:::tip
You can use `AntdList.Item` and `AntdList.Item.Meta` like `<List>` component from [Ant Design][list]
:::

<br/>

<div class="img-container">
    <div class="window">
        <div class="control red"></div>
        <div class="control orange"></div>
        <div class="control green"></div>
    </div>
    <img src={useSimpleList} alt="use simple list" />
</div>

## API

### Properties

| Key              | Description                                                                                                             | Type                                                             | Default                                                                              |
| ---------------- | ----------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------- | ------------------------------------------------------------------------------------ |
| resource         | The resource to list the data                                                                                           | `string` \| `undefined`                                          | Resource name that it reads from the url                                             |
| permanentFilter  | Default and unchangeable filter                                                                                         | [`CrudFilters`][crudfilters]                                     | `[]`                                                                                 |
| initialSorter    | Allows to sort records by speficified order and field                                                                   | [`CrudSorting`][crudsorting]                                     |                                                                                      |
| initialFilter    | Allows to filter records by speficified order and field                                                                 | [`CrudFilters`][crudfilters]                                     |                                                                                      |
| listProps        | Ant Design `<List>` props                                                                                               | [`listProps`][list]                                              |                                                                                      |
| syncWithLocation | Sortings, filters, page index and records shown per page are tracked by browser history                                 | `boolean`                                                        | Value set in [Refine][refine swl]. If a custom resource is given, it will be `false` |
| onSearch         | When the search form is submitted, it creates the 'CrudFilters' object. See here to create a [search form][list search] | `Function`                                                       |                                                                                      |
| queryOptions     | `react-query`'s `useQuery` options                                                                                      | ` UseQueryOptions<{ data: TData[] }, TError>`                    |
| metaData         | Metadata query for `dataProvider`                                                                                       | [`MetaDataQuery`](/api-references/interfaces.md#metadataquery) | {}                                                                                   |
| [liveMode](/api-references/providers/live-provider.md#usage-in-a-hook)                                                                                            | Whether to update data automatically (`"auto"`) or not (`"manual"`) if a related live event is received. The "off" value is used to avoid creating a subscription. | [`"auto"` \| `"manual"` \| `"off"`](/api-references/interfaces.md#livemodeprops)       | `"off"`                             |
| liveParams                                                                                          | Params to pass to `liveProvider`'s `subscribe` method if `liveMode` is enabled.                                                                                     | [`{ ids?: string[]; [key: string]: any; }`](/api-references/interfaces.md#livemodeprops) | `undefined`                         |
| onLiveEvent                                                                                         | Callback to handle all related live events of this hook.                                                                                                                                   | [`(event: LiveEvent) => void`](/api-references/interfaces.md#livemodeprops)                           | `undefined`                                  |

### Type Parameters

| Property         | Desription                                                      | Type                       | Default                    |
| ---------------- | --------------------------------------------------------------- | -------------------------- | -------------------------- |
| TData            | Result data of the mutation. Extends [`BaseRecord`][baserecord] | [`BaseRecord`][baserecord] | [`BaseRecord`][baserecord] |
| TError           | Custom error object that extends [`HttpError`][httperror]       | [`HttpError`][httperror]   | [`HttpError`][httperror]   |
| TSearchVariables | Antd form values                                                | `{}`                       | `{}`                       |

### Return values

| Property        | Description                     | Type                                               |
| --------------- | ------------------------------- | -------------------------------------------------- |
| queryResult     | Result of the query of a record | [`QueryObserverResult<{ data: TData }>`][usequery] |
| searchFormProps | Ant design Form props           | [`Form`][form]                                     |
| listProps       | Ant design List props           | [`List`][list]                                     |
| filters         | Current filters state           | [`CrudFilters`][crudfilters]                       |

[crudfilters]: /api-references/interfaces.md#crudfilters
[crudsorting]: /api-references/interfaces.md#crudsorting
[form]: https://ant.design/components/form/#API
[list]: https://ant.design/components/list/#API
[usequery]: https://react-query.tanstack.com/reference/useQuery
[list search]: /guides-and-concepts/search/list-search.md
[baserecord]: /api-references/interfaces.md#baserecord
[httperror]: /api-references/interfaces.md#httperror
[header]: https://ant.design/components/list/#header
[refine swl]: /api-references/components/refine-config.md#syncwithlocation
