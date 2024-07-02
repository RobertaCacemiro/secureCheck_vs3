import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { LocationsService } from 'src/app/services/locations.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  locations: any[] = [];

  constructor(private locationsService: LocationsService, private navCtrl: NavController) { }

  ngOnInit() {
    this.loadLocations();
  }

  loadLocations() {
    this.locationsService.read_Locations()
      .then((data: any[]) => {
        this.locations = data;
      })
      .catch((error) => {
        console.error('Erro ao carregar as localizações:', error);
      });
  }

  registrarLocations(){
    this.navCtrl.navigateForward('/register');
  }
}
