---
id: real-time
title: Live / Realtime
---

import realTimeDemo from '@site/static/img/guides-and-concepts/real-time/real-time.gif';
import manualMode from '@site/static/img/guides-and-concepts/real-time/manual-mode.gif';
import customSider from '@site/static/img/guides-and-concepts/real-time/custom-sider.gif';

**refine** lets you add Realtime support to your app via `liveProvider` prop for [`<Refine>`](/api-reference/core/components/refine-config.md). It can be used to update and show data in Realtime throughout your app. **refine** remains agnostic in its API to allow different solutions([Ably](https://ably.com), [Socket.IO](https://socket.io/), [Mercure](https://mercure.rocks/), [supabase](https://supabase.com), etc.) to be integrated.

[Refer to the Live Provider documentation for detailed information. &#8594](/api-reference/core/providers/live-provider.md)

We will be using [Ably](https://ably.com) in this guide to provide Realtime features.

## Installation

We need to install Ably live provider package from **refine**.

```bash
npm install @pankod/refine-ably
```

:::caution
To make this example more visual, we used the [`@pankod/refine-antd`](https://github.com/refinedev/refine/tree/master/packages/refine-antd) package. If you are using Refine headless, you need to provide the components, hooks or helpers imported from the [`@pankod/refine-antd`](https://github.com/refinedev/refine/tree/master/packages/refine-antd) package.
:::

## Setup

Since we will need `apiKey` from Ably, you must first register and get the key from [Ably](https://ably.com).

The app will have one resource: **posts** with [CRUD pages(list, create, edit and show) similar to base example](https://github.com/refinedev/refine/tree/master/examples/base/antd/src/pages/posts).

[You can also refer to StackBlitz to see final state of the app &#8594](#live-stackblitz-example)

## Adding `liveProvider`

Firstly we create a ably client for [`@pankod/refine-ably`](https://github.com/refinedev/refine/tree/master/packages/ably) live provider.

```ts title="src/utility/ablyClient.ts"
import { Ably } from "@pankod/refine-ably";

export const ablyClient = new Ably.Realtime("your-api-key");
```

Then pass `liveProvider` from [`@pankod/refine-ably`](https://github.com/refinedev/refine/tree/master/packages/ably) to `<Refine>`.

```tsx title="src/App.tsx"
import { Refine } from "@pankod/refine-core";
import {
    Layout,
    ReadyPage,
    notificationProvider,
    ErrorComponent,
} from "@pankod/refine-antd";
import dataProvider from "@pankod/refine-simple-rest";
import routerProvider from "@pankod/refine-react-router-v6";

import "@pankod/refine-antd/dist/styles.min.css";

//highlight-next-line
import { liveProvider } from "@pankod/refine-ably";

//highlight-next-line
import { ablyClient } from "utility/ablyClient";
import { PostList, PostCreate, PostEdit, PostShow } from "pages/posts";

const App: React.FC = () => {
    return (
        <Refine
            routerProvider={routerProvider}
            dataProvider={dataProvider("https://api.fake-rest.refine.dev")}
            Layout={Layout}
            ReadyPage={ReadyPage}
            notificationProvider={notificationProvider}
            catchAll={<ErrorComponent />}
            //highlight-start
            liveProvider={liveProvider(ablyClient)}
            options={{ liveMode: "auto" }}
            //highlight-end
            resources={[
                {
                    name: "posts",
                    list: PostList,
                    create: PostCreate,
                    edit: PostEdit,
                    show: PostShow,
                    canDelete: true,
                },
            ]}
        />
    );
};

export default App;
```

:::note

For live features to work automatically we added `liveMode: "auto"` in `options` prop.

[Refer to the Live Provider documentation for detailed information. &#8594](/api-reference/core/providers/live-provider.md#livemode)
:::

<br/>
<div class="img-container">
    <div class="window">
        <div class="control red"></div>
        <div class="control orange"></div>
        <div class="control green"></div>
    </div>
    <img src={realTimeDemo} alt="Realtime Demo" />
</div>

## Configuring `liveMode`

We may not want to make Realtime changes instantly in some cases. In these cases we can use `manual` mode to prevent the data changing instantly. Then we can handle the event manually.

For example in an edit page for a record, It would be better to handle Realtime data manually to prevent synchronization problems caused by multiple editing sources. We would not want the data changing while we are trying to edit a record.

We will be alerting about changes in an alert box on top of the form instead of changing the data instantly.

```tsx title="src/pages/posts/edit.tsx"
// ...

export const PostEdit: React.FC = () => {
    //highlight-start
    const [deprecated, setDeprecated] =
        useState<"deleted" | "updated" | undefined>();
    //highlight-end

    const { formProps, saveButtonProps, queryResult } = useForm<IPost>({
        //highlight-start
        liveMode: "manual",
        onLiveEvent: (event) => {
            if (event.type === "deleted" || event.type === "updated") {
                setDeprecated(event.type);
            }
        },
        //highlight-end
    });

    //highlight-start
    const handleRefresh = () => {
        queryResult?.refetch();
        setDeprecated(undefined);
    };
    //highlight-end

    // ...

    return (
        <Edit /* ... */>
            //highlight-start
            {deprecated === "deleted" && (
                <Alert
                    message="This post is deleted."
                    type="warning"
                    style={{ marginBottom: 20 }}
                    action={<ListButton size="small" />}
                />
            )}
            {deprecated === "updated" && (
                <Alert
                    message="This post is updated. Refresh to see changes."
                    type="warning"
                    style={{ marginBottom: 20 }}
                    action={
                        <RefreshButton size="small" onClick={handleRefresh} />
                    }
                />
            )}
            //highlight-end
            <Form {...formProps} layout="vertical">
                // ....
            </Form>
        </Edit>
    );
};
```

:::note

We can also implement similar thing in show page.

[Refer to the StackBlitz example for detailed information. &#8594](#live-stackblitz-example)
:::

<br/>
<div class="img-container">
    <div class="window">
        <div class="control red"></div>
        <div class="control orange"></div>
        <div class="control green"></div>
    </div>
    <img src={manualMode} alt="Manual Mode Demo" />
</div>

## Custom Subscriptions

You can subscribe to events emitted within **refine** in any place in your app with `useSubscription`.

For example, we can subscribe to **_create_** event for **_posts_** resource and we can show a badge for number of events in the sider menu.

Firstly, let's implement a custom sider like in [this example](/examples/customization/customSider.md).

<details>
<summary>Custom Sider Menu</summary>

```tsx title="src/components/sider.tsx"
import React, { useState } from "react";
import {
    useTitle,
    ITreeMenu,
    CanAccess,
    useRouterContext,
    useMenu,
} from "@pankod/refine-core";
import { AntdLayout, Menu, Grid, Icons } from "@pankod/refine-antd";
import { antLayoutSider, antLayoutSiderMobile } from "./styles";

export const CustomSider: React.FC = () => {
    const [collapsed, setCollapsed] = useState<boolean>(false);
    const { Link } = useRouterContext();
    const Title = useTitle();
    const { menuItems, selectedKey } = useMenu();
    const breakpoint = Grid.useBreakpoint();

    const isMobile =
        typeof breakpoint.lg === "undefined" ? false : !breakpoint.lg;

    const renderTreeView = (tree: ITreeMenu[], selectedKey: string) => {
        return tree.map((item: ITreeMenu) => {
            const { icon, label, route, name, children, parentName } = item;

            if (children.length > 0) {
                return (
                    <SubMenu
                        key={route}
                        icon={icon ?? <Icons.UnorderedListOutlined />}
                        title={label}
                    >
                        {renderTreeView(children, selectedKey)}
                    </SubMenu>
                );
            }
            const isSelected = route === selectedKey;
            const isRoute = !(
                parentName !== undefined && children.length === 0
            );
            return (
                <CanAccess
                    key={route}
                    resource={name.toLowerCase()}
                    action="list"
                >
                    <Menu.Item
                        key={route}
                        style={{
                            fontWeight: isSelected ? "bold" : "normal",
                        }}
                        icon={
                            icon ?? (isRoute && <Icons.UnorderedListOutlined />)
                        }
                    >
                        <Link to={route}>{label}</Link>
                        {!collapsed && isSelected && (
                            <Icons.UnorderedListOutlined />
                        )}
                    </Menu.Item>
                </CanAccess>
            );
        });
    };

    return (
        <AntdLayout.Sider
            collapsible
            collapsedWidth={isMobile ? 0 : 80}
            collapsed={collapsed}
            breakpoint="lg"
            onCollapse={(collapsed: boolean): void => setCollapsed(collapsed)}
            style={isMobile ? antLayoutSiderMobile : antLayoutSider}
        >
            <Title collapsed={collapsed} />
            <Menu
                selectedKeys={[selectedKey]}
                mode="inline"
                onClick={({ key }) => {
                    if (!breakpoint.lg) {
                        setCollapsed(true);
                    }
                }}
            >
                {renderTreeView(menuItems, selectedKey)}
            </Menu>
        </AntdLayout.Sider>
    );
};
```

</details>

Now, let's add a badge for number of create and update events for **_posts_** menu item.

```tsx
import React, { useState } from "react";
import {
    useTitle,
    ITreeMenu,
    CanAccess,
    useMenu,
    //highlight-start
    useSubscription,
    //highlight-end
} from "@pankod/refine-core";
import {
    AntdLayout,
    Menu,
    Grid,
    Icons,
    //highlight-start
    Badge,
    //highlight-end
} from "@pankod/refine-antd";
import { antLayoutSider, antLayoutSiderMobile } from "./styles";

export const CustomSider: React.FC = () => {
    const [subscriptionCount, setSubscriptionCount] = useState(0);
    const [collapsed, setCollapsed] = useState<boolean>(false);
    const { Link } = useRouterContext();
    const Title = useTitle();
    const { menuItems, selectedKey } = useMenu();
    const breakpoint = Grid.useBreakpoint();

    const isMobile =
        typeof breakpoint.lg === "undefined" ? false : !breakpoint.lg;

    //highlight-start
    useSubscription({
        channel: "resources/posts",
        type: ["created", "updated"],
        onLiveEvent: () => setSubscriptionCount((prev) => prev + 1),
    });
    //highlight-end

    const renderTreeView = (tree: ITreeMenu[], selectedKey: string) => {
        return tree.map((item: ITreeMenu) => {
            const { icon, label, route, name, children, parentName } = item;

            if (children.length > 0) {
                return (
                    <SubMenu
                        key={name}
                        icon={icon ?? <Icons.UnorderedListOutlined />}
                        title={label}
                    >
                        {renderTreeView(children, selectedKey)}
                    </SubMenu>
                );
            }
            const isSelected = route === selectedKey;
            const isRoute = !(
                parentName !== undefined && children.length === 0
            );
            return (
                <CanAccess
                    key={route}
                    resource={name.toLowerCase()}
                    action="list"
                >
                    <Menu.Item
                        key={route}
                        style={{
                            fontWeight: isSelected ? "bold" : "normal",
                        }}
                        icon={
                            icon ?? (isRoute && <Icons.UnorderedListOutlined />)
                        }
                    >
                        //highlight-start
                        <div>
                            <Link to={route}>{label}</Link>
                            {label === "Posts" && (
                                <Badge
                                    size="small"
                                    count={subscriptionCount}
                                    offset={[2, -15]}
                                />
                            )}
                        </div>
                        //highlight-end
                    </Menu.Item>
                </CanAccess>
            );
        });
    };

    return (
        <AntdLayout.Sider
            collapsible
            collapsedWidth={isMobile ? 0 : 80}
            collapsed={collapsed}
            breakpoint="lg"
            onCollapse={(collapsed: boolean): void => setCollapsed(collapsed)}
            style={isMobile ? antLayoutSiderMobile : antLayoutSider}
        >
            <Title collapsed={collapsed} />
            <Menu
                selectedKeys={[selectedKey]}
                mode="inline"
                onClick={() => {
                    if (!breakpoint.lg) {
                        setCollapsed(true);
                    }

                    //highlight-start
                    if (key === "/posts") {
                        setSubscriptionCount(0);
                    }
                    //highlight-end
                }}
            >
                {renderTreeView(menuItems, selectedKey)}
            </Menu>
        </AntdLayout.Sider>
    );
};
```

:::tip

You can subscribe to specific `ids` with `params`. For example, you can subscribe to **deleted** and **updated** events from **posts** resource with **id** `1` and `2`.

```tsx
useSubscription({
    channel: "resources/posts",
    type: ["deleted", "updated"],
    //highlight-start
    params: {
        ids: ["1", "2"],
    },
    //highlight-end
    onLiveEvent: () => setSubscriptionCount((prev) => prev + 1),
});
```

:::

<br/>
<div class="img-container">
    <div class="window">
        <div class="control red"></div>
        <div class="control orange"></div>
        <div class="control green"></div>
    </div>
    <img src={customSider} alt="Custom Sider Demo" />
</div>

## Live Condesandbox Example

<iframe loading="lazy" src="https://stackblitz.com/github/refinedev/refine/tree/master/examples/ably/?embed=1&view=preview&theme=dark&preset=node&ctl=1"
    style={{width: "100%", height:"80vh", border: "0px", borderRadius: "8px", overflow:"hidden"}}
    title="refine-ably-example"
></iframe>
