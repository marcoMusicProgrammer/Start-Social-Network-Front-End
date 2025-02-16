import {Component, OnInit} from '@angular/core';
import {RequestClientService} from '../../services/request-client.service';
import {VideogameResp} from '../../models/VideogameResp';
import {NgForOf} from '@angular/common';
import {FormBuilder, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-achievements-page',
  imports: [
    NgForOf,
    ReactiveFormsModule,
    RouterLink
  ],
  templateUrl: './achievements-page.component.html',
  styleUrl: './achievements-page.component.css',
  standalone: true
})
export class AchievementsPageComponent implements OnInit{

  constructor(private serv: RequestClientService, private fb: FormBuilder) {}
  protected videogames: VideogameResp[]=[];
  searchForm!: FormGroup;
  searchValue: string = '';

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
