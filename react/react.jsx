if (Meteor.isClient) {

  Meteor.startup(function() {
    // Make sure we're really idle
    setTimeout(function() {
      var start = performance.now();
      React.render(<TaskList />, document.getElementById("render-target"));

      // 400 ms
      console.log('Initial render: ' + (performance.now() - start) + ' ms');

      setTimeout(function() {
        Tracker.flush();
        start = performance.now();
        Tasks.insert({});
        Tracker.flush();
        // ~160 ms
        console.log('Add row: ' + (performance.now() - start) + ' ms');
      }, 1000);

    }, 1000);
  });

  TaskList = React.createClass({

    mixins: [ReactMeteorData],
   
    // Loads items from the Tasks collection and puts them on this.data.tasks
    getMeteorData() {
      return {
        tasks: Tasks.find({}).fetch()
      }
    },
   
    renderTasks() {
      // Get tasks from this.data.tasks
      return this.data.tasks.map((task) => {
        return <Task key={task._id} task={task} />;
      });
    },

    render() {
      return ( <ul> {this.renderTasks()} </ul> );
    }

  });

  Task = React.createClass({

    // uncommented, ~68ms
    // shouldComponentUpdate(nextProps) { return nextProps._id !== this.props.id },

    propTypes: { task: React.PropTypes.object.isRequired },
    render() { return ( <li>{this.props.task._id}</li> ); }
  });

}

