import { Refine, AuthProvider } from "@pankod/refine-core";
import {
    notificationProvider,
    Layout,
    ErrorComponent,
} from "@pankod/refine-antd";
import dataProvider from "@pankod/refine-simple-rest";
import routerProvider from "@pankod/refine-react-router-v6";

import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";

import "@pankod/refine-antd/dist/styles.min.css";

import { PostList, PostCreate, PostEdit, PostShow } from "pages/posts";
import { Login } from "pages/login";

const API_URL = "https://api.fake-rest.refine.dev";

const App: React.FC = () => {
    const { isLoading, user, logout, getIdTokenClaims } = useAuth0();

    if (isLoading) {
        return <span>loading...</span>;
    }

    const authProvider: AuthProvider = {
        login: () => {
            return Promise.resolve(false);
        },
        logout: () => {
            logout({ returnTo: window.location.origin });
            return Promise.resolve("/");
        },
        checkError: () => Promise.resolve(),
        checkAuth: async () => {
            try {
                const token = await getIdTokenClaims();
                if (token) {
                    axios.defaults.headers.common = {
                        Authorization: `Bearer ${token.__raw}`,
                    };
                    return Promise.resolve();
                } else {
                    return Promise.reject();
                }
            } catch (error) {
                return Promise.reject();
            }
        },
        getPermissions: () => Promise.resolve(),
        getUserIdentity: async () => {
            if (user) {
                return Promise.resolve({
                    ...user,
                    avatar: user.picture,
                });
            }
            return Promise.reject();
        },
    };

    return (
        <Refine
            LoginPage={Login}
            authProvider={authProvider}
            dataProvider={dataProvider(API_URL, axios)}
            routerProvider={routerProvider}
            resources={[
                {
                    name: "posts",
                    list: PostList,
                    create: PostCreate,
                    edit: PostEdit,
                    show: PostShow,
                },
            ]}
            notificationProvider={notificationProvider}
            Layout={Layout}
            catchAll={<ErrorComponent />}
        />
    );
};

export default App;
