import React, { useState } from "react";

import { useTranslate, useRouterContext, useForgotPassword } from "@hooks";

import { DivPropsType, FormPropsType } from "../..";
import {
    ForgotPasswordFormTypes,
    ForgotPasswordPageProps,
} from "../../../../../interfaces";

type ForgotPasswordProps = ForgotPasswordPageProps<
    DivPropsType,
    DivPropsType,
    FormPropsType
>;

export const ForgotPasswordPage: React.FC<ForgotPasswordProps> = ({
    loginLink,
    wrapperProps,
    contentProps,
    renderContent,
    formProps,
}) => {
    const translate = useTranslate();
    const { Link } = useRouterContext();

    const [email, setEmail] = useState("");

    const { mutate: forgotPassword, isLoading } =
        useForgotPassword<ForgotPasswordFormTypes>();

    const renderLink = (link: React.ReactNode, text?: string) => {
        if (link) {
            if (typeof link === "string") {
                return <Link to={link}>{text}</Link>;
            }
            return link;
        }
        return null;
    };

    const content = (
        <div {...contentProps}>
            <h1 style={{ textAlign: "center" }}>
                {translate(
                    "pages.forgotPassword.title",
                    "Forgot your password?",
                )}
            </h1>
            <hr />
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    forgotPassword({ email });
                }}
                {...formProps}
            >
                <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        padding: 25,
                    }}
                >
                    <label>
                        {translate(
                            "pages.forgotPassword.fields.email",
                            "Email",
                        )}
                    </label>
                    <input
                        name="email"
                        type="mail"
                        autoCorrect="off"
                        spellCheck={false}
                        autoCapitalize="off"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <input
                        type="submit"
                        disabled={isLoading}
                        value={translate(
                            "pages.forgotPassword.buttons.submit",
                            "Send reset instructions",
                        )}
                    />
                    <br />
                    {loginLink ?? (
                        <span>
                            {translate(
                                "pages.register.buttons.haveAccount",
                                "Have an account? ",
                            )}{" "}
                            {renderLink(
                                "/login",
                                translate("pages.login.signin", "Sign in"),
                            )}
                        </span>
                    )}
                </div>
            </form>
        </div>
    );

    return (
        <div {...wrapperProps}>
            {renderContent ? renderContent(content) : content}
        </div>
    );
};
