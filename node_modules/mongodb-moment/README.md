# mongodb-moment


Make the mongodb node driver able to serialize moment.js objects.

[![Build Status](https://travis-ci.org/vkarpov15/mongodb-moment.svg?branch=master)](https://travis-ci.org/vkarpov15/mongodb-moment)


## example

```javascript

    const moment = require('moment');
    require('mongodb-moment')(moment);

    co(function*() {
      const id = new mongodb.ObjectId();
      yield db.collection('test').
        insertOne({ _id: id, createdAt: moment.utc('2011-06-01') });

      const res = yield db.collection('test').findOne();
      assert.deepEqual(res, { _id: id, createdAt: new Date('2011-06-01') });
    })
  
```