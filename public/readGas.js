import { config }  from './config';
   function handleClientLoad() {
        gapi.load('client:auth2', initClient);
      }

export function initClient() {
    var CLIENT_ID = config.CLIENT_ID;
    var API_KEY = config.API_KEY;
    var SCOPE = 'https://www.googleapis.com/auth/spreadsheets';
    gapi.client.init({
      'apiKey': API_KEY,
      'clientId': CLIENT_ID,
      'scope': SCOPE,
      'discoveryDocs': ['https://sheets.googleapis.com/$discovery/rest?version=v4'],
    }).then(function() {
      makeApiCall();
    });
  }
  
 export function makeApiCall(){
    var params = {
      spreadsheetId: config.spreadsheetId,  
      range: config.range,
    };
    var request = gapi.client.sheets.spreadsheets.values.get(params);
    var reulst = request.then(function(response) {
      // TODO: Change code below to process the `response` object:
      var resultSet = response.result.values;
      console.log(resultSet);
      document.line.item_1.length = resultSet.length;
     for(var i=0;i<resultSet.length;i++){
        document.line.item_1.options[i].text=resultSet[i][1];
        document.line.item_1.options[i].values=resultSet[i][1];
      }
    console.log(response.result);
    }, function(reason) {
      console.error('error: ' + reason.result.error.message);
    })
  }