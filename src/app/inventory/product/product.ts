import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { CardModule } from 'primeng/card';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { DialogModule } from 'primeng/dialog';
import { ProductService, Product, ProductInput, Category } from '../../core/product-service';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    TableModule,
    ButtonModule,
    InputTextModule,
    CardModule,
    AutoCompleteModule,
    DialogModule,
  ],
  templateUrl: './product.html',
  styleUrls: ['./product.scss'],
})
export class ProductComponent implements OnInit {
  products: Product[] = [];
  product: Product | null = null;

  newProduct: ProductInput = { productId: 0, productName: '', code: '', categoryId: 0 };

  categories: Category[] = [];
  filteredCategories: Category[] = [];
  selectedCategory: Category | null = null;

  displayAddProductDialog: boolean = false; // Add Product dialog
  displayProductDialog: boolean = false; // Product Details dialog

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.loadProducts();
    this.loadCategories();
  }

  getCategoryName(categoryId: number | undefined): string {
    if (!categoryId) return 'N/A';
    const cat = this.categories.find((c) => c.id === categoryId);
    return cat ? cat.name : 'N/A';
  }

  loadProducts(): void {
    this.productService.getAllProducts().subscribe({
      next: (res: Product[]) => (this.products = res),
      error: (err: any) => console.error(err),
    });
  }

  loadCategories(): void {
    this.productService.getCategories().subscribe({
      next: (res: Category[]) => (this.categories = res),
      error: (err: any) => console.error(err),
    });
  }

  searchCategory(event: any) {
    const query = event.query.toLowerCase();
    this.filteredCategories = this.categories.filter((cat) =>
      cat.name.toLowerCase().includes(query)
    );
  }

  showProductDetail(id: number): void {
    this.productService.getProductById(id).subscribe({
      next: (res: Product | null) => {
        this.product = res;
        this.displayProductDialog = true; // <-- open dialog
      },
      error: (err: any) => console.error(err),
    });
  }

  addProduct(): void {
    if (!this.selectedCategory) {
      alert('Please select a category');
      return;
    }

    this.newProduct.categoryId = this.selectedCategory.id;

    this.productService.saveProduct(this.newProduct).subscribe({
      next: (res: any) => {
        alert('Product added successfully!');
        this.newProduct = { productId: 0, productName: '', code: '', categoryId: 0 };
        this.selectedCategory = null;
        this.loadProducts();
        this.displayAddProductDialog = false; // hide Add Product dialog
      },
      error: (err: any) => console.error(err),
    });
  }

  deleteProduct(id: number): void {
    if (confirm('Are you sure you want to delete this product?')) {
      this.productService.deleteProduct(id).subscribe({
        next: (res: any) => {
          alert('Product deleted!');
          this.loadProducts();
        },
        error: (err: any) => console.error(err),
      });
    }
  }
}
