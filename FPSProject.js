const request = require('request');
const reader = require('xlsx')
  
// reading input test file
const file = reader.readFile('./LeadsList.xlsx')
  
let result_data = []
  
const sheets = file.SheetNames
  
for(let j = 0; j < sheets.length; j++) {

  //accepts a worksheet object as a parameter and returns an array of JSON objects.
  const rows = reader.utils.sheet_to_json(file.Sheets[file.SheetNames[j]]); 

  for (let i = 0; i < rows.length; i++) {
    const row = rows[i];
    var FirstName = (row['First Name'] ? row['First Name'] : "").trim(); 
    var MiddleName = (row['Middle Name'] ? row['Middle Name'] : "").trim();
    var LastName = (row['Last Name'] ? row['Last Name'] : "").trim();
    var addressLine2 = (row['State'] ? row['State'] : "").trim();
    var PhoneNumber = (row['Phone#'] ? row['Phone#'] : "").trim();
    var Email = (row['Email'] ? row['Email'] : "").trim();

    request({
      method: 'POST',
      url: 'https://api.peoplefinderspro.com/contact/enrich',
      headers: {
        'Content-Type': 'application/json',
        'galaxy-ap-name': 'INSERT API USERNAME HERE',
        'galaxy-ap-password': 'INSERT KEY/PASSWORD HERE',
        'galaxy-search-type': 'DevAPIContactEnrich'
      },

      body: `{  \"FirstName\": \"${FirstName}\",  \"MiddleName\": \"${MiddleName}\",  \"LastName\": \"${LastName}\",  \"Dob\": \"\",  \"Age\": \"\",  \"Address\": {    \"addressLine1\": \"\",    \"addressLine2\": \"${addressLine2}\"  },  \"PhoneNumber\": \"${PhoneNumber}\",  \"Email\": \"${Email}\"}`

    }, function (error, response, body) {

      if (response.statusCode == 200) {
        const bodyObj = JSON.parse(body)
        const age = bodyObj.person ? bodyObj.person.age : "";

        // puts Age field in row object
        row['Age'] = age; 
  
        // adds row object to list of results
        result_data.push(row); 

        if (result_data.length == rows.length) {

          // accepts an array of objects and converts them into a worksheet
          const ws = reader.utils.json_to_sheet(result_data) 

          // this function appends the sheet into the excel file
          reader.utils.book_append_sheet(file, ws, "Qualified Leads") 

          // writing to our file
          reader.writeFile(file, './Qualified Leads.xlsx')
        }

      }
      else {
        console.log("Something went wrong!");
        console.log(response);
        console.log(body);
        console.log(error);
      }
    });
   }
}


