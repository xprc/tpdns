import nock from "nock";

nock("https://api.strapi.refine.dev:443", { encodedQueryParams: true })
    .post("/graphql", {
        query: "query ($where: JSON) { posts (where: $where) { id, title, content, category { id } } }",
        variables: { where: { id_in: ["45", "46"] } },
    })
    .reply(
        200,
        {
            data: {
                posts: [
                    {
                        id: "45",
                        title: "foo",
                        content: "bar",
                        category: { id: "2" },
                    },
                    {
                        id: "46",
                        title: "foo-2",
                        content: "bar-2",
                        category: { id: "3" },
                    },
                ],
            },
        },
        [
            "Server",
            "nginx/1.17.10",
            "Date",
            "Thu, 16 Sep 2021 14:35:47 GMT",
            "Content-Type",
            "application/json",
            "Content-Length",
            "153",
            "Connection",
            "close",
            "Vary",
            "Origin",
            "Strict-Transport-Security",
            "max-age=31536000; includeSubDomains",
            "X-Frame-Options",
            "SAMEORIGIN",
            "X-Powered-By",
            "Strapi <strapi.io>",
            "X-Response-Time",
            "49ms",
        ],
    );
