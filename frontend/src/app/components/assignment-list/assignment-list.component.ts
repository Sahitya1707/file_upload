import { Component, OnInit } from '@angular/core';
import { AssignmentService } from '../../services/assignment/assignment.service';
import { NgFor, NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-assignment-list',
  imports: [NgFor, NgIf, RouterLink],
  templateUrl: './assignment-list.component.html',
  styleUrl: './assignment-list.component.css',
})
export class AssignmentListComponent {
  constructor(private assignmentService: AssignmentService) {}

  ASSIGNMENT: any;

  getAssignment(): void {
    this.assignmentService.getAllAssignment().subscribe((response) => {
      this.ASSIGNMENT = response;
    });
  }

  ngOnInit(): void {
    this.getAssignment();
  }
}
