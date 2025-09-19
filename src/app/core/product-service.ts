import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Product {
  //productId?: number;
  id: number;
  productName: string;
  code: string;
  categoryId?: number; // ✅ add this
  category?: { id?: number; name?: string } | null;
}

export interface ProductInput {
  productId: number; // manual input
  productName: string;
  code: string;
  categoryId: number;
}

export interface Category {
  id: number;
  name: string;
}

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private productApi = 'http://localhost:8090/products';
  private categoryApi = 'http://localhost:8090/categories';

  constructor(private http: HttpClient) {}

  getAllProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.productApi}/list`);
  }

  getProductById(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.productApi}/${id}`);
  }

  saveProduct(product: ProductInput): Observable<Product> {
    return this.http.post<Product>(`${this.productApi}/save`, product);
  }

  deleteProduct(id: number): Observable<boolean> {
    return this.http.delete<boolean>(`${this.productApi}/delete/${id}`);
  }

  // Get all categories for AutoComplete
  getCategories(): Observable<{ id: number; name: string }[]> {
    return this.http.get<{ id: number; name: string }[]>(`http://localhost:8090/categories/list`);
  }
}
