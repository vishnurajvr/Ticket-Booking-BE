const { Model } = require("objection");

class Sections extends Model {

    static get tableName() {
        return "Sections"
    }

    /**
    @TODO static get jsonSchema()
    */

    $beforeUpdate() {
        this.updatedAt = new Date();
    }

    static get relationMappings() {

        const Seats = require('./Seats');
        const Screens = require('./Screens');

        return {
            screen: {
                relation: Model.BelongsToOneRelation,
                modelClass: Screens,
                join: {
                    from: 'Sections.screenId',
                    to: 'Screens.id'
                }
            },
            seat: {
                relation: Model.HasManyRelation,
                modelClass: Seats,
                join: {
                    from: 'Section.id',
                    to: 'Seats.sectionId'
                }
            }
        }
    }
}

module.exports = Sections;