import * as publicFunctions from './index.js';

// Expose public functions
global.doGet = publicFunctions.doGet;
global.searchPerson = publicFunctions.searchPerson;
global.createPonenciaFile = publicFunctions.createPonenciaFile;
global.registerPerson = publicFunctions.registerPerson;
