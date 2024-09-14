import {DataSource, DeleteResult, Repository, UpdateResult} from "typeorm";
import {PaymentMethod} from "../database/entity/paymentMethod";
import {
    CreatePaymentMethodRequest,
    ListPaymentMethodsRequest,
    UpdatePaymentMethodRequest
} from "../handler/validator/paymentMethod-validator";
import {RestaurantService} from "./restaurant-service";
import {AppDataSource} from "../database/database";


export class PaymentMethodService {
    private paymentMethodRepository: Repository<PaymentMethod>

    constructor(private readonly db: DataSource) {
        this.paymentMethodRepository = this.db.getRepository(PaymentMethod);
    }

    async getAllPaymentMethods(listRequest: ListPaymentMethodsRequest): Promise<[PaymentMethod[], number]> {
        try {
            const {page, limit} = listRequest;
            const skip = (page - 1) * limit;

            return await this.paymentMethodRepository.findAndCount({
                skip,
                take: limit
            });
        } catch (error) {
            console.error('Error fetching payment methods:', error);
            throw new Error('Could not fetch payment methods');
        }
    }

    async getPaymentMethodsById(id: number): Promise<PaymentMethod> {
        try {
            const paymentMethod = await this.paymentMethodRepository.findOne({
                where: {id}
            });

            if (!paymentMethod) {
                throw new Error(`Payment Method with ID ${id} not found`);
            }

            return paymentMethod;
        } catch (error) {
            console.error(`Error fetching paymentMethod with ID ${id}:`, error);
            throw new Error('Could not fetch the paymentMethod');
        }
    }

    async createPaymentMethod(paymentMethodRequest: CreatePaymentMethodRequest): Promise<PaymentMethod> {
        try {
            const paymentMethod = this.paymentMethodRepository.create({
                ...paymentMethodRequest
            });
            const restaurantService = new RestaurantService(AppDataSource);
            paymentMethod.restaurant = await restaurantService.getRestaurant();

            return await this.paymentMethodRepository.save(paymentMethod);
        } catch (error) {
            console.error('Error creating opening hour:', error);
            throw new Error('Could not create the opening hour');
        }
    }

    async updatePaymentMethod(paymentMethodRequest: UpdatePaymentMethodRequest): Promise<UpdateResult> {
        try {
            const {id, name, active} = paymentMethodRequest;

            const paymentMethod = await this.paymentMethodRepository.findOne({where: {id}});

            if (name) paymentMethodRequest.name = name;
            if (active) paymentMethodRequest.active = active;

            return await this.paymentMethodRepository.update(id, paymentMethodRequest);
        } catch (error) {
            console.error(`Error updating payment method with ID ${paymentMethodRequest.id}:`, error);
            throw new Error('Could not update the payment method');
        }
    }

    async deletePaymentMethod(id: number): Promise<DeleteResult> {
        try {
            return await this.paymentMethodRepository.delete(id);
        } catch (error) {
            console.error(`Error deleting payment method with ID ${id}:`, error);
            throw new Error('Could not delete the payment method');
        }
    }
}