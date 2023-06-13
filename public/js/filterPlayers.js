filter = document.getElementsByClassName("filter_button")[0];
row_items = document.getElementsByClassName("item");

filter.addEventListener("click", () => {
  first_name = document.getElementById("input-fname");
  last_name = document.getElementById("input-lname");
  nation = document.getElementById("input-nation");

  for (row in row_items) {
    row.style.display = "none";

    // first name
    if (first_name == "" || row.children[0].innerHTML == first_name) {
      continue;
    }

    // last name
    if (last_name == "" || row.children[1].innerHTML == last_name) {
      continue;
    }

    //nation
    if (nation == "" || row.children[2].innerHTML == nation) {
      continue;
    }

    row.style.display = "";
  }
});
