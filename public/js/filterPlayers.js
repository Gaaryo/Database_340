filter = document.getElementsByClassName("filter_button")[0];
row_items = document.getElementsByClassName("item");

filter.addEventListener("click", () => {
  first_name = document.getElementById("input-fname").innerHTML
    .toLocaleLowerCase().trim();
  last_name = document.getElementById("input-lname").innerHTML
    .toLocaleLowerCase().trim();
  nation = document.getElementById("input-nation").innerHTML.toLocaleLowerCase()
    .trim();

  for (let i = 0; i < row_items.length; i++) {
    console.log("a");
    row_items[i].style.display = "";

    // first name
    if (
      row_items[i].children[0].innerHTML
        .toLocaleLowerCase().trim() == first_name
    ) {
      console.log("b");
      continue;
    }

    // last name
    if (
      row_items[i].children[1].innerHTML
        .toLocaleLowerCase().trim() == last_name
    ) {
      console.log("c");
      continue;
    }

    //nation
    if (
      row_items[i].children[2].innerHTML
        .toLocaleLowerCase().trim() == nation
    ) {
      console.log("d");
      continue;
    }

    console.log("e");
    row_items[i].style.display = "none";
  }
});
