import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DynamicFormComponent } from './dynamic-form/dynamic-form.component';
import { DynamicFormQuestionComponent } from './dynamic-form-question/dynamic-form-question.component';
import { DynamicFormSectionComponent } from './dynamic-form-section/dynamic-form-section.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    DynamicFormComponent,
    DynamicFormQuestionComponent,
    DynamicFormSectionComponent,
  ],
  imports: [CommonModule, ReactiveFormsModule],
  exports: [
    DynamicFormComponent,
    DynamicFormQuestionComponent,
    DynamicFormSectionComponent,
  ],
})
export class NgxDynamicFormsModule { }
