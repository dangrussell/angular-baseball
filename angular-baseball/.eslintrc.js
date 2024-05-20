module.exports = {
  root: true,
  overrides: [
    /**
     * -----------------------------------------------------
     * TYPESCRIPT FILES (COMPONENTS, SERVICES ETC) (.ts)
     * -----------------------------------------------------
     */
    {
      files: ['*.ts'],
      env: {
        browser: true,
        node: true
      },
      extends: [
        'eslint:recommended',
        'plugin:@angular-eslint/all',
        // 'plugin:@angular-eslint/recommended',
        // 'plugin:@angular-eslint/template/process-inline-templates',
        'plugin:@ngrx/recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:@typescript-eslint/recommended-requiring-type-checking',
      ],
      parser: '@typescript-eslint/parser',
      parserOptions: {
        project: [
          'tsconfig.app.json',
          'tsconfig.eslint.json',
          'tsconfig.spec.json',
          'e2e/tsconfig.eslint.json'
        ],
        sourceType: 'module',
        tsconfigRootDir: __dirname,
      },
      plugins: [
        '@angular-eslint',
        '@ngrx',
        '@typescript-eslint',
        'rxjs-angular'
      ],
      rules: {
        //#region @angular-eslint
        "@angular-eslint/prefer-on-push-component-change-detection": "off",
        //#endregion @angular-eslint

        //#region @ngrx
        "@ngrx/no-store-subscription": "warn",
        //#endregion @ngrx

        '@typescript-eslint/adjacent-overload-signatures': 'error',
        '@typescript-eslint/array-type': 'off',
        '@typescript-eslint/await-thenable': 'error',
        '@typescript-eslint/ban-ts-comment': 'error',
        '@typescript-eslint/ban-types': [
          'error',
          {
            types: {
              Object: {
                message: 'Avoid using the `Object` type. Did you mean `object`?'
              },
              Function: {
                message: 'Avoid using the `Function` type. Prefer a specific function type, like `() => void`.'
              },
              // eslint-disable-next-line id-blacklist
              Boolean: {
                message: 'Avoid using the `Boolean` type. Did you mean `boolean`?'
              },
              // eslint-disable-next-line id-blacklist
              Number: {
                message: 'Avoid using the `Number` type. Did you mean `number`?'
              },
              // eslint-disable-next-line id-blacklist
              String: {
                message: 'Avoid using the `String` type. Did you mean `string`?'
              },
              Symbol: {
                message: 'Avoid using the `Symbol` type. Did you mean `symbol`?'
              }
            }
          }
        ],
        '@typescript-eslint/consistent-type-assertions': 'error',
        '@typescript-eslint/dot-notation': 'error',
        '@typescript-eslint/explicit-member-accessibility': [
          'off',
          {
            accessibility: 'explicit'
          }
        ],
        '@typescript-eslint/explicit-module-boundary-types': 'warn',
        '@typescript-eslint/member-delimiter-style': [
          'error',
          {
            multiline: {
              delimiter: 'semi',
              requireLast: true
            },
            singleline: {
              delimiter: 'semi',
              requireLast: false
            }
          }
        ],
        '@typescript-eslint/member-ordering': 'off',
        '@typescript-eslint/naming-convention': 'off',
        '@typescript-eslint/no-array-constructor': 'error',
        '@typescript-eslint/no-empty-function': 'off',
        '@typescript-eslint/no-empty-interface': 'error',
        '@typescript-eslint/no-explicit-any': 'off',
        '@typescript-eslint/no-extra-non-null-assertion': 'error',
        '@typescript-eslint/no-extra-semi': 'error',
        '@typescript-eslint/no-floating-promises': 'error',
        '@typescript-eslint/no-for-in-array': 'error',
        '@typescript-eslint/no-implied-eval': 'error',
        '@typescript-eslint/no-inferrable-types': 'error',
        '@typescript-eslint/no-misused-new': 'error',
        '@typescript-eslint/no-misused-promises': 'error',
        '@typescript-eslint/no-namespace': 'error',
        '@typescript-eslint/no-non-null-asserted-optional-chain': 'error',
        '@typescript-eslint/no-non-null-assertion': 'error',
        '@typescript-eslint/no-parameter-properties': 'off',
        '@typescript-eslint/no-this-alias': 'error',
        '@typescript-eslint/no-unnecessary-type-assertion': 'error',
        '@typescript-eslint/no-unsafe-assignment': 'error',
        '@typescript-eslint/no-unsafe-call': 'error',
        '@typescript-eslint/no-unsafe-member-access': 'error',
        '@typescript-eslint/no-unsafe-return': 'error',
        '@typescript-eslint/no-unused-expressions': 'error',
        '@typescript-eslint/no-unused-vars': 'warn',
        '@typescript-eslint/no-use-before-define': 'off',
        '@typescript-eslint/no-var-requires': 'off',
        '@typescript-eslint/prefer-as-const': 'error',
        '@typescript-eslint/prefer-for-of': 'error',
        '@typescript-eslint/prefer-function-type': 'error',
        '@typescript-eslint/prefer-namespace-keyword': 'error',
        '@typescript-eslint/prefer-regexp-exec': 'error',
        '@typescript-eslint/quotes': [
          'error',
          'single'
        ],
        '@typescript-eslint/require-await': 'error',
        '@typescript-eslint/restrict-plus-operands': 'error',
        '@typescript-eslint/restrict-template-expressions': 'error',
        '@typescript-eslint/semi': [
          'error',
          'always'
        ],
        '@typescript-eslint/triple-slash-reference': [
          'error',
          {
            path: 'always',
            types: 'prefer-import',
            lib: 'always'
          }
        ],
        '@typescript-eslint/type-annotation-spacing': 'error',
        '@typescript-eslint/unbound-method': 'error',
        '@typescript-eslint/unified-signatures': 'error',
        'arrow-body-style': 'error',
        'arrow-parens': [
          'off',
          'always'
        ],
        'comma-dangle': 'off',
        complexity: 'off',
        'constructor-super': 'error',
        curly: 'error',
        'eol-last': 'error',
        eqeqeq: [
          'error',
          'smart'
        ],
        'guard-for-in': 'error',
        'id-blacklist': [
          'error',
          'any',
          'Number',
          'number',
          'String',
          'string',
          'Boolean',
          'boolean',
          'Undefined',
          'undefined'
        ],
        'id-match': 'error',
        'import/order': 'off',
        'max-classes-per-file': 'off',
        'max-len': [
          'off',
          {
            code: 140
          }
        ],
        'new-parens': 'error',
        'no-array-constructor': 'off',
        'no-bitwise': 'error',
        'no-caller': 'error',
        'no-cond-assign': 'error',
        'no-console': [
          'error',
          {
            allow: [
              'log',
              'warn',
              'dir',
              'timeLog',
              'assert',
              'clear',
              'count',
              'countReset',
              'group',
              'groupEnd',
              'table',
              'dirxml',
              'error',
              'groupCollapsed',
              'Console',
              'profile',
              'profileEnd',
              'timeStamp',
              'context'
            ]
          }
        ],
        'no-debugger': 'error',
        'no-empty': 'off',
        'no-empty-function': 'off',
        'no-eval': 'error',
        'no-extra-semi': 'off',
        'no-fallthrough': 'error',
        'no-invalid-this': 'off',
        'no-multiple-empty-lines': 'off',
        'no-new-wrappers': 'error',
        'no-restricted-imports': [
          'error',
          'rxjs/Rx'
        ],
        'no-shadow': [
          'error',
          {
            hoist: 'all'
          }
        ],
        'no-throw-literal': 'error',
        'no-trailing-spaces': 'error',
        'no-undef-init': 'error',
        'no-underscore-dangle': 0,
        'no-unsafe-finally': 'error',
        'no-unused-labels': 'error',
        'no-unused-vars': 'off',
        'no-var': 'error',
        'object-shorthand': 'error',
        'one-var': [
          'error',
          'never'
        ],
        'prefer-const': 'error',
        'quote-props': [
          'error',
          'as-needed'
        ],
        radix: 'error',
        'require-await': 'off',
        'rxjs-angular/prefer-async-pipe': 'error',
        'rxjs-angular/prefer-composition': 'error',
        'rxjs-angular/prefer-takeuntil': 'error',
        'space-before-function-paren': [
          'error',
          {
            anonymous: 'never',
            asyncArrow: 'always',
            named: 'never'
          }
        ],
        'spaced-comment': [
          'error',
          'always',
          {
            markers: [
              '/'
            ]
          }
        ],
        'use-isnan': 'error',
        'valid-typeof': 'off'
      }
    },

    /**
     * -----------------------------------------------------
     * COMPONENT TEMPLATES
     * -----------------------------------------------------
     */
    {
      files: ['*.html'],
      extends: [
        "plugin:@angular-eslint/template/recommended",
        "plugin:@angular-eslint/template/accessibility",
      ],
      rules: {
        /**
         * Any template/HTML related rules you wish to use/reconfigure over and above the
         * recommended set provided by the @angular-eslint project would go here.
         */
        '@angular-eslint/template/click-events-have-key-events': 'warn',
        '@angular-eslint/template/conditional-complexity': 'off',
        '@angular-eslint/template/cyclomatic-complexity': 'off',
        // '@angular-eslint/template/banana-in-box': 'error', // @angular-eslint/template/recommended
        // '@angular-eslint/template/eqeqeq': 'error', // @angular-eslint/template/recommended
        '@angular-eslint/template/i18n': 'off',
        '@angular-eslint/template/mouse-events-have-key-events': 'warn',
        '@angular-eslint/template/no-any': 'warn',
        '@angular-eslint/template/no-autofocus': 'warn',
        '@angular-eslint/template/no-call-expression': 'off',
        '@angular-eslint/template/no-distracting-elements': 'warn',
        '@angular-eslint/template/no-duplicate-attributes': 'warn',
        // '@angular-eslint/template/no-negated-async': 'error', // @angular-eslint/template/recommended
        '@angular-eslint/template/no-positive-tabindex': 'warn',
        '@angular-eslint/template/use-track-by-function': 'off'
      }
    },
    {
      files: ['*.js'],
      env: {
        browser: true,
        node: true
      },
      extends: [
        'eslint:recommended'
      ],
      plugins: [
        'jsdoc'
      ],
    }
  ]
};
