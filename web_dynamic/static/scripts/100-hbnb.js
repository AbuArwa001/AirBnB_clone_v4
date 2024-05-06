$(document).ready(function () {
  const baseUrl = 'http://localhost:5001/api/v1/';
  let checkedStates = {};
  let checkedCities = {};
  let checkedLocations = {};

  $("div.locations > .popover > ul  > li > input[type='checkbox']").on('change', function () {
    const stateId = $(this).data('id')
    const locationId = $(this).data('id')
    if ($(this).is(':checked')) {
      console.log( $(this).data('id'))
      checkedStates[stateId] = $(this).data('name');
      checkedLocations[locationId] = $(this).data('name');
      console.log(checkedStates)
    } else {
      delete checkedStates[stateId];
      delete checkedLocations[locationId];
    }
    let lst = Object.values(checkedLocations);
    if (lst.length > 0) {
      $('div.locations h4').text(lst.join(', '));
    } else {
      $('div.locations h4').html('&nbsp;');
    }
  });

  $(".locations > .popover > li > ul > li > input[type='checkbox']").on('change', function () {
    if (this.checked) {
      checkedCities[$(this).data('id')] = $(this).data('name');
      checkedLocations[$(this).data('id')] = $(this).data('name');
    } else {
      delete checkedCities[$(this).data('id')];
      delete checkedLocations[$(this).data('id')];
    }
    let lst = Object.values(checkedLocations);
    if (lst.length > 0) {
      $('div.locations > h4').text(lst.join(', '));
    } else {
      $('div.locations > h4').html('&nbsp;');
    }
  });

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
  $('.filters > button').click(function () {
    $('.places > article').remove();
    $.ajax({
      type: 'POST',
      url: 'http://0.0.0.0:5001/api/v1/places_search',
      data: JSON.stringify({'amenities': Object.keys(checkedAmenities),
      'states': Object.keys(checkedStates),
      'cities': Object.keys(checkedCities)}),
      dataType: 'json',
      contentType: 'application/json',
      success: function (data) {
        for (let i = 0; i < data.length; i++) {
          let place = data[i];
          $('.places ').append('<article><h2>' +
          place.name +
          '</h2><div class="price_by_night"><p>$'+ place.price_by_night +
          '</p></div><div class="information"><div class="max_guest"><div class="guest_image"></div><p>' +
          place.max_guest + '</p></div><div class="number_rooms"><div class="bed_image"></div><p>' +
          place.number_rooms + '</p></div><div class="number_bathrooms"><div class="bath_image"></div><p>' +
          place.number_bathrooms +
          '</p></div></div><div class="description"><p>' +
          place.description +
          '</p></div></article>');
        }
      }
    });
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
