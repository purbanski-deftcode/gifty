import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatFormField } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatButton } from '@angular/material/button';
import { HttpClient } from '@angular/common/http';

type TForm =  FormGroup<{
  name: FormControl<string>;
}>

@Component({
  selector: 'app-editor',
  imports: [
    CommonModule,
    MatFormField,
    ReactiveFormsModule,
    MatInput,
    MatButton,
  ],
  templateUrl: './editor.component.html',
  styleUrl: './editor.component.scss',
})
export class EditorComponent implements OnInit {
  public form!: TForm;

  private readonly http = inject(HttpClient);

  public ngOnInit() {
    this.form = this.createForm();
  }

  private createForm(): TForm {
    const fb = new FormBuilder();

    return fb.nonNullable.group({
      name: '',
    });
  }

  public save(): void {
    this.http.post('/api/wishlists', { name: this.form.value.name }).subscribe();
  }
}
