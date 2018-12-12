import { ChatService } from './_service/chat.service';
import { EmployService } from './_service/employ.service';
import { SignalrService } from './_service/signalr.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
import { ChatComponent } from './Chat/Chat.component';
import { EmployeeComponent } from './employees/employee/employee.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {
     MatToolbarModule,
     MatIconModule,
     MatCardModule,
     MatButtonModule,
      MatFormFieldModule,
       MatMenuModule,
        MatInputModule,
        MatRadioModule,
        MatSelectModule,
        MatCheckboxModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatOptionModule,
        MatSlideToggleModule
    } from '../../node_modules/@angular/material';
import { EmployeesComponent } from './employees/employees.component';
import { HttpClientModule } from '../../node_modules/@angular/common/http';
import { ToastrModule } from '../../node_modules/ngx-toastr';
import { EmployeeSignalrService } from './_service/employeeSignalr.service';
import { GroupMessageComponent } from './group-message/group-message.component';
import { RegistrationComponent } from './registration/registration.component';



@NgModule({
   declarations: [
      AppComponent,
      ChatComponent,
      EmployeeComponent,
      EmployeesComponent,
      GroupMessageComponent,
      RegistrationComponent
   ],
   imports: [
      BrowserModule,
      BrowserAnimationsModule,
      FormsModule,
      ReactiveFormsModule,
      MatButtonModule,
      MatInputModule,
      HttpClientModule,
      MatFormFieldModule,
      MatMenuModule,
      MatToolbarModule,
      MatCardModule,
      MatIconModule,
      MatDatepickerModule,
      MatRadioModule,
      MatCheckboxModule,
      MatSelectModule,
      MatNativeDateModule,
      MatOptionModule,
      MatSlideToggleModule,
      ToastrModule.forRoot()
   ],
   providers: [
      SignalrService,
      EmployService,
      EmployeeSignalrService,
      ChatService
   ],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
