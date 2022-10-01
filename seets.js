const data = [
    {
        sectionName: 'Class A',
        price: 190,
        rowCount: 8,
        columnCount: 30,
        seatsList: [
            {
                seatsRowName: 'A',
                list: [
                    { name: '21', status: 'available' },
                    { name: '20', status: 'available' },
                    { name: '19', status: 'available' },
                    { name: '18', status: 'available' },
                    { name: '17', status: 'available' },
                    { name: '16', status: 'available' },
                    { name: '15', status: 'available' },
                    { name: '', status: 'hidden' },
                    { name: '', status: 'hidden' },
                    { name: '', status: 'hidden' },
                    { name: '', status: 'hidden' },
                    { name: '14', status: 'available' },
                    { name: '13', status: 'available' },
                    { name: '12', status: 'available' },
                    { name: '11', status: 'available' },
                    { name: '10', status: 'available' },
                    { name: '9', status: 'available' },
                    { name: '8', status: 'available' },
                    { name: '', status: 'hidden' },
                    { name: '', status: 'hidden' },
                    { name: '', status: 'hidden' },
                    { name: '', status: 'hidden' },
                    { name: '', status: 'hidden' },
                    { name: '7', status: 'available' },
                    { name: '6', status: 'available' },
                    { name: '5', status: 'available' },
                    { name: '4', status: 'available' },
                    { name: '3', status: 'available' },
                    { name: '2', status: 'available' },
                    { name: '1', status: 'available' },
                ]
            },
        ]
    },
    {
        sectionName: 'Class B',
        price: 190,
        rowCount: 10,
        columnCount: 30,
        seatsList: [
            {
                seatsRowName: 'I',
                list: [
                    { name: '', status: 'hidden' },
                    { name: '', status: 'hidden' },
                    { name: '', status: 'hidden' },
                    { name: '', status: 'hidden' },
                    { name: '', status: 'hidden' },
                    { name: '', status: 'hidden' },
                    { name: '', status: 'hidden' },
                    { name: '', status: 'hidden' },
                    { name: '21', status: 'available' },
                    { name: '20', status: 'available' },
                    { name: '19', status: 'available' },
                    { name: '18', status: 'available' },
                    { name: '17', status: 'available' },
                    { name: '16', status: 'available' },
                    { name: '15', status: 'available' },
                    { name: '14', status: 'available' },
                    { name: '13', status: 'available' },
                    { name: '12', status: 'available' },
                    { name: '11', status: 'available' },
                    { name: '10', status: 'available' },
                    { name: '9', status: 'available' },
                    { name: '8', status: 'available' },
                    { name: '', status: 'hidden' },
                    { name: '7', status: 'available' },
                    { name: '6', status: 'available' },
                    { name: '5', status: 'available' },
                    { name: '4', status: 'available' },
                    { name: '3', status: 'available' },
                    { name: '2', status: 'available' },
                    { name: '1', status: 'available' },
                ]
            }
        ]
    }
];

let screenId = 1;

for (let item of data) {
    section.insert({
        screenId,
        price: item.price,
        name: item.sectionName,
        rowCount: item.rowCount,
        columnCount: item.columnCount
    }).then(({ id }) => {
        let seatsData = [];
        for (let seats of item.seatsList) {
            for (let seat of seats.list) {
                seatsData.push({
                    screenId,
                    sectionId: id,
                    name: seat.name,
                    satus: seat.status,
                    seatsRowName: seats.seatsRowName,
                });
            }
        }
        seast.insert(seatsData);
    });
}

Reservation:
    id
    date
    theatreId
    screenId
    totalAmount
    totalMember
    timingId
    userId
    isCancelled

ReservationSeats;
    id
    seatId
    userId
    reservationId



/*

Section - 3
rowCount - 14 
columnCount - 17 
totalSeats - 14 * 17 = 238 


        Class A - 220
Row1    A 1  2  3  4       5  6  7  8  9  10      11  12  13  14
Row2    B 1  2  3  4  5    6  7  8  9  10 11   12 13  14  15  15
Row3    C 1  2  3  4  5    6  7  8  9  10 11   12 13  14  15  15
Row4    D 1  2  3  4  5    6  7  8  9  10 11   12 13  14  15  15
Row5    E 1  2  3  4  5    6  7  8  9  10 11   12 13  14  15  15
Row6
        Class B - 150
Row7    F                  1  2  3  4  5  6
Row8    G 1  2  3  4  5    6  7  8  9  10 11   12 13  14  15  15
Row9    H 1  2  3  4  5    6  7  8  9  10 11   12 13  14  15  15
Row10   I 1  2  3  4  5    6  7  8  9  10 11   12 13  14  15  15
Row11   J 1  2  3  4  5    6  7  8  9  10 11   12 13  14  15  15
Row12
        Class C - 100
Row13   K 1  2  3  4  5    6  7  8  9  10 11   12 13  14  15  15
Row14   L 1  2  3  4  5    6  7  8  9  10 11   12 13  14  15  15

*/