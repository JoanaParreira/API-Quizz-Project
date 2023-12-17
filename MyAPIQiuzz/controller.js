define(["service", "view"], function (quizzService, quizzView) {
  const externals = {};
  const internals = {};

  externals.start = function () {
    internals.populateView();
  };

  internals.populateView = async function () {
    var data = quizzService.getData();
    
       quizzView.render(await data); 
  }
  return externals;
});

