const { Model } = require("objection");

class Movies extends Model {

    static get tableName() {
        return "Movies"
    }

    static get jsonSchema() {
        return {
            type: 'object',
            required: ['name', 'duration'],
        }
    }

    $beforeUpdate() {
        this.updatedAt = new Date();
    }

    static get relationMappings() {

        const Screens = require('./Screens');

        return {
            screen: {
                relation: Model.HasManyRelation,
                modelClass: Screens,
                join: {
                    from: 'Movies.id',
                    to: 'Screens.movieId'
                }
            }
        }
    }
}

module.exports = Movies;