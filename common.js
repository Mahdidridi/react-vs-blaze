if (Meteor.isClient) {

  Tasks = new Mongo.Collection(null);

  for (var i=0; i < 2000; i++)
    Tasks.insert({});

}
