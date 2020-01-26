import { SeleniumCommand } from './seleniumCommand';

export interface ProjectTest {
    id: number;
    projectId: number;
    name: string;
    description: string;
    commands: Array<SeleniumCommand>;
}