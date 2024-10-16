module.exports = {
    root: true,
    env: {
        browser: true,
        es2020: true,
        "cypress/globals": true,
    },
    extends: [
        'eslint:recommended',
        'plugin:react/recommended',
        'plugin:react/jsx-runtime',
        'plugin:react-hooks/recommended',
    ],
    ignorePatterns: ['dist', '.eslintrc.cjs'],
    parserOptions: { ecmaVersion: 'latest', sourceType: 'module' },
    settings: { react: { version: '18.2' } },
    plugins: [
        'react-refresh',
        "cypress",
    ],
    rules: {
        'react-refresh/only-export-components': [
            'warn',
            { allowConstantExport: true },
        ],
        'no-loop-func': 'off',
        "indent": ["error", "space"],
        "no-mixed-spaces-and-tabs": ["error", "smart-tabs"],
        "tab-width": 4
    },
}
