if (Meteor.isClient) {

  Meteor.startup(function() {
    // Make sure we're really idle
    setTimeout(function() {
      var start = performance.now();
      Blaze.render(Template.taskList, document.body);
      // 583 ms
      console.log('Initial render: ' + (performance.now() - start) + ' ms');

      setTimeout(function() {
        Tracker.flush();
        start = performance.now();
        Tasks.insert({});
        Tracker.flush();
        // ~2 ms
        console.log('Add row: ' + (performance.now() - start) + ' ms');
      }, 1000);

    }, 1000);
  });

  Template.taskList.helpers({
    tasks: function() { return Tasks.find(); }
  });

}

