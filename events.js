const events = [
    { id: 1, name: 'Conference', date: new Date('2023-12-01T09:00:00') },
    { id: 2, name: 'Workshop', date: new Date('2023-12-10T14:30:00') },
    { id: 3, name: 'Meeting', date: new Date('2023-11-20T11:45:00') },
    { id: 3, name: 'Solve rubik', date: new Date('2023-11-29T11:45:00') },
    { id: 3, name: 'Buy new phone', date: new Date('2023-11-30T11:45:00') },
    { id: 3, name: 'Eating', date: new Date('2023-12-20T11:45:00') },
    { id: 3, name: 'Walking', date: new Date('2023-12-20T11:45:00') },
    { id: 3, name: 'Runing', date: new Date('2025-12-20T12:45:00') },
    { id: 3, name: 'Checking Bug', date: new Date('2025-12-20T12:46:00') },
    { id: 3, name: 'Deploy Production', date: new Date('2025-12-20T12:47:00') },
];
//Sắp xếp các sự kiện theo thứ tự diễn ra trước → sau
events.sort((a,b) => a.date - b.date)
console.log(events);

function getEventsByDate(inputDate) {
    const [day, month, year] = inputDate.split('-').map(Number);
    const startDate = new Date(year, month - 1, day, 0, 0, 0, 0);
    const endDate = new Date(year, month - 1 , day, 23, 59, 59, 999);
  
    const filteredEvents = events.filter(event => event.date >= startDate && event.date <= endDate);
  
    if (filteredEvents.length > 0) {
        const result = `Các sự kiện diễn ra trong ngày ${inputDate}:` +
        filteredEvents.map(event => `\n${event.name} - ${event.date}`);
        return result;
    } else {
        return `Không có sự kiện nào diễn ra trong ngày ${inputDate}.`;
    }
}
  
console.log(getEventsByDate('20-12-2025'));


function getEventsBetweenDates(inputDate) {
    const [day, month, year] = inputDate.split('-').map(Number);
    const inputDateObj = new Date(year, month - 1, day);
    const currentDate = new Date();

    const result = [];
    const isFutureDate = inputDateObj > currentDate;

    events.forEach(event => {
        const eventDate = event.date;

        if (isFutureDate) {
            if (eventDate > currentDate && eventDate <= inputDateObj) {
                const timeDiff = Math.ceil((eventDate - currentDate) / (1000 * 60 * 60 * 24));
                result.push({
                    id: event.id,
                    name: event.name,
                    date: eventDate.toISOString().split('T')[0],
                    remainingDate: timeDiff
                });
            }
        } else {
            if (eventDate < currentDate && eventDate >= inputDateObj) {
                const timeDiff = Math.ceil((currentDate - eventDate) / (1000 * 60 * 60 * 24));
                result.push({
                    id: event.id,
                    name: event.name,
                    date: eventDate.toISOString().split('T')[0],
                    passedDay: timeDiff
                });
            }
        }
    });

    return result;
}


const inputDate = '30-11-2023';
const result = getEventsBetweenDates(inputDate);
console.log(result);


  