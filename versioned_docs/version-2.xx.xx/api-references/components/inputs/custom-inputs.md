---
id: custom-inputs
title: Custom Inputs
---

import markdownInput from '@site/static/img/guides-and-concepts/components/inputs/custom-inputs/markdown-input.png';

**refine** uses Ant Design's [`<Form>`](https://ant.design/components/form/) components to control and work with form data. Ant Design supports custom form items inside the [`<Form.Item>`](https://ant.design/components/form/#Form.Item) components. These items should be controllable via their `value` property and should implement `onChange` (or a custom callback name specified by `<Form.Item>`s [`trigger`] prop (https://ant.design/components/form/#Form.Item)).

For some data types, displaying and editing as plain text may cause user experience problems.

Custom components may be useful when working with markdown (with markdown editor), JSON based rich text (draft, quill like editors), and HTML (a HTML editor). It can be used in table columns and form fields

[Refer to the Ant Design docs for more detailed information about `<Form>`. &#8594](https://ant.design/components/form/)

## Example

We will demonstrate how to use custom input fields for markdown data by adding a markdown editor to edit and create forms.

```tsx title="/src/pages/posts/edit.tsx"
import React, { useState } from "react";
import {
    Edit,
    Form,
    Input,
    IResourceComponentsProps,
    useForm,
} from "@pankod/refine";

import MDEditor from "@uiw/react-md-editor";

import { IPost } from "interfaces";

export const PostEdit: React.FC = (props) => {
    const { formProps, saveButtonProps } = useForm<IPost>();

    return (
        <Edit {...props} saveButtonProps={saveButtonProps}>
            <Form {...formProps} layout="vertical">
                <Form.Item
                    label="Title"
                    name="title"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                // highlight-start
                <Form.Item
                    label="Content"
                    name="content"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <MDEditor data-color-mode="light" />
                </Form.Item>
                // highlight-end
            </Form>
        </Edit>
    );
};
```

<div class="img-container">
    <div class="window">
        <div class="control red"></div>
        <div class="control orange"></div>
        <div class="control green"></div>
    </div>
    <img src={markdownInput} alt="Markdown input" />
</div>
<br/>

## Live Codesandbox Example

<iframe src="https://codesandbox.io/embed/refine-custom-inputs-example-07ccy?autoresize=1&fontsize=14&theme=dark&view=preview"
    style={{width: "100%", height:"80vh", border: "0px", borderRadius: "8px", overflow:"hidden"}}
    title="refine-custom-inputs-example"
    allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
    sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
></iframe>
