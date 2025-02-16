import {Component, OnInit} from '@angular/core';
import {VideogameCardComponent} from '../videogame-card/videogame-card.component';
import {Router} from '@angular/router';
import {RequestClientService} from '../../services/request-client.service';
import {VideogameResp} from '../../models/VideogameResp';
import {NgForOf} from '@angular/common';
import {FormBuilder, FormGroup, ReactiveFormsModule} from '@angular/forms';

@Component({
  selector: 'app-videogame-page',
  imports: [
    VideogameCardComponent,
    NgForOf,
    ReactiveFormsModule
  ],
  templateUrl: './videogame-page.component.html',
  standalone: true,
  styleUrl: './videogame-page.component.css'
})
export class VideogamePageComponent implements OnInit {
  protected videogames: VideogameResp[] = [];
  searchValue: string = '';
  searchForm!: FormGroup;

  constructor(private router: Router, private serv: RequestClientService, private fb: FormBuilder) {}

  handleNewFavorite(appId: number) {
    let i=this.videogames.findIndex(v => v.appId === appId);
    let favorite = this.videogames[i];
    favorite.preferred = true;
    this.serv.updateVideogame(favorite).subscribe();
    setTimeout(() => {
      const favoriteElement = document.getElementById(`videogame-${appId}`);
      if (favoriteElement) {
        favoriteElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }, 10);
  }

  handleRemoveFavorite(appId: number) {
    let i=this.videogames.findIndex(v => v.appId === appId);
    let favorite = this.videogames[i];
    favorite.preferred = false;
    this.serv.updateVideogame(favorite).subscribe();
    setTimeout(() => {
      const favoriteElement = document.getElementById(`videogame-${appId}`);
      if (favoriteElement) {
        favoriteElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }, 10);
  }

  ngOnInit(): void {
    this.fetchData();
    this.searchForm=this.fb.nonNullable.group({
      searchValue: '',
    });
  }

  fetchData(): void {
    this.serv.getAllVideogames(this.searchValue).subscribe(
      response => {
        this.videogames = response;
      }
    );
  }

  onSearchSubmit() {
    this.searchValue = this.searchForm.value.searchValue ?? '';
    this.fetchData();
  }
}
