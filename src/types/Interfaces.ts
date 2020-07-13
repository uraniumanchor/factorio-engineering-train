export interface Color {
  r: number;
  g: number;
  b: number;
  a: number;
}

export interface ConnectionData {
  entity_id: number;
  circuit_id?: number; // which side, for dual-connections
}

export interface Connection {
  red?: ConnectionData[];
  green?: ConnectionData[];
}

export type CircuitConnection = {
  1: Connection;
  2?: Connection;
};

// export interface ItemRequest {}

export interface ItemFilter {
  name: string;
  index: number;
}

export interface Inventory {
  filters: ItemFilter[];
  bar?: number;
}

export interface LogisticFilter {
  name: string;
  index: number;
  count: number;
}

export interface Entity {
  entity_number: number;
  name: string;
  position: Position;
  direction?: number; // for non-train bits
  orientation?: number; // for train bits
  connections?: CircuitConnection;
  control_behavior?: any; // FIXME
  // items?: ItemRequest[]; // unused? maybe for modules or train fuel?
  recipe?: string; // assemblers
  bar?: number; // containers
  inventory?: Inventory; // containers
  type?: 'input' | 'output'; // underground/loaders
  input_priority?: 'right' | 'left'; // splitters
  output_priority?: 'right' | 'left'; // splitters
  filter?: string; // splitters
  filters?: ItemFilter[]; // filter inserters
  filter_mode?: 'whitelist' | 'blacklist'; // filter inserters
  override_stack_size?: number; // inserters
  drop_position?: number; // inserters
  pickup_position?: number; // inserters
  request_filters?: LogisticFilter[]; // logistic chests
  request_from_buffers?: boolean; // buffer chests
  // some other crap we don't need
  color?: Color; // station color
  station?: string; // station name
}

export interface Position {
  x: number;
  y: number;
}

export interface Tile {
  name: string;
  position: Position;
}

export interface SignalID {
  name: string;
  type: 'item' | 'fluid' | 'virtual';
}

export interface Icon {
  index: number;
  signal: SignalID;
}

export interface CircuitCondition {
  hmm: boolean;
}

export interface WaitCondition {
  type:
    | 'time'
    | 'inactivity'
    | 'full'
    | 'empty'
    | 'item_count'
    | 'circuit'
    | 'robots_inactive'
    | 'fluid_count'
    | 'passenger_present'
    | 'passenger_not_present';
  compare_type: 'and' | 'or';
  ticks?: number;
  condition?: CircuitCondition;
}

export interface ScheduleRecord {
  station: string;
  wait_conditions: WaitCondition[];
}

export interface Schedule {
  schedule: ScheduleRecord[];
  locomotives: number[];
}

export interface Blueprint {
  item: 'blueprint';
  label: string;
  label_color?: Color;
  entities: Entity[];
  tiles: Tile[];
  icons: Icon[];
  schedules: Schedule[];
  version: number;
}

export interface BlueprintBook {
  item: 'blueprint-book';
  label: string;
  label_color?: Color;
  blueprints: {
    blueprint: Blueprint;
    index: number;
  }[];
  active_index: number;
  version: number;
}
