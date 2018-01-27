const _ = require('lodash');
//return the require
function getParams(body,items){
    return _.pick(body,items);
}

module.exports = {getParams};