const { Model } = require("objection");

class Shows extends Model {

    static get tableName() {
        return "Shows"
    }

    /**
    @TODO static get jsonSchema()
    */

    $beforeUpdate() {
        this.updatedAt = new Date();
    }

    static get relationMappings() {

        const Movies = require('./Movies');

        return {
            movie: {
                relation: Model.BelongsToOneRelation,
                modelClass: Movies,
                join: {
                    from: 'Shows.movieId',
                    to: 'Movies.id'
                }
            }
        }
    }
}

module.exports = Shows;