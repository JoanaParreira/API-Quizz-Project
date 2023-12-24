
//var index = 10;

define(["service", "view"], function (quizzService, quizzView) {
  const externals = {};
  const internals = {};

  externals.start = function () {
    internals.populateView();
    //externals.getCategories();
  };

  

  externals.getCategories = async function(){
    var categories = await quizzService.fetchCategories()
    console.log(categories);
    return categories;
  };

  externals.getIndex = async function(){
    console.log(index);
    return await index;
  };

    externals.getSelectedIndexFromView = function () {
    return quizzView.getSelectedIndex();
  };

  externals.changeCategoryIndex = function (selectedCategoryId) {
    index = selectedCategoryId;
    console.log(index);
    return index;
  };

  internals.populateView = async function () {
    var data = quizzService.getData(await externals.getSelectedIndexFromView());
    var categories = await quizzService.fetchCategories();
       quizzView.render(await data, await categories); 
       
       console.log(categories.trivia_categories);
  }
  return externals;
});

