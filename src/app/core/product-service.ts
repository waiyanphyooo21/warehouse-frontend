import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Product {
  productId: number; // backend-generated
  productName: string;
  code: string;
  categoryId?: number;
  category?: Category | null;
}

export interface ProductInput {
  productId?: number; // optional form input
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

  getProductById(productId: number): Observable<Product> {
    return this.http.get<Product>(`${this.productApi}/${productId}`);
  }

  saveProduct(product: ProductInput): Observable<Product> {
    return this.http.post<Product>(`${this.productApi}/save`, product);
  }

  deleteProduct(productId: number): Observable<boolean> {
    return this.http.delete<boolean>(`${this.productApi}/delete/${productId}`);
  }

  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(`${this.categoryApi}/list`);
  }
}
