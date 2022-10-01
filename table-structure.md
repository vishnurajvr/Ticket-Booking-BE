User:
    id
    name
    password
    mobileNumber
    role -> super admin, admin , user
    gender -> Male, Female, User
    createdAt
    updatedAt

Theaters:
    id
    name
    userId
    isClosed
    createdAt
    updatedAt

Screens:
    id
    name
    price
    movieId
    rowsCount
    columnsCount
    description
    theaterId
    totalSeats
    isAvailable
    createdAt
    updatedAt
    createdBy // @TODO

Timing:
    id
    screenId
    startTime
    endTime
    timing - concat (startTime + endTime)
    createdAt
    updatedAt

Movie:
    id
    name
    duration // Minutes
    createdAt
    updatedAt

Seats:
    id
    screenId
    timingId
    seatName
    isBooked
    createdAt
    updatedAt

Reservation:
    id
    userId
    amount
    date
    theatreId
    screenId
    timingId
    seatsId -> Array[]
    createdAt
    updatedAt


SuperAdmin:
    eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6OCwicm9sZSI6InN1cGVyQWRtaW4iLCJuYW1lIjoiVmlzaG51IiwiaWF0IjoxNjY0NDQ4Nzk5LCJleHAiOjE2NzU0NTIzOTl9.wy71cxbjds9Oe9oN7EJvlCAsm5NJ3fzGj-dAlznQFQo

User:
    eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NSwicm9sZSI6InVzZXIiLCJuYW1lIjoiVEVTVDUiLCJpYXQiOjE2NjQ0NTIzNjIsImV4cCI6MTY3NDQ1NTk2Mn0.wlvw3Wc668iX9595Vn_DBIKU7wD52FSC2D3p7YjhMIU

Admin:
    eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Miwicm9sZSI6ImFkbWluIiwibmFtZSI6IlRFU1QyIiwiaWF0IjoxNjY0NDUyNDQ4LCJleHAiOjE2NzQ0NTYwNDh9.iXf3rkiwceYHPEkNijaKKVtuwO8dKqpEGTh4Q0lKg4A

<!-- 

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

-->