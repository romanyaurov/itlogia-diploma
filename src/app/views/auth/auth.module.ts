import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';
import { RouterModule } from '@angular/router';
import { StaticImagePathPipe } from 'src/app/shared/pipes/static-image-path.pipe';
import { ReactiveFormsModule } from '@angular/forms';
import { SvgIconComponent } from 'src/app/shared/components/common/svg-icon/svg-icon.component';
import { NameInputDirective } from 'src/app/shared/directives/name-input.directive';
import { ModalModule } from 'src/app/shared/features/modal/modal.module';


@NgModule({
  declarations: [
    SigninComponent,
    SignupComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    StaticImagePathPipe,
    ReactiveFormsModule,
    NameInputDirective,
    SvgIconComponent,
    AuthRoutingModule
  ],
  exports: [
    SigninComponent,
    SignupComponent
  ]
})
export class AuthModule { }
