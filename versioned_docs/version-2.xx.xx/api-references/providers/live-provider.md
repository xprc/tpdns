---
id: live-provider
title: Live Provider
---

## Overview

**refine** lets you add Realtime support to your app via `liveProvider` prop for [`<Refine>`](api-references/components/refine-config.md). It can be used to update and show data in Realtime throughout your app. **refine** remains agnostic in its API to allow different solutions([Ably](https://ably.com), [Socket.IO](https://socket.io/), [Mercure](https://mercure.rocks/), [supabase](https://supabase.com), etc.) to be integrated.

A live provider must include following methods:

```ts
const liveProvider = {
    subscribe: ({ channel, params: { ids }, types, callback }) => any,
    unsubscribe: (subscription) => void,
    publish?: (event) => void,
};
```

:::note
**refine** uses these methods in [`useSubscription`](/api-references/hooks/live/useSubscription.md) and [`usePublish`](/api-references/hooks/live/usePublish.md).
:::

:::tip
**refine** includes out-of-the-box live providers to use in your projects like:

-   **Ably** &#8594 [Source Code](https://github.com/refinedev/refine/blob/master/packages/ably/src/index.ts) - [Demo](https://codesandbox.io/s/refine-ably-example-u9wg9)
-   **Supabase** &#8594 [Source Code](https://github.com/refinedev/refine/blob/master/packages/supabase/src/index.ts#L187)
-   **Appwrite** &#8594 [Source Code](https://github.com/refinedev/refine/blob/master/packages/appwrite/src/index.ts#L252)

:::

## Usage

You must pass a live provider to the `liveProvider` prop of `<Refine>`.

```tsx title="App.tsx"
import { Refine } from "@pankod/refine";

import liveProvider from "./liveProvider";

const App: React.FC = () => {
    return <Refine liveProvider={liveProvider} />;
};
```

## Creating a live provider

We will build **"Ably Live Provider"** of [`@pankod/refine-ably`](https://github.com/refinedev/refine/tree/master/packages/ably) from scratch to show the logic of how live provider methods interact with Ably.

### `subscribe`

This method is used to subscribe to a Realtime channel. **refine** subscribes to the related channels using subscribe method in supported hooks. This way it can be aware of data changes.

```ts title="liveProvider.ts"
import { LiveProvider, LiveEvent } from "@pankod/refine";
import Ably from "ably/promises";
import { Types } from "ably";

interface MessageType extends Types.Message {
    data: LiveEvent;
}

const liveProvider = (client: Ably.Realtime): LiveProvider => {
    return {
        // highlight-start
        subscribe: ({ channel, types, params, callback }) => {
            const channelInstance = client.channels.get(channel);

            const listener = function (message: MessageType) {
                if (types.includes("*") || types.includes(message.data.type)) {
                    if (
                        message.data.type !== "created" &&
                        params?.ids !== undefined &&
                        message.data?.payload?.ids !== undefined
                    ) {
                        if (
                            params.ids.filter((value) =>
                                message.data.payload.ids!.includes(value),
                            ).length > 0
                        ) {
                            callback(message.data as LiveEvent);
                        }
                    } else {
                        callback(message.data);
                    }
                }
            };
            channelInstance.subscribe(listener);

            return { channelInstance, listener };
        },
        // highlight-end
    };
};
```

#### Parameter Types

| Name     | Type                                                                  | Default |
| -------- | --------------------------------------------------------------------- | ------- |
| channel  | `string`                                                              |         |
| types    | `Array<"deleted"` \| `"updated"` \| `"created"` \| "`*`" \| `string`> | `["*"]` |
| params   | `{ids?: string[]; [key: string]: any;}`                               |         |
| callback | `(event: LiveEvent) => void;`                                         |         |

> [`LiveEvent`](api-references/interfaces.md#liveevent)

#### Return Type

| Type  |
| ----- |
| `any` |

:::caution
The values returned from the `subscribe` method are passed to the `unsubscribe` method. Thus values needed for `unsubscription` must be returned from `subscribe` method.
:::

<br/>

**refine** will use this subscribe method in the [`useSubscription`](/api-references/hooks/live/useSubscription.md) hook.

```ts
import { useSubscription } from "@pankod/refine";

useSubscription({
    channel: "channel-name",
    onLiveEvent: (event) => {},
});
```

> [Refer to the useSubscription documentation for more information. &#8594](/api-references/hooks/live/useSubscription.md)

<br />

### `unsubscribe`

This method is used to unsubscribe from a channel. The values returned from the `subscribe` method are passed to the `unsubscribe` method.

```ts title="liveProvider.ts"
const liveProvider = (client: Ably.Realtime): LiveProvider => {
    return {
        // highlight-start
        unsubscribe: (payload: {
            channelInstance: Types.RealtimeChannelPromise;
            listener: () => void;
        }) => {
            const { channelInstance, listener } = payload;
            channelInstance.unsubscribe(listener);
        },
        // highlight-end
    };
};
```

:::caution
If you don't handle unsubscription it could lead to memory leaks.
:::

#### Parameter Types

| Name         | Type  | Description                              |
| ------------ | ----- | ---------------------------------------- |
| subscription | `any` | The values returned from the `subscribe` |

#### Return Type

| Type   |
| ------ |
| `void` |

<br/>

### `publish`

This method is used to publish an event on client side. Beware that publishing events on client side is not recommended and best practice is to publish events from server side. You can refer [Publish Events from API](#publish-events-from-api) to see which events must be published from the server.

This `publish` is used in [realated hooks](#publish-events-from-hooks). When `publish` is used, subscribers to these events are notifyed. You can also publish your custom events using [`usePublish`](/api-references/hooks/live/usePublish.md).

```ts title="liveProvider.ts"
const liveProvider = (client: Ably.Realtime): LiveProvider => {
    return {
        // highlight-start
        publish: (event: LiveEvent) => {
            const channelInstance = client.channels.get(event.channel);

            channelInstance.publish(event.type, event);
        },
        // highlight-end
    };
};
```

:::caution
If `publish` is used on client side you must handle the security of it by yourself.
:::

#### Parameter Types

| Name  | Type        |
| ----- | ----------- |
| event | `LiveEvent` |

> [`LiveEvent`](api-references/interfaces.md#liveevent)

#### Return Type

| Type   |
| ------ |
| `void` |

<br/>

**refine** will provide this publish method via the [`usePublish`](/api-references/hooks/live/usePublish.md) hook.

```ts
import { usePublish } from "@pankod/refine";

const publish = usePublish();
```

> [Refer to the usePublish documentation for more information. &#8594](/api-references/hooks/live/usePublish.md)

## `liveMode`

`liveMode` must be passed to either `<Refine>` or [supported hooks](#supported-hooks) for `liveProvider` to work. If it's not provided live features won't be activated. Passing it to `<Refine>` configures it app wide and hooks will use this option. It can also be passed to hooks directly without passing to `<Refine>` for detailed configuration. If both are provided value passed to the hook will override the value at `<Refine>`.

#### Usage in `<Refine>`:

```tsx title="App.tsx"
// ...

const App: React.FC = () => {
    return <Refine liveProvider={liveProvider} liveMode="auto" />;
};
```

#### Usage in a hook:

```tsx
const { data } = useList({ liveMode: "auto" });
```

### `auto`

Queries of related resource are invalidated in Realtime as new events from subscription arrive.  
For example data from a `useTable` hook will be automatically updated when data is changed.

### `manual`

Queries of related resource are **not invalidated** in Realtime, instead [`onLiveEvent`](#onliveevent) is run with the `event` as new events from subscription arrive.  
For example while in an edit form, it would be undesirable for data shown to change. `manual` mode can be used to prevent data from changing.

### `off`

Disables live mode.  
For example it can be used to disable some parts of the app if you have app wide live mode configuration in `<Refine>`.

## `onLiveEvent`

Callback that is run when new events from subscription arrive. It can be passed to both `<Refine>` and [supported hooks](#supported-hooks).

### `<Refine>`

`onLiveEvent` passed to `<Refine>` will run every time when a new event occurs if `liveMode` is not `off`. It can be used for actions that are generally applicable to all events from active subscriptions.

```tsx title="App.tsx"
// ...

const App: React.FC = () => {
    return (
        <Refine
            liveProvider={liveProvider}
            liveMode="auto"
            onLiveEvent={(event) => {
                // Put your own logic based on event
            }}
        />
    );
};
```

### Hooks

`onLiveEvent` passed to hooks runs when `liveMode` is not `off`. It is run with the event for related channel.

```tsx
const { data } = useList({
    liveMode: "manual",
    onLiveEvent: (event) => {
        // Put your own logic based on event
    },
});
```

## Supported Hooks

| Supported data hooks                                     | Supported form hooks                                                 | Supported other hooks                                                       |
| -------------------------------------------------------- | -------------------------------------------------------------------- | --------------------------------------------------------------------------- |
| [`useList` &#8594](api-references/hooks/data/useList.md) | [`useForm` &#8594](api-references/hooks/form/useForm.md)             | [`useTable` &#8594](api-references/hooks/table/useTable.md)                 |
| [`useOne` &#8594](api-references/hooks/data/useOne.md)   | [`useModalForm` &#8594](api-references/hooks/form/useModalForm.md)   | [`useEditableTable` &#8594](api-references/hooks/table/useEditableTable.md) |
| [`useMany` &#8594](api-references/hooks/data/useMany.md) | [`useDrawerForm` &#8594](api-references/hooks/form/useDrawerForm.md) | [`useSimpleList` &#8594](api-references/hooks/show/useSimpleList.md)        |
|                                                          | [`useStepsForm` &#8594](api-references/hooks/form/useStepsForm.md)   | [`useShow` &#8594](api-references/hooks/show/useShow.md)                    |
|                                                          |                                                                      | [`useCheckboxGroup` &#8594](api-references/hooks/field/useCheckboxGroup.md) |
|                                                          |                                                                      | [`useSelect` &#8594](api-references/hooks/field/useSelect.md)               |
|                                                          |                                                                      | [`useRadioGroup` &#8594](api-references/hooks/field/useRadioGroup.md)       |

## Supported Hooks Subscriptions

Supported hooks subscribe in the following way:

### `useList`

```ts
useList({ resource: "posts" });
```

```ts
{
    types: ["*"],
    channel: "resources/posts"
}
```

:::tip
Following hooks uses `useList` under the hood and subscribe to same event.

-   [`useTable`](api-references/hooks/table/useTable.md)
-   [`useEditableTable`](api-references/hooks/table/useEditableTable.md)
-   [`useSimpleList`](api-references/hooks/show/useSimpleList.md)
-   [`useCheckboxGroup`](api-references/hooks/field/useCheckboxGroup.md)
-   [`useSelect`](api-references/hooks/field/useSelect.md)
-   [`useRadioGroup`](api-references/hooks/field/useRadioGroup.md)

:::

### `useOne`

```ts
useOne({ resource: "posts", id: "1" });
```

```ts
{
    types: ["*"],
    channel: "resources/posts",
    params: { ids: ["1"] }
}
```

:::tip
Following hooks uses `useOne` under the hood and subscribe to same event.

-   [`useForm`](api-references/hooks/form/useForm.md)
-   [`useModalForm`](api-references/hooks/form/useModalForm.md)
-   [`useDrawerForm`](api-references/hooks/form/useDrawerForm.md)
-   [`useStepsForm`](api-references/hooks/form/useStepsForm.md)
-   [`useShow`](api-references/hooks/show/useShow.md)

:::

### `useMany`

```ts
useMany({ resource: "posts", ids: ["1", "2"] });
```

```ts
{
    types: ["*"],
    channel: "resources/posts"
    params: { ids: ["1", "2"] }
}
```

:::tip
Following hooks uses `useMany` under the hood and subscribe to same event.

-   [`useSelect`](api-references/hooks/field/useSelect.md)

:::

## Publish Events from Hooks

**refine** publishes these events in the hooks. Let's see usage of hooks and what kind of events are published:

### `useCreate`

```ts
const { mutate } = useCreate();

mutate({
    resource: "posts",
    values: {
        title: "New Post",
    },
});
```

```ts title="Published event"
{
    channel: `resources/posts`,
    type: "created",
    payload: {
        ids: ["id-of-created-post"]
    },
    date: new Date(),
}
```

### `useCreateMany`

```ts
const { mutate } = useCreateMany();

mutate({
    resource: "posts",
    values: [
        {
            title: "New Post",
        },
        {
            title: "Another New Post",
        },
    ],
});
```

```ts title="Published event"
{
    channel: `resources/posts`,
    type: "created",
    payload: {
        ids: ["id-of-new-post", "id-of-another-new-post"]
    },
    date: new Date(),
}
```

### `useDelete`

```ts
const { mutate } = useDelete();

mutate({
    resource: "posts",
    id: "1",
});
```

```ts title="Published event"
{
    channel: `resources/posts`,
    type: "deleted",
    payload: {
        ids: ["1"]
    },
    date: new Date(),
}
```

### `useDeleteMany`

```ts
const { mutate } = useDeleteMany();

mutate({
    resource: "posts",
    ids: ["1", "2"],
});
```

```ts title="Published event"
{
    channel: `resources/posts`,
    type: "deleted",
    payload: {
        ids: ["1", "2"]
    },
    date: new Date(),
}
```

### `useUpdate`

```ts
const { mutate } = useUpdate();

mutate({
    resource: "posts",
    id: "2",
    values: { title: "New Post Title" },
});
```

```ts title="Published event"
{
    channel: `resources/posts`,
    type: "updated",
    payload: {
        ids: ["1"]
    },
    date: new Date(),
}
```

### `useUpdateMany`

```ts
const { mutate } = useUpdateMany();

mutate({
    resource: "posts",
    ids: ["1", "2"],
    values: { title: "New Post Title" },
});
```

```ts title="Published event"
{
    channel: `resources/posts`,
    type: "updated",
    payload: {
        ids: ["1", "2"]
    },
    date: new Date(),
}
```

## Publish Events from API

Publishing in client side must be avoided generally. It's recommended to handle it in server side. Events published from the server must be in the following ways:

-   When creating a record:

```ts
{
    channel: `resources/${resource}`,
    type: "created",
    payload: {
        ids: [id]
    },
    date: new Date(),
}
```

-   When deleting a record:

```ts
{
    channel: `resources/${resource}`,
    type: "deleted",
    payload: {
        ids: [id]
    },
    date: new Date(),
}
```

-   When updating a record:

```ts
{
    channel: `resources/${resource}`,
    type: "updated",
    payload: {
        ids: [id]
    },
    date: new Date(),
}
```
