import { ref, Ref, toRaw } from 'vue';
import L from 'leaflet';
import type { Map } from 'leaflet';
import Court from '@/domain/entities/Court';

interface useMapComposableState {
  /**
   * Leaflet map instance
   */
  map: Ref<Map | null>;

  /**
   * Initialize map with Saint-Petersburg center
   */
  initializeMap: (mapElement: HTMLElement) => void;

  /**
   * Create court marker
   */
  createCourtMarker: (court: Court) => void;

  /**
   * Remove all markers from the map
   */
  removeAllMarkers: () => void;
}


export function useMap(): useMapComposableState {
  const map = ref<Map | null>(null);

  const markers = ref<L.Marker[]>([]);

  const initializeMap = (mapElement: HTMLElement) => {
    map.value = L.map(mapElement, {
      center: [59.9342802, 30.3350986],
      zoom: 11,
      layers: [
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution:
            '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        }),
      ],
    });

    /**
     * On after zoom update markers position
     * This solves bug of map api
     */
    map.value.on('zoomend', () => {
      toRaw(markers.value).forEach(marker => {
        const newLatLng = marker.getLatLng();
        marker.setLatLng(newLatLng);
      });
    });
  };

  /**
   * Remove all markers from the map
   */
  const removeAllMarkers = () => {
    toRaw(markers.value).forEach(marker => marker.remove());
    markers.value = [];
  }

  /**
   * Create court marker
   */
  const createCourtMarker = (court: Court) => {
    const coords = court.location.split(', ');
    const lat = parseFloat(coords[0]);
    const lng = parseFloat(coords[1]);

    if (map.value) {
      // @ts-ignore
      const newMarker = L.marker([lat, lng]).addTo(map.value)
        .bindPopup(`${court.name} <br/> ${court.description}`)
        .openPopup();

      markers.value.push(newMarker);
    }
  }

  return {
    // @ts-ignore
    map,
    initializeMap,
    createCourtMarker,
    removeAllMarkers,
  };
}
