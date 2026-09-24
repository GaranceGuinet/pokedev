import { Component, signal } from '@angular/core';

/**
 * Démonstration : ce qu'Angular fait d'un contenu malveillant
 * saisi par un utilisateur.
 */
@Component({
  selector: 'app-xss-demo',
  template: `
    <label for="phrase">Phrase fétiche</label>

    <input id="phrase" [value]="phrase()" (input)="phrase.set(input.value)" #input />

    <h3>Interpolation (texte)</h3>
    <p>{{ phrase() }}</p>

    <h3>[innerHTML] (HTML assaini)</h3>
    <p [innerHTML]="phrase()"></p>
  `,
})
export class XssDemo {
  protected readonly phrase = signal('<img src="x" onerror="alert(\'piraté\')"><b>Salut</b>');
}
