const bcrypt = require('bcryptjs');
const { Model } = require("objection");

// Helper
const { USER, ADMIN, SUPER_ADMIN } = require("../../constants");

class User extends Model {

    static get tableName() {
        return "User"
    }

    $beforeInsert() {
        this.password = bcrypt.hashSync(this.password, bcrypt.genSaltSync(10));
    }

    $beforeUpdate() {
        this.updatedAt = new Date();
    }

    /** @TODO */
    static get jsonSchema() {
        return {
            type: 'object',
            // required: ['name', 'gender', 'mobileNumber'],
            properties: {
                id: { type: 'integer' },
                name: { type: 'string', minLength: 3, maxLength: 50 },
                password: { type: 'string' },
                mobileNumber: { type: 'string' },
                role: { type: 'string', enum: [USER, ADMIN, SUPER_ADMIN] },
                gender: { type: 'string', enum: ['Male', 'Female', 'Other'] },
                createdAt: { type: 'string' },
                updatedAtt: { type: 'string' }
            }
        }
    }

    static get relationMappings() {

        const Theatres = require('./Theatres');
        const Reservation = require('./Reservation');
        const ReservationSeats = require('./ReservationSeats');

        return {
            theatre: {
                relation: Model.HasManyRelation,
                modelClass: Theatres,
                join: {
                    from: 'User.id',
                    to: 'Theatres.userId'
                }
            },
            reservation: {
                relation: Model.HasManyRelation,
                modelClass: Reservation,
                join: {
                    from: 'User.id',
                    to: 'Reservation.userId'
                }
            },
            reservationSeat: {
                relation: Model.HasManyRelation,
                modelClass: ReservationSeats,
                join: {
                    from: 'User.id',
                    to: 'ReservationSeats.userId'
                }
            }
        }
    }
}

module.exports = User;