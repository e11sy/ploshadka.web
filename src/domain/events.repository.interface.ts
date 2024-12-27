import Event, { EventCreationAttributes } from './entities/Event';

/**
 * Interface that represents the events repository
 */
export default interface EventsRepositoryInterface {
  /**
   * Get all events which are marked as visited and not passed yet
   */
  getMyEvents(): Promise<Event[]>;

  /**
   * Get events by sport type
   * @param sport Sport type to get events by
   */
  getEventsBySport(sport: string): Promise<Event[]>;

  /**
   * Change participation status of current user in event
   * @param eventId Event id to change participation status
   */
  changeParticipationStatus(eventId: Event['id']): Promise<boolean>;

  /**
   * Get events by court ids
   * @param courtIds ids of currently displayed courts
   */
  getEventsByCourtIds(courtIds: Event['courtId'][]): Promise<Event[]>;

  /**
   * Create new event
   * @param event Event to create
   */
  createEvent(event: EventCreationAttributes): Promise<void>;
}
