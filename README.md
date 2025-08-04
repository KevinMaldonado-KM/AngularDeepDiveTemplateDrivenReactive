# 📝 Angular Deep Dive – Template-Driven & Reactive Forms

Projet Angular développé dans le cadre de la section "Working with Forms" de la formation _The Complete Guide (2025 Edition)_.

## 🎯 Objectif
Mettre en œuvre les concepts fondamentaux liés aux formulaires Angular :
- Utilisation des **Reactive Forms** avec `FormGroup`, `FormControl` et `FormArray`
- Validation synchrone et asynchrone personnalisée
- Gestion des erreurs et affichage conditionnel des messages
- Sauvegarde automatique dans le localStorage avec `debounceTime`
- Architecture modulaire avec composants dédiés (`LoginComponent`, `SignupComponent`)
- Utilisation des signaux et du cycle de vie Angular (`OnInit`, `DestroyRef`)

## 🔍 Fonctionnalités

### 🔐 Composant Login
- ✅ Validation d'email avec vérificateur d'unicité asynchrone
- 🔒 Validation de mot de passe avec règles personnalisées (longueur min + caractère spécial)
- 💾 Sauvegarde automatique de l'email dans localStorage
- ⚠️ Affichage conditionnel des erreurs avec getters

### 📋 Composant Signup
- 📧 Validation d'email avec `Validators.email` et `Validators.required`
- 🔐 Groupe de mots de passe avec validation croisée (confirmation)
- 👤 Informations personnelles (prénom, nom)
- 🏠 Adresse complète avec `FormGroup` imbriqué
- 🎭 Sélection de rôle avec `<select>`
- ☑️ Cases à cocher multiples avec `FormArray`
- ✅ Acceptation des conditions avec validation obligatoire
- 🔄 Fonction reset pour réinitialiser le formulaire

## 🧩 Concepts techniques mis en œuvre

### Validators personnalisés
```typescript
// Validator synchrone
function mustContainQuestionMark(control: AbstractControl) {
  return control.value.includes('?') ? null : { doesNotContainQuestionMark: true };
}

// Validator asynchrone
function emailIsUnique(control: AbstractControl) {
  return control.value !== 'test@example.com' 
    ? of(null) 
    : of({ emailIsNotUnique: true });
}

// Validator de groupe (validation croisée)
function equalValues(controlName1: string, controlName2: string) {
  return (control: AbstractControl) => {
    const val1 = control.get(controlName1)?.value;
    const val2 = control.get(controlName2)?.value;
    return val1 === val2 ? null : { valuesNotEqual: true };
  };
}
```

### Gestion de l'état et persistence
- 🔄 `valueChanges` avec `debounceTime(500)` pour la sauvegarde automatique
- 🗑️ `DestroyRef` pour le nettoyage des souscriptions
- 📦 `localStorage` pour persister les données de formulaire

---

## 🧱 Stack
- Angular 18 (standalone components, signals, inject)
- RxJS (`debounceTime`, `of`)
- Angular Reactive Forms (`FormGroup`, `FormControl`, `FormArray`)
- TypeScript avec types stricts

## 🚀 Lancement
```bash
npm install
npm start
```

L'application sera accessible sur `http://localhost:4200`

---

## 🔗 Liens utiles

- [👉 Formation Udemy](https://www.udemy.com/course/the-complete-guide-to-angular-2/)
- [👤 Mon profil LinkedIn](https://www.linkedin.com/in/kevin-maldonado-km)