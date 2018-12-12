import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '../../../node_modules/@angular/forms';
import { User } from '../_service/chat.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  @Input() userData: User;

  form: FormGroup;
  constructor(
    private _fb: FormBuilder) {

    this.form = this._fb.group({
        email: ['', Validators.compose([Validators.required, Validators.maxLength(50)])],
        name: ['', Validators.compose([Validators.required, Validators.maxLength(100)])]
    });

}
prefillUserData() {

  this.userData.Email = this.form.get('email').value;
  this.userData.Name = this.form.get('name').value;
  localStorage.setItem('userData', JSON.stringify(this.userData));
}
  ngOnInit() {
  }

}
