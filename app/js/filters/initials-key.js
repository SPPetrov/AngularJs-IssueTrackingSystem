"use strict";

app.filter('initialsKey', function () {
    return function (text){
            var key = "";
            var tokens = text.split(/\s/);
            for(var i =0; i < tokens.length; i++){
                key += tokens[i].substring(0,1);
            }
            return key;
        }
});