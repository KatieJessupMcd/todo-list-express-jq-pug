$(document).ready(function() {
  // processForm: get data from form and make AJAX call to our API
  function processForm(evt) {
    evt.preventDefault();
    // grab form data
    let formData = {
      list_item: $('#list_item').val()
    };

    // POST ajax request to api

    $.ajax({
      url: 'http://localhost:3000/lists',
      method: 'POST',
      data: JSON.stringify(formData),
      dataType: 'json',
      contentType: 'application/json',
      success: handleResponse
    });
  }

  // handleResponse: deal with response from lists API

  function handleResponse(resp) {
    // grab json response
    if (!resp.errors) {
      let listItemToAdd = resp['new_list']['list_item'];
      let listItemId = resp['new_list']['id'];
      console.log('This is List item id from handleResponse ', listItemId);
      // append listItemToAdd to DOM along with corresponding db id as an attr, dynamically create a new list
      $('ul').append(
        $('<li>')
          .text(listItemToAdd)
          .attr('id', listItemId)
      );
      $('#form').trigger('reset');
    }
  }

  $('#form').on('submit', processForm);

  // deleteItem: make AJAX request to delete list item on click

  function processDelete(evt) {
    evt.preventDefault();
    let clickedList = event.target;
    console.log(clickedList);
    let clickedListId = clickedList.getAttribute('id');

    console.log('this is the event.target ', event.target);

    console.log('this is the clickedListId ', clickedListId);

    // TODO!!!! PASS IN ID OF CLICKED LI TO AJAX REQUEST - PERHAPS
    // A HELPER FUNCTION TO GRAB CLICKED ELEMENT ID ATTR !!!!

    // grab item to delete data
    let deleteDataId = {
      id: clickedListId
    };

    // DELETE ajax request to api

    $.ajax({
      url: 'http://localhost:3000/lists',
      method: 'DELETE',
      data: JSON.stringify(deleteDataId),
      dataType: 'json',
      contentType: 'application/json',
      success: deleteItem
    });
  }

  function deleteItem(resp) {
    if (!resp.errors) {
      // this will remove the list from the DOM- ONCE YOU KNOW IT IS SUCESSFUL- make this a on sucess function from ajax delete req
      $('li').on('click', function() {
        $(this)
          .closest('li')
          .remove();
      });
    }
  }

  $('li').on('click', processDelete);
}); // end of window
