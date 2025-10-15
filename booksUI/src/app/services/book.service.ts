import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Book } from '../common/types/book';

@Injectable({
  providedIn: 'root',
})
export class BookService {
  private apiURL = 'http://127.0.0.1:8000/api/books';

  constructor(private httpClient: HttpClient) {}
  getBooks(): Observable<Book[]> {
    return this.httpClient.get<Book[]>(this.apiURL);
  }

  addBook(book: Book): Observable<Book> {
    return this.httpClient.post<Book>(this.apiURL, book);
  }

  updateBook(book: Book): Observable<Book> {
    return this.httpClient.put<Book>(`${this.apiURL}/${book.id}`, book);
  }

  deleteBook(id: number): Observable<any> {
    return this.httpClient.delete(`${this.apiURL}/${id}`);
  }
}
