import { bootstrapApplication } from '@angular/platform-browser';
// import { InjectionToken } from '@angular/core';

import { AppComponent } from './app/app.component';
// import { TasksService } from './app/tasks/tasks.service';
// import { TasksService } from './app/tasks/tasks.service';

// bootstrapApplication(AppComponent, {providers: [TasksService]}).catch((err) => console.error(err)); //shortcut

// export const TasksSErviceToken = new InjectionToken<TasksService>('tasks-service-token');
// bootstrapApplication(AppComponent, { 
//     providers: [{ provide: TasksSErviceToken, useClass: TasksService }] 
// }).catch((err) => console.error(err)); //shortcut

bootstrapApplication(AppComponent).catch((err) => console.error(err));
