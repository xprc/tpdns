---
id: useResource
title: useResource
---

`useResource` is used to get `resources` that are defined as property of the `<Refine>` component.

```ts
import { useResource } from "@pankod/refine-core";

const { resources } = useResource();

// it also returns the resource with the props you provide as resourceNameOrRouteName.

const { resource } = useResource({
    resourceNameOrRouteName,
});
```

## API Reference

### Properties

<PropsTable module="@pankod/refine-core/useResource"  />

### Return value

| Description  | Type                                                   |
| ------------ | ------------------------------------------------------ |
| resources    | [`IResourceItem[]`](#interfaces)                       |
| resource     | [`IResourceItem`](#interfaces)                         |
| resourceName | `string`                                               |
| id           | [`BaseKey`](/api-reference/core/interfaces.md#basekey) |

#### Interfaces

```ts
type OptionsProps<TExtends = { [key: string]: any }> = TExtends & {
    label?: string;
    route?: string;
    hide?: boolean;
    auditLog?: {
        permissions?: AuditLogPermissions[number][] | string[];
    };
};

interface IResourceComponentsProps<
    TCrudData = any,
    TOptionsPropsExtends = { [key: string]: any },
> {
    canCreate?: boolean;
    canEdit?: boolean;
    canDelete?: boolean;
    canShow?: boolean;
    name?: string;
    initialData?: TCrudData;
    options?: OptionsProps<TOptionsPropsExtends>;
}

interface IResourceComponents {
    list?: React.FunctionComponent<IResourceComponentsProps<any, any>>;
    create?: React.FunctionComponent<IResourceComponentsProps<any, any>>;
    edit?: React.FunctionComponent<IResourceComponentsProps<any, any>>;
    show?: React.FunctionComponent<IResourceComponentsProps<any, any>>;
}

interface IResourceItem extends IResourceComponents {
    name: string;
    label?: string;
    route?: string;
    icon?: ReactNode;
    canCreate?: boolean;
    canEdit?: boolean;
    canShow?: boolean;
    canDelete?: boolean;
    options?: OptionsProps;
    parentName?: string;
}
```

> The `canCreate`, `canShow` and `canEdit` properties are defined automatically if the `create`, `show` and `edit` components are defined on the `resources` property in `<Refine>`.
