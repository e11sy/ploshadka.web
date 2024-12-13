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
     * Array of timestamps without timezone (start and end of event)
     */
    peopleState: [number, number],

    /**
     * Flag to mark event as visited or planned to visit
     */
    visited: boolean,
}
