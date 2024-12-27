import { courtsService } from '@/domain';
import { onMounted, Ref, ref, toRaw } from 'vue';
import Court from '@/domain/entities/Court';

interface useCourtsComposableState {
  /**
   * All courts available in the system
   */
  allCourts: Ref<Court[]>,

  /**
   * Currently displayed courts
   */
  currentlyDisplayedCourts: Ref<Court[]>,

  /**
   * Update currently displayed courts by passed location
   */
  updateCourtsByLocation: (location: Court['location']) => Promise<void>,

  /**
   * Get all courts available in the system
   */
  getAllCourts: () => Promise<void>,
}

export const useCourts = (): useCourtsComposableState => {
  const allCourts = ref<Court[]>([]);

  const currentlyDisplayedCourts = ref<Court[]>(allCourts.value);

  /**
   * Update currently displayed courts by passed location
   * @param location - location to filter courts by
   */
  async function updateCourtsByLocation(location: Court['location']): Promise<void> {
    currentlyDisplayedCourts.value = toRaw(allCourts.value).filter(court => court.name.toLowerCase().includes(location.toLowerCase()));
  }

  async function getAllCourts(): Promise<void> {
    const courts = await courtsService.getAllCourts();

    allCourts.value = JSON.parse(JSON.stringify(courts));
  }

  onMounted(async () => {
    await getAllCourts();

    currentlyDisplayedCourts.value = JSON.parse(JSON.stringify(allCourts.value));
  });


  return {
    allCourts,
    currentlyDisplayedCourts,
    getAllCourts,
    updateCourtsByLocation,
  }
}
