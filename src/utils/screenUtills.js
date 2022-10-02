const moment = require('moment');

// Models
const { Sections, Seats, Timings, Movies, Screens, Shows } = require('../database/models');

// Helper
const messages = require('../constants/messages');

const createSeats = async ({ data, sectionId, columnCount }) => {

    try {

        let seatsCount = 0;
        let seatsData = [];

        for (let row of data) {

            if (!row.seats || (Array.isArray(row.seats) && row.seats.length <= 0)) {
                throw new Error(messages.invalidSeats);
            }

            if (String(row.seats.length) !== String(columnCount)) {
                throw new Error(messages.invalidSeats + ` count in Row -${row.seatsRowName}`);
            }

            for (let seat of row.seats) {

                if (seat.status === 'available') seatsCount++;

                seatsData.push({
                    sectionId,
                    status: seat.status,
                    name: seat.name || null,
                    seatsRowName: row.seatsRowName
                });
            }
        }

        return [seatsCount, seatsData];
    } catch (e) {
        throw new Error(e.message);
    }
}

const createSection = async ({ data, transaction, screenId, body }) => {

    try {

        if (Array.isArray(data)) {

            let totalSeatsCount = 0;

            if (data?.length <= 0) throw new Error(messages.invalidSeats);

            for (let item of data) {

                if (!item.rowsData?.length) throw new Error(messages.invalidSeats);

                const sectionData = await Sections.query(transaction).insert({
                    screenId,
                    name: item.name,
                    amount: item.amount,
                    rowCount: item.rowCount,
                    totalSeats: item.totalSeats,
                    columnCount: item.columnCount,
                });

                const [seatsCount, seatsData] = await createSeats({
                    data: item.rowsData,
                    sectionId: sectionData.id,
                    columnCount: item.columnCount
                });

                if (seatsCount !== Number(item.totalSeats)) {
                    throw new Error(`Invalid seats count for Seaction - ${item.name}. Actually ${seatsCount} exists but got it ${item.totalSeats}`);
                }

                totalSeatsCount += seatsCount;
                await Seats.knex().batchInsert('Seats', seatsData).transacting(transaction).then(() => {
                    console.log('*'.repeat(20), ' SEATS CREATED ', '*'.repeat(20));
                });
            }

            if (totalSeatsCount !== Number(body.totalSeats)) {
                throw new Error(`Invalid total seats count. Actually ${totalSeatsCount} exists but got it ${body.totalSeats}`);
            }
        }

    } catch (e) {
        throw new Error(e.message);
    }
}

const createTimings = async ({ screenId, data, transaction, movieId, isDelete = false }) => {

    const FORMAT = 'HH:mm';

    let deleteId = [];
    if (isDelete) {
        const findTiming = await Timings.query().where({ screenId }).select('id');
        console.log({ findTiming });
        findTiming?.map(item => deleteId.push(item.id));
    }
    console.log({ isDelete, deleteId })

    if (Array.isArray(data) && data?.length) {
        let timingData = [];

        if (movieId) {

            const getMovie = await Movies.query().findById(movieId).select('duration');

            data.reduce((value, nextValue) => {

                const minutesDiff = moment(nextValue.timing, FORMAT).diff(moment(value.timing, FORMAT), 'minutes');

                if (minutesDiff <= getMovie.duration) {
                    throw new Error(`Invalid movie timing duration between ${value.timing} - ${nextValue.timing}, Difference is ${getMovie.duration} minutes but got it ${minutesDiff} minutes`);
                }
                return nextValue;
            });
        }

        for (let item of data) {
            timingData.push({
                screenId,
                timing: item.timing,
                displayTime: moment(item.timing, FORMAT).format('hh:mm A'),
            });
        }

        await Timings.knex().batchInsert('Timings', timingData).transacting(transaction).then(() => {
            console.log('*'.repeat(20), ' TIMINGS ARE CREATED ', '*'.repeat(20));
        });

        if (isDelete && deleteId?.length) {
            await Timings.query(transaction).whereIn('id', deleteId).del().then(() => {
                console.log('*'.repeat(20), ' TIMINGS ARE DELETED ', '*'.repeat(20));
            });
        }
    }
}

const handleShows = async ({ movieId, findScreen, transaction, screenId }) => {

    console.log("-".repeat(200));
    console.log({ movieId, findScreen })

    if (String(movieId) !== String(findScreen.movieId)) {

        console.log('+'.repeat(200));

        const resp = await Screens.query().where({ movieId: findScreen.movieId, isAvailable: true }).whereNot('id', screenId);
        if (!resp || resp?.length <= 0) {
            await Shows.query(transaction).where('movieId', findScreen.movieId).del().then(() => {
                console.log('*'.repeat(20), ' SHOWs DELETED ', '*'.repeat(20));
            });
        }

    }

    await Shows.query().findOne({ movieId }).then((data) => {
        if (!data) Shows.query(transaction).insert({ movieId }).then(() => {
            console.log('*'.repeat(20), ' SHOWs CREATED ', '*'.repeat(20));
        });
    });
}

module.exports = {
    handleShows,
    createTimings,
    createSection
};