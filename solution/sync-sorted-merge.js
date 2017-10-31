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

  console.log(logSourcesMap);

  // interation 1, this is slow but works
  // const insert = (logSourcesMap, insertLogSource) => {
  //   logSourcesMap.unshift(insertLogSource);
  //   return _.sortBy(logSourcesMap, 'value.date');
  // }

  // interation 2
  // const insert = (logSourcesMap, insertLogSource) => {
  //   if(insertLogSource.value.date >= _.last(logSourcesMap).value.date) {
  //     logSourcesMap.push(insertLogSource);

  //     return logSourcesMap;
  //   }

  //   //
  //   logSourcesMap.some((logSource, index) => {
  //     if(insertLogSource.value.date < logSource.value.date) {

  //       logSourcesMap.splice(index, 0, insertLogSource);

  //       return true;
  //     }

  //     return false;
  //   });

  //   return logSourcesMap;
  // }

  // interation 3 binary search
  const insert = (logSourcesMap, insertLogSource) => {

    let value = insertLogSource.value.date;

    if(value < logSourcesMap[0].value.date) {
      logSourcesMap.unshift(insertLogSource);

      return logSourcesMap;
    }

    let low = 0
    let hi = logSourcesMap.length - 1
    let middle = (low + hi) >> 1;
    // While the middle is not what we're looking for and the list does not have a single item
    while (!(_.get(logSourcesMap[middle], 'value.date') <= value && _.get(logSourcesMap[middle + 1], 'value.date') > value) && low < hi) {
      if (value < logSourcesMap[middle].value.date) {
        hi = middle - 1
      } else {
        low = middle + 1
      }

      // recalculate middle on every iteration
      middle = (low + hi) >> 1;
    }

    logSourcesMap.splice(middle + 1, 0, insertLogSource);

    return logSourcesMap;
  }

  logSourcesMap = _.sortBy(logSourcesMap, 'value.date');

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