const { Model } = require("objection");

class Seats extends Model {

    static get tableName() {
        return "Seats"
    }

    static get jsonSchema() {
        return {
            type: 'object',
            required: ['date', 'screenId', 'timingId', 'seatName'],
        }
    }

    $beforeUpdate() {
        this.updatedAt = new Date();
    }

    static get relationMappings() {

        const Timings = require('./Timings');
        const Screens = require('./Screens');

        return {
            timing: {
                relation: Model.BelongsToOneRelation,
                modelClass: Timings,
                join: {
                    from: 'Seats.timingId',
                    to: "Timings.id"
                }
            },
            screen: {
                relation: Model.BelongsToOneRelation,
                modelClass: Screens,
                join: {
                    from: 'Seats.screenId',
                    to: "Screens.id"
                }
            },
        }
    }
}

module.exports = Seats;