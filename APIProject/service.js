/*define([], function () {

    const internals = {};
    const externals = {};
  
    internals.fetchData = function () {
        let url = `https://opentdb.com/api.php?amount=10&category=27`
        console.log(url)
        return url;
    
    };
    externals.getData = async function(){
        var response = await fetch(internals.fetchData());
        var data = await response.json();
        console.log(data);
    
        return await data;
    }
  
    return externals;
  });*/

  define([], function () {

    const internals = {};
    const externals = {};


    externals.fetchCategories = async function () {
        let categoryUrl = `https://opentdb.com/api_category.php`;
        //console.log(categoryUrl);

            const response = await fetch(categoryUrl);
            const data = await response.json();
            //console.log(data);

            return data;
    
    };

    internals.fetchData = function (category) {
        let url = `https://opentdb.com/api.php?amount=10&category=${category}`;
        // let url = `https://opentdb.com/api.php?amount=10&category=27&difficulty=easy&type=multiple`
        //console.log(url);
        return url;
    };

    externals.getData = async function (index) {
    
            const categories = await externals.fetchCategories();
            const category = categories.trivia_categories[index].id; 

            const response = await fetch(internals.fetchData(category));
            const data = await response.json();
            console.log(data);

            return data;

    };

    return externals;
});