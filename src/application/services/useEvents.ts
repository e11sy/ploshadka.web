import { eventsService } from '@/domain'
import { ref, Ref } from 'vue';
import Event, { EventCreationAttributes } from '@/domain/entities/Event';
import Court from '@/domain/entities/Court';

interface useEventsComposableState {
  /**
   * Currently displayed events
   */
  events: Ref<Event[]>,

  /**
   * Update currently displayed events by passed sport
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

  /**
   * Update currently displayed events by passed court ids
   */
  updateEventsByCourtIds: (courtIds: Court['id'][]) => Promise<void>;

  /**
   * Create new event
   */
  createEvent: (event: EventCreationAttributes) => Promise<void>;
}

export const useEvents = (): useEventsComposableState => {
  const events = ref<Event[]>([]);

  async function updateEventsBySport(sport: Event['sport']): Promise<void> {
    events.value = await eventsService.getEventsBySport(sport);
  }

  async function updateEventsToMyEvents(): Promise<void> {
    events.value = await eventsService.getMyEvents();
  }

  async function updateEventsByCourtIds(courtIds: Court['id'][]): Promise<void> {
    events.value = await eventsService.getEventsByCourtIds(courtIds);
  }

  async function createEvent(event: EventCreationAttributes): Promise<void> {
    await eventsService.createEvent(event);
  }

  /**
   * Change participation status of current user in event
   * @param eventId Event id to change participation status
   */
  async function changeParticipationStatus(eventId: Event['id']): Promise<void> {
    const event = events.value.find(event => event.id === eventId);

    if (event!.isParticipating === true) {
      event!.peopleCount -= 1;
    } else {
      event!.peopleCount += 1;
    }

    event!.isParticipating = !event!.isParticipating;

    await eventsService.changeParticipationStatus(eventId);
  }

  return {
    events,
    createEvent,
    updateEventsBySport,
    updateEventsToMyEvents,
    changeParticipationStatus,
    updateEventsByCourtIds,
  }
}
