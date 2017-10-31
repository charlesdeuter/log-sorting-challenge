const _ = require('lodash');

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

let list = [ { value: 
     { date: new Date('2017-09-10T10:45:37.077Z'),
       msg: 'Face to face mission-critical internet solution' },},
  { value: 
     { date: new Date('2017-09-03T16:46:13.851Z'),
       msg: 'Fully-configurable transitional pricing structure' },},
  { value: 
     { date: new Date('2017-09-08T06:45:51.642Z'),
       msg: 'Grass-roots clear-thinking monitoring' },},
  { value: 
     { date: new Date('2017-09-18T14:46:06.602Z'),
       msg: 'Enhanced foreground knowledge base' },},
  { value: 
     { date: new Date('2017-09-10T11:46:07.638Z'),
       msg: 'Triple-buffered intermediate moratorium' },},
  { value: 
     { date: new Date('2017-09-16T06:46:11.590Z'),
       msg: 'Phased needs-based matrix' },},
  { value: 
     { date: new Date('2017-09-11T06:46:15.832Z'),
       msg: 'Customizable context-sensitive open architecture' },},
  { value: 
     { date: new Date('2017-09-13T11:46:11.795Z'),
       msg: 'Operative logistical middleware' },},
  { value: 
     { date: new Date('2017-09-08T13:46:08.785Z'),
       msg: 'Diverse context-sensitive secured line' },},
  { value: 
     { date: new Date('2017-09-18T11:45:52.442Z'),
       msg: 'Stand-alone empowering alliance' },} ];

       console.log(insert(list, {value: { date: new Date('2016-09-08T06:45:51.642Z')}}));