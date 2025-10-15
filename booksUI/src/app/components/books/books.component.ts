import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Book } from 'src/app/common/types/book';
import { BookService } from 'src/app/services/book.service';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css'],
})
export class BooksComponent implements OnInit {
  books: Book[] = [];
  bookForm!: FormGroup;
  editMode = false;
  currentBookId?: number;

  constructor(private bookService: BookService, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.loadBooks();
    this.bookForm = this.fb.group({
      titre: ['', Validators.required],
      auteur: ['', Validators.required],
      annee: ['', [Validators.required, Validators.pattern('^[0-9]{4}$')]],
    });
  }

  loadBooks() {
    this.bookService.getBooks().subscribe((data) => (this.books = data));
  }

  onSubmit() {
    this.bookForm.markAllAsTouched();

    if (this.bookForm.invalid) return;

    const book = this.bookForm.value;

    if (this.editMode && this.currentBookId) {
      this.bookService
        .updateBook({ id: this.currentBookId, ...book })
        .subscribe(() => {
          this.loadBooks();
          this.resetForm();
        });
    } else {
      this.bookService.addBook(book).subscribe(() => {
        this.loadBooks();
        this.resetForm();
      });
    }
  }

  editBook(book: Book) {
    this.editMode = true;
    this.currentBookId = book.id;
    this.bookForm.patchValue(book);
  }

  deleteBook(id: number) {
    const index = this.books.findIndex((b) => b.id === id);
    if (index > -1) {
      this.books.splice(index, 1); // remove from UI immediately
      this.bookService.deleteBook(id).subscribe({
        error: () => {
          // rollback if backend fails
          this.books.splice(index, 0, this.books[index]);
          alert('Delete failed!');
        },
      });
    }
  }

  resetForm() {
    this.bookForm.reset();
    this.editMode = false;
    this.currentBookId = undefined;
  }
}
