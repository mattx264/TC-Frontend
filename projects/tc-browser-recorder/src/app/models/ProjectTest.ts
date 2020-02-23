import { ProjectViewModel } from 'projects/shared/src/lib/viewModels/ProjectViewModel';
import { TestInfoViewModel } from 'projects/shared/src/lib/viewModels/TestInfoViewModel';

export interface ProjectTest extends ProjectViewModel {
    tests:TestInfoViewModel[];
}
