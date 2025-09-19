import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { CardModule } from 'primeng/card';
import { DialogModule } from 'primeng/dialog';
import { CategoryService, Category } from '../../core/category-service';

@Component({
  selector: 'app-category',
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
  templateUrl: './category.html',
  styleUrls: ['./category.scss'],
})
export class CategoryComponent implements OnInit {
  categories: Category[] = [];
  newCategory: Category = { name: '' };
  displayAddCategoryDialog: boolean = false;

  constructor(private categoryService: CategoryService) {}

  ngOnInit(): void {
    this.loadCategories();
  }

  loadCategories(): void {
    this.categoryService.getAllCategories().subscribe({
      next: (res: Category[]) => (this.categories = res),
      error: (err) => console.error(err),
    });
  }

  addCategory(): void {
    if (!this.newCategory.name.trim()) return;

    this.categoryService.saveCategory(this.newCategory).subscribe({
      next: () => {
        this.loadCategories();
        this.displayAddCategoryDialog = false;
        this.newCategory = { name: '' };
      },
      error: (err) => console.error(err),
    });
  }

  deleteCategory(id?: number): void {
    if (!id) return;
    if (confirm('Are you sure you want to delete this category?')) {
      this.categoryService.deleteCategory(id).subscribe({
        next: () => this.loadCategories(),
        error: (err) => console.error(err),
      });
    }
  }
}
