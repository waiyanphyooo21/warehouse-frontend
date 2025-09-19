import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface PurchaseOrder {
  id?: number;
  orderCode: string;
  supplierId?: number;
}

@Injectable({
  providedIn: 'root',
})
export class PurchaseOrderService {
  private apiUrl = 'http://localhost:8090/purchase-orders';

  constructor(private http: HttpClient) {}

  // Create a new purchase order
  saveOrder(order: Partial<PurchaseOrder>): Observable<PurchaseOrder> {
    return this.http.post<PurchaseOrder>(`${this.apiUrl}/save`, order);
  }

  // Get all purchase orders
  getAllOrders(): Observable<PurchaseOrder[]> {
    return this.http.get<PurchaseOrder[]>(`${this.apiUrl}/list`);
  }

  // Get a purchase order by id
  getOrderById(id: number): Observable<PurchaseOrder> {
    return this.http.get<PurchaseOrder>(`${this.apiUrl}/${id}`);
  }

  // Update a purchase order
  updateOrder(id: number, order: Partial<PurchaseOrder>): Observable<PurchaseOrder> {
    return this.http.put<PurchaseOrder>(`${this.apiUrl}/update/${id}`, order);
  }

  // Delete a purchase order
  deleteOrder(id: number): Observable<boolean> {
    return this.http.delete<boolean>(`${this.apiUrl}/delete/${id}`);
  }
}
