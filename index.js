var printTodoList = function() {
  $.ajax({
    type: 'GET',
    url: 'https://altcademy-to-do-list-api.herokuapp.com/tasks?api_key=74',
    dataType: 'json',
    success: function (response, textStatus) {
      $('#todoList').empty();
      response.tasks.forEach(function (task) {
        $('#todoList').append('<p>' + task.content + '</p>');
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

$(document).ready(function(){
  printTodoList();
   $('#addTask').on('submit', function(event) {
     event.preventDefault();
     createTask();
   });
});
