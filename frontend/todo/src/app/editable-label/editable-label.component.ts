import { Component, ElementRef, EventEmitter, Input, Output, ViewChild, ChangeDetectorRef } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-editable-label',
  standalone: true,
  imports: [],
  templateUrl: './editable-label.component.html',
  styleUrl: './editable-label.component.css'
})
export class EditableLabelComponent {
  public isEditing: boolean = false;

  @Input() value: string | undefined = '';
  @Output() valueChange = new EventEmitter<string>();
  @ViewChild('inputElement') inputElement!: ElementRef;

  constructor(private cdr: ChangeDetectorRef) {}

  updateValue(target: any): void {
    let element = target as HTMLInputElement;
    if (element !== null) {
      this.value = element.value;
      this.valueChange.emit(element.value);
      this.isEditing = false;
    }
  }

  startEditing(): void {
    this.isEditing = true;
    this.cdr.detectChanges();
    setTimeout(() => {
      const nativeElement = this.inputElement.nativeElement;
      nativeElement.focus();
      nativeElement.select();
    });
  }
}
