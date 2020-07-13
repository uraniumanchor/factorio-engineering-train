import sys
import re
import glob
import os
import json

output_data = {}
fluid_data = []

# FIXME: where is "rail"?

# TODO: try to parse the lua? might be tricky
with open('src/data/recipes.json') as recipes_data:
    recipes = json.load(recipes_data)
    for recipe in recipes.values():
        for product in recipe["products"]:
            output_data[product["name"]] = 0

valid_types = ['ammo', 'item', 'item-with-entity-data', 'module', 'capsule', 'armor', 'gun', 'tool', 'repair-tool']
known_invalid_types = ['item-subgroup', 'item-with-tags', 'item-with-label', 'item-with-inventory', 'mining-tool', 'blueprint-book', 'deconstruction-item', 'upgrade-item', 'selection-tool']

for input_file in glob.glob(os.path.join(sys.argv[1], 'item/*.lua')):
    print(f'file: {input_file}')
    with open(input_file) as input_data:
        state = 'name'
        for line in input_data:
            line = line.strip()
            type_match = re.search(r'\btype ?= ?"(.+)"', line)
            name_match = re.search(r'\bname ?= ?"(.+)"', line)
            stack_match = re.search(r'\bstack_size ?= ?(\d+)', line)
            flags_match = re.search(r'\bflags *= *({(.*)})', line)
            if type_match:
                current_type = type_match.group(1)
                # print(f'current type: {current_type}')
            elif name_match:
                if current_type not in valid_types:
                    if current_type not in known_invalid_types:
                        print(f'Skipping due to type: {current_type}')
                        print(line)
                    continue
                # print(line)
                if state != 'name':
                    print(f'Warning: Saw name when expecting {state}')
                    print(line)
                state = 'stack'
                name = name_match.group(1)
            elif stack_match:
                # print(line)
                if state != 'stack' and current_type in valid_types:
                    print(line)
                    raise Exception(f'Saw stack when expecting {state}')
                state = 'name'
                # print(f'"{name}" = {int(stack_match.group(1))}')
                if name in output_data:
                    output_data[name] = int(stack_match.group(1))
            elif flags_match:
                if 'hidden' in flags_match.group(1) and name in output_data:
                    print(f'deleting {name} due to hidden flag')
                    del output_data[name]

for input_file in glob.glob(os.path.join(sys.argv[1], 'fluid/*.lua')):
    with open(input_file) as input_data:
        for line in input_data:
            line = line.strip()
            type_match = re.search(r'\btype ?= ?"(.+)"', line)
            name_match = re.search(r'\bname ?= ?"(.+)"', line)
            auto_barrel_match = re.search(r'\bautobarrel *= *(.*)', line)
            if type_match:
                current_type = type_match.group(1)
            elif name_match:
                if current_type != 'fluid':
                    print(f'Skipping due to type: {current_type}')
                    print(line)
                    continue
                name = name_match.group(1)
                fluid_data.append(name)
                barrel_name = f'{name}-barrel'
                if name in output_data:
                    del output_data[name]
                if barrel_name in output_data:
                    output_data[barrel_name] = 10
            elif auto_barrel_match:
                if auto_barrel_match.group(1) == 'false' and barrel_name in output_data:
                    del output_data[barrel_name]

with open('src/data/stacks.json', 'w') as output_file:
    json.dump(output_data, output_file, indent=2, sort_keys=True)

with open('src/data/fluid.json', 'w') as output_file:
    json.dump(fluid_data, output_file, indent=2, sort_keys=True)
