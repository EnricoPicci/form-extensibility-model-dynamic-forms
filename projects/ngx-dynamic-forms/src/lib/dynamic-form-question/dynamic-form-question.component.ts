import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { Subscription, tap } from 'rxjs';

import { DialogueState } from 'form-extensibility-model-ts';
import { QuestionBase } from '../../ts-dynamic-form/questions/question-base';
import { DropdownQuestion } from 'src/app/ts-dynamic-form/questions/question-dropdown';
import { TextboxQuestion } from 'src/app/ts-dynamic-form/questions/question-textbox';

@Component({
  selector: 'app-question',
  templateUrl: './dynamic-form-question.component.html',
  styleUrls: ['./dynamic-form-question.component.css'],
})
export class DynamicFormQuestionComponent implements OnInit, OnDestroy {
  @Input() question!: QuestionBase<any>;
  @Input() form!: FormGroup;

  subscriptions: Subscription[] = [];

  constructor(private stateService: DialogueState) { }

  ngOnInit(): void {
    let sub: Subscription;
    sub = this.stateService.formLayout$
      .pipe(
        tap((formLayout) => {
          const control = this.form.controls[this.question.key];
          if (!control) {
            return;
          }
          const question = formLayout.getUniqueQuestion(this.question.key);
          // the value of enabled must be explicitly set to false if we want to disable the control
          question.enabled !== false ? control.enable() : control.disable();
        })
      )
      .subscribe();
    this.subscriptions.push(sub);

    sub = this.stateService.formValue$
      .pipe(
        tap((formValue) => {
          const val = formValue[this.question.key];
          if (val === undefined || val === null) {
            return;
          }
          const v = val ?? '';
          const control = this.form.controls[this.question.key];
          control.setValue(v);
        })
      )
      .subscribe();
    this.subscriptions.push(sub);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }

  get isValid() {
    // it looks like a control which is disabled has the valid getter responding false
    // and the invalid getter responds false
    // since a disabled control is not INVALID by definition, then I am using the invalid getter
    return !this.form.controls[this.question.key].invalid;
  }

  asTextbox(element: QuestionBase<any>) {
    return element as TextboxQuestion;
  }

  asDropDown(element: QuestionBase<any>) {
    return element as DropdownQuestion<any>;
  }

  onChange(event: any) {
    const question = this.question;
    if (question.onChangeHandler) {
      question.onChangeHandler(this.form.value, this.stateService, event);
    }
  }

  onBlur(event: any) {
    const textQuestion = this.question as TextboxQuestion;

    if (textQuestion.onBlurHandler) {
      textQuestion.onBlurHandler(this.form.value, this.stateService, event);
    }
  }

  onDropDownChange<T>(event: any) {
    const dropDownQuestion = this.question;
    if (dropDownQuestion.onChangeHandler) {
      dropDownQuestion.onChangeHandler(
        this.form.value,
        this.stateService,
        event
      );
    }
  }
}
