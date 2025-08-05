# Lead Enrichment Tool

This Node.js script reads lead data from an Excel file and enriches it with an 'age' column using the [PeopleFindersPro API](https://www.peoplefinderspro.com/). It can also retrieve additional information such as phone numbers & addresses depending on the type of lead enrichment categories selected in the API. Results to each contact are appended before saving to a new Excel file.

---

## Input Format

The input Excel file (`LeadsList.xlsx`) should contain a sheet with the following column headers:

- `First Name`
- `Middle Name` (optional)
- `Last Name`
- `State`
- `Phone#` (optional)
- `Email` (optional)

Each row represents one lead.

---

## Output

After enrichment, the script generates a new Excel file:  
**`Qualified Leads.xlsx`**

This file includes all original fields, plus an added:
- `Age` column (returned from the API)

---

## Setup Instructions

### 1. Clone the repository
### 2. Add environment variables
- i.e. add your respective user and key credentials in the request header
### 3. Run your script! 

---

## Dependencies 

xlsx – Read/write Excel files

request – Makes HTTP requests from the API 

dotenv – Loads environment variables


