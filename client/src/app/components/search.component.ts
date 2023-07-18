import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, Subscription, debounceTime, filter, map } from 'rxjs';
import { Movie } from '../models/movie';
import { MovieService } from '../services/movie.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent implements OnInit, OnDestroy {
  @ViewChild('keyword')
  inputEl!: ElementRef;

  form!: FormGroup;
  searchSubscription$!: Subscription;
  searchResults$!: Observable<Movie[]>;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private movieService: MovieService
  ) {}

  ngOnInit(): void {
    this.createForm();
    // subscribe to search input box's value changes to render 'live search' results
    this.searchSubscription$ = this.form.valueChanges
      .pipe(
        map((form) => form['keyword']),
        filter((keyword) => keyword.trim().length > 1),
        debounceTime(500)
      )
      .subscribe({
        next: (keyword) => {
          this.searchResults$ =
            this.movieService.searchMoviesByKeyword(keyword);
        },
        error: (error) => {
          alert(error);
          console.error(error);
        },
      });
  }

  ngOnDestroy(): void {
    this.searchSubscription$.unsubscribe();
  }

  // invoked when Enter key is pressed or Search button is clicked
  searchProducts(keyword: string) {
    this.movieService.searchMode = true;
    this.router.navigate(['/search', keyword]);
    this.clearSearch();
  }

  clearSearch(): void {
    this.inputEl.nativeElement.value = '';
  }

  onClickingSearchResult(id: number) {
    this.movieService.searchMode = true;
    this.router.navigate(['/movie', id]);
    this.clearSearch();
  }

  private createForm(): void {
    this.form = this.fb.group({
      keyword: this.fb.control<string>(''),
    });
  }
}
