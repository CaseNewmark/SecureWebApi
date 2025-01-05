import { Component, OnInit } from '@angular/core';
import interact from 'interactjs';

interface Box {
  id: number;
  title: string;
  content: string;
  x: number;
  y: number;
}

@Component({
  selector: 'app-workspace',
  templateUrl: './workspace.component.html',
  styleUrls: ['./workspace.component.css']
})
export class WorkspaceComponent implements OnInit {
  boxes: Box[] = [];
  nextId: number = 1;

  ngOnInit(): void {
    interact('.draggable')
      .draggable({
        listeners: {
          move(event) {
            const target = event.target;
            const x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx;
            const y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;

            target.style.transform = `translate(${x}px, ${y}px)`;
            target.setAttribute('data-x', x);
            target.setAttribute('data-y', y);
          }
        }
      });
  }

  addBox(): void {
    this.boxes.push({
      id: this.nextId++,
      title: 'New Box',
      content: 'Content here...',
      x: 0,
      y: 0
    });
  }
}
