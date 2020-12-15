import { QuestParticipantStatusType } from "./Quest";

type DiceType = {
  times: number;
  value: number;
};

//Weapon or Attack
type WeaponType = {
  name: string;
  dmgDice: DiceType | DiceType[];
  atkBonus?: number;
  dmgDiceBonus?: number;
  dmgType?: string;
};

type InitCharacterType = {
  id: null;
  loading: true;
};

type NoCharacterType = {
  id: null;
  loading: false;
};

export type CharacterDataType = {
  id: string;
  currentQuest: string;
  loading?: false;
  status?: QuestParticipantStatusType; // Used in CharacterTile -> Controls
  // Base info
  name: string;
  level: number;
  class: string;
  race: string;
  background: string;
  alignment: string;
  exp: number;

  // Character infos
  personality: string;
  ideal: string;
  bonds: string;
  flaws: string;

  // Other
  features: {
    title: string;
    desc: string;
  };
  proficiencies: string[];
  languages: string[];

  // Money
  cp: number;
  sp: number;
  ep: number;
  gp: number;
  pp: number;

  // hp
  alive: boolean;
  maxHealth: number;
  health: number;
  tempHealp: number;
  healthDice: DiceType | DiceType[];

  deathSuccess: number;
  deathFailure: number;

  // Equipment
  weapons: WeaponType[];
  backpack: string;

  // Stats
  armorClass: number;
  initiative: number;
  speed: number;
  proficiencyBonus: number;

  strength: number; // Modifier = Math.floor(strength / 2) - 5
  dexterity: number;
  constitution: number;
  intelligence: number;
  wisdom: number;
  charisma: number;

  savingStrength: number; // default: strengthModifier + savingStrength ? 2 : 0
  savingDexterity: number;
  savingConstitution: number;
  savingIntelligence: number;
  savingWisdom: number;
  savingCharisma: number;

  acrobatics: number;
  animal: number;
  arcana: number;
  athletics: number;
  deception: number;
  history: number;
  insight: number;
  intimidation: number;
  investigation: number;
  medicine: number;
  nature: number;
  perception: number;
  perfomance: number;
  persuasion: number;
  religion: number;
  sleightOfHand: number;
  stealth: number;
  survival: number;

  passiveWisdom: number;
};

export type CharacterType =
  | InitCharacterType
  | NoCharacterType
  | CharacterDataType;
