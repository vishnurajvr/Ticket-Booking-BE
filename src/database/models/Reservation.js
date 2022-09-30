const { Model } = require("objection");

class Reservation extends Model {

    static get tableName() {
        return "Reservation"
    }

    static get jsonSchema() {
        return {
            type: 'object',
            required: ['date', 'userId', 'theatreId', 'screenId', 'timingId', 'seatsId'],
        }
    }

    $beforeInsert() {
        this.seatsId = JSON.stringify(this.seatsId);
    }

    $beforeUpdate() {
        this.updatedAt = new Date();
        this.seatsId = JSON.stringify(this.seatsId);
    }

    static get relationMappings() {

        const User = require('./User');
        const Timings = require('./Timings');
        const Screens = require('./Screens');
        const Theatres = require('./Theatres');

        return {
            user: {
                relation: Model.BelongsToOneRelation,
                modelClass: User,
                join: {
                    from: 'Reservation.userId',
                    to: "User.id"
                }
            },
            timing: {
                relation: Model.BelongsToOneRelation,
                modelClass: Timings,
                join: {
                    from: 'Reservation.timingId',
                    to: "Timings.id"
                }
            },
            screen: {
                relation: Model.BelongsToOneRelation,
                modelClass: Screens,
                join: {
                    from: 'Reservation.screenId',
                    to: "Screens.id"
                }
            },
            theatre: {
                relation: Model.BelongsToOneRelation,
                modelClass: Theatres,
                join: {
                    from: 'Reservation.theatreId',
                    to: "Theatres.id"
                }
            }
        }
    }
}

module.exports = Reservation;