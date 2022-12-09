---
id: useForm
title: useForm
---

`useForm` is used to manage forms. It uses Ant Design [Form](https://ant.design/components/form/) data scope management under the hood and returns the required props for managing the form actions.

## Usage

We'll show the basic usage of `useForm` by adding an editing form.

```tsx  title="pages/posts/edit.tsx"
// highlight-next-line
import { Edit, Form, Input, useForm, Select } from "@pankod/refine";

export const PostEdit: React.FC = () => {
// highlight-next-line
    const { formProps, saveButtonProps } = useForm<IPost>();

    return (
// highlight-next-line
        <Edit saveButtonProps={saveButtonProps}>
// highlight-next-line
            <Form {...formProps} layout="vertical">
                <Form.Item label="Title" name="title">
                    <Input />
                </Form.Item>
                <Form.Item label="Status" name="status">
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

interface IPost {
    id: string;
    title: string;
    status: "published" | "draft" | "rejected";
}
```

```tsx 
const { formProps, saveButtonProps } = useForm<IPost>();
```

`formProps` includes all necessary values to manage Ant Design [Form](https://ant.design/components/form/) components.

In the example if you navigate to `/posts/edit/1234` it will manage the data of the post with id of `1234` in an editing context. See [Actions](#actions) on how `useForm` determines this is an editing context.

Since this is an edit form it will fill the form with the data of the post with id of `1234` and then the form will be ready to edit further and submit the changes.

Submit functionality is provided by `saveButtonProps` which includes all of the necessary props for a button to submit a form including automatically updating loading states.

`useForm` accepts type parameters for the record in use and for the response type of the mutation. `IPost` in the example represents the record to edit. It is also used as the default type for mutation response.

## Actions

`useForm` can handle edit, create and clone actions.

:::tip
By default it determines the action from route. In the example, the route is `/posts/edit/1234` thus this is an editing form.
:::

It can take an `action` parameter for the situations where it isn't possible to determine the action from route i.e. using a form in a modal, using a custom route.

```tsx 
const { formProps, saveButtonProps } = useForm({ action: "edit" });
```

### `action: "edit"`

`action: "edit"` is used for editing an existing record. Form will initially be filled with the data of the record.

`useForm` uses [`useUpdate`](../../hooks/data/useUpdate.md) under the hood for mutations on edit mode.

### `action: "create"`

`action: "create"`is used for creating a new record that didn't exist before.

`useForm` uses [`useCreate`](../data/useCreate.md) under the hood for mutations on create mode.

### Clone mode

When creating a new record, `useForm` can initialize the form with the data of an existing record.

`useForm` works on clone mode when a route has a `clone` and `id` parameters like this `{{resourceName}}/clone/1234`.
Alternatively, if route doesn't have those parameters, action can be set with `action: "clone"` and id can be set with `setCloneId`.

```tsx 
const { setCloneId } = useForm();
```

:::tip
If you want to show a form in a modal or drawer where necessary route params might not be there you can use the [useModalForm](/api-references/hooks/form/useModalForm.md) or the [useDrawerForm](/api-references/hooks/form/useDrawerForm.md) hook.
:::

:::tip
`<CloneButton>` can be used to navigate to a clone route with an id like this `{{resourceName}}/clone/1234`.

```tsx 
<CloneButton recordItemId={record.id} />
```

Also the `clone` method from the [`useNavigation`](/api-references/hooks/navigation/useNavigation.md) hook can be used as well.

```tsx 
const { clone } = useNavigation();

<Button onClick={() => clone("posts", record.id)} />
```

:::

## API Reference

### Properties

| Property               | Description                                                                                          | Type                                                                       | Default                                                                                                                              |
| ---------------------- | ---------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------ |
| action                 | Type of the form mode                                                                                | `"edit"` \| `"create"`                                                     |                                                                                                                                      |
| resource               | Resource name for API data interactions                       | `string`                                                                   |                                                                                                                                      |
| onMutationSuccess      | Called when a [mutation](https://react-query.tanstack.com/reference/useMutation) is successful       | `(data: UpdateResponse<M>, variables: any, context: any) => void`          |                                                                                                                                      |
| onMutationError        | Called when a [mutation](https://react-query.tanstack.com/reference/useMutation) encounters an error | `(error: any, variables: any, context: any) => void`                       |                                                                                                                                      |
| mutationMode           | [Determines when mutations are executed](guides-and-concepts/mutation-mode.md)                       | ` "pessimistic` \| `"optimistic` \| `"undoable"`                           | `"pessimistic"`\*                                                                                                                    |
| submitOnEnter          | Listens `Enter` key press to submit form                                                             | `boolean`                                                                  | `false`                                                                                                                              |
| warnWhenUnsavedChanges | Shows notification when unsaved changes exist                                                        | `boolean`                                                                  | `false`\*                                                                                                                            |
| redirect               | Page to redirect after a succesfull mutation                                                         | ` "show` \| `"edit` \| `"list"` \| `false`                                 | `"list"`                                                                                                                             |
| undoableTimeout        | Duration to wait before executing mutations when `mutationMode = "undoable"`                         | `number`                                                                   | `5000`\*                                                                                                                             |
| successNotification    | Successful Mutation notification                                                                     | [`SuccessErrorNotification`](../../interfaces.md#successerrornotification) | "Successfully created `resource`" or "Successfully updated `resource`"                                                               |
| errorNotification      | Unsuccessful Mutation notification                                                                   | [`SuccessErrorNotification`](../../interfaces.md#successerrornotification) | "There was an error creating `resource` (status code: `statusCode`)" or "Error when updating `resource` (status code: `statusCode`)" |
| metaData                                            | Metadata query for `dataProvider`                                              | [`MetaDataQuery`](/api-references/interfaces.md#metadataquery)           | {}                                                                   |
| [liveMode](/api-references/providers/live-provider.md#usage-in-a-hook)                                                                                            | Whether to update data automatically (`"auto"`) or not (`"manual"`) if a related live event is received. The "off" value is used to avoid creating a subscription. | [`"auto"` \| `"manual"` \| `"off"`](/api-references/interfaces.md#livemodeprops)       | `"off"`                             |
| liveParams                                                                                          | Params to pass to `liveProvider`'s `subscribe` method if `liveMode` is enabled.                                                                                     | [`{ ids?: string[]; [key: string]: any; }`](/api-references/interfaces.md#livemodeprops) | `undefined`                         |
| onLiveEvent                                                                                         | Callback to handle all related live events of this hook.                                                                                                                                   | [`(event: LiveEvent) => void`](/api-references/interfaces.md#livemodeprops)                           | `undefined`                                  |

> `*`: These props have default values in `RefineContext` and can also be set on **<[Refine](/api-references/components/refine-config.md)>** component. `useForm` will use what is passed to `<Refine>` as default but a local value will override it.

<br/>

### Return values

| Property        | Description                                             | Type                                                                             |
| --------------- | ------------------------------------------------------- | -------------------------------------------------------------------------------- | --- |
| form            | Ant Design form instance                                | [`FormInstance`](https://ant.design/components/form/#FormInstance)               |
| formProps       | Ant Design form props                                   | [`FormProps`](https://ant.design/components/form/#Form)                          |
| saveButtonProps | Props for a submit button                               | `{ disabled: boolean; onClick: () => void; loading?:boolean; }`                  |
| queryResult     | Result of the query of a record                         | [`QueryObserverResult<T>`](https://react-query.tanstack.com/reference/useQuery)  |
| mutationResult  | Result of the mutation triggered by submitting the form | [`UseMutationResult<T>`](https://react-query.tanstack.com/reference/useMutation) |
| formLoading     | Loading state of form request                           | `boolean`                                                                        |
| cloneId         | Record id for clone action                              | `"string"` \| `"number"`                                                         |
| setCloneId      | `cloneId` setter                                        | `Dispatch<SetStateAction<` `string` \| `number` \| `undefined>>`                 |
| editId          | Record id for edit action                               | `"string"` \| `"number"`                                                         |     |
| setEditId       | `editId` setter                                         | `Dispatch<SetStateAction<` `string` \| `number` \| `undefined>>`                 |

### Type Parameters

| Property   | Desription                                                       | Default                    |
| ---------- | ---------------------------------------------------------------- | -------------------------- |
| TData      | Result data of the query that extends [`BaseRecord`][BaseRecord] | [`BaseRecord`][BaseRecord] |
| TError     | Custom error object that extends [`HttpError`][HttpError]        | [`HttpError`][HttpError]   |
| TVariables | Values for params.                                               | `{}`                       |

## Live Codesandbox Example

<iframe src="https://codesandbox.io/embed/refine-use-form-example-vn13r?autoresize=1&fontsize=14&theme=dark&view=preview"
    style={{width: "100%", height:"80vh", border: "0px", borderRadius: "8px", overflow:"hidden"}}
    title="refine-use-form-example"
    allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
    sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
></iframe>

[BaseRecord]: /api-references/interfaces.md#baserecord
[HttpError]: /api-references/interfaces.md#httperror
