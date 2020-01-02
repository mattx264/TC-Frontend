// import { Injectable } from '@angular/core';
// import { IUser, UserConnection } from '../../../projects/shared/src/lib/models/user-connection';

// @Injectable({
//   providedIn: 'root'
// })
// export class WebRtcService {
//   // tslint:disable-next-line:variable-name
//   private _connections: { [index: string]: UserConnection } = {};
//   // tslint:disable-next-line:variable-name
//   private _hubConnection: signalR.HubConnection;
//   public currentMediaStream: MediaStream;

//   public currentIceServers: RTCIceServer[] = [{ username: '', credential: '', urls: 'stun:stun1.l.google.com:19302' }];

//   constructor() { }
//   async initiateOffer(acceptingUser: IUser) {
//     const partnerClientId = acceptingUser.connectionId;

//     console.log('Initiate offer to ' + acceptingUser.userName);

//     if (this._connections[partnerClientId]) {
//       console.log('Cannot initiate an offer with existing partner.');
//       return;
//     }

//     const iceServers = await this.getIceServers();
//     const connection = this.getConnection(partnerClientId, iceServers);
//     const localStream = await this.getUserMediaInternal();
//     localStream.getTracks().forEach(track => connection.rtcConnection.addTrack(track, localStream));
//   }
//   private async receivedVideoAnswer(partnerClientId: string, sdp: RTCSessionDescription) {
//     console.log('Call recipient has accepted our call');

//     try {
//       const iceServers = this.getIceServers();
//       const connection = this.getConnection(partnerClientId, iceServers);
//       await connection.rtcConnection.setRemoteDescription(sdp);
//     } catch (error) {
//       console.error('Error in receivedVideoAnswer:', error);
//     }
//   }
//   // private async getIceServers(): Promise<RTCIceServer[]> {
//   private getIceServers(): RTCIceServer[] {
//     // if (this.currentIceServers) {
//     //   return this.currentIceServers;
//     // }

//     // try {
//     //   return this._hubConnection
//     //     .invoke('GetIceServers');
//     // } catch (error) {
//     //   console.error('GetIceServers error: ', error);
//     // }
//     return this.currentIceServers;
//   }
//   private async newSignal(user: IUser, data: string) {
//     const partnerClientId = user.connectionId;
//     const signal: ISignal = JSON.parse(data);

//     console.log('WebRTC: received signal');

//     if (signal.type === SignalType.newIceCandidate) {
//       await this.receivedNewIceCandidate(partnerClientId, signal.candidate);
//     } else if (signal.type === SignalType.videoOffer) {
//       await this.receivedVideoOffer(partnerClientId, signal.sdp);
//     } else if (signal.type === SignalType.videoAnswer) {
//       await this.receivedVideoAnswer(partnerClientId, signal.sdp);
//     }
//   }

//   private getConnection(partnerClientId: string, iceServers: RTCIceServer[]): UserConnection {
//     const connection = this._connections[partnerClientId] || this.createConnection(partnerClientId, iceServers);
//     return connection;
//   }
//   private createConnection(partnerClientId: string, iceServers: RTCIceServer[]): UserConnection {
//     console.log('WebRTC: creating connection...');

//     // if (this._connections[partnerClientId]) {
//     // this.closeVideoCall(partnerClientId);
//     // }

//     const connection = new RTCPeerConnection({ iceServers });
//     const userConnection = new UserConnection({ userName: '', connectionId: partnerClientId },
//       false, connection);

//     connection.onnegotiationneeded = async () => {
//       if (userConnection.creatingOffer) {
//         return;
//       }
//       userConnection.creatingOffer = true;

//       try {
//         const desc = await connection.createOffer();
//         await connection.setLocalDescription(desc);
//         await this.sendSignal({
//           type: SignalType.videoOffer,
//           sdp: connection.localDescription
//         }, partnerClientId);
//       } catch (error) {
//         console.error('Error in onnegotiationneeded:', error);
//       }

