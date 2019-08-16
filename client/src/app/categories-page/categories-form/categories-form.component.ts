import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CategoriesService } from 'src/app/shared/services/categories.service';

@Component({
  selector: 'app-categories-form',
  templateUrl: './categories-form.component.html',
  styleUrls: ['./categories-form.component.scss']
})
export class CategoriesFormComponent implements OnInit {

  form: FormGroup;

  isNew = true;

  constructor(private route: ActivatedRoute, private categoriesService: CategoriesService) { }

  ngOnInit() {
    this.form = new FormGroup({
      name: new FormControl(null, Validators.required)
    })


    // this.route.params.subscribe((params: Params) => {
    //   if (params['id']) {
    //     this.isNew = false;
    //   }
    // })

    
  }

  onSubmit() {

  }

}
