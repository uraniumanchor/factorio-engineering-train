import { useSelector } from 'react-redux';
import { StoreState } from '../store/Store';
import React, { useMemo, useState } from 'react';
import { Blueprint, BlueprintBook, Entity, Schedule } from '../types/Interfaces';
import pako from 'pako';
import StackData from '../data/stacks.json';
import { FuelType } from '../store/slices/Other';

function chainEntities(entities: Entity[]) {
  entities.slice(1).forEach((entity, i) => {
    entity.connections?.['1']?.red?.push({
      entity_id: entities[i].entity_number,
    });
  });
  entities.slice(0, -1).forEach((entity, i) => {
    entity.connections?.['1']?.red?.push({
      entity_id: entities[i + 1].entity_number,
    });
  });
}

function connectEntities(
  entity1: Entity,
  entity2: Entity,
  { side1 = '1', side2 = '1', color = 'red' }: { side1?: '1' | '2'; side2?: '1' | '2'; color?: 'green' | 'red' } = {}
) {
  entity1.connections?.[side1]?.[color]?.push({
    entity_id: entity2.entity_number,
  });
  entity2.connections?.[side2]?.[color]?.push({
    entity_id: entity1.entity_number,
  });
}

function addRailsAndSignals(entities: Entity[], numCars: number, dual: boolean) {
  const railSections = Math.ceil((numCars + (dual ? 2 : 1)) * 3.5) + (dual ? 1 : 2);
  entities = entities.concat(
    Array.from(Array(railSections).keys()).map((_, i) => ({
      entity_number: entities.length + 1 + i,
      name: 'straight-rail',
      position: {
        x: -2 * (railSections - i - (dual ? 1 : 2)),
        y: -2,
      },
      direction: 2,
    }))
  );
  if (dual) {
    entities.push({
      entity_number: entities.length + 1,
      name: 'rail-signal',
      position: {
        x: 0.5 - 2 * railSections + 1,
        y: -3.5,
      },
      direction: 2,
    });
  } else {
    entities.push({
      entity_number: entities.length + 1,
      name: 'rail-signal',
      position: {
        x: 1.5,
        y: -0.5,
      },
      direction: 6,
    });
  }
  entities.push({
    entity_number: entities.length + 1,
    name: 'rail-signal',
    position: {
      x: 0.5 - 2 * railSections + (dual ? 1 : 3),
      y: -0.5,
    },
    direction: 6,
  });

  return entities;
}

const fourInserterMap = [-4.5, -3.5, -0.5, 0.5];
const fourChestMap = [-6.5, -5.5, 1.5, 2.5];
const twoInserterMap = [-3.5, -0.5];
const twoChestMap = [-4.5, 0.5];

