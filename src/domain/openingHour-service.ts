import {DataSource, DeleteResult, Repository, UpdateResult} from "typeorm";
import {OpeningHour} from "../database/entity/openingHour";
import {Restaurant} from "../database/entity/restaurant";
import {
    CreateOpeningHourRequest,
    ListOpeningHoursRequest,
    UpdateOpeningHourRequest
} from "../handler/validator/openingHour-validator";

export class OpeningHourService {
    private openingHourRepository: Repository<OpeningHour>;
    private restaurantRepository: Repository<Restaurant>;

    constructor(private readonly db: DataSource) {
        this.openingHourRepository = this.db.getRepository(OpeningHour);
        this.restaurantRepository = this.db.getRepository(Restaurant);
    }

    async getAllOpeningHours(listRequest: ListOpeningHoursRequest): Promise<OpeningHour[]> {
        try {
            const {page, limit} = listRequest;
            const skip = (page - 1) * limit;

            return await this.openingHourRepository.find({
                skip,
                take: limit
            });
        } catch (error) {
            console.error('Error fetching opening hours:', error);
            throw new Error('Could not fetch opening hours');
        }
    }

    async getOpeningHourById(id: number): Promise<OpeningHour> {
        try {
            const openingHour = await this.openingHourRepository.findOne({
                where: {id}
            });

            if (!openingHour) {
                throw new Error(`OpeningHour with ID ${id} not found`);
            }

            return openingHour;
        } catch (error) {
            console.error(`Error fetching opening hour with ID ${id}:`, error);
            throw new Error('Could not fetch the opening hour');
        }
    }

    async createOpeningHour(openingHourRequest: CreateOpeningHourRequest): Promise<OpeningHour> {
        try {
            const restaurant = await this.restaurantRepository.findOne({where: {id: openingHourRequest.restaurantId}});

            if (!restaurant) {
                throw new Error(`Restaurant with ID ${openingHourRequest.restaurantId} not found`);
            }

            const openingHour = this.openingHourRepository.create({
                ...openingHourRequest,
                restaurant,
            });

            return await this.openingHourRepository.save(openingHour);
        } catch (error) {
            console.error('Error creating opening hour:', error);
            throw new Error('Could not create the opening hour');
        }
    }

    async updateOpeningHour(openingHourRequest: UpdateOpeningHourRequest): Promise<UpdateResult> {
        try {
            const {id, dayOfWeek, openingTime, closingTime, restaurantId} = openingHourRequest;

            const openingHour = await this.openingHourRepository.findOne({where: {id}});

            if (!openingHour) {
                throw new Error(`OpeningHour with ID ${id} not found`);
            }

            if (restaurantId) {
                const restaurant = await this.restaurantRepository.findOne({where: {id: restaurantId}});
                if (!restaurant) {
                    throw new Error(`Restaurant with ID ${restaurantId} not found`);
                }
                openingHour.restaurant = restaurant;
            }

            if (dayOfWeek) openingHour.dayOfWeek = dayOfWeek;
            if (openingTime) openingHour.openingTime = openingTime;
            if (closingTime) openingHour.closingTime = closingTime;

            return await this.openingHourRepository.update(id, openingHour);
        } catch (error) {
            console.error(`Error updating opening hour with ID ${openingHourRequest.id}:`, error);
            throw new Error('Could not update the opening hour');
        }
    }

    async deleteOpeningHour(id: number): Promise<DeleteResult> {
        try {
            return await this.openingHourRepository.delete(id);
        } catch (error) {
            console.error(`Error deleting opening hour with ID ${id}:`, error);
            throw new Error('Could not delete the opening hour');
        }
    }
}
