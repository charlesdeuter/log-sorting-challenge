function binarySearch (list, value) {
  // initial values for start, middle and end
  let low = 0
  let hi = list.length - 1
  let middle = (low + hi) >> 1;
  // While the middle is not what we're looking for and the list does not have a single item
  while (!(list[middle] <= value && list[middle + 1] > value) && low < hi) {
    if (value < list[middle]) {
      hi = middle - 1
    } else {
      low = middle + 1
    }

    // recalculate middle on every iteration
    middle = (low + hi) >> 1;

    console.log(list[middle]);
    console.log(list[middle + 1]);
  }

  list.splice(middle + 1, 0, value);

  // if the current middle item is what we're looking for return it's index, else return -1
  return list;
}


let list = [ { value: 
     { date: new Date('2017-09-10T10:45:37.077Z'),
       msg: 'Face to face mission-critical internet solution' },
     }
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

console.log(binarySearch(list, 5));

list = [1,2,3,4,6,7,8,9,10];

console.log(binarySearch(list, 1));

list = [1,2,3,4,6,7,8,9,10];

console.log(binarySearch(list, 10));