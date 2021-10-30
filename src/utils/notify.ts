import { toast } from 'react-toastify';
import { notifTypes } from './constants';

const notify = (payload) => {

    const position = toast.POSITION.TOP_RIGHT
    toast.clearWaitingQueue();
    switch (payload.type) {
        case notifTypes.ERROR : { 
            toast.error(payload.msg, {position});
            break;
        };
        case notifTypes.INFO : {
             toast.info(payload.msg, {position});
             break;
             };
        case notifTypes.SUCCESS : {
             toast.success(payload.msg, {position});
             break;
            };
    }
}

export default notify;