# @formio/angular

## Identity

- **Path:** `packages/angular` (Angular library workspace; source under `projects/angular-formio/`). **Published name:** `@formio/angular`, version in [`package.json`](./package.json).
- **License:** MIT. **OSS sync:** YES — `ossRepo: { repo: github.com/formio/angular, srcPath: "." }`. Everything under `projects/angular-formio/` ships publicly.
- **Module/language:** TypeScript, ESM, Angular 21 (peer-supports 16+). Mixed era: standalone components + legacy `NgModule`/`forRoot`.
- **Purpose:** the official Angular wrapper around the `@formio/js` renderer + `@formio/core` data engine. It owns the Angular surface (components, services, DI, routing modules) and the change-detection bridge — **not** rendering/validation/submission logic, which live in `@formio/js`.

## Floor — immutable musts

- **Wrap every `@formio/js` event in `ngZone.run(...)`.** Renderer callbacks fire outside Angular's zone; an unwrapped `formio.on(...)` that emits to the view or an `@Output()` silently leaves the view stale. See [angular/ngzone-event-bridge-01](../../docs/gotchas/angular.md#ngzone-event-bridge-01--every-formiojs-event-must-be-re-entered-into-the-angular-zone-or-the-view-goes-stale). (The `embed` entrypoint is a deliberate zone-less exception.)
- **`FormioAppConfig` is an untyped (`[x: string]: any`), mutable, app-wide shared singleton.** Assignments compile with no type check; producers and consumers of a key live in different packages. Grep both sides before relying on a key; prefer a declared field over another dynamic property. See [angular/appconfig-shared-state-01](../../docs/gotchas/angular.md#appconfig-shared-state-01--formioappconfig-is-an-untyped-mutable-app-wide-shared-state-bag).
- **`FormioResourceService` is a cross-package inheritance surface** (subclassed in `formmanager`, `pro.formview.io`). Treat base-method changes as cross-package; don't edit the look-alike `resources.service.ts` (`FormioResources`) by mistake. See [angular/resource-service-inheritance-01](../../docs/gotchas/angular.md#resource-service-inheritance-01--formioresourceservice-is-a-base-class-subclassed-in-other-packages).
- **Exports are barrel-gated per entrypoint.** A new symbol is invisible until re-exported through that entrypoint's `index.ts`/`public_api.ts`; moving a symbol across entrypoints is breaking. See [angular/secondary-entrypoints-01](../../docs/gotchas/angular.md#secondary-entrypoints-01--the-package-ships-six-entrypoints-exports-are-barrel-gated-not-filesystem-derived).
- **Keep nothing secret/license-gated in source** and keep `GOTCHA` markers opaque — `src/` is published to the public OSS repo.
- **Match the file's era.** New leaf components → standalone; preserve the `NgModule`/`forRoot`/`extendRouter` routing modules and `ViewEncapsulation.None` — don't modernize them without a reason. Adds to [`/STANDARDS.md`](../../STANDARDS.md); never overrides it.

## Ceiling — emerging patterns

- **Pattern: a renderer component extends `FormioBaseComponent` and implements `getRenderer()`. Example:** [`projects/angular-formio/src/components/formio/formio.component.ts`](./projects/angular-formio/src/components/formio/formio.component.ts) — the smallest reference shape.
- **Pattern: renderer events bridged via `ngZone.run` inside `attachFormEvents()`; instantiation in `runOutsideAngular`. Example:** [`projects/angular-formio/src/FormioBaseComponent.ts`](./projects/angular-formio/src/FormioBaseComponent.ts) — `attachFormEvents` (marker `G-NG04`).
- **Pattern: routing entrypoints expose `forRoot/forChild` that call `extendRouter`. Example:** [`projects/angular-formio/src/formio.utils.ts`](./projects/angular-formio/src/formio.utils.ts) — mutates decorator metadata to inject routes.

## Blast radius

**4 dependents, tier: medium** (`pro.formview.io`, `formmanager`, `@formio/enterprise-builder-angular`, `formio-portal`). See [`/docs/dependencies/angular.md`](../../docs/dependencies/angular.md).

## Test & build

```sh
pnpm -F @formio/angular build      # ng build angular-formio --configuration production (→ dist/angular-formio)
pnpm -F @formio/angular x:test     # ng test — Karma + Jasmine. NOTE: there is no `test` script
pnpm -F @formio/angular check-sync # version parity with projects/angular-formio/package.json
```

- **`test` is absent and `lint` is a stub** (`echo … FIO-11789`) — `pnpm -F @formio/angular test`/`lint` will mislead you into thinking it's green. See [angular/no-test-lint-wired-01](../../docs/gotchas/angular.md#no-test-lint-wired-01--test-and-lint-are-not-the-real-commands-here).
- **"Green"** = `build` + `x:test` here; behavioral green = the consuming apps' suites (`pnpm -F pro.formview.io test`, `pnpm -F formmanager test`) — most real coverage lives downstream.
- Single spec: `cd packages/angular && pnpm x:test -- --include='**/<name>.spec.ts'` (needs a Chrome launcher).

## Hot paths & gotchas

See [`/docs/gotchas/angular.md`](../../docs/gotchas/angular.md). Entries: `angular/ngzone-event-bridge-01`, `angular/appconfig-shared-state-01`, `angular/resource-service-inheritance-01`, `angular/secondary-entrypoints-01`, `angular/no-test-lint-wired-01`.

## Cross-cutting triggers

- **Editing `FormioResourceService`/`FormioResources` or any `FormioAppConfig` property** → this is the **Angular app-family behavioral seam** with `formmanager` + `pro.formview.io`. Grep subclasses (`grep -rn "extends FormioResourceService" apps packages`) and config-key producers/consumers; verify both apps. See the seam row in [`/docs/cross-cutting/README.md`](../../docs/cross-cutting/README.md).
- **Any rendering/validation/submission behavior question** → it's almost certainly `@formio/js`, not here. Read [`/docs/architecture/formio.js.md`](../../docs/architecture/formio.js.md) and [`/docs/gotchas/formio.js.md`](../../docs/gotchas/formio.js.md) first.
- **Adding a `formio.on(...)` handler or an `@Output()`** → wrap in `ngZone.run` and test the bound view/output updates, not just the callback.
- **Angular framework upgrade** → lockstep with `formmanager` + `pro.formview.io`; coordinate all three (FIO-11054, FIO-10726).
- **`major` bump** → coordinate the OSS release (ships to github.com/formio/angular).

## References

- Repo-wide: [`/CLAUDE.md`](../../CLAUDE.md), [`/STANDARDS.md`](../../STANDARDS.md)
- Architecture: [`/docs/architecture/angular.md`](../../docs/architecture/angular.md)
- Dependencies: [`/docs/dependencies/angular.md`](../../docs/dependencies/angular.md)
- Gotchas: [`/docs/gotchas/angular.md`](../../docs/gotchas/angular.md)
- Renderer it wraps: [`/docs/architecture/formio.js.md`](../../docs/architecture/formio.js.md)
