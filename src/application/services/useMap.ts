import { ref, Ref } from 'vue';
import L from 'leaflet';
import type { Map } from 'leaflet';

interface useMapComposableState {
  /**
   * Leaflet map instance
   */
  map: Ref<Map | null>;

  /**
   * Initialize map with Saint-Petersburg center
   * @param mapElement - map container element
   */
  initializeMap: (mapElement: HTMLElement) => void;
}


export function useMap(): useMapComposableState {
  const map = ref<Map | null>(null);

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
  };

  return {
    // @ts-ignore
    map,
    initializeMap,
  };
}
