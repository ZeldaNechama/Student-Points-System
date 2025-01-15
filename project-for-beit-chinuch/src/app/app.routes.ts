import { Routes } from '@angular/router';
import { MainComponent } from './components/main/main.component';
import { SearchComponent } from './components/search/search.component';
import { AddScoreComponent } from './components/add-score/add-score.component';
import { AddDataComponent } from './components/add-data/add-data.component';
import { AdminLoginComponent } from './components/admin-login/admin-login.component';
import { MinAdminComponent } from './components/min-admin/min-admin.component';
import { ChangeScoreComponent } from './components/change-score/change-score.component';
import { MessageComponent } from './components/message/message.component';
import { DownloadingFileComponent } from './components/downloading-file/downloading-file.component';

export const routes: Routes = [
    { path: '', component: MainComponent },
    { path: 'search', component: SearchComponent },
    { path: 'add-score', component: AddScoreComponent },
    { path: 'add-data', component: AddDataComponent },
    { path: 'admin-login', component: AdminLoginComponent },
    { path: 'main-admin', component: MinAdminComponent },
    { path: 'change-score', component: ChangeScoreComponent },
    { path: 'message', component: MessageComponent },
    { path: 'downloading-file', component: DownloadingFileComponent }
];
