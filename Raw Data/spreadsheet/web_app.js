var SHEET_NAME = "Sheet1";
var SCRIPT_PROP = PropertiesService.getScriptProperties();

function doGet(e){
  return handleResponse(e);
}

function doPost(e){
  return handleResponse(e);
}

function handleResponse(e) {
  try {
    var doc = SpreadsheetApp.openById(SCRIPT_PROP.getProperty("key"));
    var sheet = doc.getSheetByName(SHEET_NAME);
    var headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
    var nextRow = sheet.getLastRow()+1;
    var data = JSON.parse(e.postData.contents);
    switch (data.method) {
      case "write":
        var row = [];
        for (i in headers) {
          if (headers[i] == "Timestamp") {
            row.push(new Date());
          } else {
            row.push(data[headers[i]]);
          }
        }
        sheet.getRange(nextRow, 1, 1, row.length).setValues([row]);
        var result = nextRow;
        break;
      case "read":
        var jsondata = {};
        var value = sheet.getRange(data.row, 1, data.row, sheet.getLastColumn()).getValues()[0];
        for (i in headers) {
          jsondata[headers[i]] = value[i];
        }
        var result = JSON.stringify(jsondata);
        break;
    }
    return ContentService
    .createTextOutput(JSON.stringify({"result":"success", "data": result}))
      .setMimeType(ContentService.MimeType.JSON);
  } catch(e) {
    return ContentService
      .createTextOutput(JSON.stringify({"result":"error", "error": e}))
      .setMimeType(ContentService.MimeType.JSON);
  }
}