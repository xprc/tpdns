# @pankod/refine-strapi-v4

## 3.39.0

### Minor Changes

-   Only `or` was supported as a conditional filter. Now `and` and `or` can be used together and nested. 🚀

    ```
    {
      operator: "or",
      value: [
        {
          operator: "and",
          value: [
            {
              field: "name",
              operator: "eq",
              value: "John Doe",
            },
            {
              field: "age",
              operator: "eq",
              value: 30,
            },
          ],
        },
        {
          operator: "and",
          value: [
            {
              field: "name",
              operator: "eq",
              value: "JR Doe",
            },
            {
              field: "age",
              operator: "eq",
              value: 1,
            },
          ],
        },
      ],
    }
    ```

## 3.38.0

### Minor Changes

-   [#2751](https://github.com/refinedev/refine/pull/2751) [`addff64c77`](https://github.com/refinedev/refine/commit/addff64c777e4c9f044a1a109cb05453e6e9f762) Thanks [@yildirayunlu](https://github.com/yildirayunlu)! - Only `or` was supported as a conditional filter. Now `and` and `or` can be used together and nested. 🚀

    ```
    {
      operator: "or",
      value: [
        {
          operator: "and",
          value: [
            {
              field: "name",
              operator: "eq",
              value: "John Doe",
            },
            {
              field: "age",
              operator: "eq",
              value: 30,
            },
          ],
        },
        {
          operator: "and",
          value: [
            {
              field: "name",
              operator: "eq",
              value: "JR Doe",
            },
            {
              field: "age",
              operator: "eq",
              value: 1,
            },
          ],
        },
      ],
    }
    ```

## 3.37.0

### Minor Changes

-   Updated `dataProvider` types with `Required` utility to mark `getMany`, `createMany`, `updateMany` and `deleteMany` as implemented.

## 3.36.0

### Minor Changes

-   [#2688](https://github.com/refinedev/refine/pull/2688) [`508045ac30`](https://github.com/refinedev/refine/commit/508045ac30cd3948f68497e13fdf04f7c72ce387) Thanks [@aliemir](https://github.com/aliemir)! - Updated `dataProvider` types with `Required` utility to mark `getMany`, `createMany`, `updateMany` and `deleteMany` as implemented.

## 3.35.0

### Minor Changes

-   Added `metaData` support for the `/me` request

    ```tsx
    const strapiAuthHelper = AuthHelper(API_URL + "/api");

    strapiAuthHelper.me("token", {
        metaData: {
            populate: ["role"],
        },
    });
    ```

## 3.34.0

### Minor Changes

-   [#2496](https://github.com/refinedev/refine/pull/2496) [`7e1538512e`](https://github.com/refinedev/refine/commit/7e1538512e98e87b749f003df1183d74b36d4281) Thanks [@albcunha](https://github.com/albcunha)! - Added `metaData` support for the `/me` request

    ```tsx
    const strapiAuthHelper = AuthHelper(API_URL + "/api");

    strapiAuthHelper.me("token", {
        metaData: {
            populate: ["role"],
        },
    });
    ```

## 3.33.0

### Minor Changes

-   Fixed payload data in delete on nestjsx data provider custom method.

## 3.32.0

### Minor Changes

-   [#2465](https://github.com/refinedev/refine/pull/2465) [`4d07f33993`](https://github.com/refinedev/refine/commit/4d07f33993fa5a6facaf33cd651ef94892d15dae) Thanks [@yildirayunlu](https://github.com/yildirayunlu)! - Fixed payload data in delete on nestjsx data provider custom method.

## 3.31.0

### Minor Changes

-   Update type declaration generation with `tsc` instead of `tsup` for better navigation throughout projects source code.

## 3.30.0

### Minor Changes

-   [#2440](https://github.com/refinedev/refine/pull/2440) [`0150dcd070`](https://github.com/refinedev/refine/commit/0150dcd0700253f1c4908e7e5f2e178bb122e9af) Thanks [@aliemir](https://github.com/aliemir)! - Update type declaration generation with `tsc` instead of `tsup` for better navigation throughout projects source code.

## 3.29.0

### Minor Changes

-   Add React@18 support 🚀

## 3.28.0

### Minor Changes

-   [#1718](https://github.com/refinedev/refine/pull/1718) [`b38620d842`](https://github.com/refinedev/refine/commit/b38620d84237e13212811daada7b49ee654c70eb) Thanks [@omeraplak](https://github.com/omeraplak)! - Add React@18 support 🚀

## 3.27.0

### Minor Changes

-   All of the refine packages have dependencies on the `@pankod/refine-core` package. So far we have managed these dependencies with `peerDependencies` + `dependencies` but this causes issues like #2183. (having more than one @pankod/refine-core version in node_modules and creating different instances)

    Managing as `peerDependencies` + `devDependencies` seems like the best way for now to avoid such issues.

## 3.26.0

### Minor Changes

-   [#2217](https://github.com/refinedev/refine/pull/2217) [`b4aae00f77`](https://github.com/refinedev/refine/commit/b4aae00f77a2476d847994db21298ae25e4cf6e5) Thanks [@omeraplak](https://github.com/omeraplak)! - All of the refine packages have dependencies on the `@pankod/refine-core` package. So far we have managed these dependencies with `peerDependencies` + `dependencies` but this causes issues like #2183. (having more than one @pankod/refine-core version in node_modules and creating different instances)

    Managing as `peerDependencies` + `devDependencies` seems like the best way for now to avoid such issues.

## 3.25.10

### Patch Changes

-   Add `pageSize` support for `getMany` - #2077

-   Updated dependencies []:
    -   @pankod/refine-core@3.42.0

## 3.25.9

### Patch Changes

-   [#2152](https://github.com/refinedev/refine/pull/2152) [`c5458d1695`](https://github.com/refinedev/refine/commit/c5458d1695300a30df3e528e026d6d0735fa0775) Thanks [@omeraplak](https://github.com/omeraplak)! - Add `pageSize` support for `getMany` - #2077

-   Updated dependencies [[`d4c7377361`](https://github.com/refinedev/refine/commit/d4c7377361ba347ecfdf4d5a438eb495398c2fab)]:
    -   @pankod/refine-core@3.41.1

## 3.25.8

### Patch Changes

-   Updated pagination parameters default values and added `hasPagination` property to `getList` method of the data providers.

    **Implementation**

    Updated the `getList` method accordingly to the changes in the `useTable` and `useList` of `@pankod/refine-core`. `hasPagination` is used to disable pagination (defaults to `true`)

    **Use Cases**

    For some resources, there might be no support for pagination or users might want to see all of the data without any pagination, prior to these changes this was not supported in **refine** data providers.

*   Fix pagination issue on `users` endpoint - [#2028](https://github.com/refinedev/refine/issues/2028)

*   Updated dependencies []:
    -   @pankod/refine-core@3.36.0

## 3.25.7

### Patch Changes

-   [#2050](https://github.com/refinedev/refine/pull/2050) [`635cfe9fdb`](https://github.com/refinedev/refine/commit/635cfe9fdbfe5940b950ae99c1f0b686c78bb8e5) Thanks [@ozkalai](https://github.com/ozkalai)! - Updated pagination parameters default values and added `hasPagination` property to `getList` method of the data providers.

    **Implementation**

    Updated the `getList` method accordingly to the changes in the `useTable` and `useList` of `@pankod/refine-core`. `hasPagination` is used to disable pagination (defaults to `true`)

    **Use Cases**

    For some resources, there might be no support for pagination or users might want to see all of the data without any pagination, prior to these changes this was not supported in **refine** data providers.

*   [#2050](https://github.com/refinedev/refine/pull/2050) [`635cfe9fdb`](https://github.com/refinedev/refine/commit/635cfe9fdbfe5940b950ae99c1f0b686c78bb8e5) Thanks [@ozkalai](https://github.com/ozkalai)! - Fix pagination issue on `users` endpoint - [#2028](https://github.com/refinedev/refine/issues/2028)

*   Updated dependencies [[`ecde34a9b3`](https://github.com/refinedev/refine/commit/ecde34a9b38ef5667fa863f9ebb9dcb1cfff1651), [`635cfe9fdb`](https://github.com/refinedev/refine/commit/635cfe9fdbfe5940b950ae99c1f0b686c78bb8e5)]:
    -   @pankod/refine-core@3.35.0

## 3.25.6

### Patch Changes

-   Added `populate`, `fields`, `locale` and `publicationState` support for `@pankod/refine-strapi-v4` data provider's `getMany` function

## 3.25.5

### Patch Changes

-   [#1958](https://github.com/refinedev/refine/pull/1958) [`42100b631a`](https://github.com/refinedev/refine/commit/42100b631a1f829d1535da0bd3d37cac60ca7772) Thanks [@omeraplak](https://github.com/omeraplak)! - Added `populate`, `fields`, `locale` and `publicationState` support for `@pankod/refine-strapi-v4` data provider's `getMany` function

## 3.25.4

### Patch Changes

-   Updated axios version (0.21.4 to 0.26.1). In this version, the way of sending headers has changed as follows.

    ```
    // old v0.21.4
    axiosInstance.defaults.headers = { Authorization: `Bearer ${data.jwt}` };

    // new v0.26.1
    axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${data.jwt}`;
    ```

-   Updated dependencies []:
    -   @pankod/refine-core@3.29.0

## 3.25.3

### Patch Changes

-   Updated axios version (0.21.4 to 0.26.1). In this version, the way of sending headers has changed as follows.

    ```
    // old v0.21.4
    axiosInstance.defaults.headers = { Authorization: `Bearer ${data.jwt}` };

    // new v0.26.1
    axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${data.jwt}`;
    ```

-   Updated dependencies []:
    -   @pankod/refine-core@3.28.0

## 3.25.2

### Patch Changes

-   Updated axios version (0.21.4 to 0.26.1). In this version, the way of sending headers has changed as follows.

    ```
    // old v0.21.4
    axiosInstance.defaults.headers = { Authorization: `Bearer ${data.jwt}` };

    // new v0.26.1
    axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${data.jwt}`;
    ```

-   Updated dependencies []:
    -   @pankod/refine-core@3.27.0

## 3.25.1

### Patch Changes

-   [#1899](https://github.com/refinedev/refine/pull/1899) [`fbfea418a0`](https://github.com/refinedev/refine/commit/fbfea418a024a527a2b432c634f46a96d4f70d88) Thanks [@yildirayunlu](https://github.com/yildirayunlu)! - Updated axios version (0.21.4 to 0.26.1). In this version, the way of sending headers has changed as follows.

    ```
    // old v0.21.4
    axiosInstance.defaults.headers = { Authorization: `Bearer ${data.jwt}` };

    // new v0.26.1
    axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${data.jwt}`;
    ```

-   Updated dependencies [[`2ba2a96fd2`](https://github.com/refinedev/refine/commit/2ba2a96fd24aa733c355ac9ef4c99b7d48115746)]:
    -   @pankod/refine-core@3.26.0

## 3.22.2

### Patch Changes

-   Updated dependencies [[`2deb19babf`](https://github.com/refinedev/refine/commit/2deb19babfc6db5b00b111ec29aa5ece4c371bbc)]:
    -   @pankod/refine-core@3.23.2
