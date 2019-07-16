// Use ES6/7 code
const doGet = () => {
  const title = 'Google Apps Script';
  const fileName = 'index.html';
  return HtmlService.createHtmlOutputFromFile(fileName)
    .setTitle(title)
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.DEFAULT);
};

const onOpen = () => {
  SpreadsheetApp.getUi() // Or DocumentApp or FormApp.
    .createMenu('Custom scripts')
    .addItem('Edit sheets [sample React project]', 'openDialog')
    .addToUi();
};

const openDialog = () => {
  let html = HtmlService.createHtmlOutputFromFile('dialog')
    .setWidth(400)
    .setHeight(600);
  SpreadsheetApp.getUi() // Or DocumentApp or FormApp.
    .showModalDialog(html, 'Sheet Editor');
};

const getSheets = () => SpreadsheetApp.getActive().getSheets();

const getActiveSheetName = () => SpreadsheetApp.getActive().getSheetName();

const getSheetsData = () => {
  let activeSheetName = getActiveSheetName();
  return getSheets().map((sheet, index) => {
    let sheetName = sheet.getName();
    return {
      text: sheetName,
      sheetIndex: index,
      isActive: sheetName === activeSheetName,
    };
  });
};

const addSheet = (sheetTitle) => {
  SpreadsheetApp.getActive().insertSheet(sheetTitle);
  return getSheetsData();
};

const deleteSheet = (sheetIndex) => {
  let sheets = getSheets();
  SpreadsheetApp.getActive().deleteSheet(sheets[sheetIndex]);
  return getSheetsData();
};

const setActiveSheet = (sheetName) => {
  SpreadsheetApp.getActive()
    .getSheetByName(sheetName)
    .activate();
  return getSheetsData();
};

export {
  doGet,
  onOpen,
  openDialog,
  getSheetsData,
  addSheet,
  deleteSheet,
  setActiveSheet,
};
