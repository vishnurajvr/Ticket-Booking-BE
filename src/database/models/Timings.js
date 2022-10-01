const { Model } = require("objection");

class Timings extends Model {

    static get tableName() {
        return "Timings"
    }

    /**
    @TODO static get jsonSchema()
    */

    static get relationMappings() {

        const Screens = require('./Screens');

        return {
            screen: {
                relation: Model.BelongsToOneRelation,
                modelClass: Screens,
                join: {
                    from: 'Timings.screenId',
                    to: 'Screens.id'
                }
            }
        }
    }
}

module.exports = Timings;