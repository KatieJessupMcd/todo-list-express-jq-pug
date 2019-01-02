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
    console.log('we made it inside handleResponse');
    let $listItemToAdd = resp['new_list']['list_item'];
    // append listItemToAdd to DOM
    $('li').append($listItemToAdd);
  }
}

$('#form').on('submit', processForm);
