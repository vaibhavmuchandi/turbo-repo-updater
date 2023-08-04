const { exec } = require('child_process');

exec('npm install -g npm-check-updates', (error, stdout, stderr) => {
    if (error) {
        console.error(`Error installing npm-check-updates: ${error}`);
        console.error(`Please install npm-check-updates package globally to use turbo-repo-updater`)
        return;
    }
    console.log('npm-check-updates installed globally');
});
