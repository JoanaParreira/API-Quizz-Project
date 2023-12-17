define([], function(){
    const internals = {};
    const externals = {};

    internals.routes = {
        quizz: {
            hash: "#quizz",
            controller: "controller",
        }
    };

    internals.defaultRoute = "quizz";
    internals.currentHash = "";

    externals.start = function () {
        window.location.hash = internals.routes[internals.defaultRoute].hash;
        setInterval(internals.hashCheck, 200);
    };

    internals.hashCheck = function () {
        if (window.location.hash === internals.currentHash) {
          return;
        }
    
        let routeName = Object.keys(internals.routes).find(function (name) {
          return window.location.hash === internals.routes[name].hash;
        });
    
        if (!routeName) {
          routeName = internals.defaultRoute;
          window.location.hash = internals.routes[routeName].hash;
        }
    
        internals.loadController(internals.routes[routeName].controller);
      };
    
      internals.loadController = function (controllerName) {
        internals.currentHash = window.location.hash;
        require([controllerName], function (controller) {
          controller.start();
        });
      };
    
      return externals;

});