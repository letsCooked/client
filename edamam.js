$.ajax({
  method: "get",
  url: `http://localhost:3000/edamam/${keyword}`
}).done(recipes => {
  event.preventDefault();
  $("").empty();
  for (let recipe of recipes) {
    $("").append(`

                `);
  }
});
