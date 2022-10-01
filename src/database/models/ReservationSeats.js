const { Model } = require("objection");

class ReservationSeats extends Model {

    static get tableName() {
        return "ReservationSeats"
    }

    $beforeUpdate() {
        this.updatedAt = new Date();
    }

    /**
    @TODO static get jsonSchema()
    */

    static get relationMappings() {

        const User = require('./User');
        const Seats = require('./Seats');
        const Reservation = require('./Reservation');
        
        return {
            user: {
                relation: Model.BelongsToOneRelation,
                modelClass: User,
                join: {
                    from: "ReservationSeats.userId",
                    to: "User.id"
                }
            },
            seat: {
                relation: Model.BelongsToOneRelation,
                modelClass: Seats,
                join: {
                    from: "ReservationSeats.seatsId",
                    to: "Seats.id"
                }
            },
            reservation: {
                relation: Model.BelongsToOneRelation,
                modelClass: Reservation,
                join: {
                    from: "ReservationSeats.reservationId",
                    to: "Reservation.id"
                }
            }
        }
    }
}

module.exports = ReservationSeats;