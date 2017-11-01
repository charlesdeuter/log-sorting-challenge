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
  // const insert = (logSourcesMap, insertLogSource) => {
  //   if(insertLogSource.value.date >= _.last(logSourcesMap).value.date) {
  //     logSourcesMap.push(insertLogSource);

  //     return logSourcesMap;
  //   }

  //   // interate, find the insertion point
  //   logSourcesMap.some((logSource, index) => {
  //     if(insertLogSource.value.date < logSource.value.date) {

  //       // insert element, using splice for perf
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

    // special case if there. If there is only one element in the array, and we want to append to the start
    // the following code won't handle it. This snippet bridges the gap.
    if(value < logSourcesMap[0].value.date) {
      logSourcesMap.unshift(insertLogSource);
      return logSourcesMap;
    }

    // intialize the low index, the high, middle
    let low = 0
    let hi = logSourcesMap.length - 1
    let middle = (low + hi) >> 1;

    // typical binary search. The comparator is used to find the node at which the value needs to be inserted. O log n.
    while (!(_.get(logSourcesMap[middle], 'value.date') <= value && _.get(logSourcesMap[middle + 1], 'value.date') > value) && low < hi) {
      // divide and conquer
      if (value < logSourcesMap[middle].value.date) {
        hi = middle - 1
      } else {
        low = middle + 1
      }

      // recalculate middle on every iteration
      middle = (low + hi) >> 1;
    }

    // insert element, using splice for perf
    logSourcesMap.splice(middle + 1, 0, insertLogSource);

    return logSourcesMap;
  }
  
  // initial sort, only done once so I don't feel
  logSourcesMap = _.sortBy(logSourcesMap, 'value.date');

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