import { SeleniumCommand } from '../models/selenium/SeleniumCommand';

export interface TestInfoViewModel {
    id: number;
    projectId: number;
    name: string;
    description: string;
    commands: SeleniumCommand[]
}