# Observable.js
A simple, reusable Javascript implementation of the observable pattern

# Usage
```
import Observable from 'observable';

const observable = new Observable();

const importantEventHandler = { date, title } => {
  // handle message
  console.log(`Remember to prepare for ${title} on ${date}!`);
};

observable.on('importantEvent', importantEventHandler);

observable.emit('importantEvent', { date: new Date(), title: 'ObserverCon' });

observable.off('importantEvent', importantEventHandler);
```