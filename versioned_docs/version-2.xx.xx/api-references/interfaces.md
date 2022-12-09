---
id: interfaceReferences
title: Interface References
---

## CrudFilters

[`CrudFilter[]`](#crudfilter)

### CrudFilter

| Key      | Type                              |
| -------- | --------------------------------- |
| field    | `string`                          |
| operator | [`CrudOperators`](#crudoperators) |
| value    | `any`                             |

#### CrudOperators

```ts
"eq" |
    "ne" |
    "lt" |
    "gt" |
    "lte" |
    "gte" |
    "in" |
    "nin" |
    "contains" |
    "ncontains" |
    "containss" |
    "ncontainss" |
    "null";
```

| Type           | Description                     |
| -------------- | ------------------------------- |
| `"eq"`         | Equal                           |
| `"ne"`         | Not equal                       |
| `"lt"`         | Less than                       |
| `"gt"`         | Greater than                    |
| `"lte"`        | Less than or equal to           |
| `"gte"`        | Greater than or equal to        |
| `"in"`         | Included in an array            |
| `"nin"`        | Not included in an array        |
| `"contains"`   | Contains                        |
| `"ncontains"`  | Doesn't contain                 |
| `"containss"`  | Contains, case sensitive        |
| `"ncontainss"` | Doesn't contain, case sensitive |
| `"null"`       | Is null or not null             |

## CrudSorting

[`CrudSort[]`](#crudsort)

### CrudSort

| Key   | Type                 |
| ----- | -------------------- |
| field | `string`             |
| order | `"asc"` \| ` "desc"` |

| `order` type | Description      |
| ------------ | ---------------- |
| `"asc"`      | Ascending order  |
| `"desc"`     | Descending order |

## Pagination

| Key      | Type     |
| -------- | -------- |
| current  | `number` |
| pageSize | `number` |

## BaseRecord

| Key             | Type                 |
| --------------- | -------------------- |
| id?             | `string` \| `number` |
| `[key: string]` | `any`                |

## HttpError

| Key        | Type     |
| ---------- | -------- |
| message    | `string` |
| statusCode | `number` |

## Delete Button Props

ButtonProps

| Key           | Type                                                     |
| ------------- | -------------------------------------------------------- |
| resourceName? | `string`                                                 |
| recordItemId? | `string` \|` number`                                     |
| onSuccess?    | `<TData = BaseRecord>(value: { data: TData; }) => void;` |
| mutationMode? | [`MutationMode`](#mutationmode)                          |
| hideText?     | `boolean`                                                |

## MutationMode

```ts
"pessimistic" | "optimistic" | "undoable";
```

## UploadedFile

| Key     | Type                                                                 |
| ------- | -------------------------------------------------------------------- |
| uid     | `string`                                                             |
| name    | `string`                                                             |
| url     | `string`                                                             |
| type    | `string`                                                             |
| size    | `number`                                                             |
| percent | `number`                                                             |
| status  | `"error"` \| `"success"` \| `"done" `\| `"uploading"` \| `"removed"` |

## SuccessErrorNotification

| Key                 | Type                                                                                 |
| ------------------- | ------------------------------------------------------------------------------------ |
| successNotification | [Notification Properties](https://ant.design/components/notification/#API) & `false` |
| errorNotification   | [Notification Properties](https://ant.design/components/notification/#API) & `false` |

## MetaDataQuery

| Key         | Type                                                       |
| ----------- | ---------------------------------------------------------- |
| [k: string] | `any`                                                      |
| operation?  | `string`                                                   |
| fields?     | `Array<string` \| `object` \| [NestedField](#nestedfield)> |
| variables?  | [VariableOptions](#variableoptions)                        |

### NestedField

| Key       | Type                                                       |
| --------- | ---------------------------------------------------------- |
| operation | `string`                                                   |
| variables | [VariableOptions[]](#querybuilderoptions)                  |
| fields    | `Array<string` \| `object` \| [NestedField](#nestedfield)> |

### QueryBuilderOptions

| Key       | Type                                         |
| --------- | -------------------------------------------- |
| operation | `string`                                     |
| variables | [VariableOptions](#variableoptions)          |
| fields    | `Array<string` \| `object` \| `NestedField>` |

### VariableOptions

| Key         | Type     |
| ----------- | -------- |
| type?       | `string` |
| name?       | `string` |
| value?      | `any`    |
| list?       | `bool`   |
| required?   | `bool`   |
| [k: string] | `any`    |

## PromptProps

| Key          | Type                          |
| ------------ | ----------------------------- |
| message      | `string`                      |
| when?        | `boolean`                     |
| setWarnWhen? | `(warnWhen: boolean) => void` |

## CanParams

| Key      | Type     |
| -------- | -------- |
| resource | `string` |
| action   | `string` |
| params?  | `any`    |

## CanReturnType

| Key     | Type      |
| ------- | --------- |
| can     | `boolean` |
| reason? | `string`  |

## LiveEvent

| Key     | Type                                                                  |
| ------- | --------------------------------------------------------------------- |
| channel | `string`                                                              |
| types   | `Array<"deleted"` \| `"updated"` \| `"created"` \| "`*`" \| `string`> |
| payload | `{ids?: string[]; [x: string]: any; }`                                |
| date    | `Date`                                                                |

## LiveModeProps

| Key          | Type                                   |
| ------------ | -------------------------------------- |
| liveMode?    | `"auto"` \| `"manual"` \| `"off"`      |
| liveParams?  | `{ids?: string[]; [x: string]: any; }` |
| onLiveEvent? | `(event: LiveEvent) => void`           |
