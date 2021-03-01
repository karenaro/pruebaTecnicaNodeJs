const path = require('path');
const rootPath = path.normalize(__dirname + '/..');
const env = process.env.NODE_ENV || 'development';

const config = {
  development: {
    root: rootPath,
    app: {
      name: 'pruebatecnica'
    },
    port: process.env.PORT || 3000,
    db: 'mongodb+srv://electiva:karen424@electiva1.ki8e0.mongodb.net/prueba?retryWrites=true&w=majority'
  },

  test: {
    root: rootPath,
    app: {
      name: 'pruebatecnica'
    },
    port: process.env.PORT || 3000,
    db: 'mongodb+srv://electiva:karen424@electiva1.ki8e0.mongodb.net/prueba?retryWrites=true&w=majority'
  },

  production: {
    root: rootPath,
    app: {
      name: 'pruebatecnica'
    },
    port: process.env.PORT || 3000,
    db: 'mongodb+srv://electiva:karen424@electiva1.ki8e0.mongodb.net/prueba?retryWrites=true&w=majority'
  }
};

module.exports = config[env];
