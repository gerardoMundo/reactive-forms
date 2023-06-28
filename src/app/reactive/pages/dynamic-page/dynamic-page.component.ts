import { Component } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

@Component({
  templateUrl: './dynamic-page.component.html',
  styles: [],
})
export class DynamicPageComponent {
  constructor(private fb: FormBuilder) {}

  //** Properties **
  get favoritGames() {
    return this.myForm.get('favoritGames') as FormArray;
  }

  public myForm: FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    favoritGames: this.fb.array([
      ['Metal gear', Validators.required],
      ['Gears of war', Validators.required],
      ['Halo 3', Validators.required],
    ]),
  });

  public newFavorite: FormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(3),
  ]);

  //** Methods **
  onSubmit(): void {
    if (this.myForm.invalid) {
      this.myForm.markAllAsTouched();
      return;
    }
    this.myForm.reset();
    (this.myForm.controls['favoritGames'] as FormArray) = this.fb.array([]);
  }

  onAddToFavorites(): void {
    if (this.newFavorite.invalid) return;

    const newGame = this.newFavorite.value;

    this.favoritGames.push(
      new FormControl(newGame, [Validators.required, Validators.minLength(3)])
    );
    this.newFavorite.reset();
  }

  onDelete(index: number): void {
    this.favoritGames.removeAt(index);
  }

  //** Validators **
  isValidField(field: string): boolean | null {
    return (
      this.myForm.controls[field].errors && this.myForm.controls[field].touched
    );
  }

  isValidFieldInArray(formArray: FormArray, index: number): boolean | null {
    return (
      formArray.controls[index].errors && formArray.controls[index].touched
    );
  }

  getFieldError(field: string): string | null {
    if (!this.myForm.controls[field]) return null;

    const errors = this.myForm.controls[field].errors || {};

    for (const key of Object.keys(errors)) {
      switch (key) {
        case 'required':
          return 'Este campo es requerido';
        case 'minlength':
          return `Se necesitan mínimo ${errors['minlength'].requiredLength} caracteres`;
      }
    }
    return null;
  }
}
