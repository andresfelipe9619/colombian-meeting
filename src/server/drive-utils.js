const ROOT_FOLDER = 'ENCUENTRO COLOMBIANO';

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

export {createPonenciaFile};
