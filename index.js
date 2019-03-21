var printTodoList = function() {
  $.ajax({
    type: 'GET',
    url: 'https://altcademy-to-do-list-api.herokuapp.com/tasks?api_key=74',
    dataType: 'json',
    success: function (response, textStatus) {
      $('#todoList').empty();
      response.tasks.forEach(function (task) {
        $('#todoList').append('<div class="row"><p class="col-xs-8">' + task.content + '</p><button class="delete" data-id="' + task.id + '">Delete</button><input type="checkbox" class="mark-complete" data-id="' + task.id + '"' + (task.completed ? 'checked' : '') + '>');
      })
    },
    error: function (request, textStatus, errorMessage) {
      console.log(errorMessage);
    }
  });
}

var createTask = function () {
  $.ajax({
    type: 'POST',
    url: 'https://altcademy-to-do-list-api.herokuapp.com/tasks?api_key=74',
    contentType: 'application/json',
    dataType: 'json',
    data: JSON.stringify({
      task: {
        content: $('#inputBox').val()
      }
    }),
    success: function (response, textStatus) {
      $('#inputBox').val('');
      printTodoList();
    },
    error: function (request, textStatus, errorMessage) {
      console.log(errorMessage);
    }
  });
}

var deleteTask = function(id) {
  $.ajax({
  type: 'DELETE',
  url: 'https://altcademy-to-do-list-api.herokuapp.com/tasks/' + id + '?api_key=74',
  success: function (response, textStatus) {
    printTodoList();
  },
  error: function (request, textStatus, errorMessage) {
    console.log(errorMessage);
  }
});
}

var taskCompleted = function(id) {
  $.ajax({
    type: 'PUT',
    url: 'https://altcademy-to-do-list-api.herokuapp.com/tasks/' + id +'/mark_complete?api_key=74',
    dataType: 'json',
    success: function (response, textStatus) {
      printTodoList();
    },
    error: function (request, textStatus, errorMessage) {
      console.log(errorMessage);
    }
  });
}


$(document).ready(function(){
  printTodoList();
   $('#addTask').on('submit', function(event) {
     event.preventDefault();
     createTask();
   });
   $(document).on('click','.delete', function(event) {
     deleteTask($(this).data('id'));
   });
   $(document).on('change','.mark-complete', function(event) {
     if (this.checked) {
       taskCompleted($(this).data('id'));
     }
   });
});
