import { useEffect, useState } from "react";
import { useForm } from "@pankod/refine-react-hook-form";
import { HttpError, useAuthenticated, useLogin } from "@pankod/refine-core";

import { useUI } from "@lib/context";
import { emailRegex } from "@lib/regex";
import { Logo, Button, Input } from "@components";

interface Login {
    email: string;
    password: string;
    serverError: string;
}

const LoginView: React.FC = () => {
    const [errorMsg, setErrorMsg] = useState("");
    const {
        handleSubmit,
        register,
        formState: { errors, touchedFields },
    } = useForm<Login, HttpError, Login>();

    // Form State
    const { setModalView, closeModal } = useUI();
    const { mutate: login, isLoading } = useLogin();
    const { isSuccess } = useAuthenticated();

    useEffect(() => {
        if (isSuccess) {
            closeModal();
        }
    }, [isSuccess]);

    const handleLogin = ({ email, password }: Login) => {
        login(
            {
                username: email,
                password,
            },
            {
                onSuccess: () => {
                    setErrorMsg("");
                },
                onError: () => {
                    setErrorMsg("The email or password is invalid");
                },
            },
        );
    };

    return (
        <form
            onSubmit={handleSubmit(handleLogin)}
            className="flex w-80 flex-col justify-between p-3"
        >
            <div className="mx-auto flex h-32 w-32 items-center justify-center rounded-full bg-[#2A2A42]">
                <Logo short />
            </div>
            <div className="flex flex-col space-y-3">
                <div className="pt-1 text-xs text-rose-500">
                    <span>{errorMsg}</span>
                </div>
                <Input
                    type="email"
                    label="Email"
                    {...register("email", {
                        required: "email is required",
                        pattern: emailRegex,
                    })}
                    errors={errors}
                    touched={touchedFields}
                />
                <Input
                    type="password"
                    label="Password"
                    {...register("password", {
                        required: {
                            message: "password is required",
                            value: true,
                        },
                        minLength: {
                            message:
                                "password is too short (minimum is 7 characters)",
                            value: 7,
                        },
                    })}
                    errors={errors}
                    touched={touchedFields}
                />

                <Button
                    className="font-bold"
                    variant="slim"
                    type="submit"
                    loading={isLoading}
                >
                    Log In
                </Button>
                <div className="pt-1 text-center text-sm">
                    <span className="text-accent-7">
                        Don&lsquo;t have an account?
                    </span>
                    <a
                        className="text-accent-9 cursor-pointer pl-1 font-bold hover:underline"
                        onClick={() => setModalView("SIGNUP_VIEW")}
                    >
                        Sign Up
                    </a>
                </div>
            </div>
        </form>
    );
};

export default LoginView;
