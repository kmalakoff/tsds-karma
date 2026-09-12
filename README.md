# tsds-karma

Karma browser-test command for `ts-dev-stack`. The current stack defaults to its
Web Test Runner command, so install and select this package when a project needs
Karma, webpack, and Mocha instead.

## Install

```bash
npm install --save-dev ts-dev-stack tsds-karma
```

## Use

Select it in `package.json`:

```json
{
  "tsds": {
    "commands": {
      "test:browser": "tsds-karma"
    }
  }
}
```

Then run:

```bash
npx tsds test:browser
```

With no test path, the command uses `test/**/*.test.*`. Pass a path after
`test:browser` to select different tests, or add `--dry-run` to check command
selection without opening a browser.
