const { Model } = require("objection");

class Timings extends Model {

    static get tableName() {
        return "Timings"
    }

    static get relationMappings() {

        const Seats = require('./Seats');
        const Screens = require('./Screens');
        const Reservation = require('./Reservation');

        return {
            theatre: {
                relation: Model.HasManyRelation,
                modelClass: Screens,
                join: {
                    from: 'Timings.id',
                    to: "Screens.timingId"
                }
            },
            seat: {
                relation: Model.HasManyRelation,
                modelClass: Seats,
                join: {
                    from: 'Timings.id',
                    to: "Seats.timingId"
                }
            },
            reservation: {
                relation: Model.HasManyRelation,
                modelClass: Reservation,
                join: {
                    from: 'Timings.id',
                    to: "Reservation.timingId"
                }
            }
        }
    }
}

module.exports = Timings;