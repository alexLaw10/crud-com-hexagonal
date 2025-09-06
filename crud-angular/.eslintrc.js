module.exports = {
  root: true,
  ignorePatterns: [
    'projects/**/*',
    'dist/**/*',
    'node_modules/**/*'
  ],
  overrides: [
    {
      files: [
        '*.ts'
      ],
      parserOptions: {
        project: [
          'tsconfig.json'
        ],
        createDefaultProgram: true
      },
      extends: [
        '@typescript-eslint/recommended'
      ],
      plugins: [
        '@typescript-eslint'
      ],
      rules: {
        // ===== REGRAS OBRIGATÓRIAS PARA NÍVEIS DE ACESSO =====
        '@typescript-eslint/explicit-member-accessibility': [
          'error',
          {
            accessibility: 'explicit',
            overrides: {
              constructors: 'no-public',
              methods: 'explicit',
              properties: 'explicit',
              parameterProperties: 'explicit'
            }
          }
        ],

        // ===== REGRAS DO TYPESCRIPT =====
        '@typescript-eslint/consistent-type-definitions': ['error', 'interface'],
        '@typescript-eslint/explicit-function-return-type': 'error',
        '@typescript-eslint/no-explicit-any': 'warn',
        '@typescript-eslint/no-unused-vars': 'error',
        '@typescript-eslint/prefer-readonly': 'error',
        '@typescript-eslint/prefer-optional-chain': 'error',
        '@typescript-eslint/prefer-nullish-coalescing': 'error',
        '@typescript-eslint/no-non-null-assertion': 'error',
        '@typescript-eslint/no-inferrable-types': 'off',

        // ===== REGRAS GERAIS =====
        'no-console': 'warn',
        'no-debugger': 'error',
        'no-duplicate-imports': 'error',
        'no-unused-expressions': 'error',
        'prefer-const': 'error',
        'no-var': 'error',

        // ===== REGRAS PARA INJEÇÃO DE DEPENDÊNCIA =====
        '@typescript-eslint/no-parameter-properties': [
          'error',
          {
            allows: ['private readonly', 'protected readonly', 'public readonly']
          }
        ]
      }
    }
  ]
};
