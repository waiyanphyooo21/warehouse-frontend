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
  category: Category | null = null;

  newCategory: Partial<Category> = { name: '' };

  displayAddCategoryDialog: boolean = false;
  displayCategoryDialog: boolean = false;

  constructor(private categoryService: CategoryService) {}

  ngOnInit(): void {
    this.loadCategories();
  }

  loadCategories(): void {
    this.categoryService.getAllCategories().subscribe({
      next: (res) => (this.categories = res),
      error: (err) => console.error(err),
    });
  }

  showCategoryDetail(id: number): void {
    this.categoryService.getCategoryById(id).subscribe({
      next: (res) => {
        this.category = res;
        this.displayCategoryDialog = true;
      },
      error: (err) => console.error(err),
    });
  }

  addCategory(): void {
    if (!this.newCategory.name) return;

    this.categoryService.saveCategory(this.newCategory).subscribe({
      next: (res) => {
        this.categories.push(res);
        this.newCategory = { name: '' };
        this.displayAddCategoryDialog = false; // hide after add
      },
      error: (err) => console.error(err),
    });
  }

  deleteCategory(id: number): void {
    if (!confirm('Are you sure you want to delete this category?')) return;

    this.categoryService.deleteCategory(id).subscribe({
      next: () => {
        this.categories = this.categories.filter((c) => c.id !== id);
        if (this.category?.id === id) this.category = null;
      },
      error: (err) => console.error(err),
    });
  }
}
