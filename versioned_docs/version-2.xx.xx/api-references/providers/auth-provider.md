---
id: auth-provider
title: Auth Provider
sidebar_label: Auth Provider
---

import login from '@site/static/img/guides-and-concepts/providers/auth-provider/login.png';
import logout from '@site/static/img/guides-and-concepts/providers/auth-provider/logout.gif';
import header from '@site/static/img/guides-and-concepts/providers/auth-provider/header.png';

**refine** let's you set authentication logic by providing the `authProvider` property to the `<Refine>` component.

`authProvider` is an object with methods that **refine** uses when necessary. These methods are needed to return a Promise. They also can be accessed with specialized hooks.

An auth provider must include following methods:

```tsx
const authProvider = {
    login: () => Promise.resolve(),
    logout: () => Promise.resolve(),
    checkAuth: () => Promise.resolve(),
    checkError: () => Promise.resolve(),
    getPermissions: () => Promise.resolve(),
    getUserIdentity: () => Promise.resolve(),
};
```

:::caution
**refine** consumes these methods using [authorization hooks](api-references/hooks/auth/useLogin.md).
Authorization hooks are used to manage authentication and authorization operations like login, logout and catching **HTTP** errors etc.
:::


:::tip
You can find auth provider examples made with **refine**

-   **Auth0** &#8594 [Source Code](https://github.com/refinedev/refine/tree/master/examples/authProvider/auth0/) - [Demo](examples/auth-provider/auth0.md)
-   **Google** &#8594 [Source Code](https://github.com/refinedev/refine/tree/master/examples/authProvider/googleLogin) - [Demo](examples/auth-provider/google-auth.md)
-   **OTP Login** &#8594 [Source Code](https://github.com/refinedev/refine/tree/master/examples/authProvider/otpLogin) - [Demo](examples/auth-provider/otpLogin.md)

:::

## Usage

To use `authProvider` in **refine**, we have to pass the `authProvider` to the `<Refine />` component.

```tsx title="App.tsx"
import { Refine } from "@pankod/refine";
import routerProvider from "@pankod/refine-react-router";
import dataProvider from "@pankod/refine-simple-rest";

// highlight-next-line
import authProvider from "./auth-provider";

const API_URL = "https://api.fake-rest.refine.dev";

const App = () => {
    return (
        <Refine
            // highlight-next-line
            authProvider={authProvider}
            routerProvider={routerProvider}
            dataProvider={dataProvider(API_URL)}
        />
    );
};
```

By default, **refine** doesn't require authentication configuration.

If an `authProvider` property is not provided, **refine** will use the default `authProvider`. This default `authProvider` lets the app work without an authentication requirement.  
If your app doesn't require authentication, no further setup is necessary for the app to work.

## Creating an `authProvider`

We will build a simple `authProvider` from scratch to show the logic of how `authProvider` methods interact with the app.

### `login`

**refine** expects this method to return a resolved Promise if the login is successful, and a rejected Promise if it is not.

-   If the login is successful, pages that require authentication becomes accessible.

-   If the login fails, **refine** displays an error notification to the user.

<br />

Here we show an example `login` method that stores auth data in `localStorage`.
For the sake of simplicity, we'll use mock data and check the user credentials from local storage.

```tsx title="auth-provider.ts"
// highlight-next-line
const mockUsers = [{ username: "admin" }, { username: "editor" }];

const authProvider = {
    // highlight-start
    login: ({ username, password, remember }) => {
        // Suppose we actually send a request to the back end here.
        const user = mockUsers.find((item) => item.username === username);

        if (user) {
            localStorage.setItem("auth", JSON.stringify(user));
            return Promise.resolve();
        }

        return Promise.reject();
    },
    // highlight-end
};
```

<br />

`login` method will be accessible via `useLogin` auth hook.

```tsx
import { useLogin } from "@pankod/refine";

const { mutate: login } = useLogin();

login(values);
```

:::tip
`mutate` acquired from `useLogin` can accept any kind of object for values since `login` method from `authProvider` does not have a restriction on its parameters.  
A type parameter for the values can be provided to `useLogin`.

