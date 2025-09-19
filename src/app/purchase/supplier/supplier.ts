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
  displaySupplierDialog: boolean = false;

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
    this.supplierService.saveSupplier(this.newSupplier).subscribe({
      next: (res) => {
        alert('Supplier added!');
        this.newSupplier = { name: '', contact: '', email: '', address: '' };
        this.displaySupplierDialog = false;
        this.loadSuppliers();
      },
      error: (err) => console.error(err),
    });
  }

  deleteSupplier(id: number): void {
    if (confirm('Are you sure to delete this supplier?')) {
      this.supplierService.deleteSupplier(id).subscribe({
        next: () => this.loadSuppliers(),
        error: (err) => console.error(err),
      });
    }
  }
}