//       userConnection.creatingOffer = false;
//     };
//     connection.oniceconnectionstatechange = () => {
//       switch (connection.iceConnectionState) {
//         case 'closed':
//         case 'failed':
//         case 'disconnected':
//           // this.closeAllVideoCalls();
//           break;
//       }
//     };
//     connection.onicegatheringstatechange = () => {
//       console.log('*** ICE gathering state changed to: ' + connection.iceGatheringState);
//     };
//     connection.onsignalingstatechange = (event) => {
//       console.log('*** WebRTC signaling state changed to: ' + connection.signalingState);
//       switch (connection.signalingState) {
//         case 'closed':
//           // this.closeAllVideoCalls();
//           break;
//       }
//     };
//     connection.onicecandidate = async (event) => {
//       if (event.candidate) {
//         console.log('WebRTC: new ICE candidate');
//         await this.sendSignal({
//           type: SignalType.newIceCandidate,
//           candidate: event.candidate
//         }, partnerClientId);
//       } else {
//         console.log('WebRTC: ICE candidate gathering complete');
//       }
//     };
//     connection.onconnectionstatechange = (state) => {
//       const states = {
//         iceConnectionState: connection.iceConnectionState,
//         iceGatheringState: connection.iceGatheringState,
//         connectionState: connection.connectionState,
//         signalingState: connection.signalingState
//       };

//       console.log(JSON.stringify(states), state);
//     };

//     connection.ontrack = (event) => {
//       console.log('Track received from ' + partnerClientId);
//       userConnection.setStream(event.streams[0]);
//     };

//     this._connections[partnerClientId] = userConnection;

//     return userConnection;
//   }
//   private async sendSignal(message: ISignal, partnerClientId: string) {
//     await this._hubConnection.invoke('SendSignal', JSON.stringify(message), partnerClientId);
//   }

//   private async receivedNewIceCandidate(partnerClientId: string, candidate: RTCIceCandidate) {
//     console.log('Adding received ICE candidate: ' + JSON.stringify(candidate));

//     try {
//       const iceServers = await this.getIceServers();
//       const connection = this.getConnection(partnerClientId, iceServers);
//       await connection.rtcConnection.addIceCandidate(candidate);
//     } catch (error) {
//       console.error('Error adding ICE candidate:', error);
//     }
//   }

//   private async receivedVideoOffer(partnerClientId: string, sdp: RTCSessionDescription) {

//     console.log('Starting to accept invitation from ' + partnerClientId);

//     const desc = new RTCSessionDescription(sdp);
//     const iceServers = await this.getIceServers();
//     const connection = this.getConnection(partnerClientId, iceServers);

//     if (connection.creatingAnswer) {
//       console.warn('Second answer not created.');

//       return;
//     }
//     connection.creatingAnswer = true;

//     try {
//       console.log('setRemoteDescription');
//       await connection.rtcConnection.setRemoteDescription(desc);
//       console.log('createAnswer');
//       const senders = connection.rtcConnection.getSenders();
//       if (!senders || senders.length === 0) {
//         console.log('AddSenders needed');
//         const localStream = await this.getUserMediaInternal();
//         localStream.getTracks().forEach(track => connection.rtcConnection.addTrack(track, localStream));
//       }
//       const answer = await connection.rtcConnection.createAnswer();
//       console.log('setLocalDescription', answer);
//       await connection.rtcConnection.setLocalDescription(answer);
//       await this.sendSignal({
//         type: SignalType.videoAnswer,
//         sdp: connection.rtcConnection.localDescription
//       }, partnerClientId);
//     } catch (error) {
//       console.error('Error in receivedVideoOffer:', error);
//     }

//     connection.creatingAnswer = false;
//   }
//   private async getUserMediaInternal(): Promise<MediaStream> {
//     if (this.currentMediaStream) {
//       return this.currentMediaStream;
//     }

//     try {
//       return await navigator.mediaDevices.getUserMedia({
//         video: true,
//         audio: true
//       });
//     } catch (error) {
//       console.error('Failed to get hardware access', error);
//     }
//   }

// }
