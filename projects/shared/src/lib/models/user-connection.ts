import { BehaviorSubject, Observable } from 'rxjs';

export class UserConnection {
    user: IUser;
    isCurrentUser: boolean;
    rtcConnection: RTCPeerConnection;
    streamSub: BehaviorSubject<MediaStream>;
    streamObservable: Observable<MediaStream>;
    creatingOffer = false;
    creatingAnswer = false;

    constructor(user: IUser, isCurrentUser: boolean, rtcConnection: RTCPeerConnection) {
        this.user = user;
        this.isCurrentUser = isCurrentUser;
        this.rtcConnection = rtcConnection;
        this.streamSub = new BehaviorSubject<MediaStream>(undefined);
        this.streamObservable = this.streamSub.asObservable();
    }

    setStream(stream: MediaStream) {
        this.streamSub.next(stream);
    }

    end() {
        if (this.rtcConnection) {
            this.rtcConnection.close();
        }
        if (this.streamSub.getValue()) {
            this.setStream(undefined);
        }
    }
}
export interface IUser {
    userName: string;
    connectionId: string;
}