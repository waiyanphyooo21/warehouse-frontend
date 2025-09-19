import { Component, signal } from '@angular/core';
import { Router, NavigationEnd, RouterModule } from '@angular/router';
import { filter } from 'rxjs';
import { MenuItem } from 'primeng/api';
import { MenubarModule } from 'primeng/menubar';
import { PanelMenuModule } from 'primeng/panelmenu';
import { DrawerModule } from 'primeng/drawer';
import { ButtonModule } from 'primeng/button';
import { MenuModule } from 'primeng/menu'; // <-- for user menu

@Component({
  selector: 'app-layout',
  templateUrl: './layout.html',
  styleUrls: ['./layout.scss'],
  imports: [MenubarModule, PanelMenuModule, DrawerModule, ButtonModule, RouterModule, MenuModule],
})
export class Layout {
  darkMode = false; // dark mode state
  username = 'Admin'; // dynamically replace with logged-in user if available

  drawerVisible = false;
  leftMenuItems: MenuItem[] = [];

  topMenuItems: MenuItem[] = [
    { label: 'Sales', icon: 'pi pi-shopping-cart', command: () => this.loadModule('sales') },
    { label: 'Inventory', icon: 'pi pi-box', command: () => this.loadModule('inventory') },
    { label: 'Purchase', icon: 'pi pi-cart-plus', command: () => this.loadModule('purchase') },
    { label: 'HR', icon: 'pi pi-users', command: () => this.loadModule('hr') },
    { label: 'Reports', icon: 'pi pi-chart-line', command: () => this.loadModule('reports') },
  ];

  userMenuItems: MenuItem[] = [
    { label: 'Logout', icon: 'pi pi-sign-out', command: () => this.logout() },
  ];

  moduleMenus: Record<string, MenuItem[]> = {
    sales: [
      { label: 'Orders', icon: 'pi pi-list', routerLink: '/sales/orders' },
      { label: 'Customers', icon: 'pi pi-user', routerLink: '/sales/customers' },
      { label: 'Invoices', icon: 'pi pi-file', routerLink: '/sales/invoices' },
    ],
    inventory: [
      {
        label: 'Products',
        icon: 'pi pi-box',
        routerLink: '/inventory/product',
        routerLinkActiveOptions: { exact: true },
      },
      {
        label: 'Categories',
        icon: 'pi pi-folder',
        routerLink: '/inventory/category',
        routerLinkActiveOptions: { exact: true },
      },
      {
        label: 'Stock Levels',
        icon: 'pi pi-database',
        routerLink: '/inventory/stock',
        routerLinkActiveOptions: { exact: true },
      },
      {
        label: 'Suppliers',
        icon: 'pi pi-truck',
        routerLink: '/inventory/suppliers',
        routerLinkActiveOptions: { exact: true },
      },
    ],
    purchase: [
      { label: 'Purchase Orders', icon: 'pi pi-shopping-cart', routerLink: '/purchase/orders' },
      { label: 'Suppliers', icon: 'pi pi-users', routerLink: '/purchase/supplier' },
      { label: 'Invoice', icon: 'pi pi-file-excel', routerLink: '/purchase/bills' },
    ],
    hr: [
      { label: 'Employees', icon: 'pi pi-users', routerLink: '/hr/employees' },
      { label: 'Payroll', icon: 'pi pi-wallet', routerLink: '/hr/payroll' },
      { label: 'Leave Requests', icon: 'pi pi-calendar', routerLink: '/hr/leave' },
    ],
    reports: [
      { label: 'Sales Report', icon: 'pi pi-chart-bar', routerLink: '/reports/sales' },
      { label: 'Inventory Report', icon: 'pi pi-chart-pie', routerLink: '/reports/inventory' },
      { label: 'HR Report', icon: 'pi pi-chart-line', routerLink: '/reports/hr' },
    ],
  };

  constructor(private router: Router) {
    this.router.events
      .pipe(filter((event: any) => event instanceof NavigationEnd))
      .subscribe((event: any) => this.updateLeftMenu(event.urlAfterRedirects));
  }

  toggleDarkMode() {
    this.darkMode = !this.darkMode;
    if (this.darkMode) document.body.classList.add('dark');
    else document.body.classList.remove('dark');
  }

  logout() {
    localStorage.clear(); // frontend logout
    this.router.navigate(['/login']);
  }

  loadModule(module: string) {
    this.leftMenuItems = this.moduleMenus[module] || [];
    this.drawerVisible = true;
    if (module === 'inventory') this.router.navigate(['/inventory/product']);
  }

  updateLeftMenu(url: string) {
    if (url.startsWith('/sales')) this.leftMenuItems = this.moduleMenus['sales'];
    else if (url.startsWith('/inventory')) this.leftMenuItems = this.moduleMenus['inventory'];
    else if (url.startsWith('/purchase')) this.leftMenuItems = this.moduleMenus['purchase'];
    else if (url.startsWith('/hr')) this.leftMenuItems = this.moduleMenus['hr'];
    else if (url.startsWith('/reports')) this.leftMenuItems = this.moduleMenus['reports'];
    else this.leftMenuItems = [];
  }
}
