// Create a data model for message
export interface Message {
    mid: string;
    cid: string;
    uid: string;
    messageContent: string;
    messageTimestamp: string;
    userDisplayName?: string;
    userDisplayPicture?: string;
}