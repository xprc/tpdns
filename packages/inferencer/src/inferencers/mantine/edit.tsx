import * as RefineMantine from "@pankod/refine-mantine";

import { createInferencer } from "@/create-inferencer";
import {
    jsx,
    componentName,
    prettyString,
    accessor,
    printImports,
    isIDKey,
    getOptionLabel,
    dotAccessor,
    noOp,
    getVariableName,
} from "@/utilities";

import { ErrorComponent } from "./error";
import { LoadingComponent } from "./loading";
import { CodeViewerComponent } from "./code-viewer";

import { InferencerResultComponent, InferField } from "@/types";

/**
 * @experimental This is an experimental component
 */
export const EditInferencer: InferencerResultComponent = createInferencer({
    type: "edit",
    additionalScope: [
        ["@pankod/refine-mantine", "RefineMantine", RefineMantine],
    ],
    codeViewerComponent: CodeViewerComponent,
    loadingComponent: LoadingComponent,
    errorComponent: ErrorComponent,
    renderer: ({ resource, fields, isCustomPage, id }) => {
        const COMPONENT_NAME = componentName(
            resource.label ?? resource.name,
            "edit",
        );
        const recordName = getVariableName(
            resource.label ?? resource.name,
            "Data",
        );
        const imports: Array<
            [element: string, module: string, isDefaultImport?: boolean]
        > = [
            ["Edit", "@pankod/refine-mantine"],
            ["useForm", "@pankod/refine-mantine"],
        ];
        let initialValues: Record<string, any> = {};

        const relationFields: (InferField | null)[] = fields.filter(
            (field) => field?.relation && !field?.fieldable && field?.resource,
        );

        const relationHooksCode = relationFields
            .filter(Boolean)
            .map((field) => {
                if (field?.relation && !field.fieldable && field.resource) {
                    imports.push(["useSelect", "@pankod/refine-mantine"]);

                    let val = accessor(
                        recordName,
                        field.key,
                        field.accessor,
                        false,
                    );

                    if (field.multiple && field.accessor) {
                        val = `${accessor(
                            recordName,
                            field.key,
                        )}?.map((item: any) => ${accessor(
                            "item",
                            undefined,
                            field.accessor,
                        )})`;
                    }

                    let effect = "";

                    if (field.multiple && field.accessor) {
                        effect = `React.useEffect(() => {
                            setFieldValue("${field.key}", ${val});
                        }, [${recordName}]);`;
                    }

                    return `
                    const { selectProps: ${getVariableName(
                        field.key,
                        "SelectProps",
                    )} } =
                    useSelect({
                        resource: "${field.resource.name}",
                        defaultValue: ${val},
                        ${getOptionLabel(field)}
                    });

                    ${effect}
                `;
                }
                return undefined;
            })
            .filter(Boolean);

        const renderRelationFields = (field: InferField) => {
            if (field.relation && field.resource) {
                initialValues = {
                    ...initialValues,
                    [field.key]: field.multiple
                        ? []
                        : field.accessor
                        ? {
                              [typeof field.accessor === "string"
                                  ? field.accessor
                                  : field.accessor[0]]: "",
                          }
                        : "",
                };

                const variableName = getVariableName(field.key, "SelectProps");

                if (field.multiple) {
                    imports.push(["MultiSelect", "@pankod/refine-mantine"]);

                    return jsx`
                        <MultiSelect mt="sm" label="${prettyString(
                            field.key,
                        )}" {...getInputProps("${dotAccessor(
                        field.key,
                        undefined,
                    )}")} {...${variableName}} filterDataOnExactSearchMatch={undefined} />
                    `;
                }

                imports.push(["Select", "@pankod/refine-mantine"]);

                return jsx`
                    <Select mt="sm" label="${prettyString(
                        field.key,
                    )}" {...getInputProps("${dotAccessor(
                    field.key,
                    undefined,
                    field.accessor,
                )}")} {...${variableName}} />
                `;
            }
            return undefined;
        };

        const textFields = (field: InferField) => {
            if (
                field.type === "text" ||
                field.type === "email" ||
                field.type === "date" ||
                field.type === "url"
            ) {
                imports.push(["TextInput", "@pankod/refine-mantine"]);

                initialValues = {
                    ...initialValues,
                    [field.key]: field.multiple ? [] : "",
                };

                if (field.multiple) {
                    imports.push(["Group", "@pankod/refine-mantine"]);

                    const val = dotAccessor(
                        field.key,
                        "${index}",
                        field.accessor,
                    );

                    return `
                    <Group spacing="xs">
                        {${accessor(
                            recordName,
                            field.key,
                        )}?.map((item: any, index: number) => (
                            <TextInput mt="sm" key={index} label={\`${prettyString(
                                field.key,
                            )} \${index + 1} \`} {...getInputProps(\`${val}\`)} />
                        ))}
                    </Group>
                    `;
                }

                return jsx`
                    <TextInput mt="sm" ${
                        isIDKey(field.key) ? "disabled" : ""
                    } label="${prettyString(
                    field.key,
                )}" {...getInputProps("${dotAccessor(
                    field.key,
                    undefined,
                    field.accessor,
                )}")} />
                `;
            }
            return undefined;
        };

        const imageFields = (field: InferField) => {
            if (field.type === "image") {
                return jsx`
                {/* 
                    Dropzone component is not included in "@pankod/refine-mantine" package.
                    To use a <Dropzone> component, you can follow the official documentation for Mantine.
                    
                    Docs: https://mantine.dev/others/dropzone/
                */}
                `;
            }
            return undefined;
        };

        const booleanFields = (field: InferField) => {
            if (field.type === "boolean") {
                imports.push(["Checkbox", "@pankod/refine-mantine"]);

                initialValues = {
                    ...initialValues,
                    [field.key]: field.multiple ? [] : "",
                };

                if (field.multiple) {
                    imports.push(["Group", "@pankod/refine-mantine"]);

                    const val = dotAccessor(
                        field.key,
                        "${index}",
                        field.accessor,
                    );

                    return `
                    <Group spacing="xs">
                        {${accessor(
                            recordName,
                            field.key,
                        )}?.map((item: any, index: number) => (
                            <Checkbox mt="sm" key={index} label={\`${prettyString(
                                field.key,
                            )} \${index + 1} \`} {...getInputProps(\`${val}\`, { type: 'checkbox' })} />
                        ))}
                    </Group>
                    `;
                }

                return jsx`
                    <Checkbox mt="sm" label="${prettyString(
                        field.key,
                    )}" {...getInputProps("${dotAccessor(
                    field.key,
                    undefined,
                    field.accessor,
                )}", { type: 'checkbox' })} />
                `;
            }
            return undefined;
        };

        const dateFields = (field: InferField) => {
            if (field.type === "date") {
                const textInputRender = textFields(field);

                return `
                    {/* 
                        DatePicker component is not included in "@pankod/refine-mantine" package.
                        To use a <DatePicker> component, you can follow the official documentation for Mantine.
                        
                        Docs: https://mantine.dev/dates/date-picker/
                    */}
                    ${textInputRender}
                `;
            }
            return undefined;
        };

        const richtextFields = (field: InferField) => {
            if (field.type === "richtext") {
                imports.push(["Textarea", "@pankod/refine-mantine"]);

                initialValues = {
                    ...initialValues,
                    [field.key]: field.multiple ? [] : "",
                };

                if (field.multiple) {
                    imports.push(["Group", "@pankod/refine-mantine"]);

                    const val = dotAccessor(
                        field.key,
                        "${index}",
                        field.accessor,
                    );

                    return `
                    <Group spacing="xs">
                        {${accessor(
                            recordName,
                            field.key,
                        )}?.map((item: any, index: number) => (
                            <Textarea mt="sm" key={index} label={\`${prettyString(
                                field.key,
                            )} \${index + 1} \`} {...getInputProps(\`${val}\`)} />
                        ))}
                    </Group>
                    `;
                }

                return jsx`
                    <Textarea mt="sm" label="${prettyString(
                        field.key,
                    )}" autosize {...getInputProps("${dotAccessor(
                    field.key,
                    undefined,
                    field.accessor,
                )}")} />
                `;
            }

            return undefined;
        };

        const numberFields = (field: InferField) => {
            if (field.type === "number") {
                imports.push(["NumberInput", "@pankod/refine-mantine"]);

                initialValues = {
                    ...initialValues,
                    [field.key]: field.multiple ? [] : "",
                };

                if (field.multiple) {
                    imports.push(["Group", "@pankod/refine-mantine"]);

                    const val = dotAccessor(
                        field.key,
                        "${index}",
                        field.accessor,
                    );

                    return `
                    <Group spacing="xs">
                        {${accessor(
                            recordName,
                            field.key,
                        )}?.map((item: any, index: number) => (
                            <NumberInput mt="sm" key={index} label={\`${prettyString(
                                field.key,
                            )} \${index + 1} \`} {...getInputProps(\`${val}\`)} />
                        ))}
                    </Group>
                    `;
                }

                return jsx`
                    <NumberInput mt="sm" ${
                        isIDKey(field.key) ? "disabled" : ""
                    } label="${prettyString(
                    field.key,
                )}" {...getInputProps("${dotAccessor(
                    field.key,
                    undefined,
                    field.accessor,
                )}")}/>
                `;
            }

            return undefined;
        };

        const wrapper = (code?: string) => {
            if (code) {
                return jsx`
                    ${code}
            `;
            }
            return undefined;
        };

        const renderedFields: Array<string | undefined> = fields.map(
            (field) => {
                switch (field?.type) {
                    case "url":
                    case "text":
                    case "email":
                        return wrapper(textFields(field));
                    case "number":
                        return wrapper(numberFields(field));
                    case "richtext":
                        return wrapper(richtextFields(field));
                    case "image":
                        return wrapper(imageFields(field));
                    case "date":
                        return wrapper(dateFields(field));
                    case "boolean":
                        return wrapper(booleanFields(field));
                    case "relation":
                        return wrapper(renderRelationFields(field));
                    default:
                        return undefined;
                }
            },
        );

        noOp(imports);

        return jsx`
        ${printImports(imports)}
        
        export const ${COMPONENT_NAME} = () => {
            const { getInputProps, saveButtonProps, setFieldValue, refineCore: { queryResult } } = useForm({
                initialValues: ${JSON.stringify(initialValues)},
                ${
                    isCustomPage
                        ? `refineCoreProps: {
                            resource: "${resource.name}",
                            id: ${id},
                            action: "edit",  
                        }`
                        : ""
                }
            });
        
            const ${recordName} = queryResult?.data?.data;
        
            ${relationHooksCode}

            return (
                <Edit saveButtonProps={saveButtonProps}>
                    ${renderedFields.join("")}
                </Edit>
            );
        };
        `;
    },
});
