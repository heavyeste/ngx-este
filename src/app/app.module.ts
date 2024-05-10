import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgxEsteModule } from 'ngx-este';
import { HomeComponent } from './pages/home/home.component';
import { UsersComponent } from './pages/users/users.component';
import { PostsComponent } from './pages/posts/posts.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [AppComponent, HomeComponent, UsersComponent, PostsComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgxEsteModule.forRoot({
      sidebar: {
        items: [
          {
            title: 'Dashboard',
            items: [
              {
                title: 'Home',
                link: '/',
                icon: 'fa-solid fa-home',
              },
              {
                title: 'Posts',
                link: '/posts',
              },
              // {
              //   title: 'Utenti',
              //   link: '/users',
              // },

            ],
          },
        ],
      },
    }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
