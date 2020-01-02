import { SzwagierType, SzwagierTypeLabel } from './SzwagierType';
export class SzwagierModel {
    name: string;
    szwagierType: SzwagierType;

    public get szwagierTypeLabel(): string {
        return SzwagierTypeLabel.get(this.szwagierType);
    }
    public set szwagierTypeLabel(val:string) {       
    }
    connectionId: string;
    location: string;
    userId: string;
}

