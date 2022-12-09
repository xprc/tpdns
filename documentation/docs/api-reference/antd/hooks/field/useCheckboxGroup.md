---
id: useCheckboxGroup
title: useCheckboxGroup
---

import basicUsage from '@site/static/img/hooks/useCheckboxGroup/basic.png';

`useCheckboxGroup` hook allows you to manage an Ant Design [Checkbox.Group](https://ant.design/components/checkbox/#components-checkbox-demo-group) component when records in a resource needs to be used as checkbox options.

## Usage

We will demonstrate how to get data at the `/tags` endpoint from the `https://api.fake-rest.refine.dev` REST API.

```ts title="https://api.fake-rest.refine.dev/tags"
{
    [
        {
            id: 1,
            title: "Driver Deposit",
        },
        {
            id: 2,
            title: "Index Compatible Synergistic",
        },
        {
            id: 3,
            title: "Plum",
        },
    ];
}
```

```tsx  title="pages/posts/create.tsx"
import { Form, Checkbox, useCheckboxGroup } from "@pankod/refine-antd";

export const PostCreate: React.FC = () => {
    // highlight-start
    const { checkboxGroupProps } = useCheckboxGroup<ITag>({
        resource: "tags",
    });
    // highlight-end

    return (
        <Form>
            <Form.Item label="Tags" name="tags">
                // highlight-next-line
                <Checkbox.Group {...checkboxGroupProps} />
            </Form.Item>
        </Form>
    );
};

interface ITag {
    id: number;
    title: string;
}
```

<br/>

All we have to do is pass the `checkboxGroupProps` it returns to the `<Checkbox.Group>` component.
`useCheckboxGroup` uses the `useList` hook for fetching data. [Refer to `useList` hook for details. &#8594](/api-reference/core/hooks/data/useList.md)

<div class="img-container">
    <div class="window">
        <div class="control red"></div>
        <div class="control orange"></div>
        <div class="control green"></div>
    </div>
    <img src={basicUsage} alt="Tags" />
</div>

## Options

### `resource`

```tsx 
const { checkboxGroupProps } = useCheckboxGroup({
    resource: "tags",
});
```

`resource` property determines which? API resource endpoint to fetch records from [`dataProvider`](/api-reference/core/providers/data-provider.md). It returns properly configured `options` values for checkboxes.

[Refer to Ant Design Checkbox.Group component documentation for detailed info for `options`. &#8594](https://ant.design/components/checkbox)

### `defaultValue`

```tsx
const { selectProps } = useCheckboxGroup({
    resource: "languages",
// highlight-next-line
    defaultValue: [1, 2],
});
```
The easiest way to selecting a default values for checkbox fields is by passing in `defaultValue`.
### `optionLabel` and `optionValue`

```tsx
const { checkboxGroupProps } = useCheckboxGroup({
    resource: "tags",
    // highlight-start
    optionLabel: "title",
    optionValue: "id",
    // highlight-end
});
```

`optionLabel` and `optionValue` allows you to change the values and appearances of your options. Default values are `optionLabel = "title"` and `optionValue = "id"`.

:::tip

Supports use with `optionLabel` and `optionValue` [Object path](https://lodash.com/docs/4.17.15#get) syntax.

```tsx
const { options } = useSelect({
    resource: "categories",
// highlight-start
    optionLabel: "nested.title",
    optionValue: "nested.id",
// highlight-end
});
```
:::

### `filters`

```tsx
const { checkboxGroupProps } = useCheckboxGroup({
    resource: "tags",
    // highlight-start
    filters: [
        {
            field: "title",
            operator: "eq",
            value: "Driver Deposit",
        },
    ],
    // highlight-end
});
```

It allows us to add some filters while fetching the data. For example, if you want to list only the `titles` that are equal to `"Driver Deposit"` records.

### `sort`

```tsx
const { checkboxGroupProps } = useCheckboxGroup({
    resource: "tags",
    // highlight-start
    sort: [
        {
            field: "title",
            order: "asc",
        },
    ],
    // highlight-end
});
```

It allows us to sort the `options`. For example, if you want to sort your list according to `title` by ascending.

### `fetchSize`

```tsx
const { selectProps } = useCheckboxGroup({
    resource: "languages",
// highlight-next-line
    fetchSize: 20,
});
```

Amount of records to fetch in checkboxes.
### `queryOptions`

```tsx
const { checkboxGroupProps } = useCheckboxGroup({
    resource: "tags",
    // highlight-start
    queryOptions: {
        onError: () => {
            console.log("triggers when on query return Error");
        },
    },
    // highlight-end
});
```

[useQuery](https://react-query.tanstack.com/reference/useQuery) options can be set by passing `queryOptions` property.

### `pagination`

Allows us to set page and items per page values.

For example imagine that we have 1000 post records:

```ts
const { selectProps } = useSelect({
    resource: "categories",
    // highlight-next-line
    pagination: { current: 3, pageSize: 8 }
});
```

> Listing will start from page 3 showing 8 records.

## API Reference

### Properties

<PropsTable module="@pankod/refine-antd/useCheckboxGroup"/>

## Live StackBlitz Example

<iframe loading="lazy" src="https://stackblitz.com/github/refinedev/refine/tree/master/examples/field/useCheckboxGroup?embed=1&view=preview&theme=dark&preset=node&ctl=1"
     style={{width: "100%", height:"80vh", border: "0px", borderRadius: "8px", overflow:"hidden"}}
     title="refine-use-checkbox-group-example"
     allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
     sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
   ></iframe>
