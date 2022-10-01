const { Model } = require("objection");

class Screens extends Model {

    static get tableName() {
        return "Screens"
    }

    /**
    @TODO static get jsonSchema()
    */

    $beforeUpdate() {
        this.updatedAt = new Date();
    }

    static get relationMappings() {

        const Movies = require('./Movies');
        const Timings = require('./Timings');
        const Sections = require('./Sections');
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
            section: {
                relation: Model.HasManyRelation,
                modelClass: Sections,
                join: {
                    from: 'Screens.id',
                    to: 'Sections.screenId'
                }
            },
            reservation: {
                relation: Model.HasManyRelation,
                modelClass: Reservation,
                join: {
                    from: 'Screens.id',
                    to: "Reservation.screenId"
                }
            },
            timing: {
                relation: Model.HasManyRelation,
                modelClass: Timings,
                join: {
                    from: 'Screens.id',
                    to: 'Timings.screenId'
                }
            }
        }
    }
}

module.exports = Screens;