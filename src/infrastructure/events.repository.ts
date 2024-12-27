import Event, { EventCreationAttributes } from "@/domain/entities/Event";
import EventsRepositoryInterface from "@/domain/events.repository.interface";
import PloshadkaApiTransport from "./transport/ploshadka-api";
import JSONValue from "./transport/types/JSONValue";

/**
 * Events repository
 */
export default class EventsRepository implements EventsRepositoryInterface {
  /**
   * Transport instance that is used to communicate with ploshadka api
   */
  private readonly transport: PloshadkaApiTransport;

  /**
   * Repository constructor
   * @param ploshadkaApiTransport - ploshadka api transport instance
   */
  constructor(ploshadkaApiTransport: PloshadkaApiTransport) {
    this.transport = ploshadkaApiTransport;
  }

  /**
   * Get all events which are marked as visited and not passed yet
   */
  public async getMyEvents(): Promise<Event[]> {
    return await this.transport.get<Event[]>('/events/my');
  }

  /**
   * Get events by sport type
   * @param sport Sport type to get events by
   */
  public async getEventsBySport(sport: Event['sport']): Promise<Event[]> {
    return await this.transport.get<Event[]>('/events/sport/' + sport);
  }

  /**
   * Change participation status of current user in event
   * @param eventId Event id to change participation status
   */
  public async changeParticipationStatus(eventId: Event['id']): Promise<boolean> {
    return await this.transport.patch<boolean>('/events/participation', {
      eventId,
    });
  }

  /**
   * Get events by court ids
   * @param courtIds ids of currently displayed courts
   */
  public async getEventsByCourtIds(courtIds: Event['courtId'][]): Promise<Event[]> {
    const queryString = courtIds.join(',');

    return await this.transport.get<Event[]>('/events/on-courts', {
      courtIds: queryString,
    });
  }

  /**
   * Create new event
   * @param event Event to create
   */
  public async createEvent(event: EventCreationAttributes): Promise<void> {
    await this.transport.post<{id: Event['id']}>({
      endpoint: '/events',
      data: {
        event: event as unknown as JSONValue,
      },
    });
  }
}
