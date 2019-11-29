function loggingOut() {
  $("#home").hide();
  $("#login").show();
}
function loggingIn() {
  $("#home").show();
  $("#login").hide();
}

$(document).ready(function() {
  $("#button-random").on("click", function(event) {
    event.preventDefault();
    let activity;
    bored()
      .then(data => {
        activity = data;
        return edamam(data);
      })
      .then(recipe => {
        $('#recipe-ingredients').empty()
        $('#recipe-vitamins').empty()
        $('#bored-activity').html(`${activity}`)
        $("#recipe-from-edamam").html(`${recipe.label}`);
        $("#recipe-image").html(
          `<img src=${recipe.image} alt="" class="mx-auto d-block">`
        );
        for (let i = 0; i < recipe.ingredientLines.length; i++) {
          $("#recipe-ingredients")
            .append(`<div class="custom-control custom-checkbox">
          <input type="checkbox" class="custom-control-input" id="customCheck1">
          <label class="custom-control-label" for="customCheck1">${recipe.ingredientLines[i]}</label>
          </div>`);
        }
        for (let i = 0; i < Object.keys(recipe.totalNutrients).length; i++) {
          if (
            recipe.totalNutrients[
              Object.keys(recipe.totalNutrients)[i]
            ].label.includes("Vitamin")
          ) {
            $("#recipe-vitamins").append(`
                <button class="btn-sm">${
                  recipe.totalNutrients[Object.keys(recipe.totalNutrients)[i]]
                    .label
                }</button>
              `);
          }
        }
      });
  });
});

loggingIn();
