import { Component, computed, inject, input, linkedSignal, numberAttribute } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DevRepository } from '../../core/data/dev-repository';
import { Team } from '../../core/team/team';
import { STAT_KEYS, StatKey } from '../../domain/dev.model';
import { bestStat, previousEvolution, totalStats } from '../../domain/dev-rules';
import { STAT_LABELS } from '../../domain/labels';
import { DexNumberPipe } from '../../shared/pipes/dex-number-pipe';
import { TypeColor } from '../../shared/directives/type-color';
import { DevAvatar } from '../../shared/ui/dev-avatar';
import { EmptyState } from '../../shared/ui/empty-state';
import { StatBar } from '../../shared/ui/stat-bar';
import { TypeBadge } from '../../shared/ui/type-badge';

@Component({
  selector: 'app-dev-detail-page',
  imports: [RouterLink, DexNumberPipe, TypeColor, DevAvatar, EmptyState, StatBar, TypeBadge],
  templateUrl: './dev-detail-page.html',
  styleUrl: './dev-detail-page.css',
})
export class DevDetailPage {
  private readonly repository = inject(DevRepository);
  protected readonly team = inject(Team);

  /** Paramètre de route :id, converti en nombre. */
  readonly id = input.required({ transform: numberAttribute });

  protected readonly statKeys = STAT_KEYS;
  protected readonly statLabels = STAT_LABELS;
  protected readonly isLoading = this.repository.isLoading;

  protected readonly dev = computed(() => this.repository.byId(this.id()));

  protected readonly total = computed(() => {
    const dev = this.dev();
    return dev ? totalStats(dev.stats) : 0;
  });

  protected readonly previous = computed(() => {
    const dev = this.dev();
    return dev ? previousEvolution(this.repository.devs(), dev) : undefined;
  });

  protected readonly next = computed(() => {
    const target = this.dev()?.evolvesTo;
    return target === undefined ? undefined : this.repository.byId(target);
  });

  /**
   * Statistique mise en avant : par défaut la meilleure du dev affiché.
   * L'utilisateur peut en choisir une autre ; le choix est réinitialisé
   * quand on passe à un autre dev.
   */
  protected readonly focusedStat = linkedSignal<StatKey | undefined>(() => {
    const dev = this.dev();
    return dev ? bestStat(dev.stats) : undefined;
  });

  protected readonly devCount = computed(() => this.repository.devs().length);

  /** Rang du dev pour la statistique mise en avant (1 = meilleur). */
  protected readonly focusedRank = computed(() => {
    const dev = this.dev();
    const key = this.focusedStat();

    if (!dev || !key) {
      return undefined;
    }

    return this.repository.devs().filter((other) => other.stats[key] > dev.stats[key]).length + 1;
  });

  /** Autres devs partageant le type principal. */
  protected readonly sameType = computed(() => {
    const dev = this.dev();

    if (!dev) {
      return [];
    }

    return this.repository
      .devs()
      .filter((other) => other.id !== dev.id && other.types.includes(dev.types[0]));
  });
}
