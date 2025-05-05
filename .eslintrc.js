module.exports = {
    extends: [
        'react-app',
        'react-app/jest'
    ],
    rules: {
        'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }],
        'react/jsx-props-no-spreading': 'off',
        'react/prop-types': 'off',
        'no-unused-vars': 'warn',
        'no-console': ['warn', { allow: ['error'] }]
    }
};