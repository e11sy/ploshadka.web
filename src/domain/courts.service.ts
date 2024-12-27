import CourtsRepositoryInterface from "./courts.repository.interface";
import Court from "./entities/Court";

/**
 * Service that represents courts business logic
 */
export default class CourtsService {
  /**
   * Repository interface that represents actual courts repository
   */
  private readonly courtsRepository: CourtsRepositoryInterface;

  constructor(courtsRepository: CourtsRepositoryInterface) {
    this.courtsRepository = courtsRepository;
  }

  public async getAllCourts(): Promise<Court[]> {
    return await this.courtsRepository.getAllCourts();
  }
}
