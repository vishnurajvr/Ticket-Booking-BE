const { Model } = require("objection");

class Theatres extends Model {

    static get tableName() {
        return "Theatres"
    }

    $beforeUpdate() {
        this.updatedAt = new Date();
    }

    static get jsonSchema() {
        return {
            type: 'object',
            // required: ['name', 'userId'],
            properties: {
                id: { type: 'integer' },
                name: { type: 'string', minLength: 3, maxLength: 100 },
                userId: { type: "integer" },
                isClosed: { type: 'boolean'},
                createdAt: { type: 'string' },
                updatedAt: { type: 'string' }
            }
        }
    }

    static get relationMappings() {
        
        const User = require('./User');
        const Screens = require('./Screens');
        const Reservation = require('./Reservation');

        return {
            user: {
                relation: Model.BelongsToOneRelation,
                modelClass: User,
                join: {
                    from: 'Theatres.userId',
                    to: "User.id"
                }
            },
            screen: {
                relation: Model.HasManyRelation,
                modelClass: Screens,
                join: {
                    from: "Theatres.id",
                    to: 'Screens.theatreId'
                }
            },
            reservation: {
                relation: Model.HasManyRelation,
                modelClass: Reservation,
                join: {
                    from: "Theatres.id",
                    to: 'Reservation.theatreId'
                }
            }
        }
    }
}

module.exports = Theatres;