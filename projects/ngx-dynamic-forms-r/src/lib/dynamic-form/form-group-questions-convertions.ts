import { FormControl, FormGroup, Validators } from '@angular/forms';

import { DynamicFormLayout } from 'form-extensibility-model-ts';

export function toFormGroup(formLayout: DynamicFormLayout) {
  const group: any = {};

  const questions = formLayout.getAllQuestions();
  questions.forEach((question) => {
    let val = question.value;
    if (val === undefined || val === null) {
      val = '';
    }

    const fc = question.required
      ? new FormControl(val, Validators.required)
      : new FormControl(val);

    // the value of enabled must be explicitly set to false if we want to disable the control
    question.enabled === false ? fc.disable() : fc.enable();
    fc.setValue(question.value);

    group[question.key] = fc;
  });
  return new FormGroup(group);
}
