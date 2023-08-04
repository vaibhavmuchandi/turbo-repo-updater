#!/usr/bin/env node
const { exec } = require('child_process');
const { readdirSync, existsSync } = require('fs');
const { join } = require('path');

const executeCommand = (command, directory) => {
    return new Promise((resolve, reject) => {
        exec(command, { cwd: directory }, (error, stdout, stderr) => {
            if (error) {
                console.error(`Error executing command in ${directory}: ${error}`);
                reject(error);
            } else {
                console.log(`Success executing command in ${directory}: ${stdout}`);
                resolve();
            }
        });
    });
};

const updateDependencies = async () => {
    const cwd = process.cwd();
    const rootDirectories = ['packages', 'apps'];

    for (const rootDir of rootDirectories) {
        try {
            const subDirectories = readdirSync(join(cwd, rootDir));

            for (const subDir of subDirectories) {
                const directoryPath = join(cwd, `${rootDir}/${subDir}`);
                const packageJsonPath = join(directoryPath, 'package.json');

                // Check if package.json exists
                if (!existsSync(packageJsonPath)) {
                    console.log(`Skipping ${directoryPath} as it does not contain a package.json file.`);
                    continue;
                }

                console.log(`Updating dependencies in ${directoryPath}`);
                await executeCommand('ncu -u', directoryPath);
                console.log(`Finished updating dependencies in ${directoryPath}`);
            }
        } catch (error) {
            console.error(`An error occurred while scanning directory ${rootDir}: ${error}`);
        }
    }
};

// Start the updating process
updateDependencies().catch((error) => console.error(error));
