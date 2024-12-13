import Event from './entities/Event';

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
}
