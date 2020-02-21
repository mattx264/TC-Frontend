import { SeleniumCommand } from '../models/selenium/SeleniumCommand';
import { ConfigurationModel } from './ConfigurationModel';

export interface CommandMessage {
    receiverConnectionId: string
    senderConnectionId?: string
    commands: SeleniumCommand[]
    configurations: ConfigurationModel[];
    testInfoId?: number;
    testRunHistoryId?: number;
}