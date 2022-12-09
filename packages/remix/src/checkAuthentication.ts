import { AuthProvider } from "@pankod/refine-core";
import { redirect } from "@remix-run/node";

export const checkAuthentication = async (
    authProvider: AuthProvider,
    request: Request,
    redirectTo: string = new URL(request.url).pathname,
): Promise<any> => {
    try {
        const user = await authProvider.checkAuth?.({ request });
        return user;
    } catch (error) {
        if (redirectTo !== "/login") {
            const { pathname } = new URL(request.url);
            if (pathname === "/") {
                throw redirect(`/login`);
            }
            const searchParams = new URLSearchParams([["to", redirectTo]]);
            throw redirect(`/login?${searchParams}`);
        }
    }
};
