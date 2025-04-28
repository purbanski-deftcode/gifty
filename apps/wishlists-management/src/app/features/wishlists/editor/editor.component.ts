import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  OnInit, Signal,
  signal
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatFormField } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatButton } from '@angular/material/button';
import { ContainerComponent } from '../../../ui/container/container.component';
import { ActivatedRoute, Router } from '@angular/router';
import { EmptyGiftsInfoComponent } from './empty-gifts-info/empty-gifts-info.component';
import { WishlistsDataService } from '../wishlists-data.service';
import { assertNotNull } from '../../../common/types/utils/assert-not-null.helper';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { distinctUntilChanged, map } from 'rxjs';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';

type TForm = FormGroup<{
  name: FormControl<string>;
}>;

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
    MatProgressSpinner,
  ],
  templateUrl: './editor.component.html',
  styleUrl: './editor.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditorComponent implements OnInit {
  public form!: TForm;
  public readonly isEditingExistingWishlist = computed(() => this.wishListId() !== null);
  public readonly isLoading = signal(false);

  public readonly noGiftsText = computed(() =>
    this.isEditingExistingWishlist()
      ? 'Dodaj do listy swoje pierwsze życzenie lub kategorię.'
      : 'Pozycje do swojej listy życzeń możesz zacząć dodawać po jej zapisaniu.'
  );


  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly dataService = inject(WishlistsDataService);

  private readonly id$ = this.route.paramMap.pipe(
    distinctUntilChanged(),
    takeUntilDestroyed(),
    map(paramMap => paramMap.get('id')),
  );

  private readonly wishListId: Signal<string | null> = toSignal(this.id$, { initialValue: null });

  public ngOnInit() {
    this.form = this.createForm();

    this.id$.subscribe(id => {
      if (id) {
        this.getExistingWishlist();
      }
    })
  }

  public async cancelEditing() {
    await this.router.navigate(['wishlists', 'overview']);
  }

  public saveWishlist() {
    if (this.isEditingExistingWishlist()) {
      this.updateExistingWishlist();
    } else {
      this.createNewWishlist();
    }
  }

  private createNewWishlist(): void {
    this.dataService
      .createWishlist({
        name: this.form.controls.name.value,
      })
      .subscribe(async (resp) => {
        await this.router.navigate(['wishlists', 'editor', resp.id]);
      });
  }

  private createForm(): TForm {
    const fb = new FormBuilder();

    return fb.nonNullable.group({
      name: ['', Validators.required],
    });
  }

  private updateExistingWishlist(): void {
    const id = this.wishListId();

    assertNotNull(id, 'Cannot update wishlist for route without :id param.');

    this.dataService.updateWishlist(id, {
        name: this.form.controls.name.value,
    }).subscribe((resp) => {
      console.log(resp);
    })
  }

  private getExistingWishlist(): void {
    const id = this.wishListId();

    assertNotNull(id, 'Cannot update wishlist for route without :id param.');

    this.isLoading.set(true);

    this.dataService.getWishlistById(id).subscribe(wishlist => {
      this.form.patchValue({ name: wishlist.name });
      this.isLoading.set(false);
    })
  }
}
