export class DashboardStatistics{
    totalViews: number;
    todayViews: number;
    uploadCount: number;
    passwordProtectedCount: number;

    constructor(){
        this.totalViews =0;
        this.todayViews =0;
        this.uploadCount =0;
        this.passwordProtectedCount =0;
    }
}