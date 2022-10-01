const moment = require('moment');

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function (knex) {

    /*
    await knex('User').del();
    await knex('Theatres').del();
    await knex('Movies').del();
    await knex('Screens').del();
    await knex('Seats').del();
    await knex('Reservation').del();

    // Password - Vishnu@123
    await knex('User').insert([
        { id: 1, name: 'Vishnuraj', password: '$2a$10$jroTKhCzhC7i1jzhrYpvT.M4jJZISt4DLBOxkNhuH1UjMYWS9mV16', gender: 'Male', mobileNumber: '9786075355', role: 'superadmin' },
        { id: 2, name: 'TEST2', password: '$2a$10$jroTKhCzhC7i1jzhrYpvT.M4jJZISt4DLBOxkNhuH1UjMYWS9mV16', gender: 'Male', mobileNumber: '9786075301', role: 'admin' },
        { id: 3, name: 'Raj', password: '$2a$10$jroTKhCzhC7i1jzhrYpvT.M4jJZISt4DLBOxkNhuH1UjMYWS9mV16', gender: 'Male', mobileNumber: '9786075302', role: 'superadmin' },

        { id: 4, name: 'TEST4', password: '$2a$10$jroTKhCzhC7i1jzhrYpvT.M4jJZISt4DLBOxkNhuH1UjMYWS9mV16', gender: 'Male', mobileNumber: '9786075303', role: 'user' },
        { id: 5, name: 'TEST5', password: '$2a$10$jroTKhCzhC7i1jzhrYpvT.M4jJZISt4DLBOxkNhuH1UjMYWS9mV16', gender: 'Male', mobileNumber: '9786075304', role: 'user' },
        { id: 6, name: 'TEST6', password: '$2a$10$jroTKhCzhC7i1jzhrYpvT.M4jJZISt4DLBOxkNhuH1UjMYWS9mV16', gender: 'Male', mobileNumber: '9786075305', role: 'user' },
        { id: 7, name: 'TEST7', password: '$2a$10$jroTKhCzhC7i1jzhrYpvT.M4jJZISt4DLBOxkNhuH1UjMYWS9mV16', gender: 'Male', mobileNumber: '9786075306', role: 'user' },
    ]);

    await knex('Theatres').insert([
        { id: 1, name: 'Inox', userId: 1 },
        { id: 2, name: 'VR Theatre', userId: 3 },
    ]);

    await knex('Movies').insert([
        { id: 1, name: 'PS-1', duration: 180 },
        { id: 2, name: 'Raja Rani', duration: 200 },
        { id: 3, name: 'Premam', duration: 190 },
        { id: 4, name: 'Padayapa', duration: 220 },
    ]);

    await knex('Screens').insert([
        {
            id: 1,
            name: 'Screen 1',
            movieId: 2,
            theatreId: 1,
            price: 120,
            rowsCount: 10,
            columnsCount: 10,
            totalSeats: 100,
            isAvailable: true,
        },
        {
            id: 2,
            name: 'Screen 2',
            movieId: 1,
            theatreId: 1,
            price: 150,
            rowsCount: 12,
            columnsCount: 12,
            totalSeats: 144,
            isAvailable: true,
        },
        {
            id: 3,
            name: 'Screen 1',
            movieId: 3,
            theatreId: 2,
            price: 120,
            rowsCount: 11,
            columnsCount: 11,
            totalSeats: 121,
            isAvailable: true,
        },
    ]);

    await knex('Seats').insert([
        // Screen1 - Theatre1
        { id: 1, date: moment().toDate(), screenId: 1, timingId: 2, seatName: 'H1', isBooked: true },
        { id: 2, date: moment().toDate(), screenId: 1, timingId: 2, seatName: 'H2', isBooked: true },
        { id: 3, date: moment().toDate(), screenId: 1, timingId: 2, seatName: 'H3', isBooked: true },
        { id: 4, date: moment().toDate(), screenId: 1, timingId: 2, seatName: 'H3', isBooked: false },
        { id: 5, date: moment().toDate(), screenId: 1, timingId: 2, seatName: 'H3', isBooked: false },

        // Screen2 - Theatre1
        { id: 6, date: moment().toDate(), screenId: 2, timingId: 6, seatName: 'J7', isBooked: true },
        { id: 7, date: moment().toDate(), screenId: 2, timingId: 6, seatName: 'J8', isBooked: true },
        { id: 8, date: moment().toDate(), screenId: 2, timingId: 6, seatName: 'J9', isBooked: false },
        { id: 9, date: moment().toDate(), screenId: 2, timingId: 6, seatName: 'H1', isBooked: false },

        // Screen1 - Theatre2
        { id: 10, date: moment().toDate(), screenId: 3, timingId: 9, seatName: 'Z1', isBooked: true },
        { id: 11, date: moment().toDate(), screenId: 3, timingId: 9, seatName: 'Z2', isBooked: true },
        { id: 12, date: moment().add(1, 'day').toDate(), screenId: 3, timingId: 9, seatName: 'Z3', isBooked: true },
        { id: 13, date: moment().toDate(), screenId: 3, timingId: 9, seatName: 'Z4', isBooked: true },
    ]);

    await knex('Reservation').insert([
        { id: 1, userId: 4, amount: 240, theatreId: 1, screenId: 1, timingId: 2, seatsId: "[1, 2]", date: moment().toDate() },
        { id: 2, userId: 7, amount: 120, theatreId: 1, screenId: 1, timingId: 2, seatsId: "[3]", date: moment().toDate() },

        { id: 3, userId: 5, amount: 150, theatreId: 1, screenId: 2, timingId: 6, seatsId: "[6]", date: moment().toDate() },
        { id: 4, userId: 7, amount: 150, theatreId: 1, screenId: 2, timingId: 6, seatsId: "[7]", date: moment().toDate() },

        { id: 5, userId: 6, amount: 360, theatreId: 2, screenId: 3, timingId: 9, seatsId: '[10, 11, 13]', date: moment().toDate() },
        { id: 6, userId: 6, amount: 120, theatreId: 2, screenId: 3, timingId: 9, seatsId: '[12]', date: moment().add(1, 'day').toDate() },
    ])
    */

};
