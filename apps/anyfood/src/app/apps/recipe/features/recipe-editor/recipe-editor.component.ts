import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import { form, FormField, required } from '@angular/forms/signals';
import {
  AnyfoodImageComponent,
  AnyfoodInputComponent,
  AnyfoodSelectionComponent,
} from '@anyfood/ui';
import { ICreateRecipeRequest } from '../../../../core/clients/recipe/models/recipe-client.model';
import { ProductClient } from '../../../../core/clients/product/product.client';
import { IProduct } from '../../../../core/entities/product/product.entity';
import { RecipeClient } from '../../../../core/clients/recipe/recipe.client';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CategoryClient } from '../../../../core/clients/category/category.client';
import { ICategoryResponse } from '../../../../core/clients/category/models/category-client.model';
import { toSignal } from '@angular/core/rxjs-interop';
import { RecipeCategoryClient } from '../../../../core/clients/recipe-category/recipe-category.client';
import { ButtonDirective } from '../../../../shared/directives/button.directive';

@Component({
  selector: 'app-recipe-editor',
  imports: [
    AnyfoodInputComponent,
    FormField,
    AnyfoodSelectionComponent,
    RouterLink,
    AnyfoodImageComponent,
    ButtonDirective,
  ],
  templateUrl: './recipe-editor.component.html',
  styleUrl: './recipe-editor.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RecipeEditorComponent implements OnInit {
  private readonly productClient = inject(ProductClient);
  private readonly recipeClient = inject(RecipeClient);
  private readonly categoryClient = inject(RecipeCategoryClient);
  private readonly router = inject(Router);
  private readonly activatedRoute = inject(ActivatedRoute);

  // --- Route state ---
  readonly $id = signal<string | null>(null);
  readonly $hasId = computed(() => {
    const id = this.$id();
    return Boolean(id && !isNaN(+id));
  });

  // --- Remote data ---
  readonly $products = toSignal(this.productClient.getAll(), {
    initialValue: [] as IProduct[],
  });
  readonly $categories = toSignal(this.categoryClient.getAll(), {
    initialValue: [] as ICategoryResponse[],
  });

  // --- Form model ---
  readonly $formModel = signal<ICreateRecipeRequest>({
    name: '',
    imageUrl: '',
    description: '',
    duration: 0,
    portions: 0,
    recipeProducts: [],
    recipeCategories: [],
  });

  readonly recipeForm = form(this.$formModel, (f) => {
    required(f.name, { message: 'Назва обовʼязкова' });
  });

  // --- Selected products (drives the ingredient list) ---
  readonly $selectedProducts = form<IProduct[]>(signal<IProduct[]>([]));

  // --- Image preview ---
  readonly $imagePreview = computed(() => {
    const url = this.recipeForm.imageUrl().value();
    return typeof url === 'string' && url.trim().length > 0 ? url : null;
  });

  constructor() {
    // Sync selectedProducts → recipeForm.recipeProducts
    effect(() => {
      const selected = this.$selectedProducts().value();
      const newIds = new Set(selected.map((p) => p.id));

      this.recipeForm.recipeProducts().value.update((current) => {
        const currentIds = new Set(current.map((v) => v.productId));
        const added = selected.filter((p) => !currentIds.has(p.id));
        const removed = [...currentIds].filter((id) => !newIds.has(id));
        const afterRemove = current.filter(
          (p) => !removed.includes(p.productId),
        );
        return [
          ...afterRemove,
          ...added.map((p) => ({ productId: p.id, weight: 0 })),
        ];
      });
    });
  }

  ngOnInit() {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    if (!id || isNaN(+id)) return;

    this.$id.set(id);
    this.recipeClient.getById(id).subscribe((recipe) => {

      const matchedProducts = recipe.products
        .map((rp) => this.$products().find((p) => p.id === rp.id))
        .filter((p): p is IProduct => p !== undefined);

      this.$selectedProducts().value.set(matchedProducts);

      // Patch form model
      this.$formModel.set({
        name: recipe.name,
        imageUrl: recipe.imageUrl,
        description: recipe.description,
        duration: recipe.duration,
        portions: recipe.portions,
        recipeProducts: recipe.products.map((p) => ({
          productId: p.id,
          weight: p.weight,
        })),
        recipeCategories: recipe.recipeCategories.map((c) => ({
          id: c.categoryId,
        })),
      });

      // Pre-select products in the dropdown
    });
  }

  // --- Helpers used in the template ---

  /** Returns the FormField for a product's weight by index in recipeProducts array */
  weightFieldAt(index: number) {
    return this.recipeForm.recipeProducts[index].weight;
  }

  removeProduct(product: IProduct) {
    this.$selectedProducts().value.update((current) =>
      current.filter((p) => p.id !== product.id),
    );
  }

  // --- Submit ---

  save() {
    const formState = this.recipeForm();
    if (formState.invalid()) return;

    const payload = formState.value();
    const id = this.$id();

    if (id) {
      this.recipeClient.updateRecipe(id, payload).subscribe((r) => {
        this.router.navigate(['../details', r.id], {
          relativeTo: this.activatedRoute,
        });
      });
    } else {
      this.recipeClient.createRecipe(payload).subscribe((r) => {
        this.router.navigate(['../details', r.id], {
          relativeTo: this.activatedRoute,
        });
      });
    }
  }
}