```tsx
const { mutate: login } =
    useLogin<{ username: string; password: string; remember: boolean }>();
```

:::

> [Refer to useLogin documentation for more information. &#8594](api-references/hooks/auth/useLogin.md)

<br />

#### Default login page

If an `authProvider` is given, refine shows a default login page on `"/"` and `"/login"` routes and a login form if a custom `LoginPage` is not provided.
Rest of the app won't be accessible until successful authentication.  
After submission, login form calls the `login` method from `authProvider`.

<br />

<div class="img-container">
    <div class="window">
        <div class="control red"></div>
        <div class="control orange"></div>
        <div class="control green"></div>
    </div>
    <img src={login} alt="Default Login Page" />
</div>

<br />
<br />

:::caution
If an `authProvider` is given, `resources` passed to `<Refine>` as propery are only accessible if the login is successful. if no `authProvider` was provided, they are accessible without authentication.  
:::

:::tip
[Refer to example on how to customize the default login page.&#8594](/examples/customization/customLogin.md)
:::

<br />

### `logout`

**refine** expects this method to return a resolved Promise if the logout is successful, and a rejected Promise if it is not.

-   If the logout is successful, pages that requires authentication becomes unaccessible.

-   If the logout fails, **refine** displays an error notification to the user.

<br />

Here we show an example `logout` that removes auth data from local storage and returns a resolved promise.

```tsx title="auth-provider.ts"
const authProvider = {
    ...
// highlight-start
    logout: () => {
        localStorage.removeItem("auth");
        return Promise.resolve();
    }
// highlight-end
    ...
}
```

<br />

`logout` method will be accessible via the `useLogout` auth hook.

```tsx
import { useLogout } from "@pankod/refine";

const { mutate: logout } = useLogout();

logout();
```

:::tip
`mutate` acquired from `useLogout` can accept any kind of object for values since `logout` method from `authProvider` doesn't have a restriction on its parameters.  
:::

> [Refer to useLogout documentation for more information. &#8594](api-references/hooks/auth/useLogout.md)

<br />

#### Default logout button

If authentication is enabled, a logout button appears at the bottom of the side bar menu. When the button is clicked, `logout` method from `authProvider` is called.

**refine** redirects the app to `/login` route by default.
<br />

<div class="img-container">
    <div class="window">
        <div class="control red"></div>
        <div class="control orange"></div>
        <div class="control green"></div>
    </div>
    <img src={logout} alt="Logout Action" />
</div>
<br/>

#### Redirection after logout

Redirection url can be customized by returning a route string, or false to disable redirection after logout.

```tsx
const authProvider = {
    ...
    logout: () => {
        localStorage.removeItem("auth");
// highlight-next-line
        return Promise.resolve("custom-url");
    }
}
```

:::tip
Current authentication data needs to be cleaned by the `logout` method. For example, if a token is stored in local storage, `logout` must remove it as shown above.
:::

<br />

### `checkError`

When a [`dataProvider`](api-references/providers/data-provider.md) method returns an error, `checkError` is called with the error object.  
If `checkError` returns a rejected promise, the `logout` method is called and user becomes unauthorized and gets redirected to `/login` page by default.

In this example, we log the user out when **HTTP** error status code is `401`.  
You can decide, depending on any error status code you want to check, if the users continue to process by returning a resolved promise or if they are logged out for rejecting the promise.

```tsx title="auth-provider.ts"
const authProvider = {
    ...
    logout: () => {
        localStorage.removeItem("auth");
        return Promise.resolve();
    },
// highlight-start
    checkError: (error) => {
        if (error.status === 401) {
            return Promise.reject();
        }
        return Promise.resolve();
    },
// highlight-end
   ...
};
```

<br />

`checkError` method will be accessible via the `useCheckError` auth hook.

```tsx
import { useCheckError } from "@pankod/refine";

const { mutate: checkError } = useCheckError();

checkError(error);
```

:::tip
`mutate` acquired from `useLogout` can accept any kind of object for values since `logout` method from `authProvider` doesn't have a restriction on its parameters.  
:::

> [Refer to useCheckError documentation for more information. &#8594](api-references/hooks/auth/useCheckError.md)

<br />

#### Redirection after error

You can override the default redirection by giving a path to the rejected promise.

```tsx {1-3}
checkError: (error) => {
    if (error.status === 401) {
        return Promise.reject("custom-url");
    }
    ...
}
```

:::caution
Redirection path given to `checkError` overrides the one on `logout`.
:::

<br />

### `checkAuth`

Whenever route changes, `checkAuth` from `authProvider` is called.  
When `checkAuth` returns a rejected promise, authentication is cancelled and the app is redirected to an error page that allows the user to navigate to the root path which shows a login page by default.

Checking the authentication data can be easily done here. For example if the authentication data is stored in the local storage:

```tsx title="auth-provider.ts"
const authProvider = {
   ...
// highlight-start
    checkAuth: () => {
        localStorage.getItem("auth") ? Promise.resolve() : Promise.reject();
    },
// highlight-end
   ...
};
```

<br />

-   A custom `redirectPath` can be given to `Promise` reject from the `checkAuth`. If you want to redirect yourself to a certain URL.

```tsx
const authProvider = {
   ...
// highlight-next-line
    checkAuth: () => {
        localStorage.getItem("auth")
            ? Promise.resolve()
            : Promise.reject({ redirectPath: "/custom-url" });
    },
   ...
};
```

<br/>

`checkAuth` method will be accessible via `useAuthenticated` auth hook.

```tsx
import { useAuthenticated } from "@pankod/refine";

const {
    isSuccess,
    isLoading,
    isError,
    refetch: checkAuth,
} = useAuthenticated();
```

> [Refer to useAuthenticated documentation for more information. &#8594](api-references/hooks/auth/useAuthenticated.md)

<br />

### `getPermissions`

You may want to require authorization for certain parts of the app based on the permissions that current user have. Permission logic can be defined in the `getPermission` method.

We will show you how to give authorization based on roles determined in `getPermissions`.

```tsx title="auth-provider.ts"
const mockUsers = [
    {
        username: "admin",
// highlight-next-line
        roles: ["admin"],
    },
    {
        username: "editor",
// highlight-next-line
        roles: ["editor"],
    }
];

const authProvider = {
...
// highlight-start
    getPermissions: () => {
        const auth = localStorage.getItem("auth");
        if (auth) {
            const parsedUser = JSON.parse(auth);
            return Promise.resolve(parsedUser.roles);
        }
        return Promise.reject();
    },
// highlight-end
...
};
```

<br/>

Data that `getPermissions` resolves with is accesible by the [`usePermissions`](api-references/hooks/auth/usePermissions.md) hook.

For example let's say that only the admins must be able to create new posts from the list page.
`<List>` can show a button for creating new posts. If it's required that only admins can create new posts, this button must be only accessible to users who has the `"admin"` role.

```tsx title="pages/post/list"
import { List, usePermissions } from "@pankod/refine";

export const PostList: React.FC = () => {
    const { data: permissionsData } = usePermissions();

    return <List canCreate={permissionsData?.includes("admin")}>...</List>;
};
```

> [Refer to usePermissions documentation for more information. &#8594](api-references/hooks/auth/usePermissions.md)

<br/>

### `getUserIdentity`

User data can be accessed within the app by returning a resolved Promise in the `getUserIdentity` method.

```tsx title="auth-provider.ts"
const authProvider = {
...
// highlight-start
    getUserIdentity: () => {
        const auth = localStorage.getItem("auth");
        if (auth) {
            const parsedUser = JSON.parse(auth);
            return Promise.resolve(parsedUser.username);
        }
        return Promise.reject();
    }
// highlight-end
...
};
```

<br />

The resolved data can be acquired using the [`useGetIdentity`](api-references/hooks/auth/useGetIdentity.md) hook.

```tsx
import { useGetIdentity } from "@pankod/refine";

const { data: userIdentity } = useGetIdentity<string>();
// userIdentity: "admin"
```

> [Refer to useGetIdentity documentation for more information. &#8594](api-references/hooks/auth/useGetIdentity.md)

<br />

```tsx title="auth-provider.ts"
const authProvider = {
    ...
// highlight-start
    getUserIdentity: () => {
        const user = {
            name: "Jane Doe",
            avatar: "https://i.pravatar.cc/150?u=refine",
        };
        return Promise.resolve(user);
    },
// highlight-end
    ...
};
```

If the resolved data has a `name` or `avatar` property, **refine** renders a suitable header for that data:

<br />

<div class="img-container">
    <div class="window">
        <div class="control red"></div>
        <div class="control orange"></div>
        <div class="control green"></div>
    </div>
    <img src={header} alt="Header View" />
</div>

<br />

:::tip
If the resolved data has a `name` property, a name text appears; if it has an `avatar` property, an avatar image appears; if it has a `name` and an `avatar` property, they both appear together.
:::
<br />

## Setting Authorization Credentials

After user logs in, their credentials can be sent along with the API request by configuring the [`dataProvider`](api-references/providers/data-provider.md). A custom `httpClient` can be passed to [`dataProvider`](api-references/providers/data-provider.md) to include configurations like cookies and request headers.

We'll show how to add a token acquired from the `login` method to the **Authorization** header of the **HTTP** requests.

```tsx title="App.tsx"
...
// highlight-start
import axios from "axios";

const axiosInstance = axios.create();

const mockUsers = [
    { username: "admin", token: "123" },
    { username: "editor", token: "321" }
];
// highlight-end

const App = () => {
    const authProvider: AuthProvider = {
// highlight-next-line
        login: ({ username, password }) => {
                // Suppose we actually send a request to the back end here.
                const user = mockUsers.find((item) => item.username === username);

                if (user) {
                    localStorage.setItem("auth", JSON.stringify(user));

                    axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${user.token}`;
                    return Promise.resolve();
                }
                return Promise.reject();
            },
// highlight-end
            ...
        };

    return (
        <Refine
// highlight-next-line
            authProvider={authProvider}
            routerProvider={routerProvider}
            dataProvider={dataProvider(API_URL, axiosInstance)}
        />
    );
}
```

:::note
We recommend using **axios** as the **HTTP** client with the **@pankod/refine-simple-rest** [`dataProvider`](api-references/providers/data-provider.md). Other **HTTP** clients can also be preferred.
:::

## Hooks and Components

These hooks can be used with the `authProvider` authentication and authorization operations.

-   [useAuthenticated](/api-references/hooks/auth/useAuthenticated.md)
-   [useCheckError](/api-references/hooks/auth/useCheckError.md)
-   [useGetIdentity](/api-references/hooks/auth/useGetIdentity.md)
-   [useLogin](/api-references/hooks/auth/useLogin.md)
-   [useLogout](/api-references/hooks/auth/useLogout.md)
-   [usePermissions](/api-references/hooks/auth/usePermissions.md)
-   [`<Authenticated />`](/api-references/components/auth/authenticated.md)

<br />

## API Reference

### Properties

| Property                                                                                                 | Description                               | Resolve condition                     |
| -------------------------------------------------------------------------------------------------------- | ----------------------------------------- | ------------------------------------- |
| login <div className=" required">Required</div>                                                          | Logs user in                              | Auth confirms login                   |
| logout <div className=" required">Required</div>                                                         | Logs user out                             | Auth confirms logout                  |
| checkAuth <div className=" required">Required</div>                                                      | Checks credentials on each route changes  | Authentication still persist          |
| checkError <div className=" required">Required</div>                                                     | Checks if a dataProvider returns an error | Data provider doesn't return an error |
| <div className="required-block"><div>getPermissions</div> <div className="required">Required</div></div> | Can be use to get user credentials        | Authorization roles accepted          |
| getUserIdentity                                                                                          | Can be use to get user identity           | User identity avaliable to return     |

<br />

## Live Codesandbox Example

<iframe src="https://codesandbox.io/embed/refine-authentication-example-rz7l8?autoresize=1&fontsize=14&theme=dark&view=preview"
    style={{width: "100%", height:"80vh", border: "0px", borderRadius: "8px", overflow:"hidden"}}
    title="refine-authorization-example"
    allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
    sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
></iframe>
