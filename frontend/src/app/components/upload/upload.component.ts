import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AssignmentService } from '../../services/assignment/assignment.service';

@Component({
  selector: 'app-upload',
  imports: [FormsModule],
  templateUrl: './upload.component.html',
  styleUrl: './upload.component.css',
})
export class UploadComponent {
  constructor(private assignmentServie: AssignmentService) {}
  // creating the type for upload
  uploadData: {
    studentName: string;
    title: string;
    description: string;
  } = {
    studentName: '',
    title: '',
    description: '',
  };

  // creating data types for file

  selectedFile: File | null = null;

  onFileSelected(event: any) {
    console.log(event);
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
      console.log('Selected file:', file);
    }
  }
  clearForm(): void {
    this.uploadData = {
      studentName: '',
      title: '',
      description: '',
    };
    this.selectedFile = null;
  }

  // creating a function that is needed to submit data
  onSubmit(): void {
    const formData = new FormData();
    formData.append('studentName', this.uploadData.studentName);
    formData.append('title', this.uploadData.title);
    formData.append('description', this.uploadData.description);

    if (this.selectedFile) {
      formData.append('file', this.selectedFile);
    }

    // if you want to console what the form Data has inside it before send it then
    for (let pair of formData.entries()) {
      console.log(`${pair[0]}:`, pair[1]);
    }

    // posting it to backend
    this.assignmentServie.uploadAssignment(formData).subscribe((res) => {
      console.log(res);
      if (res) {
        this.clearForm();
      }
    });
  }
}
