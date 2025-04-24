import { ChangeDetectionStrategy, Component, computed, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormField } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatButton } from '@angular/material/button';
import { ContainerComponent } from '../../../ui/container/container.component';
import { ActivatedRoute, Router } from '@angular/router';
import { EmptyGiftsInfoComponent } from './empty-gifts-info/empty-gifts-info.component';
import { WishlistsDataService } from '../wishlists-data.service';

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
    ContainerComponent,
    EmptyGiftsInfoComponent,
  ],
  templateUrl: './editor.component.html',
  styleUrl: './editor.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditorComponent implements OnInit {
  public form!: TForm;
  public readonly isEditingExistingWishlist = signal(false);

  public readonly noGiftsText = computed(() => this.isEditingExistingWishlist() ?
    'Dodaj swoje pierwszy życzenie lub kategorię do listy.' :
    'Pozycje do swojej listy życzeń możesz zacząć dodawać po jej zapisaniu.'
  )

  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly dataService = inject(WishlistsDataService);

  public ngOnInit() {
    this.isEditingExistingWishlist.set(this.route.snapshot.paramMap.has('id'));

    this.form = this.createForm();
  }

  public async cancelEditing() {
    await this.router.navigate(['wishlists', 'overview']);
  }

  public saveWishlist() {
    this.dataService.createWishlist({
      name: this.form.controls.name.value,
    }).subscribe(async (resp) => {
      await this.router.navigate(['wishlists', 'editor', resp.id]);
    });
  }

  private createForm(): TForm {
    const fb = new FormBuilder();

    return fb.nonNullable.group({
      name: ['', Validators.required],
    });
  }
}
