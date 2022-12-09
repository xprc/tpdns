---
id: mutation-mode
title: Mutation Mode
---

import pessimistic from '@site/static/img/guides-and-concepts/mutation-mode/pessimistic.gif';
import optimistic from '@site/static/img/guides-and-concepts/mutation-mode/optimistic.gif';
import undoable from '@site/static/img/guides-and-concepts/mutation-mode/undoable.gif';

## Overview

Mutation mode determines which mode the mutation runs with. Mutations can run under three different modes: `pessimistic`, `optimistic` and `undoable`.  
Each mode corresponds to a different type of user experience.

## Modes

We'll show usages of modes with editing a record examples.

### `pessimistic`

The mutation runs immediately. Redirection and UI updates are executed after the mutation returns successfuly.

<br />

<div class="img-container">
    <div class="window">
        <div class="control red"></div>
        <div class="control orange"></div>
        <div class="control green"></div>
    </div>
    <img src={pessimistic} alt="pessimistic mode" />
</div>

<br />

> When the user clicks on save button, request to the API happens directly and after successful response, list page updates with newly edited record.

<br />

### `optimistic`

The mutation is applied locally, redirection and UI updates are executed immediately as if the mutation is succesful. If mutation returns with error, UI updates to show data prior to the mutation.

<br />

<div class="img-container">
    <div class="window">
        <div class="control red"></div>
        <div class="control orange"></div>
        <div class="control green"></div>
    </div>
    <img src={optimistic} alt="optimistic mode" />
</div>

<br />

> When the user clicks on save button, request to the API happens directly and list page updates with edited data immediately without waiting API response.

<br />

### `undoable`

The mutation is applied locally, redirection and UI updates are executed immediately as if the mutation is succesful. Waits for a customizable amount of timeout period before mutation is applied. During the timeout, mutation can be cancelled from the notification with an undo button and UI will revert back accordingly.

<br />

<div class="img-container">
    <div class="window">
        <div class="control red"></div>
        <div class="control orange"></div>
        <div class="control green"></div>
    </div>
    <img src={undoable} alt="undoable mode" />
</div>

<br />

> When the user clicks on save button, request isn't sent to API immediately however list page updates with edited data. It waits for a period of time while the user can cancel the mutation. If the mutation is cancelled, locally applied edit is undone.

## Usage

Mutation mode can be set application-wide in [`<Refine>`](/api-reference/core/components/refine-config.md#mutationmode) component.

```tsx title="App.tsx"
<Refine
    ...
    options={{ mutationMode: "optimistic" }}
/>
```

> Its default value is `pessimistic`.

<br />

It can also be set in supported [data hooks](/docs/api-reference/core/hooks/data/useUpdate.md#mutation-mode) and [form hooks](/docs/api-reference/core/hooks/useForm.md#properties) for fine-grained configuration.

```tsx
import { useUpdate } from "@pankod/refine-core";

const { mutate } = useUpdate();

mutate({
    resource: "categories",
    id: "2",
    values: { title: "New Category Title" },
    // highlight-next-line
    mutationMode: "optimistic",
});
```

> Mutation mode passed to `<Refine>` will be overriden by the mutation mode passed to data or form hooks and components.

### Supported data hooks

-   [`useUpdate` &#8594](/api-reference/core/hooks/data/useUpdate.md)
-   [`useUpdateMany` &#8594](/api-reference/core/hooks/data/useUpdateMany.md)
-   [`useDelete` &#8594](/api-reference/core/hooks/data/useDelete.md)
-   [`useDeleteMany` &#8594](/api-reference/core/hooks/data/useDeleteMany.md)

<br />

## Live StackBlitz Example

<iframe loading="lazy" src="https://stackblitz.com//refine-example-mutation-mode-yh7nb?embed=1&view=preview&theme=dark&preset=node&ctl=1"
    style={{width: "100%", height:"80vh", border: "0px", borderRadius: "8px", overflow:"hidden"}}
    title="refine-example-mutation-mode"
></iframe>
