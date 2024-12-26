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

  /**
   * Change participation status of current user in event
   */
  changeParticipationStatus: (eventId: Event['id']) => Promise<void>;
}

export const useEvents = (): useEventsComposableState => {
  const events = ref<Event[]>([]);

  async function updateEventsBySport(sport: Event['sport']): Promise<void> {
    events.value = await eventsService.getEventsBySport(sport);
  }

  async function updateEventsToMyEvents(): Promise<void> {
    events.value = await eventsService.getMyEvents();
  }

  /**
   * Change participation status of current user in event
   * @param eventId Event id to change participation status
   */
  async function changeParticipationStatus(eventId: Event['id']): Promise<void> {
    if (await eventsService.changeParticipationStatus(eventId)) {
      if (events.value.find(event => event.id === eventId)!.peopleCount !== undefined) {
        events.value.find(event => event.id === eventId)!.peopleCount! += 1;
      } else {
        events.value.find(event => event.id === eventId)!.peopleCount = 1;
      }
    }
    else {
      if (events.value.find(event => event.id === eventId)!.peopleCount !== 0) {
        events.value.find(event => event.id === eventId)!.peopleCount! -= 1;
      }
    }
  }

  return {
    events,
    updateEventsBySport,
    updateEventsToMyEvents,
    changeParticipationStatus,
  }
}
