import React from "react";
import { useMutation, UseMutationResult } from "@tanstack/react-query";

import { AuthContext } from "@contexts/auth";
import { IAuthContext, TLogoutData } from "../../../interfaces";
import { useNavigation, useNotification } from "@hooks";

type Variables = {
    redirectPath?: string | false;
};

/**
 * `useLogout` calls the `logout` method from the {@link https://refine.dev/docs/api-references/providers/auth-provider `authProvider`} under the hood.
 *
 * @see {@link https://refine.dev/docs/core/hooks/auth/useLogout} for more details.
 *
 */
export const useLogout = <TVariables = {}>(): UseMutationResult<
    TLogoutData,
    Error,
    (TVariables & Variables) | void,
    unknown
> => {
    const { push } = useNavigation();
    const { logout: logoutFromContext } =
        React.useContext<IAuthContext>(AuthContext);
    const { open } = useNotification();

    const queryResponse = useMutation<
        TLogoutData,
        Error,
        (TVariables & Variables) | void,
        unknown
    >(["useLogout"], logoutFromContext, {
        onSuccess: (data, variables) => {
            const redirectPath = variables?.redirectPath ?? data;

            if (redirectPath === false) {
                return;
            }

            if (redirectPath) {
                push(redirectPath);
                return;
            }

            push("/login");
        },
        onError: (error: Error) => {
            open?.({
                key: "useLogout-error",
                type: "error",
                message: error?.name || "Logout Error",
                description:
                    error?.message || "Something went wrong during logout",
            });
        },
    });

    return queryResponse;
};
