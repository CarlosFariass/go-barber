import { Router } from 'express';
import { uuid } from 'uuidv4';
import {startOfHour, parseISO, isEqual} from 'date-fns';

interface Appointment {
    id: string,
    provider: string,
    date: Date;
}

const appointmentsRouter = Router ();

const appointments: Appointment[] = [];

appointmentsRouter.post('/', (request, response) => {
    const { provider, date} = request.body;

    const parsedDate = startOfHour(parseISO(date));
    const findAppointmentInTheSameDate = appointments.find(appointment =>
        isEqual(parsedDate, appointment.date),
    );

    if(findAppointmentInTheSameDate){
        return response.status(400).json({ message: 'This appointment is already booked, try a different specific time'})
    }

    const appointment = {
        id: uuid(),
        provider,
        date: parsedDate,
    }
//push for add on the list
    appointments.push(appointment)

    return response.json(appointment);
});

export default appointmentsRouter;
