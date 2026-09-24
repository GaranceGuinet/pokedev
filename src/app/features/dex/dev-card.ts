import { Component, computed, input, output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Dev } from '../../domain/dev.model';
import { totalStats } from '../../domain/dev-rules';
import { DexNumberPipe } from '../../shared/pipes/dex-number-pipe';
import { DevAvatar } from '../../shared/ui/dev-avatar';
import { TypeBadge } from '../../shared/ui/type-badge';

@Component({
  selector: 'app-dev-card',
  imports: [RouterLink, DexNumberPipe, DevAvatar, TypeBadge],
  templateUrl: './dev-card.html',
  styleUrl: './dev-card.css',
})
export class DevCard {
  readonly dev = input.required<Dev>();
  readonly inTeam = input(false);
  readonly teamFull = input(false);

  readonly teamToggled = output<number>();

  protected readonly total = computed(() => totalStats(this.dev().stats));
}
