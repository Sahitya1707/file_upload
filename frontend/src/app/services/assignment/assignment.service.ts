import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class AssignmentService {
  constructor(private http: HttpClient) {}

  // backend url
  apiUrl: string = environment.apiUrl;

  // POST: Upload an assignment
  uploadAssignment(assignment: any) {
    return this.http.post(`${this.apiUrl}/assignments`, assignment);
  }

  // GET: All assignments
  getAllAssignment() {
    return this.http.get(`${this.apiUrl}/assignments`);
  }

  // GET: One assignment by ID
  getAssignment(id: string) {
    return this.http.get(`${this.apiUrl}/assignments/${id}`);
  }

  // PUT: Update assignment by ID
  updateAssignment(assignment: any) {
    return this.http.put(
      `${this.apiUrl}/assignments/${assignment._id}`,
      assignment
    );
  }

  // DELETE: Delete assignment by ID
  deleteAssignment(id: string) {
    return this.http.delete(`${this.apiUrl}/assignments/${id}`);
  }
}
