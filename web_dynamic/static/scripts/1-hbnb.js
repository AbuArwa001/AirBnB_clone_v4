$(document).ready(function () {
  // Define an object to hold the checked Amenity IDs
  $('div.amenities .popover ul li input[type="checkbox"]').css({
    position: 'relative',
    right: '10px'
  });
  const checkedAmenities = {};
  // Listen for changes on each checkbox with a class 'amenity-checkbox'
  $('div.amenities .popover ul li input[type="checkbox"]').change(function () {
    // Get the Amenity ID from the data-id attribute
    const amenityId = $(this).data('id');
    const amenityName = $(this).data('name');

    //   console.log(amenitiesList)
    // If the checkbox is checked, add the Amenity ID to the object
    if ($(this).is(':checked')) {
      checkedAmenities[amenityId] = amenityName;
    } else {
      // If the checkbox is unchecked, remove the Amenity ID from the object
      delete checkedAmenities[amenityId];
    }

    // Update the h4 tag with the list of checked amenities
    const amenitiesList = Object.values(checkedAmenities).join(', ');
    $('.amenities h4').text(amenitiesList);
  });
});
