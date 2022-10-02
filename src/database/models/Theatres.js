const { Model } = require("objection");
class Theatres extends Model {

    static get tableName() {
        return "Theatres"
    }

    $beforeUpdate() {
        this.updatedAt = new Date();
    }

    /**
    @TODO static get jsonSchema()
    */

    $formatJson(json) {
        json = super.$formatJson(json);
        json.isOpened = Boolean(json.isOpened ?? 1);
        return json;
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