import React from "react";
import { FormInstance, FormProps, Form } from "antd";
import { useForm as useFormSF } from "sunflower-antd";

import {
    HttpError,
    BaseRecord,
    useForm as useFormCore,
    UseFormReturnType as UseFormReturnTypeCore,
    useWarnAboutChange,
    UseFormProps as UseFormPropsCore,
    CreateResponse,
    UpdateResponse,
} from "@pankod/refine-core";

import { ButtonProps } from "../../components/antd";

export type UseFormProps<
    TData extends BaseRecord = BaseRecord,
    TError extends HttpError = HttpError,
    TVariables = {},
> = UseFormPropsCore<TData, TError, TVariables> & {
    submitOnEnter?: boolean;
    /**
     * Shows notification when unsaved changes exist
     */
    warnWhenUnsavedChanges?: boolean;
};

export type UseFormReturnType<
    TData extends BaseRecord = BaseRecord,
    TError extends HttpError = HttpError,
    TVariables = {},
> = UseFormReturnTypeCore<TData, TError, TVariables> & {
    form: FormInstance<TVariables>;
    formProps: FormProps<TVariables>;
    saveButtonProps: ButtonProps & {
        onClick: () => void;
    };
    onFinish: (
        values?: TVariables,
    ) => Promise<CreateResponse<TData> | UpdateResponse<TData> | void>;
};

/**
 * `useForm` is used to manage forms. It uses Ant Design {@link https://ant.design/components/form/ Form} data scope management under the hood and returns the required props for managing the form actions.
 *
 * @see {@link https://refine.dev/docs/api-references/hooks/form/useForm} for more details.
 *
 * @typeParam TData - Result data of the query extends {@link https://refine.dev/docs/api-references/interfaceReferences#baserecord `BaseRecord`}
 * @typeParam TError - Custom error object that extends {@link https://refine.dev/docs/api-references/interfaceReferences#httperror `HttpError`}
 * @typeParam TVariables - Values for params. default `{}`
 *
 *
 */
export const useForm = <
    TData extends BaseRecord = BaseRecord,
    TError extends HttpError = HttpError,
    TVariables = {},
>({
    action,
    resource,
    onMutationSuccess: onMutationSuccessProp,
    onMutationError,
    submitOnEnter = false,
    warnWhenUnsavedChanges: warnWhenUnsavedChangesProp,
    redirect,
    successNotification,
    errorNotification,
    metaData,
    liveMode,
    liveParams,
    mutationMode,
    dataProviderName,
    onLiveEvent,
    invalidates,
    undoableTimeout,
    queryOptions,
    id: idFromProps,
}: UseFormProps<TData, TError, TVariables> = {}): UseFormReturnType<
    TData,
    TError,
    TVariables
> => {
    const [formAnt] = Form.useForm();
    const formSF = useFormSF<TData, TVariables>({
        form: formAnt,
    });
    const { form } = formSF;

    const useFormCoreResult = useFormCore<TData, TError, TVariables>({
        onMutationSuccess: onMutationSuccessProp
            ? onMutationSuccessProp
            : undefined,
        onMutationError,
        redirect,
        action,
        resource,
        successNotification,
        errorNotification,
        metaData,
        liveMode,
        liveParams,
        mutationMode,
        dataProviderName,
        onLiveEvent,
        invalidates,
        undoableTimeout,
        queryOptions,
        id: idFromProps,
    });

    const { formLoading, onFinish, queryResult, id } = useFormCoreResult;

    const {
        warnWhenUnsavedChanges: warnWhenUnsavedChangesRefine,
        setWarnWhen,
    } = useWarnAboutChange();
    const warnWhenUnsavedChanges =
        warnWhenUnsavedChangesProp ?? warnWhenUnsavedChangesRefine;

    React.useEffect(() => {
        form.resetFields();
    }, [queryResult?.data?.data, id]);

    const onKeyUp = (event: React.KeyboardEvent<HTMLFormElement>) => {
        if (submitOnEnter && event.key === "Enter") {
            form.submit();
        }
    };

    const onValuesChange = (changeValues: object) => {
        if (changeValues && warnWhenUnsavedChanges) {
            setWarnWhen(true);
        }
        return changeValues;
    };

    const saveButtonProps = {
        disabled: formLoading,
        onClick: () => {
            form.submit();
        },
    };

    return {
        form: formSF.form,
        formProps: {
            ...formSF.formProps,
            onFinish: (values: TVariables) =>
                onFinish?.(values).catch((error) => error),
            onKeyUp,
            onValuesChange,
            initialValues: queryResult?.data?.data,
        },
        saveButtonProps,
        ...useFormCoreResult,
        onFinish: async (values?: TVariables) => {
            return await onFinish?.(values ?? formSF.form.getFieldsValue(true));
        },
    };
};
