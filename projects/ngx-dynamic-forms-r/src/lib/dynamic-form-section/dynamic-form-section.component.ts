import { Component, Inject, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Action } from 'form-extensibility-model-ts';
import { SectionElement } from 'form-extensibility-model-ts';
import { QuestionBase } from 'form-extensibility-model-ts';
import { Section } from 'form-extensibility-model-ts';
import { DialogueState } from 'form-extensibility-model-ts';

@Component({
  selector: 'app-dynamic-form-section',
  templateUrl: './dynamic-form-section.component.html',
  styleUrls: ['./dynamic-form-section.component.css'],
})
export class DynamicFormSectionComponent implements OnInit {
  @Input() section!: Section;
  @Input() form!: FormGroup;

  constructor(public stateService: DialogueState) { }

  elements!: SectionElement[];

  ngOnInit(): void {
    this.elements = this.section.getElementsOrdered();
  }

  asQuestion(element: SectionElement) {
    return element as QuestionBase<any>;
  }
  asAction(element: SectionElement) {
    return element as Action;
  }
}
