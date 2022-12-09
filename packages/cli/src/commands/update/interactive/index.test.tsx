import { createUIGroup, validatePrompt } from ".";

test("Validate interactive prompt", () => {
    const testCases = [
        {
            input: [
                "@pankod/refine-airtable@1.7.8",
                "@pankod/refine-airtable@2.7.8",
                "@pankod/refine-airtable@3.33.0",
                "@pankod/refine-simple-rest@2.7.8",
                "@pankod/refine-simple-rest@3.35.2",
                "@pankod/refine-core@3.88.4",
            ],
            output: `You can't update the same package more than once. Please choice one.\n Duplicates: @pankod/refine-airtable, @pankod/refine-simple-rest`,
        },
        {
            input: [],
            output: true,
        },
    ];

    testCases.forEach((testCase) => {
        const result = validatePrompt(testCase.input);
        expect(result).toEqual(testCase.output);
    });
});

test("Categorize UI Group", () => {
    const testCases = [
        {
            input: [],
            output: null,
        },
        {
            input: [
                {
                    name: "@pankod/refine-airtable",
                    current: "2.1.1",
                    wanted: "2.7.8",
                    latest: "3.33.0",
                },
                {
                    name: "@pankod/refine-core",
                    current: "3.88.1",
                    wanted: "3.88.4",
                    latest: "3.88.4",
                },
                {
                    name: "@pankod/refine-react-hook-form",
                    current: "3.31.0",
                    wanted: "3.33.2",
                    latest: "3.33.2",
                },
                {
                    name: "@pankod/refine-simple-rest",
                    current: "2.6.0",
                    wanted: "2.7.8",
                    latest: "3.35.2",
                },
                {
                    name: "@pankod/refine-strapi",
                    current: "3.18.0",
                    wanted: "3.37.0",
                    latest: "3.37.0",
                },
            ],
            output: {
                patch: [
                    {
                        name: "@pankod/refine-core",
                        from: "3.88.1",
                        to: "3.88.4",
                    },
                ],
                minor: [
                    {
                        name: "@pankod/refine-airtable",
                        from: "2.1.1",
                        to: "2.7.8",
                    },
                    {
                        name: "@pankod/refine-react-hook-form",
                        from: "3.31.0",
                        to: "3.33.2",
                    },
                    {
                        name: "@pankod/refine-simple-rest",
                        from: "2.6.0",
                        to: "2.7.8",
                    },
                    {
                        name: "@pankod/refine-strapi",
                        from: "3.18.0",
                        to: "3.37.0",
                    },
                ],
                major: [
                    {
                        name: "@pankod/refine-airtable",
                        from: "2.1.1",
                        to: "3.33.0",
                    },
                    {
                        name: "@pankod/refine-simple-rest",
                        from: "2.6.0",
                        to: "3.35.2",
                    },
                ],
            },
        },
    ];

    testCases.forEach((testCase) => {
        const result = createUIGroup(testCase.input);
        expect(result).toEqual(testCase.output);
    });
});
