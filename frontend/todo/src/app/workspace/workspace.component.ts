import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import interact from 'interactjs';

interface Box {
  id: string;
  title: string;
  content: string;
  x: number;
  y: number;
}

@Component({
  selector: 'app-workspace',
  standalone: true,
  templateUrl: './workspace.component.html',
  styleUrls: ['./workspace.component.css'],
  imports: [ CommonModule ]
})
export class WorkspaceComponent implements OnInit {
  boxes: Box[] = [];
  nextId: number = 1;

  ngOnInit(): void {
    interact('.draggable')
      .draggable({
        listeners: {
          start(event) {
            event.target.classList.add('no-select');
          },
          move(event) {
            const target = event.target;
            const x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx;
            const y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;

            target.style.transform = `translate(${x}px, ${y}px)`;
            target.setAttribute('data-x', x);
            target.setAttribute('data-y', y);
          },
          end(event) {
            event.target.classList.remove('no-select');
          }
        }
      });
  }

  addBox(): void {
    let newId = 'box' + this.nextId++;
    this.boxes.push({
      id: newId,
      title: 'New Box',
      content: 'Content here...',
      x: 300,
      y: 100
    });
  }
}
