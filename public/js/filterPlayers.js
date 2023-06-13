filter = document.getElementsByClassName("filter_button")[0];
row_items = document.getElementsByClassName("item");

filter.addEventListener("click", () => {
  for (row in row_items) {
    row_items.style.display = "";
  }
});
