'use strict';

window.initMap = function () {
    const map = new google.maps.Map(document.getElementById("map"), {
      center: { lat: 37.5400456, lng: 126.9921017 },
      zoom: 10,
    });
  
    const malls = [
      { label: "A", name: "디지털정보관", lat: 35.9449, lng: 126.6828 },
      { label: "B", name: "황룡도서관", lat: 35.9462, lng: 126.6832 },
    ];
  
    const bounds = new google.maps.LatLngBounds();
    const infowindow = new google.maps.InfoWindow();
  
    malls.forEach(({ label, name, lat, lng }) => {
      const marker = new google.maps.Marker({
        position: { lat, lng },
        label,
        map,
      });
      bounds.extend(marker.position);
  
      marker.addListener("click", () => {
        map.panTo(marker.positon);
        infowindow.setContent(name);
        infowindow.open({
          anchor: marker,
          map,
        });
      });
    });
  
    map.fitBounds(bounds);
  };