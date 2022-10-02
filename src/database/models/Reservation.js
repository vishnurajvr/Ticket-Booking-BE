const moment = require('moment');
const { Model } = require("objection");

class Reservation extends Model {

    static get tableName() {
        return "Reservation"
    }

    /**
    @TODO static get jsonSchema()
    */

    $beforeUpdate() {
        this.updatedAt = new Date();
    }

    $formatJson(json) {
        json = super.$formatJson(json);
        json.date = moment(json.date).format('YYYY-MM-DD');
        return json;
    }

    static get relationMappings() {

        const User = require('./User');
        const Movies = require('./Movies');
        const Timings = require('./Timings');
        const Screens = require('./Screens');
        const Theatres = require('./Theatres');
        const ReservationSeats = require('./ReservationSeats');

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
            },
            movie: {
                relation: Model.BelongsToOneRelation,
                modelClass: Movies,
                join: {
                    from: 'Reservation.movieId',
                    to: 'Movies.id'
                }
            },
            reservationSeat: {
                relation: Model.HasManyRelation,
                modelClass: ReservationSeats,
                join: {
                    from: 'Reservation.id',
                    to: 'ReservationSeats.reservationId'
                }
            }
        }
    }
}

module.exports = Reservation;