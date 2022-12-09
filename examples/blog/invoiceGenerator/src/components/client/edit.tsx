import {
    Edit,
    Drawer,
    DrawerProps,
    Form,
    FormProps,
    Input,
    ButtonProps,
    Grid,
    Select,
    useSelect,
} from "@pankod/refine-antd";

type EditClientProps = {
    drawerProps: DrawerProps;
    formProps: FormProps;
    saveButtonProps: ButtonProps;
};

export const EditClient: React.FC<EditClientProps> = ({
    drawerProps,
    formProps,
    saveButtonProps,
}) => {
    const breakpoint = Grid.useBreakpoint();

    const { selectProps } = useSelect({
        resource: "contacts",
        optionLabel: "first_name",
    });

    return (
        <Drawer
            {...drawerProps}
            width={breakpoint.sm ? "500px" : "100%"}
            bodyStyle={{ padding: 0 }}
        >
            <Edit saveButtonProps={saveButtonProps}>
                <Form
                    {...formProps}
                    layout="vertical"
                    initialValues={{
                        isActive: true,
                        ...formProps.initialValues,
                    }}
                >
                    <Form.Item
                        label="Client Company Name"
                        name="name"
                        rules={[
                            {
                                required: true,
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item label="Select Contact" name="contacts">
                        <Select {...selectProps} mode="multiple" />
                    </Form.Item>
                </Form>
            </Edit>
        </Drawer>
    );
};
