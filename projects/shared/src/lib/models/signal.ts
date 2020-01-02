interface ISignal {
    type: SignalType;
    sdp?: RTCSessionDescription;
    candidate?: RTCIceCandidate;
}
enum SignalType {
    newIceCandidate,
    videoOffer,
    videoAnswer
}