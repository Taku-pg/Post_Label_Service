import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { type Item } from '../../models/item.model';
import { DeliveryService } from '../../services/delivery.service';

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

  addItemForm = this._fb.group({
    productName: ['',Validators.required],
    amount: [0, Validators.required],
    price: [0, Validators.required],
    weight: [0, Validators.required],
    type: ['', Validators.required],
    countryOfOrigin: ['']
  })


  onClickAdd(){
    if(this.addItemForm.invalid){
      this.addItemForm.markAllAsTouched();
      return;
    }

    const formValue = this.addItemForm.value;

    const newItem: Item = {
      productName:  formValue.productName!,
      amount: formValue.amount!,
      price: formValue.price!,
      weight: formValue.weight!,
      type: formValue.type!,
      countryOfOrigin: formValue.countryOfOrigin!
    }

    console.log(newItem);
    this.deliveryService.addItem(newItem);
    this.closeDialog();
  }
  
  onClickCancel(){
    //alert('The input information is discrded');
    this.closeDialog();
  }

  closeDialog(){
    this._dialog.close();
  }
}
