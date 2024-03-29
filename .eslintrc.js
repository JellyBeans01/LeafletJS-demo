module.exports = {
    root: true,
    env: {
        browser: true,
        es6: true,
        node: true,
        jest: true,
    },
    plugins: ["react", "react-hooks", "import", "@typescript-eslint", "babel", "jest"],
    parser: "@typescript-eslint/parser",
    extends: ["airbnb", "plugin:@typescript-eslint/recommended", "plugin:jest/recommended", "prettier"],
    settings: {
        "import/resolver": {
            node: {
                extensions: [".js", ".jsx", ".ts", ".tsx", ".json", ".d.ts"],
            },
        },
        react: {
            version: "detect",
        },
    },
    parserOptions: {
        ecmaVersion: 2018,
        sourceType: "module",
        ecmaFeatures: {
            jsx: true,
        },
    },
    rules: {
        indent: [
            "error",
            4,
            {
                SwitchCase: 1,
            },
        ],
        "default-param-last": "off",
        "react/button-has-type": "off",
        "react/jsx-indent": ["error", 4],
        "react/jsx-indent-props": ["error", 4],
        "react/react-in-jsx-scope": "off",
        "react/destructuring-assignment": "off",
        "react/require-default-props": "off",
        "import/no-named-default": "off",
        "react/jsx-props-no-spreading": "off",
        "import/prefer-default-export": "off",
        "no-use-before-define": "off",
        "prefer-destructuring": [
            "error",
            {
                VariableDeclarator: { array: false, object: true },
                AssignmentExpression: { array: true, object: false },
            },
            { enforceForRenamedProperties: false },
        ],
        "no-param-reassign": "off",
        semi: ["error", "always"],
        "no-set-state": "off",
        "max-len": [
            "off",
            120,
            2,
            {
                ignoreUrls: true,
                ignoreComments: true,
                ignoreRegExpLiterals: true,
                ignoreStrings: true,
                ignoreTemplateLiterals: true,
            },
        ],
        "class-methods-use-this": "off",
        "linebreak-style": "off",
        "react/prop-types": "off",
        "no-underscore-dangle": "off",
        "arrow-parens": "off",
        radix: "off",
        "arrow-body-style": "off",
        "no-case-declarations": "off",
        "spaced-comment": "off",
        "default-case": "off",
        "one-var": "off",
        "no-nested-ternary": "off",
        "object-curly-newline": "off",
        "no-mixed-operators": [
            "error",
            {
                allowSamePrecedence: true,
            },
        ],
        curly: ["error", "multi-line"],
        "no-plusplus": "off",
        "no-useless-constructor": "warn",
        "no-else-return": "off",
        "react/function-component-definition": "off",
        "react/prefer-stateless-function": "warn",
        "react/jsx-filename-extension": "off",
        "react/jsx-wrap-multilines": [
            "error",
            {
                declaration: "parens-new-line",
            },
        ],
        "padded-blocks": ["off"],
        "lines-between-class-members": "off",
        "no-confusing-arrow": [
            "error",
            {
                allowParens: true,
            },
        ],
        "jsx-a11y/accessible-emoji": "warn",
        "jsx-a11y/alt-text": "warn",
        "jsx-a11y/anchor-has-content": "warn",
        "jsx-a11y/anchor-is-valid": "warn",
        "jsx-a11y/aria-activedescendant-has-tabindex": "warn",
        "jsx-a11y/aria-props": "warn",
        "jsx-a11y/aria-proptypes": "warn",
        "jsx-a11y/aria-role": "warn",
        "jsx-a11y/aria-unsupported-elements": "warn",
        "jsx-a11y/click-events-have-key-events": "warn",
        "jsx-a11y/heading-has-content": "warn",
        "jsx-a11y/html-has-lang": "warn",
        "jsx-a11y/iframe-has-title": "warn",
        "jsx-a11y/img-redundant-alt": "warn",
        "jsx-a11y/interactive-supports-focus": [
            "warn",
            {
                tabbable: ["button", "checkbox", "link", "searchbox", "spinbutton", "switch", "textbox"],
            },
        ],
        "jsx-a11y/label-has-for": "off",
        "jsx-a11y/media-has-caption": "warn",
        "jsx-a11y/mouse-events-have-key-events": "warn",
        "jsx-a11y/no-access-key": "warn",
        "jsx-a11y/no-autofocus": "warn",
        "jsx-a11y/no-distracting-elements": "warn",

        "jsx-a11y/no-interactive-element-to-noninteractive-role": [
            "warn",
            {
                tr: ["none", "presentation"],
            },
        ],
        "jsx-a11y/no-noninteractive-element-interactions": [
            "warn",
            {
                handlers: ["onClick", "onMouseDown", "onMouseUp", "onKeyPress", "onKeyDown", "onKeyUp"],
            },
        ],
        "jsx-a11y/no-noninteractive-element-to-interactive-role": [
            "warn",
            {
                ul: ["listbox", "menu", "menubar", "radiogroup", "tablist", "tree", "treegrid"],
                ol: ["listbox", "menu", "menubar", "radiogroup", "tablist", "tree", "treegrid"],
                li: ["menuitem", "option", "row", "tab", "treeitem"],
                table: ["grid"],
                td: ["gridcell"],
            },
        ],
        "jsx-a11y/no-noninteractive-tabindex": [
            "warn",
            {
                tags: [],
                roles: ["tabpanel"],
            },
        ],
        "jsx-a11y/no-onchange": "off",
        "jsx-a11y/no-redundant-roles": "warn",
        "jsx-a11y/no-static-element-interactions": [
            "warn",
            {
                handlers: ["onClick", "onMouseDown", "onMouseUp", "onKeyPress", "onKeyDown", "onKeyUp"],
            },
        ],
        "jsx-a11y/role-has-required-aria-props": "warn",
        "jsx-a11y/role-supports-aria-props": "warn",
        "jsx-a11y/scope": "warn",
        "jsx-a11y/tabindex-no-positive": "warn",
        "react-hooks/rules-of-hooks": "error",
        "react-hooks/exhaustive-deps": [
            "warn",
            {
                additionalHooks: "(useRecoilCallback|useRecoilTransaction_UNSTABLE)",
            },
        ],
        "@typescript-eslint/consistent-type-definitions": ["error", "type"],
        "@typescript-eslint/prefer-interface": 0,
        "@typescript-eslint/no-inferrable-types": ["error", { ignoreParameters: true, ignoreProperties: true }],
        "@typescript-eslint/explicit-function-return-type": ["off", { allowExpressions: true }],
        "@typescript-eslint/explicit-member-accessibility": [1, { accessibility: "no-public" }],
        "@typescript-eslint/no-non-null-assertion": "warn",
        "@typescript-eslint/no-unused-vars": [
            "error",
            {
                vars: "local",
                args: "none",
                ignoreRestSiblings: false,
            },
        ],
        "no-console": "off",
        // turn off some eslint errors since typescript takes care of this
        "import/no-extraneous-dependencies": "off",
        "consistent-return": "warn",
        "no-unused-vars": "off",
        "no-bitwise": 0,
        quotes: ["error", "double", { allowTemplateLiterals: true, avoidEscape: true }],
        "no-shadow": "off",
        "jsx-a11y/label-has-associated-control": "warn",
        "@typescript-eslint/ban-ts-ignore": 0,
        "@typescript-eslint/no-explicit-any": "off",
        "@typescript-eslint/no-shadow": "warn",
        "id-length": [
            "warn",
            {
                min: 2,
                max: 50,
                properties: "never",
                exceptions: ["_", "$", "a", "b", "e", "t"],
            },
        ],
        "import/extensions": [
            "error",
            "ignorePackages",
            {
                js: "never",
                mjs: "never",
                jsx: "never",
                ts: "never",
                tsx: "never",
            },
        ],
    },
};
