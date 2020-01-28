import { SeleniumCommand } from '../models/selenium/SeleniumCommand';

export interface ProjectTestViewModel {
    seleniumCommands: SeleniumCommand[];
    projectId: number;
    name: string;
    description: string;
}
