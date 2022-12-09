---
id: useCan
title: useCan
siderbar_label: useCan
---

## Usage

`useCan` uses the `can` as the query function for **react-query**'s `useQuery`. It takes the parameters that `can` takes. It can also be configured with `queryOptions` for `useQuery`. Returns the result of `useQuery`.

```tsx
import { useCan } from "@pankod/refine-core";

const { data } = useCan({
    resource: "resource-you-ask-for-access",
    action: "action-type-on-resource",
    params: { foo: "optional-params" },
});
```

## Performance

As the number of points that checks for access control in your app increases the performance of your app may take a hit especially if its access control involves remote endpoints. Caching the access control checks helps a great deal. Since **refine** uses react-query it can be easily done configuring [`staleTime` and `cacheTime`](https://react-query.tanstack.com/reference/useQuery) properties.

```ts
import { useCan } from "@pankod/refine-core";

// inside your component

const { data } = useCan({
    resource: "resource-you-ask-for-access",
    action: "action-type-on-resource",
    params: { foo: "optional-params" } },
    queryOptions: {
        staleTime: 5 * 60 * 1000, // 5 minutes
    }
);
```

## API

### Properties

<PropsTable module="@pankod/refine-core/useCan"  />

### Type Parameters

| Property                                                         | Desription                                                                          |
| ---------------------------------------------------------------- | ----------------------------------------------------------------------------------- |
| [CanReturnType](/api-reference/core/interfaces.md#canreturntype) | Result data of the query [`HttpError`](/api-reference/core/interfaces.md#httperror) |

### Return values

| Description                              | Type                                                                                                   |
| ---------------------------------------- | ------------------------------------------------------------------------------------------------------ |
| Result of the `react-query`'s `useQuery` | [`QueryObserverResult<{ data: CanReturnType; }>`](https://react-query.tanstack.com/reference/useQuery) |
