import React, { useState } from "react";
import { useParams } from "react-router-dom";

import { CharacterDataType } from "../types/Character";
import useInputs from "../hooks/useInputs";
import { Tab } from "../components/Tabs";

import styles from "../styles/CreateCharacter.module.scss";

function CreateCharacter() {
  const inputs = useInputs({
    // Base info
    name: "",
    class: "",
    race: "",
    background: "",
    alignment: "",

    // Character infos
    personality: "",
    ideal: "",
    bonds: "",
    flaws: "",
    features: "",
    proficiencies: "",

    // Money
    cp: 0,
    sp: 0,
    ep: 0,
    gp: 0,
    pp: 0,

    // hp
    maxHealth: 0,
    tempHealp: 0,
    // Equipment
    backpack: "",

    // Stats
    armorClass: 0,
    initiative: 0,
    speed: 0,
    proficiencyBonus: 0,

    strength: 0, // Modifier = Math.floor(strength / 2) - 5
    dexterity: 0,
    constitution: 0,
    intelligence: 0,
    wisdom: 0,
    charisma: 0,

    savingStrength: 0, // default: strengthModifier + savingStrength ? 2 : 0
    savingDexterity: 0,
    savingConstitution: 0,
    savingIntelligence: 0,
    savingWisdom: 0,
    savingCharisma: 0,

    passiveWisdom: 0,

    acrobatics: 0,
    animal: 0,
    arcana: 0,
    athletics: 0,
    deception: 0,
    history: 0,
    insight: 0,
    intimidation: 0,
    investigation: 0,
    medicine: 0,
    nature: 0,
    perception: 0,
    perfomance: 0,
    persuasion: 0,
    religion: 0,
    sleightOfHand: 0,
    stealth: 0,
    survival: 0,
  });
  const { step: urlStep } = useParams();
  const [step, setStep] = useState(urlStep ? urlStep : 0);

  const submit = function (e: any) {
    e.preventDefault();
    let res = {
      // CharacterDataType
      /* weapons: [], */
      /* healthDice: null, */

      alive: true,
      level: 1,
      exp: 0,
      deathSuccess: 0,
      deathFailure: 0,

      name: inputs.name.value,
      class: inputs.class.value,
      race: inputs.race.value,
      background: inputs.background.value,
      alignment: inputs.alignment.value,
      personality: inputs.personality.value,
      ideal: inputs.ideal.value,
      bonds: inputs.bonds.value,
      flaws: inputs.flaws.value,
      cp: inputs.cp.value,
      sp: inputs.sp.value,
      ep: inputs.ep.value,
      gp: inputs.gp.value,
      pp: inputs.pp.value,
      maxHealth: inputs.maxHealth.value,
      health: inputs.maxHealth.value,
      tempHealp: inputs.tempHealp.value,
      backpack: inputs.backpack.value,
      armorClass: inputs.armorClass.value,
      initiative: inputs.initiative.value,
      speed: inputs.speed.value,
      proficiencyBonus: inputs.proficiencyBonus.value,
      strength: inputs.strength.value, // Modifier = Math.floor(strength / 2) - 5
      dexterity: inputs.dexterity.value,
      constitution: inputs.constitution.value,
      intelligence: inputs.intelligence.value,
      wisdom: inputs.wisdom.value,
      charisma: inputs.charisma.value,
      savingStrength: inputs.savingStrength.value, // default: strengthModifier + savingStrength ? 2 : 0
      savingDexterity: inputs.savingDexterity.value,
      savingConstitution: inputs.savingConstitution.value,
      savingIntelligence: inputs.savingIntelligence.value,
      savingWisdom: inputs.savingWisdom.value,
      savingCharisma: inputs.savingCharisma.value,

      passiveWisdom: inputs.passiveWisdom.value,

      acrobatics: inputs.acrobatics.value,
      animal: inputs.animal.value,
      arcana: inputs.arcana.value,
      athletics: inputs.athletics.value,
      deception: inputs.deception.value,
      history: inputs.history.value,
      insight: inputs.insight.value,
      intimidation: inputs.intimidation.value,
      investigation: inputs.investigation.value,
      medicine: inputs.medicine.value,
      nature: inputs.nature.value,
      perception: inputs.perception.value,
      perfomance: inputs.perfomance.value,
      persuasion: inputs.persuasion.value,
      religion: inputs.religion.value,
      sleightOfHand: inputs.sleightOfHand.value,
      stealth: inputs.stealth.value,
      survival: inputs.survival.value,

      features: inputs.features.value,
      proficiencies: inputs.proficiencies.value,
      
    };
  };

  return (
    <div>
      <h1>Création d'un personnage</h1>
      <form onSubmit={submit} action=''>
        <Tab active={step == 0}>
          <h2>Informations</h2>
          <div className={styles.stringInput}>
            <input
              type='text'
              id='characterNameInput'
              name='characterName'
              required
              {...inputs.name}
            />
            <label htmlFor='characterNameInput'>Nom du personnage</label>
          </div>
          <div className={styles.stringInput}>
            <input type='text' name='race' required {...inputs.race} />
            <label>Race</label>
          </div>
          <div className={styles.stringInput}>
            <input type='text' name='class' required {...inputs.class} />
            <label>Classe</label>
          </div>
          <div className={styles.stringInput}>
            <input
              type='text'
              name='background'
              required
              {...inputs.background}
            />
            <label>Histoire</label>
          </div>
          <div className={styles.stringInput}>
            <input
              type='text'
              name='alignment'
              required
              {...inputs.alignment}
            />
            <label>Alignement</label>
          </div>
        </Tab>
        <h2>Stats</h2>
        <label className={styles.stringInput}>
          Force
          <input type='number' name='strength' {...inputs.strength} />
        </label>
        <label>
          Dexterité
          <input type='number' name='dexterity' {...inputs.dexterity} />
        </label>
        <label>
          Constitution
          <input type='number' name='constitution' {...inputs.constitution} />
        </label>
        <label>
          Intelligence
          <input type='number' name='intelligence' {...inputs.intelligence} />
        </label>
        <label>
          Sagesse
          <input type='number' name='wisdom' {...inputs.wisdom} />
        </label>
        <label>
          Charisme
          <input type='number' name='charisma' {...inputs.charisma} />
        </label>

        <h2>Sauvegarde</h2>
        <label>
          Force
          <input
            type='number'
            name='savingStrength'
            {...inputs.savingStrength}
          />
        </label>
        <label>
          Dexterité
          <input
            type='number'
            name='savingDexterity'
            {...inputs.savingDexterity}
          />
        </label>
        <label>
          Constitution
          <input
            type='number'
            name='savingConstitution'
            {...inputs.savingConstitution}
          />
        </label>
        <label>
          Intelligence
          <input
            type='number'
            name='savingIntelligence'
            {...inputs.savingIntelligence}
          />
        </label>
        <label>
          Sagesse
          <input type='number' name='savingWisdom' {...inputs.savingWisdom} />
        </label>
        <label>
          Charisme
          <input
            type='number'
            name='savingCharisma'
            {...inputs.savingCharisma}
          />
        </label>

        <h2>Compétences</h2>
        <h3>
          Force{" "}
          {inputs.strength.value > 0
            ? `+${inputs.strength.value}`
            : inputs.strength.value}
        </h3>
        <label>
          Athlétisme
          <input type='number' name='athletics' {...inputs.athletics} />
        </label>
        <h3>
          Dexterité{" "}
          {inputs.dexterity.value > 0
            ? `+${inputs.dexterity.value}`
            : inputs.dexterity.value}
        </h3>
        <label>
          Acrobaties
          <input type='number' name='acrobatics' {...inputs.acrobatics} />
        </label>
        <label>
          Escamotage
          <input type='number' name='sleightOfHand' {...inputs.sleightOfHand} />
        </label>
        <label>
          Discrétion
          <input type='number' name='stealth' {...inputs.stealth} />
        </label>
        <h3>
          Intelligence{" "}
          {inputs.intelligence.value > 0
            ? `+${inputs.intelligence.value}`
            : inputs.intelligence.value}
        </h3>
        <label>
          Arcanes
          <input type='number' name='arcana' {...inputs.arcana} />
        </label>
        <label>
          Histoire
          <input type='number' name='history' {...inputs.history} />
        </label>
        <label>
          Investigation
          <input type='number' name='investigation' {...inputs.investigation} />
        </label>
        <label>
          Nature
          <input type='number' name='nature' {...inputs.nature} />
        </label>
        <label>
          Religion
          <input type='number' name='religion' {...inputs.religion} />
        </label>
        <h3>
          Sagesse{" "}
          {inputs.wisdom.value > 0
            ? `+${inputs.wisdom.value}`
            : inputs.wisdom.value}
        </h3>
        <label>
          Dressage
          <input type='number' name='animal' {...inputs.animal} />
        </label>
        <label>
          Intuition
          <input type='number' name='insight' {...inputs.insight} />
        </label>
        <label>
          Médecine
          <input type='number' name='medicine' {...inputs.medicine} />
        </label>
        <label>
          Perception
          <input type='number' name='perception' {...inputs.perception} />
        </label>
        <label>
          Survie
          <input type='number' name='survival' {...inputs.survival} />
        </label>
        <h3>
          Charisme{" "}
          {inputs.charisma.value > 0
            ? `+${inputs.charisma.value}`
            : inputs.charisma.value}
        </h3>
        <label>
          Tromperie
          <input type='number' name='deception' {...inputs.deception} />
        </label>
        <label>
          Intimidation
          <input type='number' name='intimidation' {...inputs.intimidation} />
        </label>
        <label>
          Représentation
          <input type='number' name='perfomance' {...inputs.perfomance} />
        </label>
        <label>
          Persuasion
          <input type='number' name='persuasion' {...inputs.persuasion} />
        </label>
      </form>
    </div>
  );
}

export default CreateCharacter;
