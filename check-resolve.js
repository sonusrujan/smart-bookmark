const resolve = require.resolve('tailwindcss', { paths: [process.cwd()] });
console.log('Resolved tailwindcss at:', resolve);
