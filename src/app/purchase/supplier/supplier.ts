import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { CardModule } from 'primeng/card';
import { DialogModule } from 'primeng/dialog';
import { SupplierService, Supplier } from '../../core/supplier-service';

@Component({
  selector: 'app-supplier',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    TableModule,
    ButtonModule,
    InputTextModule,
    CardModule,
    DialogModule,
  ],
  templateUrl: './supplier.html',
  styleUrls: ['./supplier.scss'],
})
export class SupplierComponent implements OnInit {
  suppliers: Supplier[] = [];
  selectedSupplier: Supplier | null = null;
  displayAddSupplierDialog: boolean = false;
  displaySupplierDialog: boolean = false; // for details

  newSupplier: Supplier = { name: '', contact: '', email: '', address: '' };

  constructor(private supplierService: SupplierService) {}

  ngOnInit(): void {
    this.loadSuppliers();
  }

  loadSuppliers(): void {
    this.supplierService.getAllSuppliers().subscribe({
      next: (res) => (this.suppliers = res),
      error: (err) => console.error(err),
    });
  }

  showSupplierDetail(supplier: Supplier): void {
    this.selectedSupplier = supplier;
  }

  addSupplier(): void {
    if (!this.newSupplier.name) return; // required name

    this.supplierService.saveSupplier(this.newSupplier).subscribe({
      next: (res) => {
        this.suppliers.push(res); // add to list
        this.newSupplier = { name: '', contact: '', email: '', address: '' };
        this.displaySupplierDialog = false; // close dialog
      },
      error: (err) => console.error(err),
    });
  }

  deleteSupplier(id: number): void {
    if (!confirm('Are you sure to delete this supplier?')) return;

    this.supplierService.deleteSupplier(id).subscribe({
      next: () => {
        this.suppliers = this.suppliers.filter((s) => s.id !== id);
        if (this.selectedSupplier?.id === id) this.selectedSupplier = null;
      },
      error: (err) => console.error(err),
    });
  }
}
