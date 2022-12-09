import { AuthProvider, Refine } from "@pankod/refine-core";
import {
    notificationProvider,
    Layout,
    AuthPage,
    ErrorComponent,
} from "@pankod/refine-antd";
import routerProvider from "@pankod/refine-react-router-v6";
import dataProvider from "@pankod/refine-nhost";
import { NhostAuthProvider } from "@nhost/react-auth";

import "@pankod/refine-antd/dist/styles.min.css";

import { nhost } from "utility";
import { PostList, PostCreate, PostEdit, PostShow } from "pages/posts";
import {
    CategoriesList,
    CategoriesCreate,
    CategoriesEdit,
} from "pages/categories";

const authProvider: AuthProvider = {
    login: async ({ email, password }) => {
        const { error } = await nhost.auth.signIn({
            email,
            password,
        });

        if (error) {
            return Promise.reject(error);
        }

        return Promise.resolve();
    },
    logout: async () => {
        const { error } = await nhost.auth.signOut();
        if (error) {
            return Promise.reject(error);
        }

        return Promise.resolve("/");
    },
    checkError: (error) => {
        if (error.status === 401) {
            return nhost.auth.refreshSession();
        }
        return Promise.resolve();
    },
    checkAuth: async () => {
        const isAuthenticated = await nhost.auth.isAuthenticatedAsync();
        if (isAuthenticated) {
            return Promise.resolve();
        }

        return Promise.reject();
    },
    getPermissions: () => {
        const user = nhost.auth.getUser();
        if (user) {
            return Promise.resolve(user.roles);
        }

        return Promise.resolve([]);
    },
    getUserIdentity: () => {
        const user = nhost.auth.getUser();
        if (user) {
            return Promise.resolve({
                ...user,
                name: user.displayName,
                avatar: user.avatarUrl,
            });
        }

        return Promise.resolve({});
    },
};

const App: React.FC = () => {
    return (
        <NhostAuthProvider nhost={nhost}>
            <Refine
                routerProvider={routerProvider}
                dataProvider={dataProvider(nhost)}
                // Refine supports GraphQL subscriptions as out-of-the-box. For more detailed information, please visit here, https://refine.dev/docs/core/providers/live-provider/
                // liveProvider={liveProvider(gqlWebSocketClient)}
                // options={{ liveMode: "auto" }}
                authProvider={authProvider}
                resources={[
                    {
                        name: "posts",
                        list: PostList,
                        create: PostCreate,
                        edit: PostEdit,
                        show: PostShow,
                    },
                    {
                        name: "categories",
                        list: CategoriesList,
                        create: CategoriesCreate,
                        edit: CategoriesEdit,
                    },
                ]}
                notificationProvider={notificationProvider}
                Layout={Layout}
                LoginPage={() => (
                    <AuthPage
                        formProps={{
                            initialValues: {
                                email: "info@refine.dev",
                                password: "demodemo",
                            },
                        }}
                    />
                )}
                catchAll={<ErrorComponent />}
            />
        </NhostAuthProvider>
    );
};

export default App;
