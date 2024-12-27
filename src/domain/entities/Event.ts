import Court from './Court.js';

export default interface Event {
  /**
   * Event internal id
   */
  id: number,

  /**
   * Id of court, where evert is based
   */
  courtId: Court['id'],

  /**
   * Name of the event
   */
  name: string,

  /**
   * Description of the event
   */
  description: string,

  /**
   * Sport type
   */
  sport: string,

  /**
   * How many people already participate in the event and how many people can participate
   */
  peopleLimit: number,

  /**
   * Current participants count
   */
  peopleCount: number,

  /**
   * Date when event will be closed
   */
  expires_at: Date,

  /**
   * Date when event will be started
   */
  isVisited: boolean,

  /**
   * Presentation of the associated court
   */
  court: Court,

  /**
   * Is current user participating in the event
   */
  isParticipating?: boolean,
}

/**
 * Type that represents event creation attributes
 */
export type EventCreationAttributes = Pick<Event, 'name' | 'courtId' | 'sport' | 'peopleLimit'>;
