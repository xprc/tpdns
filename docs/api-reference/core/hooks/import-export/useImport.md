---
id: useImport
title: useImport
description: useImport hook API references of @pankod/refine-core
---

import useImport from '@site/static/img/core/useImport/useImport.gif';

`useImport` hook allows you to handle your `CSV` import logic easily. It uses [`papaparse`][papaparse] under the hood to parse `CSV` files.

```ts
import { useImport } from "@pankod/refine-core";

const { handleChange } = useImport(options);
```

## Usage

Assume we have a `CSV` file of this contents:

```csv title="dummy.csv"
"title","categoryId"
"dummy title 1","3"
"dummy title 2","44"
```

This file should be parsed as:

```ts
[
    {
        title: "dummy title 1",
        categoryId: "3",
    },
    {
        title: "dummy title 2",
        categoryId: "44",
    },
];
```

### With `input[type=file]`

```tsx
import React from "react";
import {
    // highlight-next-line
    useImport,
} from "@pankod/refine-core";

export const PostList: React.FC = () => {
    const [total, setTotal] = React.useState(0);
    const [processed, setProcessed] = React.useState(0);

    // highlight-start
    const { handleChange } = useImport<IPostFile>({
        onFinish: (results) => {
            window.alert(JSON.stringify(results));
        },
        onProgress: ({ totalAmount, processedAmount }) => {
            setProcessed(processedAmount);
            setTotal(totalAmount);
        },
    });
    // highlight-end

    return (
        <>
            <input
                type="file"
                // highlight-start
                onChange={(event) => {
                    if (event.target.files) {
                        handleChange({
                            file: event.target.files[0],
                        });
                    }
                }}
                // highlight-end
            />
            <span>{`${processed}/${total}`}</span>
        </>
    );
};

interface IPostFile {
    title: string;
    categoryId: string;
}
```

<br />

:::tip
The `useImport` hook contains all the props that the HTML Input element needs (`type`, `accept`, `onChange`) so you can use directly `inputProps` in your HTML input elements like this

```tsx
import React from "react";
import {
    // highlight-next-line
    useImport,
} from "@pankod/refine-core";

export const PostList: React.FC = () => {
    // highlight-next-line
    const { inputProps } = useImport();
    return (
        <input
            // highlight-next-line
            {...inputProps}
        />
    );
};
```

:::

<br />

<div class="img-container">
    <div class="window">
        <div class="control red"></div>
        <div class="control orange"></div>
        <div class="control green"></div>
    </div>
    <img src={useImport} alt="useImport usage" />
</div>

<br />

When user clicks the `<input>` element and selects a `CSV` file, `useImport` parses the content with [papaparse][papaparse], creates the resources one by one or as batches (depending on the configuration). Which endpoint to create the given resource is inferred from the current route.

Resources are added one by one ([`useCreate`][usecreate]) or as batches ([`useCreateMany`][usecreatemany]) if explicitly configured with [`batchSize`](#useimport-options) option. By default, `batchSize` is 1.

:::caution
If `batchSize` is more than 1, `createMany` method should be implemented in `DataProvider`.  
[Refer to DataProvider documentation for further information about importing the default css. &#8594][dataprovider]
:::

### Handling Relational Data

In some cases, you might want to change/process the data of `CSV` file after parsing. Example cases of this requirement: your data contains relational data and references to data in other places, your backend API requires your data to be sent in a specific format. You can further customize `useImport` to achieve this.

Assume this is the `CSV` file we want to create resources from:

```csv title="dummy.csv"
"title","content","status","categoryId","userId"
"dummy title 1","dummy content 1","rejected","3","8"
"dummy title 2","dummy content 2","draft","44","8"
"dummy title 3","cummy content 3","published","41","10"
```

Since `user` and `category` are relational fields, we shouldn't store them as objects. Instead, we should keep only their `id` fields in our exported files. And `CSV` format doesn't support JSON data, we stored `category.id` as `categoryId` and `user.id` as `userId`.

When creating these resources back, we should map it back to our backend API's required format. `mapData` option allows us to do this. Here is an example:

```ts
const importProps = useImport<IPostFile>({
    mapData: (item) => {
        return {
            title: item.title,
            content: item.content,
            status: item.status,
            category: {
                id: item.categoryId,
            },
            user: {
                id: item.userId,
            },
        };
    },
});

interface IPostFile {
    title: string;
    status: string;
    content: string;
    categoryId: string;
    userId: string;
}
```

Now, parsed data is mapped to conform our APIs requirements.

## API Reference

### Properties

<PropsTable module="@pankod/refine-core/useImport" />

### Return Values

| Property       | Description                                                            | Type                                                                                                                                                                                                                                                                                          |
| -------------- | ---------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| inputProps     | Props to that you can pass `<input />` element props.                  | [`UseImportInputPropsType`][useimportinputpropstype]                                                                                                                                                                                                                                          |
| handleChange   | Props to handle `<input type="file">` element `onChange`               | `function`                                                                                                                                                                                                                                                                                    |
| isLoading      | It can be used to handle the `loading` status for the Import operation | `boolean`                                                                                                                                                                                                                                                                                     |
| mutationResult | Result of the mutation/mutations of creating imported resources        | [`UseMutationResult<`<br/>`{ data: TData },`<br/>`TError,`<br/>` { resource: string; values: TVariables; },`<br/>` unknown>`][usemutation]) \| [`UseMutationResult<`<br/>`{ data: TData[]},`<br/>`TError,`<br/>` { resource: string; values: TVariables[]; },`<br/>` unknown>`][usemutation]) |

### Type Parameters

| Property   | Desription                                                                 | Default                    |
| ---------- | -------------------------------------------------------------------------- | -------------------------- |
| TItem      | Interface of parsed csv data                                               | `any`                      |
| TData      | Result type of the data query type that extends [`BaseRecord`][baserecord] | [`BaseRecord`][baserecord] |
| TError     | Custom error object that extends [`HttpError`][httperror]                  | [`HttpError`][httperror]   |
| TVariables | Values for mutation function                                               | `any`                      |

[usecreate]: /api-reference/core/hooks/data/useCreate.md
[usecreatemany]: /api-reference/core/hooks/data/useCreateMany.md
[dataprovider]: /api-reference/core/providers/data-provider.md
[baserecord]: /api-reference/core/interfaces.md#baserecord
[httperror]: /api-reference/core/interfaces.md#httperror
[papaparse]: https://www.papaparse.com/docs
[usemutation]: https://react-query.tanstack.com/reference/useMutation
[number.max_safe_integer]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/MAX_SAFE_INTEGER
[successerrornotification]: /api-reference/core/interfaces.md#successerrornotification
[useimportinputpropstype]: /api-reference/core/interfaces.md#useimportinputpropstype

## Live StackBlitz Example

<iframe loading="lazy" src="https://stackblitz.com/github/refinedev/refine/tree/master/examples/core/useImport?embed=1&view=preview&theme=dark&preset=node&ctl=1"
    style={{width: "100%", height:"80vh", border: "0px", borderRadius: "8px", overflow:"hidden"}}
    title="refine-use-modal-example"
></iframe>
