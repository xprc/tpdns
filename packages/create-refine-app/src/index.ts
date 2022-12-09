#!/usr/bin/env node
import { Command } from "commander";
import execa from "execa";
import { readFileSync } from "fs";

const bootstrap = () => {
    const packageJson = JSON.parse(
        readFileSync(`${__dirname}/../package.json`, "utf8"),
    );

    const program = new Command();
    program
        .version(
            packageJson.version,
            "-v, --version",
            "Output the current version.",
        )
        .usage("<command> [options]")
        .helpOption("-h, --help", "Output usage information.")
        .option(
            "-s, --source <source-path>",
            "specify a custom source of plugins",
        )
        .option(
            "-b, --branch <source-git-branch>",
            "specify a custom branch in source of plugins",
        )
        .option(
            "-o, --preset <preset-name>",
            "specify a preset to use for the project",
        )
        .option(
            "-l, --lucky",
            "use this option to generate a project with random answers",
        )
        .option(
            "-d, --download <download>",
            "specify a download type (zip | git) of source",
            "zip",
        )
        .allowUnknownOption(true)
        .allowExcessArguments(true)
        .action((_, command: Command) => {
            const superplateExecutable = require.resolve(".bin/superplate");
            try {
                execa.sync(
                    superplateExecutable,
                    [
                        ...command.args,
                        "--project=refine",
                        "--download=zip",
                        command.getOptionValue("source")
                            ? "--source=" + command.getOptionValue("source")
                            : "",
                        command.getOptionValue("branch")
                            ? "--branch=" + command.getOptionValue("branch")
                            : "",
                        command.getOptionValue("preset")
                            ? "--preset=" + command.getOptionValue("preset")
                            : "",
                        command.getOptionValue("lucky") ? "--lucky" : "",
                        command.getOptionValue("download")
                            ? "--download=" + command.getOptionValue("download")
                            : "",
                    ],
                    {
                        stdio: "inherit",
                    },
                );
            } catch (err) {}
        });

    program.parse(process.argv);
};

bootstrap();
