import * as RefineAntd from "@pankod/refine-antd";

import { createInferencer } from "@/create-inferencer";
import {
    jsx,
    componentName,
    prettyString,
    accessor,
    printImports,
    toSingular,
    noOp,
    getVariableName,
} from "@/utilities";

import { ErrorComponent } from "./error";
import { LoadingComponent } from "./loading";
import { CodeViewerComponent } from "./code-viewer";

import { InferencerResultComponent, InferField, ImportElement } from "@/types";

/**
 * @experimental This is an experimental component
 */
export const ShowInferencer: InferencerResultComponent = createInferencer({
    type: "show",
    additionalScope: [["@pankod/refine-antd", "RefineAntd", RefineAntd]],
    codeViewerComponent: CodeViewerComponent,
    loadingComponent: LoadingComponent,
    errorComponent: ErrorComponent,
    renderer: ({ resource, fields, isCustomPage, id }) => {
        const COMPONENT_NAME = componentName(
            resource.label ?? resource.name,
            "show",
        );
        const recordName = "record";
        const imports: Array<ImportElement> = [
            ["React", "react", true],
            ["IResourceComponentsProps", "@pankod/refine-core"],
            ["useShow", "@pankod/refine-core"],
            ["Show", "@pankod/refine-antd"],
            ["Typography", "@pankod/refine-antd"],
        ];

        const relationFields: (InferField | null)[] = fields.filter(
            (field) => field?.relation && !field?.fieldable && field?.resource,
        );

        const relationHooksCode = relationFields
            .filter(Boolean)
            .map((field) => {
                if (field?.relation && !field.fieldable && field.resource) {
                    if (field.multiple) {
                        imports.push(["useMany", "@pankod/refine-core"]);
                        let ids = accessor(recordName, field.key);

                        if (field.accessor) {
                            ids = `${accessor(
                                recordName,
                                field.key,
                            )}?.map((item: any) => ${accessor(
                                "item",
                                undefined,
                                field.accessor,
                            )})`;
                        }

                        return `
                    const { data: ${getVariableName(
                        field.key,
                        "Data",
                    )}, isLoading: ${getVariableName(
                            field.key,
                            "IsLoading",
                        )} } =
                    useMany({
                        resource: "${field.resource.name}",
                        ids: ${ids} || [],
                        queryOptions: {
                            enabled: !!${recordName},
                        },
                    });
                    `;
                    }
                    imports.push(["useOne", "@pankod/refine-core"]);
                    return `
                    const { data: ${getVariableName(
                        field.key,
                        "Data",
                    )}, isLoading: ${getVariableName(
                        field.key,
                        "IsLoading",
                    )} } =
                    useOne({
                        resource: "${field.resource.name}",
                        id: ${accessor(
                            recordName,
                            field.key,
                            field.accessor,
                            false,
                        )} || "",
                        queryOptions: {
                            enabled: !!${recordName},
                        },
                    });
                `;
                }
                return undefined;
            })
            .filter(Boolean);

        const renderRelationFields = (field: InferField) => {
            if (field.relation && field.resource) {
                const variableName = getVariableName(field.key, "Data");
                const variableIsLoading = getVariableName(
                    field.key,
                    "IsLoading",
                );

                if (field.multiple) {
                    imports.push(["TagField", "@pankod/refine-antd"]);
                    return jsx`
                    <Title level={5}>${prettyString(field.key)}</Title>
                    {${variableIsLoading} ? <>Loading...</> : (
                        <>
                        ${(() => {
                            if (field.relationInfer) {
                                if (field.relationInfer?.accessor) {
                                    if (
                                        Array.isArray(
                                            field.relationInfer.accessor,
                                        )
                                    ) {
                                        return `Not Handled.`;
                                        // return `{${multipleAccessor(
                                        //     `${variableName}?.data`,
                                        //     field.relationInfer.accessor,
                                        // ).join(' + " " + ')}}`;
                                    } else {
                                        // return `Not Handled.`;
                                        const mapItemName = toSingular(
                                            field.resource?.name,
                                        );
                                        const val = accessor(
                                            mapItemName,
                                            undefined,
                                            field.relationInfer.accessor,
                                        );
                                        return `{${variableName}?.data?.map((${mapItemName}: any) => <TagField key={${val}} value={${val}} />)}`;
                                    }
                                } else {
                                    return undefined;
                                }
                            } else {
                                return undefined;
                            }
                        })()}
                        </>
                    )}
                    `;
                    // {${accessorString(variableName, {
                    //     key: field.key,
                    // })}?.map((item) => (
                    //     <TagField value={${
                    //         field.accessor ? `item?.${field.accessor}` : `item`
                    //     }} key={${
                    //     field.accessor ? `item?.${field.accessor}` : `item`
                    // }} />
                    // ))}
                    // `;
                }
                return jsx`
                    <Title level={5}>${prettyString(field.key)}</Title>
                    {${variableIsLoading} ? <>Loading...</> : (
                        <>
                        ${(() => {
                            if (field.relationInfer) {
                                if (field.relationInfer?.accessor) {
                                    if (
                                        Array.isArray(
                                            field.relationInfer.accessor,
                                        )
                                    ) {
                                        return `{${accessor(
                                            `${variableName}?.data`,
                                            undefined,
                                            field.relationInfer.accessor,
                                            ' + " " + ',
                                        )}}`;
                                    } else {
                                        return `{${variableName}?.data?.${field.relationInfer.accessor}}`;
                                    }
                                } else {
                                    return `{${variableName}?.data}`;
                                }
                            } else {
                                return `{${variableName}?.data?.id}`;
                            }
                        })()}
                        </>
                    )}
                    
                    `;
            }
            return undefined;
        };

        const textFields = (field: InferField) => {
            if (field.type === "text") {
                imports.push(
                    ["TagField", "@pankod/refine-antd"],
                    ["TextField", "@pankod/refine-antd"],
                );
                if (field.multiple) {
                    const val = accessor("item", undefined, field.accessor);
                    return jsx`
                    <Title level={5}>${prettyString(field.key)}</Title>
                    {${accessor(recordName, field.key)}?.map((item: any) => (
                        <TagField value={${val}} key={${val}} />
                    ))}
                `;
                }
                return jsx`
                    <Title level={5}>${prettyString(field.key)}</Title>
                    <TextField value={${accessor(
                        recordName,
                        field.key,
                        field.accessor,
                    )}} />
                `;
            }
            return undefined;
        };

        const imageFields = (field: InferField) => {
            if (field.type === "image") {
                imports.push(["ImageField", "@pankod/refine-antd"]);
                if (field.multiple) {
                    const val = accessor("item", undefined, field.accessor);
                    return jsx`
                    <Title level={5}>${prettyString(field.key)}</Title>
                    {${accessor(recordName, field.key)}?.map((item: any) => (
                        <ImageField style={{ maxWidth: 200 }} value={${val}} key={${val}} />
                    ))}
                `;
                }
                return jsx`
                    <Title level={5}>${prettyString(field.key)}</Title>
                    <ImageField style={{ maxWidth: 200 }} value={${accessor(
                        recordName,
                        field.key,
                        field.accessor,
                        " + ",
                    )}} />
                    `;
            }
            return undefined;
        };

        const emailFields = (field: InferField) => {
            if (field.type === "email") {
                imports.push(
                    ["TagField", "@pankod/refine-antd"],
                    ["EmailField", "@pankod/refine-antd"],
                );
                if (field.multiple) {
                    const val = accessor("item", undefined, field.accessor);
                    return jsx`
                    <Title level={5}>${prettyString(field.key)}</Title>
                    <>
                    {${accessor(recordName, field.key)}?.map((item: any) => (
                        <TagField value={${val}} key={${val}} />
                    ))}
                    </>
                `;
                }
                return jsx`
                    <Title level={5}>${prettyString(field.key)}</Title>
                    <EmailField value={${accessor(
                        recordName,
                        field.key,
                        field.accessor,
                        " + ",
                    )}} />
                `;
            }
            return undefined;
        };

        const urlFields = (field: InferField) => {
            if (field.type === "url") {
                imports.push(
                    ["TagField", "@pankod/refine-antd"],
                    ["UrlField", "@pankod/refine-antd"],
                );
                if (field.multiple) {
                    const val = accessor("item", undefined, field.accessor);
                    return jsx`
                    <Title level={5}>${prettyString(field.key)}</Title>
                    {${accessor(recordName, field.key)}?.map((item: any) => (
                        <TagField value={${val}} key={${val}} />
                    ))}
                `;
                }
                return jsx`
                    <Title level={5}>${prettyString(field.key)}</Title>
                    <UrlField value={${accessor(
                        recordName,
                        field.key,
                        field.accessor,
                        " + ",
                    )}} />
                `;
            }
            return undefined;
        };

        const booleanFields = (field: InferField) => {
            if (field.type === "boolean") {
                imports.push(
                    ["TagField", "@pankod/refine-antd"],
                    ["BooleanField", "@pankod/refine-antd"],
                );
                if (field.multiple) {
                    const val = accessor("item", undefined, field.accessor);
                    return jsx`
                    <Title level={5}>${prettyString(field.key)}</Title>
                    {(${accessor(
                        recordName,
                        field.key,
                    )} as any[])?.map((item, index) => (
                        <BooleanField value={${val}} key={index} />
                    ))}
                `;
                }
                return jsx`
                    <Title level={5}>${prettyString(field.key)}</Title>
                    <BooleanField value={${accessor(
                        recordName,
                        field.key,
                        field.accessor,
                        " && ",
                    )}} />
                `;
            }
            return undefined;
        };

        const dateFields = (field: InferField) => {
            if (field.type === "date") {
                imports.push(["DateField", "@pankod/refine-antd"]);
                if (field.multiple) {
                    const val = accessor("item", undefined, field.accessor);
                    return jsx`
                    <Title level={5}>${prettyString(field.key)}</Title>
                    {${accessor(recordName, field.key)}?.map((item: any) => (
                        <DateField value={${val}} key={${val}} />
                    ))}
                `;
                }
                return jsx`
                    <Title level={5}>${prettyString(field.key)}</Title>
                    <DateField value={${accessor(
                        recordName,
                        field.key,
                        field.accessor,
                        " + ' ' + ",
                    )}} />
                `;
            }
            return undefined;
        };

        const richtextFields = (field: InferField) => {
            if (field.type === "richtext") {
                imports.push(["MarkdownField", "@pankod/refine-antd"]);
                return jsx`
                    <Title level={5}>${prettyString(field.key)}</Title>
                    <MarkdownField value={${accessor(
                        recordName,
                        field.key,
                        field.accessor,
                        ' + " " + ',
                    )}} />
                `;
            }

            return undefined;
        };

        const numberFields = (field: InferField) => {
            if (field.type === "number") {
                imports.push(["NumberField", "@pankod/refine-antd"]);
                if (field.multiple) {
                    const val = accessor("item", undefined, field.accessor);
                    return jsx`
                    <Title level={5}>${prettyString(field.key)}</Title>
                    {${accessor(recordName, field.key)}?.map((item: any) => (
                        <TagField value={${val}} key={${val}} />
                    ))}
                `;
                }
                return jsx`
                    <Title level={5}>${prettyString(field.key)}</Title>
                    <NumberField value={${accessor(
                        recordName,
                        field.key,
                        field.accessor,
                        ' + " " + ',
                    )} ?? ""} />
                `;
            }
            return undefined;
        };

        const renderedFields: Array<string | undefined> = fields.map(
            (field) => {
                switch (field?.type) {
                    case "text":
                        return textFields(field);
                    case "number":
                        return numberFields(field);
                    case "richtext":
                        return richtextFields(field);
                    case "email":
                        return emailFields(field);
                    case "image":
                        return imageFields(field);
                    case "date":
                        return dateFields(field);
                    case "boolean":
                        return booleanFields(field);
                    case "url":
                        return urlFields(field);
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
        
        const { Title } = Typography;

        export const ${COMPONENT_NAME}: React.FC<IResourceComponentsProps> = () => {
            const { queryResult } = useShow(${
                isCustomPage
                    ? `{ 
                        resource: "${resource.name}", 
                        id: ${id}
                    }`
                    : ""
            });
            const { data, isLoading } = queryResult;
        
            const ${recordName} = data?.data;

            ${relationHooksCode}

            return (
                <Show isLoading={isLoading}>
                    ${renderedFields.join("")}
                </Show>
            );
        };
        `;
    },
});
