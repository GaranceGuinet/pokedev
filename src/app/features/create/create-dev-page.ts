import { Component, computed, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import {
  FormField,
  form,
  max,
  maxLength,
  min,
  minLength,
  required,
  submit,
  validate,
} from '@angular/forms/signals';

import { DevRepository } from '../../core/data/dev-repository';
import { HasUnsavedChanges } from '../../core/navigation/unsaved-changes';
import { DEV_TYPES, STAT_KEYS } from '../../domain/dev.model';
import { totalStats } from '../../domain/dev-rules';
import { STAT_LABELS } from '../../domain/labels';
import { TypeLabelPipe } from '../../shared/pipes/type-label-pipe';
import { draftToDev, emptyDraft, splitLanguages } from './dev-draft';

@Component({
  selector: 'app-create-dev-page',
  imports: [FormField, TypeLabelPipe],
  templateUrl: './create-dev-page.html',
  styleUrl: './create-dev-page.css',
})
export class CreateDevPage implements HasUnsavedChanges {
  private readonly repository = inject(DevRepository);
  private readonly router = inject(Router);

  private saved = false;

  protected readonly types = DEV_TYPES;
  protected readonly statKeys = STAT_KEYS;
  protected readonly statLabels = STAT_LABELS;

  protected readonly draft = signal(emptyDraft());

  protected readonly devForm = form(this.draft, (path) => {
    required(path.name, {
      message: 'Le nom est obligatoire.',
    });

    minLength(path.name, 2, {
      message: 'Le nom doit contenir au moins 2 caractères.',
    });

    maxLength(path.name, 30, {
      message: 'Le nom doit contenir au plus 30 caractères.',
    });

    validate(path.name, ({ value }) => {
      const name = value().trim().toLowerCase();

      const exists = this.repository.devs().some((dev) => dev.name.toLowerCase() === name);

      return exists
        ? {
            kind: 'duplicate',
            message: 'Ce nom est déjà pris.',
          }
        : undefined;
    });

    required(path.title, {
      message: 'Le poste est obligatoire.',
    });

    maxLength(path.title, 50, {
      message: 'Le poste doit contenir au plus 50 caractères.',
    });

    validate(path.secondaryType, ({ value, valueOf }) =>
      value() !== '' && value() === valueOf(path.primaryType)
        ? {
            kind: 'duplicate',
            message: 'Le type secondaire doit différer du type principal.',
          }
        : undefined,
    );

    for (const key of STAT_KEYS) {
      min(path.stats[key], 0, {
        message: 'Minimum : 0.',
      });

      max(path.stats[key], 100, {
        message: 'Maximum : 100.',
      });
    }

    validate(path.stats, ({ value }) =>
      totalStats(value()) > 420
        ? {
            kind: 'total',
            message: 'Le total ne doit pas dépasser 420.',
          }
        : undefined,
    );

    validate(path.languages, ({ value }) =>
      splitLanguages(value()).length === 0
        ? {
            kind: 'required',
            message: 'Saisissez au moins un langage.',
          }
        : undefined,
    );

    maxLength(path.catchphrase, 120, {
      message: 'La phrase fétiche doit contenir au plus 120 caractères.',
    });
  });

  protected readonly statsTotal = computed(() => totalStats(this.draft().stats));

  protected async save(event: Event): Promise<void> {
    event.preventDefault();

    await submit(this.devForm, async (field) => {
      const id = this.repository.add(draftToDev(field().value()));

      this.saved = true;

      await this.router.navigate(['/devs', id]);

      return undefined;
    });
  }

  hasUnsavedChanges(): boolean {
    return this.devForm().dirty() && !this.saved;
  }
}
