'use strict'

const _ = require('lodash');

module.exports = (logSources, printer) => {
  let logSourcesMap = logSources.map((logSource) => {
    let value = logSource.pop();

    return {
      value,
      logSource
    };
  });

  // interation 1, this is slow but works
  // const insert = (logSourcesMap, insertLogSource) => {
  //   logSourcesMap.unshift(insertLogSource);
  //   return _.sortBy(logSourcesMap, 'value.date');
  // }

  // interation 2
  const insert = (logSourcesMap, insertLogSource) => {
    if(insertLogSource.value.date >= _.last(logSourcesMap).value.date) {
      logSourcesMap.push(insertLogSource);

      return logSourcesMap;
    }

    //
    logSourcesMap.some((logSource, index) => {
      if(insertLogSource.value.date < logSource.value.date) {

        logSourcesMap.splice(index, 0, insertLogSource);

        return true;
      }

      return false;
    });

    return logSourcesMap;
  }

  logSourcesMap = _.sortBy(logSourcesMap, 'value.date');;

  // console.log(logSourcesMap);

  while(logSourcesMap.length) {
    // remove the head array element
    let logSource = logSourcesMap.shift();

    // grab the log we want to print
    let log = logSource.value;

    // pop the next value
    logSource.value = logSource.logSource.pop();

    // if the value is truthy unshift (this will weed out drained log sources)
    if(logSource.value) {
      logSourcesMap = insert(logSourcesMap, logSource);
    }

    // print the value
    printer.print(log);
  }

  printer.done();  
}