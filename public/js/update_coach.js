
// Get the objects we need to modify
let updateCoachForm = document.getElementById('update-coach-form-ajax');
// Modify the objects we need
updateCoachForm.addEventListener("submit", function (e) {
    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let inputCoachID = document.getElementById("idSelect");
    let inputFirstName = document.getElementById("input-first_name-update");
    let inputLastName = document.getElementById("input-last_name-update");


    // Get the values from the form fields
    let idValue = inputCoachID.value;
    let firstNameValue = inputFirstName.value;
    let lastNameValue = inputLastName.value;

        
    // currently the database table for bsg_people does not allow updating values to NULL
    // so we must abort if being bassed NULL for homeworld




    // Put our data we want to send in a javascript object
    let data = {
        coach_id: idValue,
        first_name: firstNameValue,
        last_name: lastNameValue
    }
    
    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("PUT", "/put-coach-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            // Add the new data to the table
            updateRow(xhttp.response, idValue);
            // Clear the input fields for another transaction
            inputCoachID.value = inputCoachID.getElementsByTagName("option")[0].value;
            inputFirstName.value = '';
            inputLastName.value = '';

        }
        else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("There was an error with the input.")
        }
    }

    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));

})


function updateRow(data, coachID){
    let parsedData = JSON.parse(data);
    
    console.log(parsedData)

    let table = document.getElementById("coaches-table");

    for (let i = 0, row; row = table.rows[i]; i++) {
       //iterate through rows
       //rows would be accessed using the "row" variable assigned in the for loop
       if (table.rows[i].getAttribute("data-value") == coachID) {

            // Get the location of the row where we found the matching person ID
            let updateRowIndex = table.getElementsByTagName("tr")[i];

            // Get td of homeworld value
            let firstNametd = updateRowIndex.getElementsByTagName("td")[1];
            let lastNametd = updateRowIndex.getElementsByTagName("td")[2];

            // Reassign homeworld to our value we updated to
            firstNametd.innerHTML = parsedData.first_name; 
            lastNametd.innerHTML = parsedData.last_name; 

       }
    }
}








/** // Get the objects we need to modify
let updateCoachForm = document.getElementById('update-coach-form-ajax');

// Modify the objects we need
updateCoachForm.addEventListener("submit", function (e) {
   
    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let inputID = document.getElementById("idSelect");
    let inputFirstName = document.getElementById("input-first_name-update");
    let inputLastName = document.getElementById("input-last_name-update");


    // Get the values from the form fields
    let idValue = inputID.value;
    let firstNameValue = inputFirstName.value;
    let lastNameValue = inputLastName.value;
    
    // currently the database table for bsg_people does not allow updating values to NULL
    // so we must abort if being bassed NULL for homeworld

    if (isNaN(firstNameValue)) 
    {
        return;
    }

    if (isNaN(lastNameValue)) 
    {
        return;
    }

    // Put our data we want to send in a javascript object
    let data = {
        coach_id: idValue,
        first_name: firstNameValue,
        last_name: lastNameValue,
    }
    
    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("PUT", "/put-coach-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            // Add the new data to the table
            updateRow(xhttp.response, idValue);

        }
        else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("There was an error with the input.")
        }
    }

    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));

})


function updateRow(data, coachID){
    let parsedData = JSON.parse(data);
    
    let table = document.getElementById("coaches-table");

    for (let i = 0, row; row = table.rows[i]; i++) {
       //iterate through rows
       //rows would be accessed using the "row" variable assigned in the for loop
       if (table.rows[i].getAttribute("data-value") == coachID) {

            // Get the location of the row where we found the matching person ID
            let updateRowIndex = table.getElementsByTagName("tr")[i];

            // Get td of homeworld value
            let td1 = updateRowIndex.getElementsByTagName("td")[1];
            let td2 = updateRowIndex.getElementsByTagName("td")[2];

            // Reassign homeworld to our value we updated to
            td1.innerHTML = parsedData[0].first_name;
            td2.innerHTML = parsedData[0].last_name; 
       }
    }
}
*/
