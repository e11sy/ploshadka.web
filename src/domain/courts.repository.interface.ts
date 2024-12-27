import Court from '@/domain/entities/Court';

export default interface CourtsRepositoryInterface {
  /**
   * Get all courts available in the system
   */
  getAllCourts(): Promise<Court[]>;
}
