import { eventsService } from '@/domain'
import { ref, Ref } from 'vue';
import Event from '@/domain/entities/Event';

interface useEventsComposableState {
  /**
   * Currently displayed events
   */
  events: Ref<Event[]>,

  /**
   * Update currently displayed events by passed sport
   * @param sport - sport to filter events by
   */
  updateEventsBySport: (sport: Event['sport']) => Promise<void>;

  /**
   * Update currently displayed events to my events
   */
  updateEventsToMyEvents: () => Promise<void>;
}

export const useEvents = (): useEventsComposableState => {
  const events = ref<Event[]>([]);

  async function updateEventsBySport(sport: Event['sport']): Promise<void> {
    console.log('try to update eevents by sport', sport);

    events.value = await eventsService.getEventsBySport(sport);
  }

  async function updateEventsToMyEvents(): Promise<void> {
    events.value = await eventsService.getMyEvents();
  }

  return {
    events,
    updateEventsBySport,
    updateEventsToMyEvents,
  }
}
