const { Model } = require("objection");

class Seats extends Model {

    static get tableName() {
        return "Seats"
    }

    /**
    @TODO static get jsonSchema()
    */

    $beforeUpdate() {
        this.updatedAt = new Date();
    }

    $formatJson(json) {
        json = super.$formatJson(json);
        if (json?.reservationSeat?.length > 0) json.status = 'unavilable';
        return json;
    }

    static get relationMappings() {

        const Sections = require('./Sections');
        const ReservationSeats = require('./ReservationSeats');

        return {
            section: {
                relation: Model.BelongsToOneRelation,
                modelClass: Sections,
                join: {
                    from: 'Seats.sectionId',
                    to: 'Sections.id'
                }
            },
            reservationSeat: {
                relation: Model.HasManyRelation,
                modelClass: ReservationSeats,
                join: {
                    from: 'Seats.id',
                    to: 'ReservationSeats.seatsId'
                }
            },
        }
    }
}

module.exports = Seats;