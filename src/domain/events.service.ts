import EventsRepositoryInterface from './events.repository.interface.js';
import Event, { EventCreationAttributes } from './entities/Event.js';

/**
 * Service that represents events business logic
 */
export default class EventsService {
  /**
   * Repository interface that represents actual events repository
   */
  private readonly eventsRepository: EventsRepositoryInterface;

  /**
   * Constructor of EventsService
   * @param eventsRepository Repository to manage events
   */
  constructor(eventsRepository: EventsRepositoryInterface) {
    this.eventsRepository = eventsRepository;
  }

  /**
   * Get all events which are marked as visited and not passed yet
   */
  public async getMyEvents(): Promise<Event[]> {
    return await this.eventsRepository.getMyEvents();
  }

  /**
   * Get events by sport type
   * @param sport Sport type to get events by
   */
  public async getEventsBySport(sport: string): Promise<Event[]> {
    return await this.eventsRepository.getEventsBySport(sport);
  }

  /**
   * Change participation status of current user in event
   * @param eventId Event id to change participation status
   */
  public async changeParticipationStatus(eventId: Event['id']): Promise<boolean> {
    return await this.eventsRepository.changeParticipationStatus(eventId);
  }

  /**
   * Get events by court ids
   * @param courtIds ids of currently displayed courts
   */
  public async getEventsByCourtIds(courtIds: Event['courtId'][]): Promise<Event[]> {
    return await this.eventsRepository.getEventsByCourtIds(courtIds);
  }

  /**
   * Create new event
   * @param event Event to create
   */
  public async createEvent(event: EventCreationAttributes): Promise<void> {
    await this.eventsRepository.createEvent(event);
  }
}
