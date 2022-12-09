---
id: breadcrumb
title: Breadcrumb
swizzle: true
---

```tsx live shared
const { default: routerProvider } = RefineReactRouterV6;
const { default: simpleRest } = RefineSimpleRest;
setRefineProps({
    routerProvider,
    dataProvider: simpleRest("https://api.fake-rest.refine.dev"),
    Layout: RefineChakra.Layout,
    Sider: () => null,
    DashboardPage: () => <p>Dashboard Page</p>,
});

const Wrapper = ({ children }) => {
    return (
        <RefineChakra.ChakraProvider theme={RefineChakra.refineTheme}>
            {children}
        </RefineChakra.ChakraProvider>
    );
};

const PostIcon = (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        className="icon icon-tabler icon-tabler-list"
        width={18}
        height={18}
        viewBox="0 0 24 24"
        strokeWidth="2"
        stroke="currentColor"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
    >
        <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
        <line x1={9} y1={6} x2={20} y2={6}></line>
        <line x1={9} y1={12} x2={20} y2={12}></line>
        <line x1={9} y1={18} x2={20} y2={18}></line>
        <line x1={5} y1={6} x2={5} y2="6.01"></line>
        <line x1={5} y1={12} x2={5} y2="12.01"></line>
        <line x1={5} y1={18} x2={5} y2="18.01"></line>
    </svg>
);
```

A breadcrumb displays the current location within a hierarchy. It allows going back to states higher up in the hierarchy. `<Breadcrumb>` component built with Chakra UI [Breadcrumb][chakra-ui-breadcrumb] components using the [`useBreadcrumb`](/api-reference/core/hooks/useBreadcrumb.md) hook.

:::info-tip Swizzle
You can swizzle this component to customize it with the [**refine CLI**](/docs/packages/documentation/cli)
:::

## Properties

### `breadcrumbProps`

`<Breadcrumb>` component uses the Chakra UI [Breadcrumb][chakra-ui-breadcrumb] component so it can be configured with the `breadcrumbProps` property.

```tsx live url=http://localhost:3000/posts/show/123 previewHeight=280px
setInitialRoutes(["/posts/show/123"]);
import { Refine } from "@pankod/refine-core";
import { ShowButton } from "@pankod/refine-chakra-ui";

// visible-block-start
import { Show, Breadcrumb } from "@pankod/refine-chakra-ui";

const PostShow: React.FC = () => {
    return (
        <Show
            // highlight-next-line
            breadcrumb={<Breadcrumb breadcrumbProps={{ separator: "-" }} />}
        >
            <p>Rest of your page here</p>
        </Show>
    );
};
// visible-block-end

const App = () => {
    return (
        <Refine
            resources={[
                {
                    name: "posts",
                    show: PostShow,
                    list: () => (
                        <RefineChakra.VStack alignItems="flex-start">
                            <RefineChakra.Text>
                                This page is empty.
                            </RefineChakra.Text>
                            <ShowButton colorSheme="black" recordItemId="123">
                                Show Item 123
                            </ShowButton>
                        </RefineChakra.VStack>
                    ),
                    icon: PostIcon,
                },
            ]}
        />
    );
};
render(
    <Wrapper>
        <App />
    </Wrapper>,
);
```

### `showHome`

If your application has a [DashboardPage](/api-reference/core/components/refine-config.md#dashboardpage), the home button is shown to the top of the hierarchy by default. If you don't want to show the home button, you can set `showHome` to `false`.

```tsx live url=http://localhost:3000/posts/show/123 previewHeight=280px
setInitialRoutes(["/posts/show/123"]);
import { Refine } from "@pankod/refine-core";
import { ShowButton } from "@pankod/refine-chakra-ui";

// visible-block-start
import { Show, Breadcrumb } from "@pankod/refine-chakra-ui";

const PostShow: React.FC = () => {
    return (
        <Show
            // highlight-next-line
            breadcrumb={<Breadcrumb showHome={false} />}
        >
            <p>Rest of your page here</p>
        </Show>
    );
};
// visible-block-end

const App = () => {
    return (
        <Refine
            resources={[
                {
                    name: "posts",
                    show: PostShow,
                    list: () => (
                        <RefineChakra.VStack>
                            <RefineChakra.Text>
                                This page is empty.
                            </RefineChakra.Text>
                            <ShowButton bg="white" recordItemId="123">
                                Show Item 123
                            </ShowButton>
                        </RefineChakra.VStack>
                    ),
                    icon: PostIcon,
                },
            ]}
        />
    );
};
render(
    <Wrapper>
        <App />
    </Wrapper>,
);
```

### `hideIcons`

If you don't want to show the resource icons on the breadcrumb, you can set `hideIcons` to `true`.

```tsx live url=http://localhost:3000/posts/show/123 previewHeight=280px
setInitialRoutes(["/posts/show/123"]);
import { Refine } from "@pankod/refine-core";
import { ShowButton } from "@pankod/refine-chakra-ui";

// visible-block-start
import { Show, Breadcrumb } from "@pankod/refine-chakra-ui";

const PostShow: React.FC = () => {
    return (
        <Show
            // highlight-next-line
            breadcrumb={<Breadcrumb hideIcons />}
        >
            <p>Rest of your page here</p>
        </Show>
    );
};
// visible-block-end

const App = () => {
    return (
        <Refine
            resources={[
                {
                    name: "posts",
                    show: PostShow,
                    list: () => (
                        <RefineChakra.VStack alignItems="flex-start">
                            <RefineChakra.Text>
                                This page is empty.
                            </RefineChakra.Text>
                            <ShowButton colorScheme="black" recordItemId="123">
                                Show Item 123
                            </ShowButton>
                        </RefineChakra.VStack>
                    ),
                    icon: PostIcon,
                },
            ]}
        />
    );
};
render(
    <Wrapper>
        <App />
    </Wrapper>,
);
```

## API Reference

### Properties

<PropsTable module="@pankod/refine-chakra-ui/Breadcrumb" />

[chakra-ui-breadcrumb]: https://chakra-ui.com/docs/components/breadcrumb/usage