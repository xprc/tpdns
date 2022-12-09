# @pankod/refine-hasura

## 4.17.0

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

## 4.16.0

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

## 4.15.2

### Patch Changes

-   Added nested property filter support for `or` filters.

## 4.15.1

### Patch Changes

-   [#2743](https://github.com/refinedev/refine/pull/2743) [`8aecb59d7b`](https://github.com/refinedev/refine/commit/8aecb59d7bf68ae8b9e2e256f1995dd9ba3a8e66) Thanks [@aliemir](https://github.com/aliemir)! - Added nested property filter support for `or` filters.

## 4.15.0

### Minor Changes

-   Added missing implementations for `nnull`, `startswith`, `startswiths`, `nstartswith`, `nstartswiths`, `endswith`, `endswiths`, `nendswith` and `nendswiths` filters by `_similar`, `_nsimilar`, `_regex` and `_iregex` filters from Hasura.

## 4.14.0

### Minor Changes

-   [#2728](https://github.com/refinedev/refine/pull/2728) [`585ba350f8`](https://github.com/refinedev/refine/commit/585ba350f831be93055c58c1ff660645f21bdf77) Thanks [@aliemir](https://github.com/aliemir)! - Added missing implementations for `nnull`, `startswith`, `startswiths`, `nstartswith`, `nstartswiths`, `endswith`, `endswiths`, `nendswith` and `nendswiths` filters by `_similar`, `_nsimilar`, `_regex` and `_iregex` filters from Hasura.

## 4.13.0

### Minor Changes

-   Updated `dataProvider` types with `Required` utility to mark `getMany`, `createMany`, `updateMany` and `deleteMany` as implemented.

## 4.12.0

### Minor Changes

-   [#2688](https://github.com/refinedev/refine/pull/2688) [`508045ac30`](https://github.com/refinedev/refine/commit/508045ac30cd3948f68497e13fdf04f7c72ce387) Thanks [@aliemir](https://github.com/aliemir)! - Updated `dataProvider` types with `Required` utility to mark `getMany`, `createMany`, `updateMany` and `deleteMany` as implemented.

## 4.11.2

### Patch Changes

-   Added nested sorting feature 💥

*   Added new CRUD Filter Operators with undefined

## 4.11.1

### Patch Changes

-   [#2427](https://github.com/refinedev/refine/pull/2427) [`b21908e872`](https://github.com/refinedev/refine/commit/b21908e87209c3a8825991c6ab829f7c45c19e9b) Thanks [@geoffatsource](https://github.com/geoffatsource)! - Added nested sorting feature 💥

*   [#2456](https://github.com/refinedev/refine/pull/2456) [`f20a0ed621`](https://github.com/refinedev/refine/commit/f20a0ed621f9f038dce762e75a0a99058bcb4edb) Thanks [@workatease](https://github.com/workatease)! - Added new CRUD Filter Operators with undefined

## 4.11.0

### Minor Changes

-   Update type declaration generation with `tsc` instead of `tsup` for better navigation throughout projects source code.

## 4.10.0

### Minor Changes

-   [#2440](https://github.com/refinedev/refine/pull/2440) [`0150dcd070`](https://github.com/refinedev/refine/commit/0150dcd0700253f1c4908e7e5f2e178bb122e9af) Thanks [@aliemir](https://github.com/aliemir)! - Update type declaration generation with `tsc` instead of `tsup` for better navigation throughout projects source code.

## 4.9.4

### Patch Changes

-   -   `lodash` moved to "dependencies" for CommonJS builds

## 4.9.3

### Patch Changes

-   -   `lodash` moved to "dependencies" for CommonJS builds

## 4.9.2

### Patch Changes

-   -   `lodash` moved to "dependencies" for CommonJS builds

## 4.9.1

### Patch Changes

-   [#2366](https://github.com/refinedev/refine/pull/2366) [`de87f13dad`](https://github.com/refinedev/refine/commit/de87f13dadabc3de947534988abfbb2ff6263ca4) Thanks [@omeraplak](https://github.com/omeraplak)! - - `lodash` moved to "dependencies" for CommonJS builds

## 4.9.0

### Minor Changes

-   Add nested filter support to `Hasura` data provider.

    Example usage:

    ```
    filters: [
        {
            field: "category.id",
            operator: "eq",
            value: "8332c138-3231-406d-9655-1328ded9d5f2",
        },
    ],
    ```

## 4.8.0

### Minor Changes

-   [#2347](https://github.com/refinedev/refine/pull/2347) [`628324d950`](https://github.com/refinedev/refine/commit/628324d95090172bc5921cce251c79696183079a) Thanks [@ozkalai](https://github.com/ozkalai)! - Add nested filter support to `Hasura` data provider.

    Example usage:

    ```
    filters: [
        {
            field: "category.id",
            operator: "eq",
            value: "8332c138-3231-406d-9655-1328ded9d5f2",
        },
    ],
    ```

## 4.7.0

### Minor Changes

-   Add React@18 support 🚀

## 4.6.0

### Minor Changes

-   [#1718](https://github.com/refinedev/refine/pull/1718) [`b38620d842`](https://github.com/refinedev/refine/commit/b38620d84237e13212811daada7b49ee654c70eb) Thanks [@omeraplak](https://github.com/omeraplak)! - Add React@18 support 🚀

## 4.5.0

### Minor Changes

-   All of the refine packages have dependencies on the `@pankod/refine-core` package. So far we have managed these dependencies with `peerDependencies` + `dependencies` but this causes issues like #2183. (having more than one @pankod/refine-core version in node_modules and creating different instances)

    Managing as `peerDependencies` + `devDependencies` seems like the best way for now to avoid such issues.

## 4.4.0

### Minor Changes

-   [#2217](https://github.com/refinedev/refine/pull/2217) [`b4aae00f77`](https://github.com/refinedev/refine/commit/b4aae00f77a2476d847994db21298ae25e4cf6e5) Thanks [@omeraplak](https://github.com/omeraplak)! - All of the refine packages have dependencies on the `@pankod/refine-core` package. So far we have managed these dependencies with `peerDependencies` + `dependencies` but this causes issues like #2183. (having more than one @pankod/refine-core version in node_modules and creating different instances)

    Managing as `peerDependencies` + `devDependencies` seems like the best way for now to avoid such issues.

## 4.3.2

### Patch Changes

-   Add support for multiple operators on the same field - #2154

## 4.3.1

### Patch Changes

-   [#2157](https://github.com/refinedev/refine/pull/2157) [`6f5ec7c32f`](https://github.com/refinedev/refine/commit/6f5ec7c32f0e1f3510774f8d95935fe5288e2c8a) Thanks [@smparekh](https://github.com/smparekh)! - Add support for multiple operators on the same field - #2154

## 4.3.0

### Minor Changes

-   ### `@pankod/refine-core`

    -   Added extra params to `useSubscription` and `useResourceSubscription`
    -   `useOne`, `useMany` and `useList` passed extra params to own subscription hook.

    ### `@pankod/refine-hasura`

    -   Added `liveProvider`.

    To see an example of how to use it, check out [`here`](https://github.com/refinedev/refine/blob/master/examples/dataProvider/hasura/src/App.tsx).

    ### `@pankod/refine-nhost`

    -   Added `liveProvider`.

    To see an example of how to use it, check out [`here`](https://github.com/refinedev/refine/blob/master/examples/dataProvider/nhost/src/App.tsx).

    ### `@pankod/refine-graphql`

    -   Added `liveProvider`.

### Patch Changes

-   Updated dependencies []:
    -   @pankod/refine-core@3.42.0

## 4.2.0

### Minor Changes

-   [#2120](https://github.com/refinedev/refine/pull/2120) [`2aa7aace52`](https://github.com/refinedev/refine/commit/2aa7aace52b3f232327db2b0f41f793a2885e788) Thanks [@salihozdemir](https://github.com/salihozdemir)! - ### `@pankod/refine-core`

    -   Added extra params to `useSubscription` and `useResourceSubscription`
    -   `useOne`, `useMany` and `useList` passed extra params to own subscription hook.

    ### `@pankod/refine-hasura`

    -   Added `liveProvider`.

    To see an example of how to use it, check out [`here`](https://github.com/refinedev/refine/blob/master/examples/dataProvider/hasura/src/App.tsx).

    ### `@pankod/refine-nhost`

    -   Added `liveProvider`.

    To see an example of how to use it, check out [`here`](https://github.com/refinedev/refine/blob/master/examples/dataProvider/nhost/src/App.tsx).

    ### `@pankod/refine-graphql`

    -   Added `liveProvider`.

### Patch Changes

-   Updated dependencies [[`2aa7aace52`](https://github.com/refinedev/refine/commit/2aa7aace52b3f232327db2b0f41f793a2885e788)]:
    -   @pankod/refine-core@3.41.0

## 4.1.0

### Minor Changes

-   Upgraded `grapql-request` version in graphql data provider packages.

    Now the `graphql-request` and `qql-query-builder` packages are exported in these packages.

    ```diff
    - import dataProvider from "@pankod/refine-strapi-graphql";
    - import { GraphQLClient } from "graphql-request";
    - import * as qqlQueryBuilder from "gql-query-builder";
    + import dataProvider, { GraphQLClient, qqlQueryBuilder } from "@pankod/refine-strapi-graphql";
    ```

### Patch Changes

-   Updated dependencies []:
    -   @pankod/refine-core@3.38.2

## 4.0.0

### Major Changes

-   [#2113](https://github.com/refinedev/refine/pull/2113) [`c2fb7ac0e9`](https://github.com/refinedev/refine/commit/c2fb7ac0e9b5871de76aa975b2a196ab39fa7a6b) Thanks [@omeraplak](https://github.com/omeraplak)! - Upgraded `grapql-request` version in graphql data provider packages.

    Now the `graphql-request` and `qql-query-builder` packages are exported in these packages.

    ```diff
    - import dataProvider from "@pankod/refine-strapi-graphql";
    - import { GraphQLClient } from "graphql-request";
    - import * as qqlQueryBuilder from "gql-query-builder";
    + import dataProvider, { GraphQLClient, qqlQueryBuilder } from "@pankod/refine-strapi-graphql";
    ```

### Patch Changes

-   Updated dependencies [[`ee8e8bbd6c`](https://github.com/refinedev/refine/commit/ee8e8bbd6cf6ff2ab1a87883e4030205dedb16ea)]:
    -   @pankod/refine-core@3.38.1

## 3.25.4

### Patch Changes

-   Updated pagination parameters default values and added `hasPagination` property to `getList` method of the data providers.

    **Implementation**

    Updated the `getList` method accordingly to the changes in the `useTable` and `useList` of `@pankod/refine-core`. `hasPagination` is used to disable pagination (defaults to `true`)

    **Use Cases**

    For some resources, there might be no support for pagination or users might want to see all of the data without any pagination, prior to these changes this was not supported in **refine** data providers.

-   Updated dependencies []:
    -   @pankod/refine-core@3.36.0

## 3.25.3

### Patch Changes

-   [#2050](https://github.com/refinedev/refine/pull/2050) [`635cfe9fdb`](https://github.com/refinedev/refine/commit/635cfe9fdbfe5940b950ae99c1f0b686c78bb8e5) Thanks [@ozkalai](https://github.com/ozkalai)! - Updated pagination parameters default values and added `hasPagination` property to `getList` method of the data providers.

    **Implementation**

    Updated the `getList` method accordingly to the changes in the `useTable` and `useList` of `@pankod/refine-core`. `hasPagination` is used to disable pagination (defaults to `true`)

    **Use Cases**

    For some resources, there might be no support for pagination or users might want to see all of the data without any pagination, prior to these changes this was not supported in **refine** data providers.

-   Updated dependencies [[`ecde34a9b3`](https://github.com/refinedev/refine/commit/ecde34a9b38ef5667fa863f9ebb9dcb1cfff1651), [`635cfe9fdb`](https://github.com/refinedev/refine/commit/635cfe9fdbfe5940b950ae99c1f0b686c78bb8e5)]:
    -   @pankod/refine-core@3.35.0

## 3.25.2

### Patch Changes

-   Added `graphql-request` dependency to peerDependencies

## 3.25.1

### Patch Changes

-   [#1930](https://github.com/refinedev/refine/pull/1930) [`04572f5085`](https://github.com/refinedev/refine/commit/04572f5085f024218bd011c388c0dd06e4c4fd55) Thanks [@omeraplak](https://github.com/omeraplak)! - Added `graphql-request` dependency to peerDependencies

## 3.22.2

### Patch Changes

-   Updated dependencies [[`2deb19babf`](https://github.com/refinedev/refine/commit/2deb19babfc6db5b00b111ec29aa5ece4c371bbc)]:
    -   @pankod/refine-core@3.23.2
