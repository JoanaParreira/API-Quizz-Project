define([], function () {

    const internals = {};
    const externals = {};
  
    internals.fetchData = function () {
        let url = `https://opentdb.com/api.php?amount=10&category=27&difficulty=easy&type=multiple`
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
  });