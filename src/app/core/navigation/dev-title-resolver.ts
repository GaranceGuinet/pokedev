import { ResolveFn } from '@angular/router';
import { formatDexNumber } from '../../domain/dev-rules';

/** Titre de l'onglet pour la page d'un dev : « Pokedev · #007 ». */
export const devTitleResolver: ResolveFn<string> = (route) =>
  `Pokedev · ${formatDexNumber(Number(route.paramMap.get('id')))}`;
