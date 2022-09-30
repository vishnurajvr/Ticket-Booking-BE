const { Model } = require("objection");

class Screens extends Model {

    static get tableName() {
        return "Screens"
    }

    static get jsonSchema() {
        return {
            type: 'object',
            required: ['name', 'rowsCount', 'columnsCount', 'movieId', 'theatreId', 'totalSeats'],
        }
    }

    $beforeUpdate() {
        this.updatedAt = new Date();
    }

    static get relationMappings() {

        const Seats = require('./Seats');
        const Movies = require('./Movies');
        const Timings = require('./Timings');
        const Theatres = require('./Theatres');
        const Reservation = require('./Reservation');

        return {
            theatre: {
                relation: Model.BelongsToOneRelation,
                modelClass: Theatres,
                join: {
                    from: 'Screens.theatreId',
                    to: "Theatres.id"
                }
            },
            movie: {
                relation: Model.BelongsToOneRelation,
                modelClass: Movies,
                join: {
                    from: 'Screens.movieId',
                    to: "Movies.id"
                }
            },
            timing: {
                relation: Model.BelongsToOneRelation,
                modelClass: Timings,
                join: {
                    from: 'Screens.id',
                    to: 'Timings.screenId'
                }
            },
            seat: {
                relation: Model.HasManyRelation,
                modelClass: Seats,
                join: {
                    from: 'Screens.id',
                    to: 'Seats.screenId'
                }
            },
            reservation: {
                relation: Model.HasManyRelation,
                modelClass: Reservation,
                join: {
                    from: 'Screens.id',
                    to: "Reservation.screenId"
                }
            }
        }
    }
}

module.exports = Screens;