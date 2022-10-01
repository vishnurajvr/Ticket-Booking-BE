const moment = require('moment');
const { Model } = require("objection");

class Movies extends Model {

    static get tableName() {
        return "Movies"
    }

    /**
    @TODO static get jsonSchema()
    */

    $beforeInsert() {
        this.languages = this.languages?.join(',');
    }

    $beforeUpdate() {
        this.updatedAt = new Date();
        this.languages = this.languages?.join(',');
    }

    $formatJson(json) {
        json = super.$formatJson(json)
        json.languages = json.languages.split(',');
        json.releaseDate = moment(json.releaseDate).format('YYYY-MM-DD');
        return json
    }

    static get relationMappings() {

        const Shows = require('./Shows');
        const Screens = require('./Screens');
        const Reservation = require("./Reservation");

        return {
            screen: {
                relation: Model.HasManyRelation,
                modelClass: Screens,
                join: {
                    from: 'Movies.id',
                    to: 'Screens.movieId'
                }
            },
            reservation: {
                relation: Model.HasManyRelation,
                modelClass: Reservation,
                join: {
                    from: 'Movies.id',
                    to: "Reservation.movieId"
                }
            },
            show: {
                relation: Model.HasManyRelation,
                modelClass: Shows,
                join: {
                    from: 'Movies.id',
                    to: "Shows.movieId"
                }
            }
        }
    }
}

// Movies.ext

module.exports = Movies;