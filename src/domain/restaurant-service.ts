import {DataSource, DeleteResult, Repository, UpdateResult} from "typeorm";
import {Restaurant} from "../database/entity/restaurant";
import {CreateRestaurantRequest, UpdateRestaurantRequest} from "../handler/validator/restaurant-validator";

export class RestaurantService {
    private restaurantRepository: Repository<Restaurant>;

    constructor(private readonly db: DataSource) {
        this.restaurantRepository = this.db.getRepository(Restaurant);
    }

    async getRestaurant(): Promise<Restaurant> {
        try {
            const [restaurant] = await this.restaurantRepository.find({
                relations: ['openingHours', 'paymentMethods'],
                order: {
                    id: 'ASC',
                },
                take: 1,
            });

            if (!restaurant) {
                throw new Error(`Restaurant not found`);
            }

            return restaurant;
        } catch (error) {
            console.error(`Error fetching restaurant`, error);
            throw new Error('Could not fetch the restaurant');
        }
    }

    async createRestaurant(restaurantRequest: CreateRestaurantRequest): Promise<Restaurant> {
        try {
            const restaurant = this.restaurantRepository.create(restaurantRequest);
            return await this.restaurantRepository.save(restaurant);
        } catch (error) {
            console.error('Error creating restaurant:', error);
            throw new Error('Could not create the restaurant');
        }
    }

    async updateRestaurant(restaurantRequest: UpdateRestaurantRequest): Promise<UpdateResult> {
        try {
            const {id, name, description, phoneNumber, address, email} = restaurantRequest;

            const restaurant = await this.restaurantRepository.findOne({where: {id}});

            if (!restaurant) {
                throw new Error(`Restaurant with ID ${id} not found`);
            }

            if (name) restaurant.name = name;
            if (description) restaurant.description = description;
            if (phoneNumber) restaurant.phoneNumber = phoneNumber;
            if (address) restaurant.address = address;
            if (email) restaurant.email = email;

            return await this.restaurantRepository.update(id, restaurant);
        } catch (error) {
            console.error(`Error updating restaurant with ID ${restaurantRequest.id}:`, error);
            throw new Error('Could not update the restaurant');
        }
    }

    async deleteRestaurant(id: number): Promise<DeleteResult> {
        try {
            return await this.restaurantRepository.delete(id);
        } catch (error) {
            console.error(`Error deleting restaurant with ID ${id}:`, error);
            throw new Error('Could not delete the restaurant');
        }
    }
}
