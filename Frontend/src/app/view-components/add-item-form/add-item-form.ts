import { Component, computed, inject, input} from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { type Item } from '../../models/item.model';
import { type Type } from '../../models/type.model';
import { DeliveryService } from '../../services/delivery.service';
import { UpperCasePipe } from '@angular/common';

@Component({
  selector: 'app-add-item-form',
  imports: [ReactiveFormsModule],
  templateUrl: './add-item-form.html',
  styleUrl: './add-item-form.css',
})
export class AddItemForm {
  private _dialog = inject(MatDialogRef);
  private _fb = inject(FormBuilder);
  private deliveryService = inject(DeliveryService);

  types = computed(()=>{
    return this.deliveryService.types;
  })

  addItemForm = this._fb.group({
    productName: ['', Validators.required],
    amount: [0, [Validators.required,Validators.min(1)]],
    price: [0, [Validators.required,Validators.min(1)]],
    weight: [0, [Validators.required,Validators.min(0.001)]],
    type: ['', Validators.required],
    countryOfOrigin: ['']
  })


  onClickAdd() {
    if (this.addItemForm.invalid) {
      this.addItemForm.markAllAsTouched();
      return;
    }

    const formValue = this.addItemForm.value;
    const selectedType: Type = this.types()!.find(t=>t.type === formValue.type!)!;
    console.log(formValue.type);
    console.log(selectedType);

    const newItem: Item = {
      productName: formValue.productName!,
      amount: formValue.amount!,
      price: formValue.price!,
      weight: formValue.weight!,
      type: selectedType,
      countryOfOrigin: formValue.countryOfOrigin!
    }

    this.deliveryService.addItem(newItem);
    this.closeDialog();
  }

  onClickCancel() {
    this.closeDialog();
  }

  closeDialog() {
    this._dialog.close();
  }
}
