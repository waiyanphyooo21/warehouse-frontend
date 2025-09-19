import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { CardModule } from 'primeng/card';
import { DialogModule } from 'primeng/dialog';
import { PurchaseOrderService, PurchaseOrder } from '../../core/purchase-order-service';
import { SupplierService, Supplier } from '../../core/supplier-service';

@Component({
  selector: 'app-purchase-order',
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
  templateUrl: './purchase-order.html',
  styleUrls: ['./purchase-order.scss'],
})
export class PurchaseOrderComponent implements OnInit {
  purchaseOrders: PurchaseOrder[] = [];
  selectedOrder: PurchaseOrder | null = null;

  displayAddOrderDialog: boolean = false;
  displayOrderDialog: boolean = false;

  newOrder: Partial<PurchaseOrder> = { orderCode: '', supplierId: undefined };

  suppliers: Supplier[] = [];

  constructor(
    private purchaseOrderService: PurchaseOrderService,
    private supplierService: SupplierService
  ) {}

  ngOnInit(): void {
    this.loadOrders();
    this.loadSuppliers();
  }

  loadOrders(): void {
    this.purchaseOrderService.getAllOrders().subscribe({
      next: (res: PurchaseOrder[]) => (this.purchaseOrders = res),
      error: (err) => console.error(err),
    });
  }

  loadSuppliers(): void {
    this.supplierService.getAllSuppliers().subscribe({
      next: (res: Supplier[]) => (this.suppliers = res),
      error: (err) => console.error(err),
    });
  }

  showOrderDetail(order: PurchaseOrder): void {
    this.selectedOrder = order;
    this.displayOrderDialog = true;
  }

  addOrder(): void {
    if (!this.newOrder.orderCode || !this.newOrder.supplierId) return;

    this.purchaseOrderService.saveOrder(this.newOrder).subscribe({
      next: (res) => {
        this.purchaseOrders.push(res);
        this.newOrder = { orderCode: '', supplierId: undefined };
        this.displayAddOrderDialog = false;
      },
      error: (err) => console.error(err),
    });
  }

  deleteOrder(id: number): void {
    if (!confirm('Are you sure to delete this purchase order?')) return;

    this.purchaseOrderService.deleteOrder(id).subscribe({
      next: () => {
        this.purchaseOrders = this.purchaseOrders.filter((o) => o.id !== id);
        if (this.selectedOrder?.id === id) this.selectedOrder = null;
      },
      error: (err) => console.error(err),
    });
  }

  getSupplierName(id?: number): string {
    return this.suppliers.find((s) => s.id === id)?.name || '';
  }
}
