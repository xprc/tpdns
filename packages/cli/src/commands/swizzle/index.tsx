import React from "react";
import { render } from "ink";
import path from "path";
import chalk from "chalk";
import inquirer from "inquirer";
import { Command, OptionValues } from "commander";
import inquirerAutoCompletePrompt from "inquirer-autocomplete-prompt";
import { ensureFile, pathExists, readFile, writeFile } from "fs-extra";

import { getRefineConfig } from "@utils/swizzle";
import { prettierFormat } from "@utils/swizzle/prettierFormat";
import {
    getInstalledRefinePackagesFromNodeModules,
    isPackageHaveRefineConfig,
} from "@utils/package";

import SwizzleMessage from "@components/swizzle-message";

import { SwizzleFile } from "@definitions";
import { parseSwizzleBlocks } from "@utils/swizzle/parseSwizzleBlocks";
import { reorderImports } from "@utils/swizzle/import";
import { SWIZZLE_CODES } from "@utils/swizzle/codes";
import boxen from "boxen";
import { getPathPrefix } from "@utils/swizzle/getPathPrefix";

const swizzle = (program: Command) => {
    return program
        .command("swizzle")
        .description(
            `Export a component or a function from ${chalk.bold(
                "refine",
            )} packages to customize it in your project`,
        )
        .action(action);
};

const getAutocompleteSource =
    (
        rawList: Array<{
            label: string;
            group?: string;
            value?: Record<string, unknown>;
        }>,
    ) =>
    (_answers: {}, input = "") => {
        const filtered = rawList.filter(
            (el) =>
                el.label.toLowerCase().includes(input.toLowerCase()) ||
                el.group?.toLowerCase().includes(input.toLowerCase()),
        );

        return filtered.flatMap((component, index, arr) => {
            const hasTitle =
                component?.group && arr[index - 1]?.group !== component.group;
            const withTitle =
                hasTitle && component.group
                    ? [new inquirer.Separator(`${chalk.bold(component.group)}`)]
                    : [];

            return [
                ...withTitle,
                {
                    name: ` ${component.label}`,
                    value: component?.value ? component.value : component,
                },
            ];
        });
    };

const action = async (_options: OptionValues) => {
    inquirer.registerPrompt("autocomplete", inquirerAutoCompletePrompt);

    const installedPackages = await getInstalledRefinePackagesFromNodeModules();

    const packagesWithConfig: Array<{ name: string; path: string }> = [];

    await Promise.all(
        installedPackages.map(async (pkg) => {
            const hasConfig = await isPackageHaveRefineConfig(pkg.path);
            if (hasConfig) {
                packagesWithConfig.push(pkg);
            }
        }),
    );

    if (packagesWithConfig.length === 0) {
        console.log("No refine packages found with swizzle configuration.");
        return;
    }

    console.log(
        `${boxen(
            `Found ${chalk.blueBright(
                packagesWithConfig.length,
            )} installed ${chalk.blueBright.bold(
                "refine",
            )} packages with swizzle configuration.`,
            {
                padding: 1,
                textAlignment: "center",
                dimBorder: true,
                borderColor: "blueBright",
                borderStyle: "round",
            },
        )}\n`,
    );

    const packageConfigs = await Promise.all(
        packagesWithConfig.map(async (pkg) => {
            const config = (await getRefineConfig(pkg.path)) ?? {
                swizzle: { items: [] },
            };
            return {
                ...pkg,
                config,
            };
        }),
    );

    const { selectedPackage } = await inquirer.prompt<{
        selectedPackage: typeof packageConfigs[number];
    }>([
        {
            type: "autocomplete",
            pageSize: 10,
            name: "selectedPackage",
            message: "Which package do you want to swizzle?",
            emptyText: "No packages found.",
            source: getAutocompleteSource(
                packageConfigs
                    .sort((a, b) =>
                        (a.config?.group ?? "").localeCompare(
                            b.config?.group ?? "",
                        ),
                    )
                    .map((pkg) => ({
                        label: pkg.config?.name ?? pkg.name,
                        value: pkg,
                        group: pkg.config?.group,
                    })),
            ),
        },
    ]);

    const {
        swizzle: { items, transform },
    } = selectedPackage.config;

    if (items.length === 0) {
        console.log(
            `No swizzle items found for ${chalk.bold(
                selectedPackage.config?.name ?? selectedPackage.name,
            )}`,
        );
        return;
    }

    const { selectedComponent } = await inquirer.prompt<{
        selectedComponent: SwizzleFile;
    }>([
        {
            type: "list",
            pageSize: 10,
            name: "selectedComponent",
            message: "Which component do you want to swizzle?",
            emptyText: "No components found.",
            choices: getAutocompleteSource(
                items.sort((a, b) => a.group.localeCompare(b.group)),
            )({}, ""),
        },
    ]);

    // this will be prepended to `destPath` values
    const projectPathPrefix = getPathPrefix();

    const createdFiles = await Promise.all(
        selectedComponent.files.map(async (file) => {
            try {
                const srcPath = file.src
                    ? path.join(selectedPackage.path, file.src)
                    : undefined;
                const destPath = file.dest
                    ? path.join(process.cwd(), projectPathPrefix, file.dest)
                    : undefined;

                if (!srcPath) {
                    console.log("No src path found for file", file);
                    return ["", SWIZZLE_CODES.SOURCE_PATH_NOT_FOUND] as [
                        targetPath: string,
                        statusCode: string,
                    ];
                }

                if (!destPath) {
                    console.log("No destination path found for file", file);
                    return ["", SWIZZLE_CODES.TARGET_PATH_NOT_FOUND] as [
                        targetPath: string,
                        statusCode: string,
                    ];
                }

                const hasSrc = await pathExists(srcPath);

                if (!hasSrc) {
                    return [destPath, SWIZZLE_CODES.SOURCE_PATH_NOT_A_FILE] as [
                        targetPath: string,
                        statusCode: string,
                    ];
                }

                const srcContent = await readFile(srcPath, "utf-8");
                const isDestExist = await pathExists(destPath);

                if (isDestExist) {
                    return [destPath, SWIZZLE_CODES.TARGET_ALREADY_EXISTS] as [
                        targetPath: string,
                        statusCode: string,
                    ];
                }

                await ensureFile(destPath);

                const parsedContent = parseSwizzleBlocks(srcContent);

                const fileTransformedContent =
                    file.transform?.(parsedContent) ?? parsedContent;

                const transformedContent =
                    transform?.(fileTransformedContent, srcPath, destPath) ??
                    fileTransformedContent;

                const reorderedContent = reorderImports(transformedContent);

                const formatted = await prettierFormat(reorderedContent);

                await writeFile(destPath, formatted);

                return [destPath, SWIZZLE_CODES.SUCCESS] as [
                    targetPath: string,
                    statusCode: string,
                ];
            } catch (error) {
                return ["", SWIZZLE_CODES.UNKNOWN_ERROR] as [
                    targetPath: string,
                    statusCode: string,
                ];
            }
        }),
    );

    if (createdFiles.length > 0) {
        render(
            <SwizzleMessage
                label={selectedComponent.label}
                files={createdFiles}
                message={selectedComponent.message}
            />,
        );
    }
};

export default swizzle;
