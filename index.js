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

const updateDependencies = async (ignoreScripts) => {
    const rootDirectories = ['packages', 'apps'];
    const command = ignoreScripts ? 'pnpm update --ignore-scripts' : 'pnpm update';

    for (const rootDir of rootDirectories) {
        const subDirectories = readdirSync(join(__dirname, `${rootDir}`));

        for (const subDir of subDirectories) {
            const directoryPath = join(__dirname, `${rootDir}/${subDir}`);
            const packageJsonPath = join(directoryPath, 'package.json');

            if (!existsSync(packageJsonPath)) {
                console.log(`Skipping ${directoryPath} as it does not contain a package.json file.`);
                continue;
            }

            console.log(`Updating dependencies in ${directoryPath}`);
            await executeCommand(command, directoryPath);
            console.log(`Finished updating dependencies in ${directoryPath}`);
        }
    }
};

const ignoreScripts = process.argv.includes('--ignore-scripts');

updateDependencies(ignoreScripts).catch((error) => console.error(error));
