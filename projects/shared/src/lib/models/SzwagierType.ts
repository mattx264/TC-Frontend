export enum SzwagierType {
  SzwagierConsole = 1,
  SzwagierDashboard,
  SzwagierBrowserExtension

}
export const SzwagierTypeLabel = new Map<number, string>([
  [SzwagierType.SzwagierConsole, 'Szwagier Console'],
  [SzwagierType.SzwagierDashboard, 'Szwagier Dashboard'],
  [SzwagierType.SzwagierBrowserExtension, 'Szwagier Browser Extension']
]);