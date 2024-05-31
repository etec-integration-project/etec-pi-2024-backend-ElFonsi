module.exports = {
  require: ['ts-node/register', 'dotenv/config'],
  extension: ['ts'],
  recursive: true,
  reporter: 'spec',
  timeout: 30000,
  spec: 'test/**/*.ts'
};
