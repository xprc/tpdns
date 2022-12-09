import React from "react";
import {
    Button,
    Form,
    Input,
    Space,
    useForm,
    Create,
    Icons,
} from "@pankod/refine-antd";

interface IFormValue {
    name: string;
    email: string;
    skills: string;
}

export default function PostCreate(Props: any) {
    const { formProps, saveButtonProps } = useForm<IFormValue>();
    return (
        <Create saveButtonProps={saveButtonProps}>
            <Form {...formProps} layout="vertical">
                <Form.Item
                    name={"firstName"}
                    label="First Name"
                    style={{ maxWidth: "893px" }}
                    rules={[
                        { required: true, message: "please enter your name" },
                        {
                            whitespace: true,
                        },
                        {
                            min: 3,
                            message: "field must be at least 3 characters",
                        },
                    ]}
                    hasFeedback
                >
                    <Input placeholder="e.g John" />
                </Form.Item>
                <Form.Item
                    name={"email"}
                    label="Email"
                    style={{ maxWidth: "893px" }}
                    rules={[
                        {
                            required: true,
                            message:
                                "please enter your occupation: e.g data scientist",
                        },
                        {
                            whitespace: true,
                        },
                        {
                            min: 3,
                            message: "field must be at least 3 characters",
                        },
                    ]}
                    hasFeedback
                >
                    <Input placeholder="e.g john@email.com" />
                </Form.Item>
                <Form.List name={"skills"}>
                    {(fields, { add, remove }) => {
                        return (
                            <>
                                {fields.map((field, index) => {
                                    return (
                                        <Space
                                            key={field.key}
                                            direction="horizontal"
                                            style={{
                                                position: "relative",
                                                marginRight: "13px",
                                            }}
                                        >
                                            <Form.Item
                                                name={field.name}
                                                label={`skill - ${index + 1}`}
                                                style={{ width: "400px" }}
                                                rules={[
                                                    {
                                                        required: true,
                                                        message:
                                                            "please enter a skill",
                                                    },
                                                    {
                                                        whitespace: true,
                                                    },
                                                    {
                                                        min: 3,
                                                        message:
                                                            "field must be at least 3 characters",
                                                    },
                                                ]}
                                                hasFeedback
                                            >
                                                <Input placeholder="e.g javascript" />
                                            </Form.Item>
                                            <Button
                                                danger
                                                onClick={() =>
                                                    remove(field.name)
                                                }
                                                style={{ marginTop: "5px" }}
                                                icon={<Icons.DeleteOutlined />}
                                            ></Button>
                                        </Space>
                                    );
                                })}
                                <Form.Item>
                                    <Button
                                        icon={<Icons.PlusOutlined />}
                                        type="dashed"
                                        block
                                        style={{ maxWidth: "893px" }}
                                        onClick={() => add()}
                                    >
                                        Add a skill
                                    </Button>
                                </Form.Item>
                            </>
                        );
                    }}
                </Form.List>
            </Form>
        </Create>
    );
}
