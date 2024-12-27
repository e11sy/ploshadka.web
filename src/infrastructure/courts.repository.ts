import CourtsRepositoryInterface from '../domain/courts.repository.interface.ts';
import Court from '../domain/entities/Court';
import PloshadkaApiTransport from './transport/ploshadka-api/index.ts';

/**
 * Facade for the courts data
 */
export default class CourtsRepository implements CourtsRepositoryInterface {
  private readonly transport: PloshadkaApiTransport;

  constructor(ploshadkaApiTransport: PloshadkaApiTransport) {
    this.transport = ploshadkaApiTransport;
  }

  public async getAllCourts(): Promise<Court[]> {
    return await this.transport.get<Court[]>('/courts/all');
  }
}
