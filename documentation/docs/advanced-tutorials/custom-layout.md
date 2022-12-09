---
id: custom-layout
title: Custom Layout
---

You can create custom layouts using [`<Refine>`][refine] and [`<LayoutWrapper>`][layoutwrapper] components.

Both of these components can accept the listed props for customization. [`<Refine>`][refine] being for global customization and the [`<LayoutWrapper>`][layoutwrapper] being for local.

-   [`Layout`][layout]
-   [`Sider`][sider]
-   [`Footer`][footer]
-   [`Header`][header]
-   [`OffLayoutArea`][offlayoutarea]
-   [`Title`][title]

## Usage

:::caution
To make this example more visual, we used the [`@pankod/refine-antd`](https://github.com/refinedev/refine/tree/master/packages/refine-antd) package. If you are using Refine headless, you need to provide the components, hooks or helpers imported from the [`@pankod/refine-antd`](https://github.com/refinedev/refine/tree/master/packages/refine-antd) package.
:::

Let's look at an example of modifying the default layout to have a top menu layout.

```tsx title="/src/App.tsx"
import { Refine } from "@pankod/refine-core";
import { AntdLayout, ReadyPage, notificationProvider, ErrorComponent } from "@pankod/refine-antd";
import routerProvider from "@pankod/refine-react-router-v6";
import dataProvider from "@pankod/refine-simple-rest";

import "@pankod/refine-antd/dist/styles.min.css";

import { PostList } from "pages/posts";
// highlight-next-line
import { CustomSider } from "components";

const { Link } = routerProvider;

const API_URL = "https://api.fake-rest.refine.dev";

const App: React.FC = () => {
    return (
        <Refine
            routerProvider={routerProvider}
            dataProvider={dataProvider(API_URL)}
// highlight-start
            Layout={({ children, Footer, OffLayoutArea }) => (
                <AntdLayout>
                    <AntdLayout.Header>
                        <CustomSider />
                    </AntdLayout.Header>
                    <AntdLayout.Content>
                        <AntdLayout.Content>
                            <div style={{ padding: 24, minHeight: 360 }}>
                                {children}
                            </div>
                        </AntdLayout.Content>
                        {Footer && <Footer />}
                    </AntdLayout.Content>
                    {OffLayoutArea && <OffLayoutArea />}
                </AntdLayout>
            )}
// highlight-end
            Title={() => (
                <Link to="/" style={{ float: "left", marginRight: "10px" }}>
                    <img src="/refine.svg" alt="Refine" />
                </Link>
            )}
            ReadyPage={ReadyPage}
            notificationProvider={notificationProvider}
            catchAll={<ErrorComponent />}
        />
    );
};

export default App;
```

Here, we override the [`<Title>`][title] and [`<Layout>`][layout] components. When we override [`<Layout>`][layout], we put the `<CustomSider>` (insted of the [`<Sider>`][sider] that was provided to [`<Layout>`][layout] to render it by default) on top of [`<AntdLayout>`][antdlayout].

So, we just provided a custom [`<Sider>`][sider]. Here's our custom sider that looks horizontal, instead of the default vertical one:

```tsx  title="/src/components/sider/index.tsx"
import { useTitle, useMenu } from "@pankod/refine-core";
import { Menu } from "@pankod/refine-antd";
import routerProvider from "@pankod/refine-react-router-v6";

const { Link } = routerProvider;

export const CustomSider: React.FC = () => {
// highlight-start
    const Title = useTitle();
    const { menuItems, selectedKey } = useMenu();
// highlight-end

    return (
        <>
// highlight-start
            {Title && <Title collapsed={false} />}
            <Menu selectedKeys={[selectedKey]} mode="horizontal">
                {menuItems.map(({ icon, route, label }) => (
                    <Menu.Item key={route} icon={icon}>
                        <Link to={route ?? ""}>{label}</Link>
                    </Menu.Item>
                ))}
            </Menu>
// highlight-end
        </>
    );
};
```

Here, we use [`useMenu`][usemenu] hook to get the list of current resources and print it.

:::info
By default, [`<Sider>`][sider] is responsible for rendering [`<Title>`][title]. It gets this component (configured by [`<Refine>`][refine] and/or [`<LayoutWrapper>`][layoutwrapper]) by [`useTitle`][usetitle] hook.
:::

:::info
This example demonstrated how to configure a global layout. To learn how to use global layout in custom pages and make local modifications per page, [refer to the `<LayoutWrapper>` docs. &#8594][layoutwrapper]
:::

## Live StackBlitz Example

Here's how it looks in the end:

<iframe loading="lazy" src="https://stackblitz.com/github/refinedev/refine/tree/master/examples/customization/topMenuLayout?embed=1&view=preview&theme=dark&preset=node&ctl=1"
    style={{width: "100%", height:"80vh", border: "0px", borderRadius: "8px", overflow:"hidden"}}
    title="refine-top-menu-layout-example"
></iframe>

[refine]: /api-reference/core/components/refine-config.md
[layout]: /api-reference/core/components/refine-config.md#layout
[sider]: /api-reference/core/components/refine-config.md#sider
[footer]: /api-reference/core/components/refine-config.md#footer
[header]: /api-reference/core/components/refine-config.md#header
[offlayoutarea]: /api-reference/core/components/refine-config.md#offlayoutarea
[title]: /api-reference/core/components/refine-config.md#title
[layoutwrapper]: /api-reference/core/components/layout-wrapper.md
[custom page example]: /advanced-tutorials/custom-pages.md
[custom page example code]: /examples/customization/topMenuLayout.md
[antdlayout]: https://ant.design/components/layout/
[usemenu]: /api-reference/core/hooks/ui/useMenu.md
[usetitle]: /api-reference/core/hooks/refine/useTitle.md
