# Turbo Repo Updater

Turbo Repo Updater is a utility tool designed to simplify the process of updating dependencies in Turbo Repo applications. It traverses the 'apps' and 'packages' directories and uses the `npm-check-updates` command to update the `package.json` files with the latest versions of the dependencies. It gracefully handles directories without `package.json`.

## Installation

Install the package globally to use it across your Turbo Repo projects:

```bash
npm install -g turbo-repo-updater
```

## Usage

To use Turbo Repo Updater, navigate to the root directory of your Turbo Repo application and run the following command:

```bash
turbo-repo-updater
```

## Features

- Automatically detects and navigates the 'apps' and 'packages' directories.
- Skips over directories that do not contain a package.json file.
- Option to ignore post-install scripts.
- Log output for each step, including success and error messages.

## Contributing

If you would like to contribute to Turbo Repo Updater, please feel free to fork the repository, create a feature branch, and send us a pull request.

## License

This project is licensed under the MIT License. See the `LICENSE` file for details.

## Support

For support, issues, or feature requests, please open an issue in the GitHub repository.

## Acknowledgments

Thank you to the Turbo Repo community for inspiring this tool.

---

Made with ❤️ by Vaibhav Muchandi.
