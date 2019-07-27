// Use ES6/7 code
const GENERAL_DB =
  'https://docs.google.com/spreadsheets/d/1OG6EPZzzVq_P2KjQ6kDcsJ0YmMlwSYwcZ-Xqb4LeOFo/edit#gid=0';

function doGet(request) {
  return createHtmlTemplate('index.html');
}

function createHtmlTemplate(filename) {
  return HtmlService.createHtmlOutputFromFile(filename)
    .setTitle('Encuentro Colombiano')
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.DEFAULT);
}

function getPeopleRegistered() {
  let peopleSheet = getRawDataFromSheet(GENERAL_DB, 'INSCRITOS');
  let peopleObjects = sheetValuesToObject(peopleSheet);
  // logFunctionOutput(getPeopleRegistered.name, peopleObjects)
  return peopleObjects;
}

function searchPerson(cedula) {
  let person = validatePerson(cedula);
  logFunctionOutput(searchPerson.name, person);
  return person;
}

function registerPerson(data) {
  let person = JSON.parse(data);
  logFunctionOutput('DATA', data);
  logFunctionOutput('PERSON', person);

  let inscritosSheet = getSheetFromSpreadSheet(GENERAL_DB, 'INSCRITOS');
  let headers = inscritosSheet.getSheetValues(
    1,
    1,
    1,
    inscritosSheet.getLastColumn()
  )[0];
  person.hora_registro = new Date().toLocaleDateString();

  let personValues = jsonToSheetValues(person, headers);
  logFunctionOutput('personValues', personValues);
  let finalValues = personValues.map(String);
  let nicePerson = {
    cedula: personValues[2],
    nombres: personValues[0],
    apellidos: personValues[1],
    email: personValues[3],
    pago_total: personValues[8],
    concepto_pago: personValues[7],
    dependecia: 'COGESTEC 2019',
    telefono: personValues[4],
  };
  inscritosSheet.appendRow(finalValues);
  let result = {data: nicePerson, ok: true};
  logFunctionOutput(registerPerson.name, result);
  return result;
}

function validatePerson(cedula) {
  let inscritos = getPeopleRegistered();
  let result = {
    isRegistered: false,
    index: -1,
    data: null,
    cert_asist: '',
    cert_ponen: '',
  };
  for (let person in inscritos) {
    if (String(inscritos[person].cedula) === String(cedula)) {
      result.isRegistered = true;
      result.index = person;
      result.data = inscritos[person];
    }
  }
  logFunctionOutput(validatePerson.name, result);

  if (result.index < 0) {
    result.isRegistered = false;
  }
  return JSON.stringify(result);
}

function getSheetFromSpreadSheet(url, sheet) {
  let Spreedsheet = SpreadsheetApp.openByUrl(url);
  if (url && sheet) return Spreedsheet.getSheetByName(sheet);
}

function getRawDataFromSheet(url, sheet) {
  let mSheet = getSheetFromSpreadSheet(url, sheet);
  if (mSheet) {
    return mSheet.getSheetValues(
      1,
      1,
      mSheet.getLastRow(),
      mSheet.getLastColumn()
    );
  }
}

function jsonToSheetValues(json, headers) {
  let arrayValues = new Array(headers.length);
  let lowerHeaders = headers.map((item) => item.toLowerCase());

  for (let key in json) {
    for (let header in lowerHeaders) {
      if (key == String(lowerHeaders[header])) {
        if (key == 'nombre' || key == 'apellidos') {
          arrayValues[header] = json[key].toUpperCase();
        } else {
          arrayValues[header] = json[key];
        }
      }
    }
  }
  // logFunctionOutput(jsonToSheetValues.name, arrayValues)
  return arrayValues;
}

function sheetValuesToObject(sheetValues, headers) {
  let headings = headers || sheetValues[0].map(String.toLowerCase);
  let people = null;
  if (sheetValues) people = sheetValues.slice(1);
  let peopleWithHeadings = addHeadings(people, headings);

  function addHeadings(people, headings) {
    return people.map(function(personAsArray) {
      let personAsObj = {};

      headings.forEach(function(heading, i) {
        personAsObj[heading] = personAsArray[i];
      });

      return personAsObj;
    });
  }
  // logFunctionOutput(sheetValuesToObject.name, peopleWithHeadings)
  return peopleWithHeadings;
}

function logFunctionOutput(functionName, returnValue) {
  Logger.log('Function-------->' + functionName);
  Logger.log('Value------------>');
  Logger.log(returnValue);
  Logger.log('----------------------------------');
}

export {doGet, searchPerson, registerPerson};
