import json

items = {}

with open('recipes.txt') as recipes:
    for line in recipes:
        name, energy, produces, ingredients = (p.strip() for p in line.split('@'))
        energy = float(energy.split()[0])
        produces = [p.strip() for p in produces.split(':', 1)[1].split(',') if p.strip()]
        ingredients = [p.strip() for p in ingredients.split(':', 1)[1].split(',') if p.strip()]
        items[name] = {
            'energy': energy,
            'products': [{'amount': float(p.split(':')[0]), 'name': p.split(':')[1]} for p in produces],
            'ingredients': [{'amount': float(i.split(':')[0]), 'name': i.split(':')[1]} for i in ingredients],
            'name': name,
        }

with open('src/data/recipes.json', 'w') as recipes:
    json.dump(items, recipes, indent=2)
