import * as RefineAntd from "@pankod/refine-antd";
import dayjs from "dayjs";

import { createInferencer } from "@/create-inferencer";
import {
    jsx,
    componentName,
    prettyString,
    accessor,
    printImports,
    isIDKey,
    noOp,
    getOptionLabel,
    getVariableName,
} from "@/utilities";

import { ErrorComponent } from "./error";
import { LoadingComponent } from "./loading";
import { CodeViewerComponent } from "./code-viewer";

import { InferencerResultComponent, InferField, ImportElement } from "@/types";
import { shouldDotAccess } from "@/utilities/accessor";

/**
 * @experimental This is an experimental component
 */
export const CreateInferencer: InferencerResultComponent = createInferencer({
    type: "create",
    additionalScope: [
        ["@pankod/refine-antd", "RefineAntd", RefineAntd],
        ["dayjs", "dayjs", dayjs, true],
    ],
    codeViewerComponent: CodeViewerComponent,
    loadingComponent: LoadingComponent,
    errorComponent: ErrorComponent,
    renderer: ({ resource, fields, isCustomPage }) => {
        const COMPONENT_NAME = componentName(
            resource.label ?? resource.name,
            "create",
        );
        const imports: Array<ImportElement> = [
            ["React", "react", true],
            ["IResourceComponentsProps", "@pankod/refine-core"],
            ["Create", "@pankod/refine-antd"],
            ["Form", "@pankod/refine-antd"],
            ["useForm", "@pankod/refine-antd"],
            ["Input", "@pankod/refine-antd"],
        ];

        const relationFields: (InferField | null)[] = fields.filter(
            (field) => field?.relation && !field?.fieldable && field?.resource,
        );

        const relationHooksCode = relationFields
            .filter(Boolean)
            .map((field) => {
                if (field?.relation && !field.fieldable && field.resource) {
                    imports.push(["useSelect", "@pankod/refine-antd"]);

                    return `
                    const { selectProps: ${getVariableName(
                        field.key,
                        "SelectProps",
                    )} } =
                    useSelect({
                        resource: "${field.resource.name}",
                        ${getOptionLabel(field)}
                    });
                `;
                }
                return undefined;
            })
            .filter(Boolean);

        const renderRelationFields = (field: InferField) => {
            if (field.relation && field.resource) {
                imports.push(["Select", "@pankod/refine-antd"]);
                const variableName = getVariableName(field.key, "SelectProps");

                const name = field.accessor
                    ? field.multiple
                        ? `"${field.key}"`
                        : `["${field.key}", "${field.accessor}"]`
                    : `"${field.key}"`;

                let valueProps = "";
                let valueEvent = "";

                if (field.accessor && field.multiple) {
                    const canDot = shouldDotAccess(`${field.accessor}`);
                    valueEvent = `getValueFromEvent={(selected: string[]) => {
                        return selected?.map((item) => ({ ${
                            canDot ? field.accessor : `["${field.accessor}"]`
                        }: item }));
                    }}`;
                    valueProps = `getValueProps={(value: any[]) => {
                        return {
                            value: value?.map((item) => ${accessor(
                                "item",
                                undefined,
                                field.accessor,
                            )}),
                        };
                    }}`;
                }

                return jsx`
                    <Form.Item
                        label="${prettyString(field.key)}"
                        name={${name}}
                        rules={[
                            {
                                required: true,
                            },
                        ]}
                        ${valueProps}
                        ${valueEvent}
                    >
                        <Select ${
                            field.multiple ? 'mode="multiple"' : ""
                        } {...${variableName}} />
                    </Form.Item>             
                    `;
            }
            return undefined;
        };

        const basicInputFields = (field: InferField) => {
            if (
                field.type === "text" ||
                field.type === "url" ||
                field.type === "email" ||
                field.type === "number"
            ) {
                if (isIDKey(field.key)) {
                    return undefined;
                }

                if (field.multiple) {
                    return undefined;
                }

                return jsx`
                    <Form.Item
                        label="${prettyString(field.key)}"
                        name={["${field.key}"${
                    field.accessor ? ', "' + field.accessor + '"' : ""
                }]}
                        rules={[
                            {
                                required: true,
                            },
                        ]}
                    >
                        <Input  />
                    </Form.Item>
                `;
            }
            return undefined;
        };

        const imageFields = (field: InferField) => {
            if (field.type === "image") {
                imports.push(
                    ["Upload", "@pankod/refine-antd"],
                    ["getValueFromEvent", "@pankod/refine-antd"],
                );
                let valueProps = 'valuePropName="fileList"';

                if (field.multiple && !field.accessor) {
                    valueProps =
                        "getValueProps={(value) => ({ fileList: value?.map((item: any) => ({ url: item, name: item, uid: item }))})}";
                }

                if (!field.multiple) {
                    if (field.accessor) {
                        valueProps =
                            "getValueProps={(value) => ({ fileList: value ? [value] : [] })}";
                    } else {
                        valueProps =
                            "getValueProps={(value) => ({ fileList: [{ url: value, name: value, uid: value }]})}";
                    }
                }

                return jsx`
                    <Form.Item label="${prettyString(field.key)}">
                        <Form.Item
                            name="${field.key}"
                            ${valueProps}
                            getValueFromEvent={getValueFromEvent}
                            noStyle
                            rules={[
                                {
                                    required: true,
                                },
                            ]}
                        >
                            <Upload.Dragger
                                listType="picture"
                                ${field.multiple ? "multiple" : ""}
                                beforeUpload={() => false}
                            >
                                <p className="ant-upload-text">
                                    Drag & drop a file in this area
                                </p>
                            </Upload.Dragger>
                        </Form.Item>
                    </Form.Item>
                    `;
            }
            return undefined;
        };

        const booleanFields = (field: InferField) => {
            if (field.type === "boolean") {
                imports.push(["Checkbox", "@pankod/refine-antd"]);

                if (field.multiple) {
                    return undefined;
                }

                return jsx`
                    <Form.Item
                        label="${prettyString(field.key)}"
                        valuePropName="checked"
                        name={["${field.key}"${
                    field.accessor ? ', "' + field.accessor + '"' : ""
                }]}
                        rules={[
                            {
                                required: true,
                            },
                        ]}
                    >
                        <Checkbox>${prettyString(field.key)}</Checkbox>
                    </Form.Item>
                `;
            }
            return undefined;
        };

        const dateFields = (field: InferField) => {
            if (field.type === "date") {
                imports.push(
                    ["DatePicker", "@pankod/refine-antd"],
                    ["dayjs", "dayjs", true],
                );

                if (field.multiple) {
                    return undefined;
                }

                return jsx`
                    <Form.Item
                        label="${prettyString(field.key)}"
                        name={["${field.key}"${
                    field.accessor ? ', "' + field.accessor + '"' : ""
                }]}
                        rules={[
                            {
                                required: true,
                            },
                        ]}
                        getValueProps={(value) => ({ value: value ? dayjs(value) : undefined })}
                    >
                        <DatePicker />
                    </Form.Item>
                `;
            }
            return undefined;
        };

        const richtextFields = (field: InferField) => {
            if (field.type === "richtext") {
                return jsx`
                <Form.Item
                    label="${prettyString(field.key)}"
                    name="${field.key}"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Input.TextArea rows={5} />
                </Form.Item>
                `;
            }

            return undefined;
        };

        const renderedFields: Array<string | undefined> = fields.map(
            (field) => {
                switch (field?.type) {
                    case "text":
                    case "number":
                    case "email":
                    case "url":
                        return basicInputFields(field);
                    case "richtext":
                        return richtextFields(field);
                    case "image":
                        return imageFields(field);
                    case "date":
                        return dateFields(field);
                    case "boolean":
                        return booleanFields(field);
                    case "relation":
                        return renderRelationFields(field);
                    default:
                        return undefined;
                }
            },
        );

        noOp(imports);

        return jsx`
        ${printImports(imports)}
        
        export const ${COMPONENT_NAME}: React.FC<IResourceComponentsProps> = () => {
            const { formProps, saveButtonProps, queryResult } = useForm(${
                isCustomPage
                    ? `{
                          resource: "${resource.name}",
                          action: "create",
                      }`
                    : ""
            });
        
            ${relationHooksCode}

            return (
                <Create saveButtonProps={saveButtonProps}>
                    <Form {...formProps} layout="vertical">
                        ${renderedFields.join("")}
                    </Form>
                </Create>
            );
        };
        `;
    },
});
