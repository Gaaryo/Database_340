// Get the objects we need to modify
const addTournamentForm = document.getElementById("add-tournament-form-ajax");

// Modify the objects we need
addTournamentForm.addEventListener("submit", function (e) {
  // Prevent the form from submitting
  e.preventDefault();

  // Get form fields we need to get data from
  const inputYear = document.getElementById("input-year");
  const inputVenue = document.getElementById("input-venue");
  const InputSponsor = document.getElementById("input-sponsor");

  // Get the values from the form fields
  const yearValue = inputYear.value;
  const venueValue = inputVenue.value;
  const sponsorValue = InputSponsor.value;

  // Put our data we want to send in a javascript object
  const data = {
    year: yearValue,
    venue: venueValue,
    sponsor_id: sponsorValue,
  };

  // Setup our AJAX request
  const xhttp = new XMLHttpRequest();
  xhttp.open("POST", "/add-tournament-ajax", true);
  xhttp.setRequestHeader("Content-type", "application/json");

  // Tell our AJAX request how to resolve
  xhttp.onreadystatechange = () => {
    if (xhttp.readyState == 4 && xhttp.status == 200) {
      // Add the new data to the table
      addRowToTable(xhttp.response);

      // Clear the input fields for another transaction
      inputYear.value = "";
      inputVenue.value = "";
      InputSponsor.value = "";
    } else if (xhttp.readyState == 4 && xhttp.status != 200) {
      console.log("There was an error with the input.");
    }
  };

  // Send the request and wait for the response
  xhttp.send(JSON.stringify(data));
});

// Creates a single row from an Object representing a single record from
// bsg_touraments
addRowToTable = (data) => {
  // Get a reference to the current table on the page and clear it out.
  const currentTable = document.getElementById("tournaments-table");

  // Get the location where we should insert the new row (end of table)
  const _newRowIndex = currentTable.rows.length;

  // Get a reference to the new row from the database query (last object)
  const parsedData = JSON.parse(data);
  const newRow = parsedData[parsedData.length - 1];

  // Create a row and 4 cells
  const row = document.createElement("TR");
  const yearCell = document.createElement("TD");
  const venueCell = document.createElement("TD");
  const sponsorCell = document.createElement("TD");

  // Fill the cells with correct data
  ageCell.innerText = newRow.age;
  yearCell.innerText = newRow.year;
  venueCell.innerText = newRow.venue;
  sponsorCell.innerText = newRow.sponsor_id;

  // Add the cells to the row
  row.appendChild(yearCell);
  row.appendChild(venueCell);
  row.appendChild(sponsorCell);

  // Add the row to the table
  currentTable.appendChild(row);
};
