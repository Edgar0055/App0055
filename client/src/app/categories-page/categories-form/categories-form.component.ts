import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CategoriesService } from 'src/app/shared/services/categories.service';
import { switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { MaterialService } from 'src/app/shared/classes/material.service';

@Component({
  selector: 'app-categories-form',
  templateUrl: './categories-form.component.html',
  styleUrls: ['./categories-form.component.scss']
})
export class CategoriesFormComponent implements OnInit {

  @ViewChild('input', null) inputRef: ElementRef;

  form: FormGroup;

  isNew = true;

  constructor(private route: ActivatedRoute, private categoriesService: CategoriesService) { }

  ngOnInit() {
    this.form = new FormGroup({
      name: new FormControl(null, Validators.required)
    })

    this.form.disable();

    this.route.params.pipe(switchMap(
      (params: Params) => {
        if (params['id']) {
          this.isNew = false;
          return this.categoriesService.getById(params['id']);
        }

        return of(null);
      }
    ))
    .subscribe(
      category => {
        if (category) {
          this.form.patchValue({
            name: category.name
          })
          MaterialService.updateTextInputs();
        }
        this.form.enable();
      },
      error => MaterialService.toast(error.error.message)
    )
  }

  triggerClick() {
    this.inputRef.nativeElement.click();
  }

  onFileUpload(event: Event) {
    
  }

  onSubmit() {

  }

}