export function BlueprintString() {
  const [showUnpacked, setShowUnpacked] = useState(false);
  const { fluids, stacks, other } = useSelector((state: StoreState) => state);
  const activeStacks = useMemo(() => Object.entries(stacks).filter(([_, v]) => v), [stacks]);
  const activeFluids = useMemo(() => Object.entries(fluids).filter(([_, v]) => v), [fluids]);

  const cars: [string, number][][] = useMemo(() => {
    const cars: [string, number][][] = [];
    activeStacks.forEach((stack) => {
      let carIndex = cars.findIndex((car) => {
        const used = car.reduce((s, existingStack) => s + existingStack[1], 0);
        // only use the last chest slot if it's an exact match, otherwise we can't do filler
        return (car.length < 23 && used + stack[1] <= 40) || (car.length === 23 && used + stack[1] === 40);
      });
      if (carIndex === -1) {
        carIndex = cars.length;
        cars.push([]);
      }
      cars[carIndex].push(stack);
    });
    return cars;
  }, [activeStacks]);
  cars.forEach((car) => {
    const left = 40 - car.reduce((s, existingStack) => s + existingStack[1], 0);
    if (left > 0 && car.length < 24) {
      car.push([other.filler, left]);
    }
  });
  const receiverStation: Blueprint = useMemo(() => {
    let entities: Entity[] = [];
    const trainStop: Entity = {
      entity_number: entities.length + 1,
      name: 'train-stop',
      position: {
        x: 0,
        y: 0,
      },
      direction: 2,
      control_behavior: {
        circuit_condition: {
          first_signal: {
            type: 'virtual',
            name: 'signal-anything',
          },
          constant: 0,
          comparator: '>',
        },
        circuit_enable_disable: true,
        send_to_train: false,
      },
      station: 'Engineering Dropoff',
    };
    entities.push(trainStop);
    const chests: Entity[] = cars.flatMap((_, i) =>
      Array.from(Array(6).keys()).map((j) => ({
        entity_number: entities.length + 1 + j + i * 6,
        name: 'logistic-chest-storage',
        position: {
          x: -5.5 + j - (cars.length - i + activeFluids.length) * 7,
          y: 0.5,
        },
        connections: {
          1: { red: [] },
        },
      }))
    );
    entities = entities.concat(chests);
    const inserters: Entity[] = cars.flatMap((_, i) =>
      Array.from(Array(6).keys()).map((j) => ({
        entity_number: entities.length + 1 + j + i * 6,
        name: 'stack-filter-inserter',
        position: {
          x: -5.5 + j - (cars.length - i + activeFluids.length) * 7,
          y: -0.5,
        },
        control_behavior: {
          circuit_mode_of_operation: 1,
        },
        connections: {
          1: { red: [] },
        },
      }))
    );
    entities = entities.concat(inserters);
    const tanks: Entity[] = activeFluids.flatMap((_, i) => [
      {
        entity_number: entities.length + 1 + i * 2,
        name: 'storage-tank',
        direction: 2,
        position: {
          x: -4.5 - 7 * (activeFluids.length - i),
          y: -6.5,
        },
        connections: {
          1: {
            red: [],
          },
        },
      },
      {
        entity_number: entities.length + 2 + i * 2,
        name: 'storage-tank',
        position: {
          x: -1.5 - 7 * (activeFluids.length - i),
          y: -6.5,
        },
        connections: {
          1: {
            red: [],
          },
        },
      },
    ]);
    entities = entities.concat(tanks);
    const pumps: Entity[] = activeFluids.map(([fluid], i) => ({
      entity_number: entities.length + 1 + i,
      name: 'pump',
      position: {
        x: -0.5 - 7 * (activeFluids.length - i),
        y: -4,
      },
      control_behavior: {
        circuit_condition: {
          first_signal: {
            type: 'fluid',
            name: fluid,
          },
          constant: -15000,
          comparator: '>',
        },
      },
      connections: {
        1: {
          red: [],
        },
      },
    }));
    entities = entities.concat(pumps);
    const arithmeticCombinator: Entity = {
      entity_number: entities.length + 1,
      name: 'arithmetic-combinator',
      position: {
        x: -6,
        y: 1.5,
      },
      direction: 2,
      control_behavior: {
        arithmetic_conditions: {
          first_signal: {
            type: 'virtual',
            name: 'signal-each',
          },
          second_constant: -1,
          operation: '*',
          output_signal: {
            type: 'virtual',
            name: 'signal-each',
          },
        },
      },
      connections: {
        1: {
          red: [],
        },
        2: {
          red: [],
        },
      },
    };
    entities.push(arithmeticCombinator);
    const constantCombinator: Entity = {
      entity_number: entities.length + 1,
      name: 'constant-combinator',
      direction: 6,
      position: {
        x: -5.5,
        y: -0.5,
      },
    };
    entities.push(constantCombinator);
    const roboport: Entity = {
      entity_number: entities.length + 1,
      name: 'roboport',
      position: {
        x: -21,
        y: 3,
      },
      control_behavior: {
        read_logistics: false,
        read_robot_stats: true,
      },
      connections: {
        '1': {
          red: [],
        },
      },
    };
    entities.push(roboport);
    const constructionInserter: Entity = {
      entity_number: entities.length + 1,
      name: 'fast-inserter',
      position: {
        x: -22.5,
        y: 5.5,
      },
      direction: 4,
      control_behavior: {
        circuit_condition: {
          first_signal: {
            type: 'virtual',
            name: 'signal-X',
          },
          constant: 50,
          comparator: '<',
        },
      },
      connections: {
        '1': {
          red: [],
        },
      },
    };
    entities.push(constructionInserter);
    const logisticInserter: Entity = {
      entity_number: entities.length + 1,
      name: 'fast-inserter',
      position: {
        x: -21.5,
        y: 5.5,
      },
      direction: 4,
      control_behavior: {
        circuit_condition: {
          first_signal: {
            type: 'virtual',
            name: 'signal-Z',
          },
          constant: 50,
          comparator: '<',
        },
      },
      connections: {
        '1': {
          red: [],
        },
      },
    };
    entities.push(logisticInserter);
    entities.push({
      entity_number: entities.length + 1,
      name: 'logistic-chest-requester',
      position: {
        x: -22.5,
        y: 6.5,
      },
      request_filters: [
        {
          index: 1,
          name: 'logistic-robot',
          count: 50,
        },
      ],
    });
    entities.push({
      entity_number: entities.length + 1,
      name: 'logistic-chest-requester',
      position: {
        x: -21.5,
        y: 6.5,
      },
      request_filters: [
        {
          index: 1,
          name: 'construction-robot',
          count: 50,
        },
      ],
    });
    entities = addRailsAndSignals(entities, cars.length + activeFluids.length, other.dual);

    connectEntities(roboport, logisticInserter);
    connectEntities(logisticInserter, constructionInserter);
    connectEntities(arithmeticCombinator, constantCombinator, { side1: '2' });
    connectEntities(arithmeticCombinator, trainStop, { side1: '2' });
    chainEntities(inserters);
    chainEntities(chests);
    chainEntities(pumps);
    chainEntities(tanks);
    const lastPump = pumps.slice(-1)[0];
    const lastTank = tanks.slice(-1)[0];
    const lastInserter = inserters.slice(-1)[0];
    const lastChest = chests.slice(-1)[0];
    if (lastPump) {
      connectEntities(lastTank, arithmeticCombinator, { side2: '1' });
      connectEntities(lastPump, arithmeticCombinator, { side2: '2' });
      if (lastInserter) {
        connectEntities(pumps[0], lastInserter);
        connectEntities(tanks[0], lastChest);
      }
    } else if (lastInserter) {
      connectEntities(lastChest, arithmeticCombinator, { side2: '1' });
      connectEntities(lastInserter, arithmeticCombinator, { side2: '2' });
    }
    return {
      item: 'blueprint',
      label: 'Engineering Receiver',
      entities: entities,
      tiles: [],
      icons: [],
      schedules: [],
      version: 77311705089,
    };
  }, [activeFluids, cars, other.dual]);
  const providerStation: Blueprint = useMemo(() => {
    let entities: Entity[] = [];
    const trainStop: Entity = {
      entity_number: entities.length + 1,
      name: 'train-stop',
      position: {
        x: 0,
        y: 0,
      },
      direction: 2,
      station: 'Engineering Pickup',
    };
    entities.push(trainStop);
    const insertersAndChests: Entity[] = cars.flatMap((car, i) => {
      const four = Math.max(0, Math.ceil((car.length - 12) / 2));
      const fourStacks: Entity[] =
        four !== 0
          ? Array.from(Array(four).keys()).flatMap((j) =>
              Array.from(
                Array(j === four - 1 && car.length % 4 !== 0 && four * 4 > car.length ? car.length % 4 : 4).keys()
              ).flatMap((k) => {
                const stack = car[j * 4 + k];
                const offset = (cars.slice(0, i).reduce((l, car) => l + car.length, 0) + j * 4 + k) * 2;

                return [
                  {
                    entity_number: entities.length + offset + 1,
                    name: 'long-handed-inserter',
                    position: {
                      x: -5.5 + j - (cars.length - i + (other.dual ? 0 : activeFluids.length)) * 7,
                      y: fourInserterMap[k],
                    },
                    direction: k >= 2 ? 4 : 0,
                  },
                  {
                    entity_number: entities.length + offset + 2,
                    name: 'logistic-chest-requester',
                    position: {
                      x: -5.5 + j - (cars.length - i + (other.dual ? 0 : activeFluids.length)) * 7,
                      y: fourChestMap[k],
                    },
                    request_filters: [
                      {
                        index: 1,
                        name: stack[0],
                        count: stack[1] * StackData[stack[0] as keyof typeof StackData],
                      },
                    ],
                  },
                ];
              })
            )
          : [];
      const two = Math.ceil((car.length - four * 4) / 2);

      const twoStacks: Entity[] =
        two !== 0
          ? Array.from(Array(two).keys()).flatMap((j) =>
              Array.from(Array(j === two - 1 && car.length % 2 !== 0 ? car.length % 2 : 2).keys()).flatMap((k) => {
                const stack = car[j * 2 + four * 4 + k];
                const offset = (cars.slice(0, i).reduce((l, car) => l + car.length, 0) + four * 4 + j * 2 + k) * 2;
                return [
                  {
                    entity_number: entities.length + offset + 1,
                    name: 'fast-inserter',
                    position: {
                      x: -5.5 + j + four - (cars.length - i + (other.dual ? 0 : activeFluids.length)) * 7,
                      y: twoInserterMap[k],
                    },
                    direction: k >= 1 ? 4 : 0,
                  },
                  {
                    entity_number: entities.length + offset + 2,
                    name: 'logistic-chest-requester',
                    position: {
                      x: -5.5 + j + four - (cars.length - i + (other.dual ? 0 : activeFluids.length)) * 7,
                      y: twoChestMap[k],
                    },
                    request_filters: [
                      {
                        index: 1,
                        name: stack[0],
                        count: stack[1] * StackData[stack[0] as keyof typeof StackData],
                      },
                    ],
                  },
                ];
              })
            )
          : [];
      return [...fourStacks, ...twoStacks];
    });
    entities = entities.concat(insertersAndChests);
    const tanks: Entity[] = activeFluids.flatMap((_, i) => [
      {
        entity_number: entities.length + 1 + i * 2,
        name: 'storage-tank',
        direction: 2,
        position: {
          x: -4.5 - 7 * (activeFluids.length - i + (other.dual ? cars.length : 0)),
          y: -6.5,
        },
      },
      {
        entity_number: entities.length + 2 + i * 2,
        name: 'storage-tank',
        position: {
          x: -1.5 - 7 * (activeFluids.length - i + (other.dual ? cars.length : 0)),
          y: -6.5,
        },
      },
    ]);
    entities = entities.concat(tanks);
    const pumps: Entity[] = activeFluids.map((_, i) => ({
      entity_number: entities.length + 1 + i,
      name: 'pump',
      position: {
        x: -0.5 - 7 * (activeFluids.length - i + (other.dual ? cars.length : 0)),
        y: -4,
      },
      direction: 4,
    }));
    entities = entities.concat(pumps);
    entities = addRailsAndSignals(entities, cars.length + activeFluids.length, other.dual);
    const leadLocomotive: Entity = {
      entity_number: entities.length + 1,
      name: 'locomotive',
      position: {
        x: -3,
        y: -2,
      },
      orientation: 0.25,
    };
    entities.push(leadLocomotive);
    let trailingLocomotive: Entity | undefined;
    if (other.dual) {
      trailingLocomotive = {
        entity_number: entities.length + 1,
        name: 'locomotive',
        position: {
          x: -10 - (cars.length + activeFluids.length) * 7,
          y: -2,
        },
        orientation: 0.75,
      };
      entities.push(trailingLocomotive);
    }
    entities = entities.concat(
      activeFluids.map((_, i) => ({
        entity_number: entities.length + 1 + i,
        name: 'fluid-wagon',
        position: {
          x: -3 - (activeFluids.length - i + (other.dual ? cars.length : 0)) * 7,
          y: -2,
        },
        orientation: 0.75,
      }))
    );
    entities = entities.concat(
      cars.map((slots, i) => ({
        entity_number: entities.length + 1 + i,
        name: 'cargo-wagon',
        position: {
          x: -3 - (cars.length - i + (other.dual ? 0 : activeFluids.length)) * 7,
          y: -2,
        },
        inventory: {
          filters: slots.flatMap(([name, stacks], i) =>
            Array.from(Array(stacks).keys()).map((j) => ({
              name: name,
              index: 1 + j + slots.slice(0, i).reduce((s, [_, number]) => s + number, 0),
            }))
          ),
        },
        orientation: 0.75,
      }))
    );
    if (other.fuel !== '--') {
      const fuelId = Object.entries(FuelType).find(([k, v]) => k === other.fuel)?.[1]!;
      entities.push({
        entity_number: entities.length + 1,
        name: 'logistic-chest-requester',
        position: {
          x: -3.5,
          y: -4.5,
        },
        request_filters: [
          {
            index: 1,
            name: fuelId,
            count: StackData[fuelId as keyof typeof StackData] * 3,
          },
        ],
      });
      entities.push({
        entity_number: entities.length + 1,
        name: 'fast-inserter',
        position: {
          x: -3.5,
          y: -3.5,
        },
      });
      if (other.dual) {
        entities.push({
          entity_number: entities.length + 1,
          name: 'logistic-chest-requester',
          position: {
            x: -9.5 - (cars.length + activeFluids.length) * 7,
            y: -4.5,
          },
          request_filters: [
            {
              index: 1,
              name: fuelId,
              count: StackData[fuelId as keyof typeof StackData] * 3,
            },
          ],
        });
        entities.push({
          entity_number: entities.length + 1,
          name: 'fast-inserter',
          position: {
            x: -9.5 - (cars.length + activeFluids.length) * 7,
            y: -3.5,
          },
        });
      }
    }
    const schedules: Schedule[] = [
      {
        locomotives: [],
        schedule: [
          {
            station: 'Engineering Pickup',
            wait_conditions: [
              {
                compare_type: 'or',
                type: 'full',
              },
            ],
          },
          {
            station: 'Engineering Dropoff',
            wait_conditions: [
              {
                compare_type: 'or',
                type: 'inactivity',
                ticks: 1800,
              },
            ],
          },
        ],
      },
    ];
    schedules[0].locomotives.push(leadLocomotive.entity_number);
    if (trailingLocomotive) {
      schedules[0].locomotives.push(trailingLocomotive.entity_number);
    }

    return {
      item: 'blueprint',
      label: 'Engineering Provider',
      entities: entities,
      tiles: [],
      icons: [],
      schedules: schedules,
      version: 77311705089,
    };
  }, [activeFluids, cars, other.dual, other.fuel]);
  const book: BlueprintBook = useMemo(
    () => ({
      item: 'blueprint-book',
      label: 'Engineering Stations',
      blueprints: [
        {
          blueprint: receiverStation,
          index: 0,
        },
        {
          blueprint: providerStation,
          index: 1,
        },
      ],
      active_index: 0,
      version: 77311705089,
    }),
    [providerStation, receiverStation]
  );

  const bookstring = useMemo(
    () => `0${btoa(pako.deflate(JSON.stringify({ blueprint_book: book }), { to: 'string' }))}`,
    [book]
  );
  return (
    <div>
      <h2>Blueprint String</h2>
      <div style={{ border: '1px solid black', wordBreak: 'break-all', textAlign: 'left', margin: '0 100px 20px' }}>
        <code>{bookstring}</code>
      </div>
      <button onClick={() => setShowUnpacked((showUnpacked) => !showUnpacked)}>
        {showUnpacked ? 'Hide' : 'Show'} Unpacked
      </button>
      {showUnpacked && (
        <div style={{ border: '1px solid black', wordBreak: 'break-all', textAlign: 'left', margin: '0 100px 20px' }}>
          <pre>{JSON.stringify({ blueprint_book: book }, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}
