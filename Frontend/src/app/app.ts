import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from './header/header';
import { Footer } from './footer/footer';
import { DeliveryType } from './delivery-type/delivery-type';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, Footer, DeliveryType],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('Frontend');
}
