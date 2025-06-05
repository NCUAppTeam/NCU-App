import Registration, {DBRegistration} from "../Entities/Registration";

const RegistrationService = {
    parseRegistration(record: DBRegistration): Registration {
        const registration = new Registration();
        registration.id = record.uuid;
        if (record.event_id ) {
            registration.event_id = record.event_id;
        }
        
        return registration;
    }
}

export default RegistrationService;