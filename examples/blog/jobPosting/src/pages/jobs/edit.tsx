import { useState } from "react";
import {
    Edit,
    Form,
    Input,
    IResourceComponentsProps,
    useForm,
    Checkbox,
    useSelect,
    Select,
} from "@pankod/refine";

import MDEditor from "@uiw/react-md-editor";

import { ICompany } from "interfaces";

export const JobEdit: React.FC<IResourceComponentsProps> = () => {
    const { formProps, saveButtonProps } = useForm<ICompany>();

    const { selectProps: companySelectProps } = useSelect<ICompany>({
        resource: "companies",
        optionLabel: "name",
    });

    return (
        <Edit saveButtonProps={saveButtonProps}>
            <Form {...formProps} layout="vertical">
                <Form.Item
                    label="Job Title"
                    name="title"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Company"
                    name={["company", "id"]}
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Select {...companySelectProps} />
                </Form.Item>
                <Form.Item label="Location" name="location">
                    <Input />
                </Form.Item>
                <Form.Item label="Content" name="content">
                    <MDEditor data-color-mode="light" />
                </Form.Item>

                <Form.Item
                    label="Is Active"
                    name="isActive"
                    valuePropName="checked"
                >
                    <Checkbox>Active</Checkbox>
                </Form.Item>
            </Form>
        </Edit>
    );
};
