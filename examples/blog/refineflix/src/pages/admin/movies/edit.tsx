import React from "react";
import { IResourceComponentsProps } from "@pankod/refine-core";

import {
    Edit,
    Form,
    Input,
    RcFile,
    Upload,
    useForm,
} from "@pankod/refine-antd";

import { IMovies } from "interfaces";
import { supabaseClient, normalizeFile } from "utility";

export const AdminMovieEdit: React.FC<IResourceComponentsProps> = () => {
    const { formProps, saveButtonProps } = useForm<IMovies>();

    return (
        <Edit
            saveButtonProps={saveButtonProps}
            pageHeaderProps={{ extra: null }}
        >
            <Form {...formProps} layout="vertical">
                <Form.Item
                    label="Name"
                    name="name"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item label="Premiere" name="premiere">
                    <Input />
                </Form.Item>
                <Form.Item label="Description" name="description">
                    <Input />
                </Form.Item>
                <Form.Item label="Director" name="director">
                    <Input />
                </Form.Item>
                <Form.Item label="Stars" name="stars">
                    <Input />
                </Form.Item>
                <Form.Item label="Trailer" name="trailer">
                    <Input />
                </Form.Item>

                <Form.Item label="Images">
                    <Form.Item
                        name="images"
                        valuePropName="fileList"
                        normalize={normalizeFile}
                        noStyle
                    >
                        <Upload.Dragger
                            name="file"
                            listType="picture"
                            multiple
                            customRequest={async ({
                                file,
                                onError,
                                onSuccess,
                            }) => {
                                try {
                                    const rcFile = file as RcFile;

                                    await supabaseClient.storage
                                        .from("refineflix")
                                        .upload(`public/${rcFile.name}`, file, {
                                            cacheControl: "3600",
                                            upsert: true,
                                        });

                                    const { data } = supabaseClient.storage
                                        .from("refineflix")
                                        .getPublicUrl(`public/${rcFile.name}`);

                                    const xhr = new XMLHttpRequest();
                                    onSuccess &&
                                        onSuccess(
                                            { url: data?.publicURL },
                                            xhr,
                                        );
                                } catch (error) {
                                    onError &&
                                        onError(new Error("Upload Error"));
                                }
                            }}
                        >
                            <p className="ant-upload-text">
                                Drag & drop a file in this area
                            </p>
                        </Upload.Dragger>
                    </Form.Item>
                </Form.Item>
            </Form>
        </Edit>
    );
};
