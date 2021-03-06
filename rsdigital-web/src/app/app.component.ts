import { Component, Inject, OnInit } from '@angular/core'
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Router } from '@angular/router';
import { OrderService } from './services/order.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app'
  languaje
  user: any
  ruta = '/login'
  id = 'new'
  text: any

  constructor(public dialog: MatDialog, private route: Router, private loginService: OrderService) { }

  openDialog() {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '250px',
      data: { languaje: this.languaje }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result)
      this.languaje = result || this.languaje
    })
  }

  ngOnInit() {
    this.user = this.loginService.getUser()
    this.languaje = this.loginService.getLanguaje()
    this.text = {}
    this.text['Español'] = {
      activeOrdes: 'Órdenes Activas',
      allOrders: 'Todas las Órdenes',
      findUs: 'Localizanos',
      singOff: 'Cerrar Sesión',
      languaje: 'Idioma'
    }

    this.text['English'] = {
      activeOrdes: 'Active Orders',
      allOrders: 'All Orders',
      findUs: 'Find us',
      singOff: 'Logout',
      languaje: 'Language'
    }

    this.text['Français'] = {
      activeOrdes: 'Commandes actives',
      allOrders: 'Toutes les commandes',
      findUs: 'Trouvez-nous',
      singOff: 'Fermer la session',
      languaje: 'Langue'
    }

    this.text['Italiano'] = {
      activeOrdes: 'Ordini attivi',
      allOrders: 'Tutti gli ordini',
      findUs: 'Trovaci',
      singOff: 'Close Session',
      languaje: 'Lingua'
    }
  }

  logout() {
    this.loginService.setUser(null)
    this.user = null
    this.ruta = '/login'
  }

}

@Component({
  selector: 'app-dialog-component',
  templateUrl: './dialog.component.html',
  styles: [`.example-radio-group {
    display: inline-flex;
    flex-direction: column;
  }

  .example-radio-button {
    margin: 5px;
  }

  .example-selected-value {
    margin: 15px 0;
  }`]
})
export class DialogComponent {

  constructor(public dialogRef: MatDialogRef<DialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any) { }

  onNoClick(): void {
    console.log(this.data.languaje)
    this.dialogRef.close(this.data.languaje)
  }

}
