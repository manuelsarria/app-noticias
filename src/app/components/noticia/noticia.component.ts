import { Component, OnInit, Input } from '@angular/core';
import { Article } from 'src/app/interfaces/interfaces';

import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { ActionSheetController, Platform } from '@ionic/angular';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { DataLocalService } from '../../services/data-local.service';

@Component({
  selector: 'app-noticia',
  templateUrl: './noticia.component.html',
  styleUrls: ['./noticia.component.scss'],
})
export class NoticiaComponent implements OnInit {

  @Input() noticia: Article;
  @Input() indice: number;
  @Input() enFavoritos;

  constructor(private iab: InAppBrowser,
              private actionSheetCtrl: ActionSheetController,
              private socialSharing: SocialSharing,
              private dataLocalService: DataLocalService,
              private platform: Platform) { }

  ngOnInit() {}

  abrirNoticia() {

    // console.log('noticia', this.noticia.url);
    const browser = this.iab.create(this.noticia.url, '_system');

  }

  async lanzarMenu() {

    let guardarBorrarBtn;

    if ( this.enFavoritos ) {
       // borrar de favoritos
       guardarBorrarBtn = {
        text: 'Borrar Favorito',
        icon: 'trash',
        cssClass: 'action-dark',
        handler: () => {
          console.log('Borrar de favorito1');
          this.dataLocalService.borrarNoticia(this.noticia);
        }
      };

    } else {
      guardarBorrarBtn = {
        text: 'Favorito',
        icon: 'star',
        cssClass: 'action-dark',
        handler: () => {
          console.log('favorito');
          this.dataLocalService.guardarNoticia(this.noticia);
        }
      };
    }

    const actionSheet = await this.actionSheetCtrl.create({
      buttons: [
        {
        text: 'Compartir',
        icon: 'share',
        cssClass: 'action-dark',
        handler: () => {
          console.log('Share clicked');
          this.compartirNoticia();
        }
      },
      guardarBorrarBtn,
      {
        text: 'Cancelar',
        icon: 'close',
        role: 'cancel',
        cssClass: 'action-dark',
        handler: () => {
          console.log('Cancel clicked');
        }
      }]
    });
    await actionSheet.present();

  }

  compartirNoticia() {

    if ( this.platform.is('cordova')) {

      this.socialSharing.share(
        this.noticia.title,
        this.noticia.source.name,
        '',
        this.noticia.url
      );

    } else {

      if (navigator['share']) {
        navigator['share']({
          title: this.noticia.title,
          text: this.noticia.description,
          url: this.noticia.url,
        })
          .then(() => console.log('Successful share'))
          .catch((error) => console.log('Error sharing', error));
      } else {

        console.log('no se pudo compartir el navegador no loa soporta');

      }
    }

  }

}
