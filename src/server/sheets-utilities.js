// Use ES6/7 code
const ROOT_FOLDER = 'ENCUENTRO COLOMBIANO';
const REQUEST_PAYLOAD = null;
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

function registerPerson(person) {
  let inscritosSheet = getSheetFromSpreadSheet(GENERAL_DB, 'INSCRITOS');
  let headers = inscritosSheet.getSheetValues(
    1,
    1,
    1,
    inscritosSheet.getLastColumn()
  )[0];
  person.push({
    name: 'hora_registro',
    value: new Date().toLocaleDateString(),
  });
  let payIndex = -1;
  for (let i in person) {
    if (person[i] && person[i]['name'] === 'pay_file') {
      payIndex = i;
    }
  }

  if (
    payIndex === -1 ||
    (payIndex !== -1 && !person[payIndex].value.length > 3)
  ) {
    person.push({name: 'pay_file', value: '-'});
  }
  person.push({name: 'pago_comprobado', value: '-'});

  logFunctionOutput('person', person);

  let personValues = objectToSheetValues(person, headers);
  let finalValues = personValues.map(function(value) {
    return String(value);
  });
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
  // let dir_cert_ponen_id = '17ubi8AdovGF9kKNA-V1mlG79NPqrx89c';
  // let dir_cert_ponen = DriveApp.getFolderById(dir_cert_ponen_id);
  // let certificados_ponencia = dir_cert_ponen.getFiles();
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

function getPersonFolder(name, mainFolder) {
  // se crea la carpeta que va conener todos los docmuentos
  let nameFolder = 'documentos';
  let FolderFiles;
  let folders = mainFolder.getFoldersByName(nameFolder);
  if (folders.hasNext()) {
    FolderFiles = folders.next();
  } else {
    FolderFiles = mainFolder.createFolder(nameFolder);
  }

  // se crea la carpeta que va contener los documentos de cada inscrito
  let currentFolder;
  let mFolders = FolderFiles.getFoldersByName(name);
  if (mFolders.hasNext()) {
    currentFolder = mFolders.next();
  } else {
    currentFolder = FolderFiles.createFolder(name);
  }

  return currentFolder;
}

function getMainFolder() {
  let dropbox = ROOT_FOLDER;
  let mainFolder;
  let folders = DriveApp.getFoldersByName(dropbox);

  if (folders.hasNext()) {
    mainFolder = folders.next();
  } else {
    mainFolder = DriveApp.createFolder(dropbox);
  }
  return mainFolder;
}
function createPersonFile(name, numdoc, data) {
  let result = {
    url: '',
    file: '',
  };
  let mainFolder = getMainFolder();
  let currentFolder = getPersonFolder(numdoc, mainFolder);

  let contentType = data.substring(5, data.indexOf(';'));
  let bytes = Utilities.base64Decode(data.substr(data.indexOf('base64,') + 7));
  let blob = Utilities.newBlob(bytes, contentType, file);

  let file = currentFolder.createFile(blob);
  file.setDescription('Subido Por ' + numdoc);
  file.setName(numdoc + '_' + name);
  result.url = file.getUrl();
  result.file = file.getName();
  return result;
}

function createPonenciaFile(numdoc, data) {
  let res = createPersonFile('PONENCIA', numdoc, data);
  return res;
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

function objectToSheetValues(object, headers) {
  let arrayValues = new Array(headers.length);
  let lowerHeaders = headers.map(function(item) {
    return item.toLowerCase();
  });

  for (let item in object) {
    for (let header in lowerHeaders) {
      if (String(object[item].name) == String(lowerHeaders[header])) {
        if (
          object[item].name == 'nombres' ||
          object[item].name == 'apellidos' ||
          object[item].name == 'institucion' ||
          object[item].name == 'nombre_ponencia'
        ) {
          arrayValues[header] = object[item].value.toUpperCase();
          Logger.log(arrayValues);
        } else {
          arrayValues[header] = object[item].value;
          Logger.log(arrayValues);
        }
      }
    }
  }
  // logFunctionOutput(objectToSheetValues.name, arrayValues)
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

// function sendInternationalMail(person) {
//   let htmlBody = buildInternationalBody(person);
//   let subject = 'Confirmación de Registro Internacional';
//   sendEmail(subject, htmlBody, person);
// }

function sendEmail(subject, body, person) {
  Logger.log('I like the way you french inhale');
  if (person) {
    MailApp.sendEmail({
      to: person.email,
      subject: subject,
      name: 'COGESTEC 2019',
      htmlBody: body,
    });
  }
}

export {doGet, searchPerson, createPonenciaFile, registerPerson};
