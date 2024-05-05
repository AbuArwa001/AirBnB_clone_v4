$(document).ready(function () {
  const baseUrl = 'http://localhost:5001/api/v1/';

  $.ajax({
    url: baseUrl + 'places_search/',
    type: 'POST',
    contentType: 'application/json',
    data: JSON.stringify({}),
    success: function (data) {
      data.forEach(function (place) {
        const article = $('<article></article>');
        article.append(
          '<div class="title_box"><h2>' +
              place.name +
              '</h2><div class="price_by_night">' +
              place.price_by_night +
              '</div></div>'
        );
        article.append(
          '<div class="information">' +
                  '<div class="max_guest">' +
                  place.max_guest +
                  ' Guest' +
                  (place.max_guest !== 1 ? 's' : '') +
                  '</div>' +
                  '<div class="number_rooms">' + place.number_rooms +
                  ' Bedroom' + (place.number_rooms !== 1 ? 's' : '') +
                  '</div>' +
                  '<div class="number_bathrooms">' + place.number_bathrooms +
                  ' Bathroom' + (place.number_bathrooms !== 1 ? 's' : '') +
                  '</div>' +
                '</div>');
        article.append('<div class="description">' + place.description + '</div>');
        $('section.places').append(article);
      });
    },
    error: function (jqXHR, textStatus, errorThrown) {
      console.log('Error:', textStatus, errorThrown);
    }
  });
  $.get(baseUrl + 'status/', function (data) {
    const status = data.status;
    if (status === 'OK') {
      $('div#api_status').addClass('available');
    } else {
      $('div#api_status').removeClass('available');
    }
  });

  const checkedAmenities = {};
  $('div.amenities .popover ul li input[type="checkbox"]').change(function () {
    const amenityId = $(this).data('id');
    const amenityName = $(this).data('name');
    if ($(this).is(':checked')) {
      checkedAmenities[amenityId] = amenityName;
    } else {
      delete checkedAmenities[amenityId];
    }
    const amenitiesList = Object.values(checkedAmenities).join(', ');
    $('.amenities h4').text(amenitiesList);
  });

  $('button').click(function () {
    // const amenitiesList = Object.values(checkedAmenities).join(', ');
    // $('.amenities h4').text('Checked amenities: ' + amenitiesList);

    // Make the POST request with the checked amenities
    $.ajax({
      url: baseUrl + 'places_search/',
      type: 'POST',
      contentType: 'application/json',
      data: JSON.stringify({ amenities: checkedAmenities }),
      success: function (data) {
        console.log(data);
        // Handle success
      },
      error: function (jqXHR, textStatus, errorThrown) {
        console.log('Error:3', textStatus, errorThrown);
      }
    });
  });
});
