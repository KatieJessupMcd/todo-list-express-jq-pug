// List Jquery methods to handle form data, handle and process add/delete
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
      let $deleteIcon = $('<i>')
        .addClass('far fa-trash-alt')
        .css({ color: 'Tomato' })
        .attr('id', 'delete');
      let $updateIcon = $('<i>')
        .addClass('far fa-edit')
        .css({ color: 'Mediumslateblue' })
        .attr('id', 'update');
      let $listItem = listItemToAdd;
      let $completeListItem = $('<li>')
        .append($deleteIcon)
        .append($updateIcon)
        .append($listItem)
        .attr('id', listItemId)
        .addClass(
          'list-group-item d-flex justify-content-between align-items-center'
        );

      // append listItemToAdd to DOM along with corresponding db id as an attr, dynamically create a new list
      $completeListItem.prependTo($('ol'));

      $('#form').trigger('reset');
    }
  }

  $('#form').on('submit', processForm);

  // *******PROCESS UPDATE TODO
  function processUpdate(evt) {
    evt.preventDefault();
    // grab clicked on li, and grab is associated id attr
    let clickedList = $(evt.target).parent();
    let clickedListText = clickedList.text();
    let clickedListId = clickedList.attr('id');
    console.log('this is the clickedListId from UPDATE ', clickedListId);

    // format into a JSON friendly obj to send in ajax req
    let updateDataId = {
      id: clickedListId,
      list_item: clickedListText
    };

    // PATCH ajax request to api

    $.ajax({
      url: 'http://localhost:3000/lists',
      method: 'PATCH',
      data: JSON.stringify(updateDataId),
      dataType: 'json',
      contentType: 'application/json',
      success: updateItem
    });
  }

  function updateItem(resp) {
    // if the ajax req is sucessful, update dom by updateing li using item id from response
    if (!resp.errors) {
      $('.alert')
        .fadeIn()
        .delay(2000)
        .text(resp.message)
        .fadeOut();
    }
  }

  $('ol').on('click', '#update', processUpdate);

  // deleteItem: make AJAX request to delete list item on click

  function processDelete(evt) {
    evt.preventDefault();
    // grab clicked on li, and grab is associated id attr
    let clickedList = evt.target.parentElement;
    console.log('this is the parent of the evt.target ', clickedList);
    let clickedListId = clickedList.getAttribute('id');

    // format into a JSON friendly obj to send in ajax req
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
    // if the ajax req is sucessful, update dom by removing deleted li using item id from response
    if (!resp.errors) {
      $("li[id='" + resp.id + "']").remove();
      $('.alert')
        .fadeIn()
        .delay(2000)
        .text(resp.message)
        .fadeOut();
    }
  }

  $('ol').on('click', '#delete', processDelete);
}); // end of window
