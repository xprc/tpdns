---
id: useForm
title: useForm
---

`useForm` is a hook that allows to manage forms. It has some `action` methods that `create`, `edit` and `clone` the form. The hook return value comes to according to the called action and it can run different logic depending on the `action`.

:::info
If you're looking for a complete form library, Refine supports two form libraries out-of-the-box.

-   [React Hook Form](https://react-hook-form.com/) (for Headless users) - [Documentation](/packages/documentation/react-hook-form/useForm.md) - [Example](/examples/form/react-hook-form/useForm.md)
-   [Ant Design Form](https://ant.design/components/form/#header) (for Ant Design users) - [Documentation](/api-reference/antd/hooks/form/useForm.md) - [Example](/examples/form/antd/useForm.md)
-   [Mantine Form](https://mantine.dev/form/use-form) (for Mantine users) - [Documentation](/api-reference/mantine/hooks/form/useForm.md) - [Example](/examples/form/mantine/useForm.md)

:::

## Basic Usage

We'll show the basic usage of `useForm` by adding an creating form.

```tsx title="src/posts/create.tsx"
import { useState } from "react";
import { useForm } from "@pankod/refine-core";

export const PostCreate = () => {
    const [title, setTitle] = useState();
    const { onFinish } = useForm({
        action: "create",
    });

    const onSubmit = (e) => {
        e.preventDefault();
        onFinish({ title });
    };

    return (
        <form onSubmit={onSubmit}>
            <input onChange={(e) => setTitle(e.target.value)} />
            <button type="submit">Submit</button>
        </form>
    );
};
```

-   Returns the `mutationResult` after called the `onFinish` callback.
-   Accepts generic type parameters. It is used to define response type of the mutation and query.

## Actions

`useForm` can handle edit, create and clone actions.

:::tip
By default, it determines the `action` from route. In the above example, the route is `/posts/create` thus the hook will be called with `action: "create"`. If the route is `/posts/edit/1`, the hook will be called with `action: "edit"`.

It can be overridden by passing the `action` prop where it isn't possible to determine the action from the route (e.g. when using form in a modal or using a custom route).
:::

### `action: "edit"`

`action: "edit"` is used for editing an existing record. It requires the `id` for determining the record to edit. By default, it uses the `id` from the route. It can be changed with the `setId` function or `id` property.

It fetches the record data according to the `id` and returns the `queryResult` for you to fill the form.

`useForm` uses [`useUpdate`](/api-reference/core/hooks/data/useUpdate.md) under the hood for mutations on edit mode.

### `action: "create"`

`action: "create"`is used for creating a new record that didn't exist before.

`useForm` uses [`useCreate`](/api-reference/core/hooks/data/useCreate.md) under the hood for mutations on create mode.

### `action: "clone"`

`action: "clone"` is used for cloning an existing record. It requires the `id` for determining the record to clone. By default, it uses the `id` from the route. It can be changed with the `setId` function.

It fetches the record data according to the `id` and returns the `queryResult` for you to fill the form.

`useForm` uses [`useUpdate`](/api-reference/core/hooks/data/useUpdate.md) under the hood for mutations on clone mode.

## API Reference

### Properties

<PropsTable module="@pankod/refine-core/useForm" />

> `*`: These props have default values in `RefineContext` and can also be set on **<[Refine](/api-reference/core/components/refine-config.md)>** component. `useForm` will use what is passed to `<Refine>` as default but a local value will override it.

### Type Parameters

| Property   | Desription                                                       | Default                    |
| ---------- | ---------------------------------------------------------------- | -------------------------- |
| TData      | Result data of the query that extends [`BaseRecord`][baserecord] | [`BaseRecord`][baserecord] |
| TError     | Custom error object that extends [`HttpError`][httperror]        | [`HttpError`][httperror]   |
| TVariables | Values for params.                                               | `{}`                       |

### Return values

| Property       | Description                                            | Type                                                                                                                                                           |
| -------------- | ------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| onFinish       | Triggers the mutation                                  | `(values: TVariables) => Promise<CreateResponse<TData>` \| `UpdateResponse<TData>` \| `void`>                                                                  |
| queryResult    | Result of the query of a record                        | [`QueryObserverResult<T>`](https://react-query.tanstack.com/reference/useQuery)                                                                                |
| mutationResult | Result of the mutation triggered by calling `onFinish` | [`UseMutationResult<T>`](https://react-query.tanstack.com/reference/useMutation)                                                                               |
| formLoading    | Loading state of form request                          | `boolean`                                                                                                                                                      |
| id             | Record id for `clone` and `create` action              | [`BaseKey`](/api-reference/core/interfaces.md#basekey)                                                                                                         |
| setId          | `id` setter                                            | `Dispatch<SetStateAction<` `string` \| `number` \| `undefined>>`                                                                                               |
| redirect       | Redirect function for custom redirections              | (redirect: `"list"`\|`"edit"`\|`"show"`\|`"create"`\| `false` ,idFromFunction?: [`BaseKey`](/api-reference/core/interfaces.md#basekey)\|`undefined`) => `data` |

[baserecord]: /api-reference/core/interfaces.md#baserecord
[httperror]: /api-reference/core/interfaces.md#httperror

`useModal` hook allows you to manage a modal. Since it is designed as headless, it only outputs `show` and `close` functions and `visible` for state. It expects you to handle the UI.

<!-- You can pass the returned `visible` as props to component and use `show` and `close` methods to hide and show it. It does not provide any functionality besides this. You can use this hook anywhere. -->

You can use the `visible` state to show or hide the modal.
