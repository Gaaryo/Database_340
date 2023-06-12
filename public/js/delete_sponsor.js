function deleteSponsor(sponsorID) {
  // Put our data we want to send in a javascript object
  const data = {
    year: sponsorID,
  };

  // Setup our AJAX request
  const xhttp = new XMLHttpRequest();
  xhttp.open("DELETE", "/delete-sponsor-ajax", true);
  xhttp.setRequestHeader("Content-type", "application/json");

  // Tell our AJAX request how to resolve
  xhttp.onreadystatechange = () => {
    if (xhttp.readyState == 4 && xhttp.status == 204) {
      // Add the new data to the table
      deleteRow(sponsorID);
    } else if (xhttp.readyState == 4 && xhttp.status != 204) {
      console.log("There was an error with the input.");
    }
  };
  // Send the request and wait for the response
  xhttp.send(JSON.stringify(data));
}

function deleteRow(sponsorID) {
  const table = document.getElementById("sponsors-table");
  for (let i = 0; i < table.rows.length; i++) {
    //iterate through rows
    if (table.rows[i].getAttribute("data-value") == sponsorID) {
      table.deleteRow(i);
      break;
    }
  }
}
