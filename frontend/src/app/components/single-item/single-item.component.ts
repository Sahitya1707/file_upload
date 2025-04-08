import { Component, OnInit } from '@angular/core';
import { NgIf } from '@angular/common';
import { RouterLink, ActivatedRoute, Router } from '@angular/router';
import { AssignmentService } from '../../services/assignment/assignment.service';

@Component({
  selector: 'app-single-item',
  imports: [NgIf, RouterLink],
  templateUrl: './single-item.component.html',
  styleUrl: './single-item.component.css',
})
export class SingleItemComponent implements OnInit {
  ASSIGNMENT: any;
  assignmentId: string | null = null;
  isLoaded: boolean = false;

  constructor(
    private assignmentService: AssignmentService,

    //read data from the current route (URL
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.assignmentId = params.get('id');
      if (this.assignmentId) {
        this.getAssignmentData(this.assignmentId);
      }
    });
  }

  getAssignmentData(id: string): void {
    this.assignmentService.getAssignment(id).subscribe((data) => {
      console.log(data);
      this.ASSIGNMENT = data;
      this.isLoaded = true;
    });
  }
  // let's delete
  deleteAssignment() {
    if (
      confirm('Are you sure you want to delete this assignment?') &&
      this.assignmentId
    ) {
      this.assignmentService.deleteAssignment(this.assignmentId).subscribe({
        next: () => {
          alert('Assignment deleted successfully');
          this.router.navigate(['/list']);
        },
        error: (err) => {
          console.error('❌ Delete failed:', err);
          alert('Something went wrong. Try again.');
        },
      });
    }
  }
}
