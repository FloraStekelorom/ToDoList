var printTodoList = function() {
  $.ajax({
    type: 'GET',
    url: 'https://altcademy-to-do-list-api.herokuapp.com/tasks?api_key=74',
    dataType: 'json',
    success: function (response, textStatus) {
      $('#todoList').empty();
      response.tasks.forEach(function (task) {
        $('#todoList').append('<div class="row boxSize align-items-center bg-white border border-light"><p class="paragraphSize"><span>&#8226; &#32; </span>'+ task.content + '</p><button class="delete" data-id="' + task.id + '">Delete</button><input type="checkbox" class="mark-complete" data-id="' + task.id + '"' + (task.completed ? 'checked' : '') + '>' + '</div>');
      })
    },
    error: function (request, textStatus, errorMessage) {
      console.log(errorMessage);
    }
  });
}

var showCompletedTasks = function () {
  $.ajax({
    type: 'GET',
    url: 'https://altcademy-to-do-list-api.herokuapp.com/tasks?api_key=74',
    dataType: 'json',
    success: function (response, textStatus) {
      $('#todoList').empty();
      response.tasks.forEach(function (task) {
        if (task.completed === true) {
          $('#todoList').append('<div class="row boxSize align-items-center bg-white border border-light"><p class="paragraphSize"><span>&#8226; &#32; </span>'+ task.content + '</p><button class="delete" data-id="' + task.id + '">Delete</button><input type="checkbox" class="mark-complete" data-id="' + task.id + '"' + (task.completed ? 'checked' : '') + '>' + '</div>');
        }
      })
    },
    error: function (request, textStatus, errorMessage) {
      console.log(errorMessage);
    }
  });
}

var showActiveTasks = function () {
  $.ajax({
    type: 'GET',
    url: 'https://altcademy-to-do-list-api.herokuapp.com/tasks?api_key=74',
    dataType: 'json',
    success: function (response, textStatus) {
      $('#todoList').empty();
      response.tasks.forEach(function (task) {
        if (task.completed === false) {
          $('#todoList').append('<div class="row boxSize align-items-center bg-white border border-light"><p class="paragraphSize"><span>&#8226; &#32; </span>'+ task.content + '</p><button class="delete" data-id="' + task.id + '">Delete</button><input type="checkbox" class="mark-complete" data-id="' + task.id + '"' + (task.completed ? 'checked' : '') + '>' + '</div>');
        }
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
    console.log(response);
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

var taskActive = function (id) {
  $.ajax({
    type: 'PUT',
    url: 'https://altcademy-to-do-list-api.herokuapp.com/tasks/' + id + '/mark_active?api_key=74',
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
     $(this).closest('.boxSize').remove();
   });
   $(document).on('change','.mark-complete', function() {
     if (this.checked) {
       taskCompleted($(this).data('id'));
     } else {
       taskActive($(this).data('id'));
     }
   });
   $(document).on('click','#completedTask', function() {
     showCompletedTasks();
   })
   $(document).on('click','#activeTask', function() {
     showActiveTasks();
   })
   $(document).on('click','#showAllTasks', function() {
     printTodoList();
   })
});
