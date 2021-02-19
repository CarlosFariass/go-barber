import { Router } from 'express';
import {startOfHour, parseISO, isEqual} from 'date-fns';
import Appointment from '../models/Appointment'

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

    const appointment = new Appointment(provider, parsedDate)

//push for add on the list
    appointments.push(appointment)

    return response.json(appointment);
});

export default appointmentsRouter;
