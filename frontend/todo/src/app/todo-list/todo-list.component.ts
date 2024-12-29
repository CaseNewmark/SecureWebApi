import { Component, OnInit } from '@angular/core';
import { ApiClientService, TodoItem } from '../services/api-client-service';
import { FormsModule } from '@angular/forms';
import { EditableLabelComponent } from '../editable-label/editable-label.component';

interface EditableTodoItem extends TodoItem {
  isEditing: boolean;
}

@Component({
  selector: 'app-todo-list',
  standalone: true,
  imports: [FormsModule, EditableLabelComponent],
  templateUrl: './todo-list.component.html',
  styleUrl: './todo-list.component.css'
})
export class TodoListComponent implements OnInit {
  items: EditableTodoItem[] = [];
  newItem: TodoItem = { id: 0, name: '', isComplete: false, userId: '' };

  constructor(private apiClientService: ApiClientService) {}

  ngOnInit(): void {
    this.loadItems();
  }

  loadItems(): void {
    this.apiClientService.todoAll().subscribe(items => {
      this.items = items.map(item => ({ ...item, isEditing: false }));
    });
  }

  addItem(): void {
    this.apiClientService.todoPOST(this.newItem).subscribe(item => {
      this.items.push({ ...item, isEditing: false });
      this.newItem = { id: 0, name: '', isComplete: false, userId: '' };
    });
  }

  updateItem(item: TodoItem): void {
    if (item.id !== undefined) {
      this.apiClientService.todoPUT(item.id, item).subscribe();
    }
  }

  deleteItem(id: number): void {
    this.apiClientService.todoDELETE(id).subscribe(() => {
      this.items = this.items.filter(item => item.id !== id);
    });
  }
}
