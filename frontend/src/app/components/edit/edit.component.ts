import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { NgIf } from '@angular/common';
import { AssignmentService } from '../../services/assignment/assignment.service';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-edit',
  imports: [FormsModule, NgIf],
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.css',
})
export class EditComponent implements OnInit {
  assignmentId: string | null = null;
  isLoaded: boolean = false;

  uploadData = {
    studentName: '',
    title: '',
    description: '',
  };

  selectedFile: File | null = null;
  currentFilename: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private assignmentService: AssignmentService
  ) {}

  ngOnInit(): void {
    this.assignmentId = this.route.snapshot.paramMap.get('id');
    if (this.assignmentId) {
      this.assignmentService
        .getAssignment(this.assignmentId)
        .subscribe((data: any) => {
          this.uploadData.studentName = data.studentName;
          this.uploadData.title = data.title;
          this.uploadData.description = data.description;
          this.currentFilename = data.filename;
          this.isLoaded = true;
        });
    }
  }

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    this.selectedFile = file ?? null;
  }

  updateAssignment(): void {
    if (!this.assignmentId) return;
    console.log(this.assignmentId);
    const formData = new FormData();
    formData.append('studentName', this.uploadData.studentName);
    formData.append('title', this.uploadData.title);
    formData.append('description', this.uploadData.description);
    if (this.selectedFile) {
      formData.append('file', this.selectedFile);
    }

    this.assignmentService
      .updateAssignment(this.assignmentId, formData)
      .subscribe({
        next: () => {
          alert('✅ Assignment updated successfully');
          this.router.navigate(['/assignments', this.assignmentId]);
        },
        error: (err) => {
          console.error('❌ Update failed:', err);
          alert('Something went wrong!');
        },
      });
  }
}
