filter = document.getElementsByClassName("filter_button")[0];
row_items = document.getElementsByClassName("item");

filter.addEventListener("click", () => {
  first_name = document.getElementById("input-fname").value
    .toLocaleLowerCase().trim();
  last_name = document.getElementById("input-lname").value
    .toLocaleLowerCase().trim();
  nation = document.getElementById("input-nation").value
    .toLocaleLowerCase().trim();

  for (let i = 0; i < row_items.length; i++) {
    row_items[i].style.display = "";
    console.log(row_items[i].children[0].innerHTML, first_name);
    console.log(row_items[i].children[1].innerHTML, last_name);
    console.log(row_items[i].children[2].innerHTML, nation);

    // first name
    if (
      row_items[i].children[0].innerHTML
        .toLocaleLowerCase().trim() == first_name
    ) {
      continue;
    }

    // last name
    if (
      row_items[i].children[1].innerHTML
        .toLocaleLowerCase().trim() == last_name
    ) {
      continue;
    }

    //nation
    if (
      row_items[i].children[2].innerHTML
        .toLocaleLowerCase().trim() == nation
    ) {
      continue;
    }

    if (first_name == "" && last_name == "" && nation == "") {
      continue;
    }

    row_items[i].style.display = "none";
  }
});
