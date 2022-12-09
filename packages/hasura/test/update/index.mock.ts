import nock from "nock";
nock("https://flowing-mammal-24.hasura.app:443", { encodedQueryParams: true })
    .post("/v1/graphql", {
        query: "mutation ($pk_columns: posts_pk_columns_input!, $_set: posts_set_input!) {\n      update_posts_by_pk (pk_columns: $pk_columns, _set: $_set) {\n    id, title, content, category { id }\n  }\n    }",
        variables: {
            pk_columns: { id: "eb824b2e-986d-4d19-b6a9-98ca620df046" },
            _set: {
                title: "E-business alarm Bedfordshire",
                content: "Updated Content",
                category_id: "4653050e-f969-4d58-939b-ece4c17aa506",
            },
        },
    })
    .reply(
        200,
        [
            "1f8b08000000000004033d8ecb0e823010457f85ccda2605da4a596afc04d7a48f411b9192b62c08f1df1d8d715633774e72ee0ede1403fd0eeb421b0e4bcc250f761b96c7270d1e7a40db35c236c874a73c13bed6cc2aa3e9744635dc8f5c283840096542c22fccae39cc98736526939ed509fd1893cff790903817e7827321f2fa75faeafc4be8471d6e316d7fb750b2e592231bb5d2e4961dd3adb60c1d0a571f8d915cc18be60ddb1a3ce4ca000000",
        ],
        [
            "Date",
            "Wed, 30 Nov 2022 12:02:23 GMT",
            "Content-Type",
            "application/json; charset=utf-8",
            "Transfer-Encoding",
            "chunked",
            "Connection",
            "close",
            "x-request-id",
            "e6db94516b7d4bb3e37f35b8f0128678",
            "Content-Encoding",
            "gzip",
            "CF-Cache-Status",
            "DYNAMIC",
            "Content-Security-Policy",
            "upgrade-insecure-requests",
            "Referrer-Policy",
            "strict-origin-when-cross-origin",
            "Strict-Transport-Security",
            "max-age=31536000; includeSubDomains",
            "X-Content-Type-Options",
            "nosniff",
            "X-Frame-Options",
            "SAMEORIGIN",
            "X-XSS-Protection",
            "0",
            "Server",
            "cloudflare",
            "CF-RAY",
            "77236f0aa9c79bbf-FRA",
        ],
    );

nock("https://flowing-mammal-24.hasura.app:443", { encodedQueryParams: true })
    .post("/v1/graphql", {
        query: "mutation ($pk_columns: posts_pk_columns_input!, $_set: posts_set_input!) {\n      update_posts_by_pk (pk_columns: $pk_columns, _set: $_set) {\n    id\n  }\n    }",
        variables: {
            pk_columns: { id: "eb824b2e-986d-4d19-b6a9-98ca620df046" },
            _set: { title: "E-business alarm" },
        },
    })
    .reply(
        200,
        [
            "1f8b0800000000000403ab564a492c4954b2aa562a2d00b252e30bf28b4b8ae3932ae30bb241a299294a564aa9491646264946a9ba96166629ba26298696ba49668996406e72a29991414a9a818999526d6d2d00d93654744d000000",
        ],
        [
            "Date",
            "Wed, 30 Nov 2022 12:02:49 GMT",
            "Content-Type",
            "application/json; charset=utf-8",
            "Transfer-Encoding",
            "chunked",
            "Connection",
            "close",
            "x-request-id",
            "1c6dc02b50a6d136023ae15e74701bf4",
            "Content-Encoding",
            "gzip",
            "CF-Cache-Status",
            "DYNAMIC",
            "Content-Security-Policy",
            "upgrade-insecure-requests",
            "Referrer-Policy",
            "strict-origin-when-cross-origin",
            "Strict-Transport-Security",
            "max-age=31536000; includeSubDomains",
            "X-Content-Type-Options",
            "nosniff",
            "X-Frame-Options",
            "SAMEORIGIN",
            "X-XSS-Protection",
            "0",
            "Server",
            "cloudflare",
            "CF-RAY",
            "77236fae1b3490f4-FRA",
        ],
    );
