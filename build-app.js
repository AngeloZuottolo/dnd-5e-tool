const fs = require('fs');

// ============================================================
// 1. READ RAW SRD JSON
// ============================================================
const raw = JSON.parse(fs.readFileSync('srd_raw.json', 'utf8'));
const spellEntries = raw.Spellcasting['Spell Descriptions'];
const rawLists = raw.Spellcasting['Spell Lists'];

// ============================================================
// 2. ITALIAN TRANSLATIONS
// ============================================================
const I18N = {
  // UI Labels
  ui: {
    tabSheet: 'Scheda Personaggio',
    tabSpells: 'Incantesimi',
    save: 'Salva',
    load: 'Carica',
    reset: 'Reset',
    charNamePlaceholder: 'Nome personaggio...',
    sheetChar: 'Personaggio',
    sheetName: 'Nome',
    sheetRace: 'Razza',
    sheetClass: 'Classe',
    sheetLevel: 'Livello',
    sheetBg: 'Background',
    sheetAlignment: 'Allineamento',
    sheetXP: 'PX',
    sheetAbilities: 'Caratteristiche',
    pb: 'PB',
    sheetCombat: 'Combattimento',
    hpMax: 'HP Max',
    hpCurrent: 'HP Attuali',
    ac: 'CA',
    initiative: 'Iniziativa',
    speed: 'Velocità',
    hitDice: 'Dadi Vita',
    hdUsed: 'Dadi Vita Usati',
    deathSaves: 'Tiri Salvezza Morte',
    saves: 'Tiri Salvezza',
    skills: 'Abilità',
    attacks: 'Attacchi & Incantesimi',
    addAttack: '+ Aggiungi Attacco',
    attackName: 'Nome',
    attackBonus: 'Bonus',
    attackDamage: 'Danno',
    attackType: 'Tipo',
    attackNotes: 'Note',
    spellSlots: 'Slot Incantesimi',
    spellbook: 'Grimorio / Incantesimi Preparati',
    features: 'Caratteristiche & Talenti',
    equipment: 'Equipaggiamento',
    featuresPlaceholder: 'Elenco caratteristiche di classe, tratti razziali, talenti...',
    equipmentPlaceholder: 'Armi, armature, oggetti...',
    filterTitle: 'Filtri Incantesimi',
    filterName: 'Cerca',
    filterClass: 'Classe',
    filterLevel: 'Livello',
    filterSchool: 'Scuola',
    filterComponents: 'Componenti',
    filterConc: 'Concentrazione',
    filterRitual: 'Rituale',
    filterDamage: 'Danno',
    filterSave: 'Tiro Salvezza',
    filterReset: 'Reset Filtri',
    allClasses: 'Tutte',
    anyLevel: 'Tutti',
    anySchool: 'Tutte',
    anyComponents: 'Qualsiasi',
    anyDamage: 'Qualsiasi',
    anySave: 'Qualsiasi',
    cantrip: 'Cantrip',
    level: 'Livello',
    spellsFound: 'incantesimi trovati',
    noSpells: 'Nessun incantesimo disponibile per questa classe.',
    noAttacks: 'Nessun attacco. Aggiungine uno!',
    sortName: 'Nome',
    sortLevel: 'Liv',
    sortSchool: 'Scuola',
    sortTime: 'Tempo',
    sortRange: 'Gittata',
    sortComp: 'Comp',
    sortDuration: 'Durata',
    sortTags: 'Tag',
    sortClasses: 'Classi',
    prepared: 'preparati',
    castingTime: 'Tempo di lancio',
    range: 'Gittata',
    components: 'Componenti',
    duration: 'Durata',
    tags: 'Tag',
    save: 'Tiro Salvezza',
    damageType: 'Tipo Danno',
    classes: 'Classi',
    verbal: 'Verbale',
    somatic: 'Somatica',
    material: 'Materiale',
    ritual: 'Rituale',
    concentration: 'Concentrazione',
    higherLevels: 'A livelli superiori',
    loadError: 'Errore nel caricamento del file',
    resetConfirm: 'Cancellare tutti i dati del personaggio?',
    lang: 'Lingua',
    success: 'Successi',
    fail: 'Fallimenti',
    max: 'Max',
    usedPlural: 'Usati',
    subtitle: 'sottotitolo'
  },

  // Ability scores
  abilitiesIT: {
    strength: 'Forza',
    dexterity: 'Destrezza',
    constitution: 'Costituzione',
    intelligence: 'Intelligenza',
    wisdom: 'Saggezza',
    charisma: 'Carisma'
  },
  abbrIT: ['FOR', 'DES', 'COS', 'INT', 'SAG', 'CAR'],
  abbrEN: ['STR', 'DEX', 'CON', 'INT', 'WIS', 'CHA'],

  // Skills (18 SRD)
  skillsIT: [
    {name:'Acrobazia',ab:1},{name:'Addestrare Animali',ab:4},{name:'Arcano',ab:3},
    {name:'Atletica',ab:0},{name:'Fare Spettacoli',ab:5},{name:'Furtività',ab:1},
    {name:'Indagare',ab:3},{name:'Inganno',ab:5},{name:'Intimidire',ab:5},
    {name:'Intuizione',ab:4},{name:'Investigare',ab:3},{name:'Medicina',ab:4},
    {name:'Natura',ab:3},{name:'Percezione',ab:4},{name:'Persuasione',ab:5},
    {name:'Religione',ab:3},{name:'Rapidità di Mano',ab:1},{name:'Sopravvivenza',ab:4},
    {name:'Storia',ab:3}
  ],
  skillsEN: [
    {name:'Acrobatics',ab:1},{name:'Animal Handling',ab:4},{name:'Arcana',ab:3},
    {name:'Athletics',ab:0},{name:'Performance',ab:5},{name:'Stealth',ab:1},
    {name:'Investigate',ab:3},{name:'Deception',ab:5},{name:'Intimidation',ab:5},
    {name:'Insight',ab:4},{name:'Investigation',ab:3},{name:'Medicine',ab:4},
    {name:'Nature',ab:3},{name:'Perception',ab:4},{name:'Persuasion',ab:5},
    {name:'Religion',ab:3},{name:'Sleight of Hand',ab:1},{name:'Survival',ab:4},
    {name:'History',ab:3}
  ],

  // Schools of Magic
  schoolsEN: {
    Abju: 'Abjuration',
    Conj: 'Conjuration',
    Divi: 'Divination',
    Ench: 'Enchantment',
    Evoc: 'Evocation',
    Illu: 'Illusion',
    Necr: 'Necromancy',
    Tran: 'Transmutation'
  },
  schoolsIT: {
    Abju: 'Abiurazione',
    Conj: 'Evocazione',
    Divi: 'Divinazione',
    Ench: 'Ammaliamento',
    Evoc: 'Invocazione',
    Illu: 'Illusione',
    Necr: 'Necromanzia',
    Tran: 'Trasmutazione'
  },
  schoolColors: {
    Abju: '#4a90d9',
    Conj: '#7b68ee',
    Divi: '#d4a574',
    Ench: '#e87d8a',
    Evoc: '#e94560',
    Illu: '#9b59b6',
    Necr: '#2ecc71',
    Tran: '#f5a623'
  },

  // Classes
  classEN: {
    Bard: 'Bard', Cleric: 'Cleric', Druid: 'Druid',
    Paladin: 'Paladin', Ranger: 'Ranger', Sorcerer: 'Sorcerer',
    Warlock: 'Warlock', Wizard: 'Wizard'
  },
  classIT: {
    Bard: 'Bardo', Cleric: 'Chierico', Druid: 'Druido',
    Paladin: 'Paladino', Ranger: 'Ranger', Sorcerer: 'Stregone',
    Warlock: 'Warlock', Wizard: 'Mago'
  },

  // Spell names (EN -> IT)
  spellNames: {
    'Acid Arrow': 'Freccia Acida',
    'Acid Splash': 'Spruzzo Acido',
    'Aid': 'Aiuto',
    'Alarm': 'Allarme',
    'Alter Self': 'Alterare Se Stessi',
    'Animal Messenger': 'Messaggero Animale',
    'Animal Shapes': 'Forme Animali',
    'Animate Dead': 'Animare Morti',
    'Animate Objects': 'Animare Oggetti',
    'Antilife Shell': 'Barriera Anti-Vita',
    'Antimagic Field': 'Campo Anti-Magia',
    'Antipathy/Sympathy': 'Antipatia/Simpatia',
    'Arcane Eye': 'Occhio Arcano',
    'Arcane Hand': 'Mano Arcana',
    'Arcane Lock': 'Serratura Arcana',
    'Arcane Sword': 'Spada Arcana',
    'Astral Projection': 'Proiezione Astrale',
    'Augury': 'Augurio',
    'Awaken': 'Risveglio',
    'Bane': 'Anatema',
    'Banishment': 'Esilio',
    'Barkskin': 'Pelle Coriacea',
    'Beacon of Hope': 'Faro di Speranza',
    'Bestow Curse': 'Infliggere Maledizione',
    'Blade Barrier': 'Barriera di Lame',
    'Bless': 'Benedizione',
    'Blight': 'Piaga',
    'Blindness/Deafness': 'Cecità/Sordità',
    'Blink': 'Sbattere le Palpebre',
    'Blur': 'Offuscamento',
    'Branding Smite': 'Punizione Marchiante',
    'Burning Hands': 'Mani Brucianti',
    'Call Lightning': 'Invocare Fulmine',
    'Calm Emotions': 'Calmare Emozioni',
    'Chain Lightning': 'Catena di Fulmini',
    'Charm Person': 'Charme su Persone',
    'Chill Touch': 'Tocco Gelido',
    'Circle of Death': 'Cerchio di Morte',
    'Clairvoyance': 'Chiaroveggenza',
    'Clone': 'Clonare',
    'Cloud of Daggers': 'Nube di Pugnali',
    'Cloudkill': 'Nube Mortale',
    'Color Spray': 'Spruzzo Colorato',
    'Command': 'Comando',
    'Commune': 'Comunione',
    'Commune with Nature': 'Comunione con la Natura',
    'Comprehend Languages': 'Comprendere Linguaggi',
    'Cone of Cold': 'Cono di Freddo',
    'Confusion': 'Confusione',
    'Conjure Animals': 'Evocare Animali',
    'Conjure Celestial': 'Evocare Celestiale',
    'Conjure Elemental': 'Evocare Elementale',
    'Conjure Fey': 'Evocare Folletto',
    'Conjure Minor Elementals': 'Evocare Elementali Minori',
    'Conjure Woodland Beings': 'Evocare Esseri Silvestri',
    'Contact Other Plane': 'Contattare Altri Piani',
    'Contagion': 'Contagio',
    'Contingency': 'Contingenza',
    'Continuous Flame': 'Fiamma Continua',
    'Control Water': 'Controllare Acqua',
    'Control Weather': 'Controllare Tempo Atmosferico',
    'Counterspell': 'Controincantesimo',
    'Create Food and Water': 'Creare Cibo e Acqua',
    'Create or Destroy Water': 'Creare o Distruggere Acqua',
    'Creation': 'Creazione',
    'Cure Wounds': 'Cura Ferite',
    'Dancing Lights': 'Luci Danzanti',
    'Darkness': 'Oscurità',
    'Darkvision': 'Scurovisione',
    'Daylight': 'Luce Diurna',
    'Death Ward': 'Protezione dalla Morte',
    'Delayed Blast Fireball': 'Palla di Fuoco Ritardata',
    'Demiplane': 'Semipiano',
    'Detect Evil and Good': 'Individuazione del Bene e del Male',
    'Detect Magic': 'Individuazione del Magico',
    'Detect Poison and Disease': 'Individuazione di Veleni e Malattie',
    'Detect Thoughts': 'Individuazione dei Pensieri',
    'Dimension Door': 'Porta Dimensionale',
    'Disguise Self': 'Camuffare Se Stessi',
    'Disintegrate': 'Disintegrare',
    'Dispel Evil and Good': 'Dissolvere Bene e Male',
    'Dispel Magic': 'Dissolvere Magie',
    'Divination': 'Divinazione',
    'Divine Favor': 'Favore Divino',
    'Divine Word': 'Parola Divina',
    'Dominate Beast': 'Dominare Bestia',
    'Dominate Person': 'Dominare Persona',
    'Dominate Monster': 'Dominare Mostro',
    'Dream': 'Sogno',
    'Druidcraft': 'Druidismo',
    'Earthquake': 'Terremoto',
    'Eldritch Blast': 'Bomba Eldritch',
    'Enhance Ability': 'Potenziare Caratteristica',
    'Enlarge/Reduce': 'Ingrandire/Rimpicciolire',
    'Entangle': 'Intralciare',
    'Enthrall': 'Affascinare',
    'Etherealness': 'Ethereità',
    'Expeditious Retreat': 'Ritirata Rapida',
    'Eyebite': 'Sguardo Malefico',
    'Fabricate': 'Fabbricare',
    'Faerie Fire': 'Fuoco Fatato',
    'False Life': 'Vita Falsata',
    'Fear': 'Paura',
    'Feather Fall': 'Caduta Morbida',
    'Find Steed': 'Cercare Destriero',
    'Find the Path': 'Trovare il Sentiero',
    'Find Traps': 'Trovare Trappole',
    'Finger of Death': 'Dito di Morte',
    'Fire Bolt': 'Dardo di Fuoco',
    'Fire Shield': 'Scudo di Fuoco',
    'Fire Storm': 'Tempesta di Fuoco',
    'Fireball': 'Palla di Fuoco',
    'Flame Blade': 'Lama Fiammeggiante',
    'Flame Strike': 'Colpo Fiammeggiante',
    'Flaming Sphere': 'Sfera Fiammeggiante',
    'Flesh to Stone': 'Carne in Pietra',
    'Fly': 'Volare',
    'Fog Cloud': 'Nube di Nebbia',
    'Forbiddance': 'Proibizione',
    'Forcecage': 'Gabbia di Forza',
    'Foresight': 'Preveggenza',
    'Freedom of Movement': 'Libertà di Movimento',
    'Freezing Sphere': 'Sfera Gelida',
    'Gaseous Form': 'Forma Gassosa',
    'Gate': 'Portale',
    'Geas': 'Costrizione',
    'Gentle Repose': 'Riposo Gentile',
    'Giant Insect': 'Insetto Gigante',
    'Glibness': 'Loquacità',
    'Globe of Invulnerability': 'Globo di Invulnerabilità',
    'Glyph of Warding': 'Glifo di Interdizione',
    'Goodberry': 'Bacche Benefiche',
    'Grease': 'Unto',
    'Greater Invisibility': 'Invisibilità Superiore',
    'Greater Restoration': 'Ristorare Superiore',
    'Guards and Wards': 'Guardie e Custodie',
    'Guidance': 'Guida',
    'Guiding Bolt': 'Dardo Guidato',
    'Gust of Wind': 'Raffica di Vento',
    'Hallow': 'Consacrare',
    'Hallucinatory Terrain': 'Terreno Allucinatorio',
    'Harm': 'Danneggiare',
    'Haste': 'Velocità',
    'Heal': 'Guarigione',
    'Healing Word': 'Parola Guaritrice',
    'Heat Metal': 'Riscaldare Metallo',
    'Hellish Rebuke': 'Rimprovero Infernale',
    'Heroes\' Feast': 'Banchetto degli Eroi',
    'Heroism': 'Eroismo',
    'Hideous Laughter': 'Risata Incontenibile',
    'Hold Monster': 'Bloccare Mostro',
    'Hold Person': 'Bloccare Persona',
    'Holy Aura': 'Aura Sacra',
    'Hunters Mark': 'Marchio del Cacciatore',
    'Hypnotic Pattern': 'Motivo Ipnotico',
    'Ice Storm': 'Tempesta di Ghiaccio',
    'Identify': 'Identificare',
    'Illusory Script': 'Scritto Illusorio',
    'Imprisonment': 'Imprigionare',
    'Incendiary Cloud': 'Nube Incendiaria',
    'Inflict Wounds': 'Infliggere Ferite',
    'Insect Plague': 'Piaga di Insetti',
    'Instant Summons': 'Convocazione Istantanea',
    'Invisibility': 'Invisibilità',
    'Irresistible Dance': 'Danza Irresistibile',
    'Jump': 'Saltare',
    'Knock': 'Sbattere',
    'Legend Lore': 'Leggende',
    'Lesser Restoration': 'Ristorare Inferiore',
    'Levitate': 'Levitate',
    'Light': 'Luce',
    'Lightning Bolt': 'Fulmine',
    'Locate Animals or Plants': 'Individuare Animali o Piante',
    'Locate Creature': 'Individuare Creatura',
    'Locate Object': 'Individuare Oggetto',
    'Longstrider': 'Passo Veloce',
    'Mage Armor': 'Armatura del Mago',
    'Mage Hand': 'Mano Magica',
    'Magic Circle': 'Cerchio Magico',
    'Magic Jar': 'Giara Magica',
    'Magic Missile': 'Dardo Incantato',
    'Magic Mouth': 'Bocca Magica',
    'Magic Weapon': 'Arma Magica',
    'Major Image': 'Immagine Maggiore',
    'Mass Cure Wounds': 'Cura Ferite di Massa',
    'Mass Heal': 'Guarigione di Massa',
    'Mass Suggestion': 'Suggerimento di Massa',
    'Maze': 'Labirinto',
    'Meld into Stone': 'Fondersi nella Pietra',
    'Mending': 'Riparare',
    'Message': 'Messaggio',
    'Meteor Swarm': 'Sciame di Meteore',
    'Mind Blank': 'Mente Vuota',
    'Minor Illusion': 'Illusione Minore',
    'Mirage Arcane': 'Miraggio Arcano',
    'Mirror Image': 'Immagine Speculare',
    'Mislead': 'Sviare',
    'Misty Step': 'Passo Nebuloso',
    'Modify Memory': 'Modificare Memoria',
    'Moonbeam': 'Raggio di Luna',
    'Move Earth': 'Spostare Terra',
    'Nondetection': 'Non Individuabilità',
    'Pass without Trace': 'Passare Senza Tracce',
    'Passwall': 'Passamuro',
    'Phantasmal Killer': 'Assassino Fantasmatico',
    'Phantom Steed': 'Destriero Spettrale',
    'Planar Ally': 'Alleato Planare',
    'Planar Binding': 'Legame Planare',
    'Plane Shift': 'Spostamento Planare',
    'Plant Growth': 'Crescita Vegetale',
    'Poison Spray': 'Spruzzo Velenoso',
    'Polymorph': 'Polimorfare',
    'Power Word Heal': 'Parola del Potere Guarire',
    'Power Word Kill': 'Parola del Potere Uccidere',
    'Power Word Stun': 'Parola del Potere Stordire',
    'Prayer of Healing': 'Preghiera di Guarigione',
    'Prestidigitation': 'Prestidigitazione',
    'Prismatic Spray': 'Spruzzo Prismatico',
    'Prismatic Wall': 'Muro Prismatico',
    'Produce Flame': 'Produrre Fiamma',
    'Programmed Illusion': 'Illusione Programmata',
    'Project Image': 'Immagine Proiettata',
    'Protection from Energy': 'Protezione dall\'Energia',
    'Protection from Evil and Good': 'Protezione dal Bene e dal Male',
    'Protection from Poison': 'Protezione dai Veleni',
    'Purify Food and Drink': 'Purificare Cibo e Bevande',
    'Raise Dead': 'Alzare Morti',
    'Ray of Enfeeblement': 'Raggio di Indebolimento',
    'Ray of Frost': 'Raggio Gelido',
    'Ray of Sickness': 'Raggio di Infermità',
    'Regenerate': 'Rigenerare',
    'Reincarnate': 'Reincarnazione',
    'Remove Curse': 'Rimuovere Maledizione',
    'Resistance': 'Resistenza',
    'Resurrection': 'Resurrezione',
    'Reverse Gravity': 'Invertire Gravità',
    'Revivify': 'Rianimare',
    'Rope Trick': 'Trucco della Corda',
    'Sacred Flame': 'Fiamma Sacra',
    'Sanctuary': 'Santuario',
    'Scorching Ray': 'Raggio Rovente',
    'Scrying': 'Scrutare',
    'Searing Smite': 'Punizione Incandescente',
    'See Invisibility': 'Vedere Invisibilità',
    'Seeming': 'Parvenza',
    'Sending': 'Inviare Messaggio',
    'Sequester': 'Segregare',
    'Shapechange': 'Cambiare Forma',
    'Shatter': 'Frantumare',
    'Shield': 'Scudo',
    'Shield of Faith': 'Scudo della Fede',
    'Shillelagh': 'Bastone Magico',
    'Shocking Grasp': 'Scossa',
    'Silence': 'Silenzio',
    'Silent Image': 'Immagine Silenziosa',
    'Simulacrum': 'Simulacro',
    'Sleep': 'Sonno',
    'Sleet Storm': 'Tempesta di Nevischio',
    'Slow': 'Rallentare',
    'Spare the Dying': 'Differire la Morte',
    'Speak with Animals': 'Parlare con gli Animali',
    'Speak with Dead': 'Parlare con i Morti',
    'Speak with Plants': 'Parlare con le Piante',
    'Spider Climb': 'Camminare sui Muri',
    'Spike Growth': 'Crescita di Spine',
    'Spirit Guardians': 'Guardiani Spirituali',
    'Spiritual Weapon': 'Arma Spirituale',
    'Stinking Cloud': 'Nube Maleodorante',
    'Stone Shape': 'Plasmare Pietra',
    'Stoneskin': 'Pelle di Pietra',
    'Storm of Vengeance': 'Tempesta di Vendetta',
    'Suggestion': 'Suggerimento',
    'Sunbeam': 'Raggio di Sole',
    'Sunburst': 'Esplosione Solare',
    'Symbol': 'Simbolo',
    'Tasha\'s Hideous Laughter': 'Risata Incontenibile di Tasha',
    'Telekinesis': 'Telecinesi',
    'Telepathic Bond': 'Legame Telepatico',
    'Teleport': 'Teletrasporto',
    'Teleportation Circle': 'Cerchio di Teletrasporto',
    'Tenser\'s Floating Disk': 'Disco Fluttuante di Tenser',
    'Thaumaturgy': 'Taumaturgia',
    'Thunderwave': 'Onda Tonante',
    'Time Stop': 'Fermare il Tempo',
    'Tiny Hut': 'Capanna di Leomund',
    'Tongues': 'Lingue',
    'Transport via Plants': 'Trasporto Vegetale',
    'Tree Stride': 'Passo Alberesco',
    'True Polymorph': 'Polimorfare Vero',
    'True Resurrection': 'Resurrezione Vero',
    'True Seeing': 'Vedere Vero',
    'True Strike': 'Colpo Vero',
    'Unseen Servant': 'Servitore Invisibile',
    'Vampiric Touch': 'Tocco del Vampiro',
    'Vicious Mockery': 'Beffa Crudele',
    'Wall of Fire': 'Muro di Fuoco',
    'Wall of Force': 'Muro di Forza',
    'Wall of Ice': 'Muro di Ghiaccio',
    'Wall of Stone': 'Muro di Pietra',
    'Wall of Thorns': 'Muro di Spine',
    'Warding Bond': 'Legame Protettivo',
    'Water Breathing': 'Respirare Acqua',
    'Water Walk': 'Camminare sull\'Acqua',
    'Web': 'Ragnatela',
    'Weird': 'Terrore',
    'Wind Walk': 'Camminare nel Vento',
    'Wind Wall': 'Muro di Vento',
    'Wish': 'Desiderio',
    'Word of Recall': 'Parola del Ritiro',
    'Zone of Truth': 'Zona di Verità'
  },

  // Level names
  levelPrefix: ['Trucchetti (0)', '1° Livello', '2° Livello', '3° Livello', '4° Livello', '5° Livello', '6° Livello', '7° Livello', '8° Livello', '9° Livello'],
  levelNames: ['Cantrip', '1°', '2°', '3°', '4°', '5°', '6°', '7°', '8°', '9°'],
  levelLabels: ['Trucchetti (0)', '1°', '2°', '3°', '4°', '5°', '6°', '7°', '8°', '9°'],

  // Damage types
  damageIT: {
    Acid: 'Acido',
    Blud: 'Contundente',
    Cold: 'Freddo',
    Fire: 'Fuoco',
    Forc: 'Forza',
    Ligh: 'Fulmine',
    Neco: 'Necrotico',
    Pier: 'Perforante',
    Pois: 'Veleno',
    Psyc: 'Psichico',
    Radi: 'Radioso',
    Slas: 'Tagliente',
    '': ''
  },

  // Save abbreviations
  svEN: { S:'Strength', T:'Dexterity', C:'Constitution', D:'Dexterity', I:'Intelligence', W:'Wisdom', H:'Charisma' },
  svIT: { S:'Forza', T:'Destrezza', C:'Costituzione', D:'Destrezza', I:'Intelligenza', W:'Saggezza', H:'Carisma' }
};

// ============================================================
// 3. PARSE ALL SPELLS
// ============================================================
const NON_SPELLS = new Set(['Precipitation', 'Temperature', 'Wind']);
const SCHOOL_MAP = {
  Abjuration: 'Abju', Conjuration: 'Conj', Divination: 'Divi',
  Enchantment: 'Ench', Evocation: 'Evoc', Illusion: 'Illu',
  Necromancy: 'Necr', Transmutation: 'Tran'
};
const SCHOOL_FULL = { Abju:'Abjuration', Conj:'Conjuration', Divi:'Divination', Ench:'Enchantment', Evoc:'Evocation', Illu:'Illusion', Necr:'Necromancy', Tran:'Transmutation' };

const DAMAGE_MAP = {
  acid: 'Acid', bludgeoning: 'Blud', cold: 'Cold', fire: 'Fire',
  force: 'Forc', lightning: 'Ligh', necrotic: 'Neco', piercing: 'Pier',
  poison: 'Pois', psychic: 'Psyc', radiant: 'Radi', slashing: 'Slas',
  thunder: 'Ligh'
};

const SAVE_MAP = {
  Strength: 'S', Dexterity: 'D', Constitution: 'C',
  Intelligence: 'I', Wisdom: 'W', Charisma: 'H'
};

function parseSpell(name, entry) {
  // Skip non-spells
  if (entry.table || NON_SPELLS.has(name)) return null;

  const content = entry.content;
  if (!content || !Array.isArray(content) || content.length === 0) return null;

  const lines = [];
  // Flatten the content: handle mixed arrays
  for (const item of content) {
    if (typeof item === 'string') {
      lines.push(item);
    } else if (item && item.table) {
      // Convert table to text
      const t = item.table;
      const headers = Object.keys(t);
      if (headers.length > 0) {
        const headerLine = headers.join(' | ');
        lines.push('__TABLE__');
        lines.push(headerLine);
        const maxLen = Math.max(...headers.map(h => (t[h] || []).length));
        for (let i = 0; i < maxLen; i++) {
          lines.push(headers.map(h => (t[h] || [])[i] || '').join(' | '));
        }
        lines.push('__ENDTABLE__');
      }
    }
  }

  // Extract metadata
  let level = 0;
  let schoolShort = '';
  let castingTime = '';
  let range = '';
  let components = '';
  let material = '';
  let duration = '';
  let ritual = false;
  let concentration = false;
  let description = '';
  let higherLevel = '';
  let save = '';
  let damageType = '';
  const classes = [];
  const descLines = [];
  let inHigherLevel = false;

  // Find the first line with level/school info (can be any position)
  let metaLineIdx = -1;
  for (let i = 0; i < lines.length; i++) {
    const l = lines[i];
    if (/^\*[\w\s-]+\s*(?:cantrip|\d+[a-z]+-level\s+\w+)\*/i.test(l) ||
        /^\*\*?[\w\s]*\d+[a-z]*level/i.test(l) ||
        /^\*.+?(?:cantrip|\d+[a-z]+-level)\*/i.test(l)) {
      metaLineIdx = i;
      break;
    }
  }

  if (metaLineIdx === -1) {
    // Try harder - look for lines starting with *something* about level
    for (let i = 0; i < lines.length; i++) {
      if (/^\*[^*]+\*(?:\s|$)/.test(lines[i]) &&
          (lines[i].toLowerCase().includes('level') || lines[i].toLowerCase().includes('cantrip'))) {
        metaLineIdx = i;
        break;
      }
    }
  }

  if (metaLineIdx === -1) return null;

  const metaLine = lines[metaLineIdx];

  // Parse level & school
  const lvlMatch = metaLine.match(/(\d+)[a-z]*-level\s+(\w+)/i);
  if (lvlMatch) {
    level = parseInt(lvlMatch[1]);
    schoolShort = SCHOOL_MAP[lvlMatch[2]] || lvlMatch[2].substring(0, 4);
  } else {
    const cantripMatch = metaLine.match(/(\w+)\s+cantrip/i);
    if (cantripMatch) {
      level = 0;
      schoolShort = SCHOOL_MAP[cantripMatch[1]] || cantripMatch[1].substring(0,4);
    }
  }

  // Ritual
  if (/\britual\b/i.test(lines[metaLineIdx])) {
    ritual = true;
  }

  // Scan all lines for metadata fields (handle both normal and inline)
  let allText = lines.join('\n');

  // Casting time can be in various formats
  for (const l of lines) {
    // Handle inline: "**Casting Time:** 1 action **Range:** 30 feet **Components:** V, S"
    // Split by **field** patterns
    const fields = l.split(/(\*\*[^*]+\*\*:)/).filter(Boolean);
    if (fields.length > 1) {
      let currentField = '';
      for (let fi = 0; fi < fields.length; fi++) {
        const tok = fields[fi].trim();
        if (tok.startsWith('**') && tok.endsWith(':') || tok.startsWith('**') && tok.endsWith('**:')) {
          currentField = tok.replace(/\*\*/g, '').replace(/:$/, '').trim().toLowerCase();
        } else if (currentField && tok) {
          if (currentField === 'casting time') { castingTime = castingTime || tok; }
          else if (currentField === 'range') { range = range || tok; }
          else if (currentField === 'components' || currentField === 'component') { components = components || tok; }
          else if (currentField === 'duration') { duration = duration || tok; }
          currentField = '';
        }
      }
    }
  }

  // Fallback: look for **Field:** patterns
  const ctMatch = allText.match(/\*\*Casting Time:\*\*\s*(.*?)(?:\n|\*\*Range:|$)/);
  if (ctMatch && !castingTime) castingTime = ctMatch[1].trim();

  const rMatch = allText.match(/\*\*Range:\*\*\s*(.*?)(?:\n|\*\*Components:|$)/);
  if (rMatch && !range) range = rMatch[1].trim();

  const cpMatch = allText.match(/\*\*Components?:\*\*\s*(.*?)(?:\n|\*\*Duration:|$)/);
  if (cpMatch && !components) components = cpMatch[1].trim();

  const dMatch = allText.match(/\*\*Duration:\*\*\s*(.*?)(?:\n|$)/);
  if (dMatch && !duration) duration = dMatch[1].trim();

  // Concentration
  if (duration && /\bconcentration\b/i.test(duration)) {
    concentration = true;
  }

  // Material component
  if (components) {
    const mIdx = components.indexOf('M');
    if (mIdx >= 0) {
      const parenMatch = components.match(/M\s*\(([^)]*)\)/);
      if (parenMatch) {
        material = parenMatch[1].trim();
      }
    }
  }

  // Extract description (everything after metadata)
  // Skip the first metaLineIdx+1 lines for the description (but we need content after all metadata)
  let descStartIdx = -1;
  for (let i = metaLineIdx + 1; i < lines.length; i++) {
    const l = lines[i];
    if (l === '__TABLE__') break;
    if (!l.startsWith('**') && !l.includes('**Casting Time') && !l.includes('**Range') && !l.includes('**Components') && !l.includes('**Duration') && !l.includes('**Component')) {
      // Also skip lines that are just metadata
      if (!/^\*\*.+:\*\*/.test(l)) {
        descStartIdx = i;
        break;
      }
    }
  }

  if (descStartIdx === -1) {
    // Try after all metadata
    for (let i = metaLineIdx + 1; i < lines.length; i++) {
      if (lines[i].startsWith('*') && !lines[i].startsWith('***At Higher Level') && !lines[i].startsWith('***At higher level')) {
        descStartIdx = i;
        break;
      }
    }
  }
  if (descStartIdx === -1) descStartIdx = metaLineIdx + 1;

  // Collect description lines until we hit "At Higher Levels"
  for (let i = descStartIdx; i < lines.length; i++) {
    const l = lines[i];
    if (l === '__TABLE__') continue;
    if (l === '__ENDTABLE__') continue;
    if (/^\*\*\*At Higher Level/i.test(l) || /^\*\*\*at higher level/i.test(l)) {
      // Rest is higher level text
      higherLevel = l.replace(/^\*\*\*At Higher Levels\.?\*?\*?\*?/i, '').trim();
      // Collect remaining lines
      for (let j = i + 1; j < lines.length; j++) {
        if (lines[j] !== '__TABLE__' && lines[j] !== '__ENDTABLE__') {
          higherLevel += '\n' + lines[j];
        }
      }
      break;
    }
    descLines.push(l);
  }

  description = descLines.join('\n').trim();

  // Extract save from description
  const svMatch = description.match(/(\w+)\s+saving throw/i);
  if (svMatch) {
    save = SAVE_MAP[svMatch[1]] || '';
  }

  // Extract damage type from description
  for (const [word, code] of Object.entries(DAMAGE_MAP)) {
    const re = new RegExp('\\b' + word + '\\b', 'i');
    if (description.match(re)) {
      damageType = code;
      break; // Take first found
    }
  }

  // Clean description
  description = description.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
    .replace(/\*([^*]+)\*/g, '<em>$1</em>')
    .replace(/###([^#]+)###/g, '<h3>$1</h3>')
    .replace(/\n/g, '<br>');

  if (higherLevel) {
    higherLevel = higherLevel
      .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
      .replace(/\*([^*]+)\*/g, '<em>$1</em>')
      .replace(/\n/g, '<br>');
  }

  // Find damage type in higher level text too
  if (!damageType && higherLevel) {
    for (const [word, code] of Object.entries(DAMAGE_MAP)) {
      const re = new RegExp('\\b' + word + '\\b', 'i');
      if (higherLevel.match(re)) {
        damageType = code;
        break;
      }
    }
  }

  return {
    l: level, sc: schoolShort, ct: castingTime, r: range,
    c: [components.includes('V') ? 1 : 0, components.includes('S') ? 1 : 0, components.includes('M') ? 1 : 0],
    m: material, d: duration,
    rt: ritual ? 1 : 0, cn: concentration ? 1 : 0,
    desc: description, hl: higherLevel, sv: save, dt: damageType, cl: []
  };
}

// ============================================================
// 4. PARSE CLASS SPELL LISTS
// ============================================================
function parseClassSpellLists(rawLists) {
  const result = {};
  const classMap = {
    'Bard Spells': 'Bard', 'Cleric Spells': 'Cleric', 'Druid Spells': 'Druid',
    'Paladin Spells': 'Paladin', 'Ranger Spells': 'Ranger',
    'Sorcerer Spells': 'Sorcerer', 'Warlock Spells': 'Warlock', 'Wizard Spells': 'Wizard'
  };

  const levelMap = {
    'Cantrips (0 Level)': 0, '1st Level': 1, '2nd Level': 2, '3rd Level': 3,
    '4th Level': 4, '5th Level': 5, '6th Level': 6, '7th Level': 7,
    '8th Level': 8, '9th Level': 9
  };

  for (const [key, lists] of Object.entries(rawLists)) {
    const cls = classMap[key];
    if (!cls) continue;
    result[cls] = {};
    for (const [lvlKey, spellArr] of Object.entries(lists)) {
      const lvl = levelMap[lvlKey];
      if (lvl === undefined) continue;
      result[cls][lvl] = spellArr;
    }
  }

  return result;
}

// ============================================================
// 5. BUILD SPELL DATA  
// ============================================================
const spells = {};
const spellList = [];

for (const [name, entry] of Object.entries(spellEntries)) {
  try {
    const s = parseSpell(name, entry);
    if (s) {
      s.name = name;
      spells[name] = s;
      spellList.push(s);
    }
  } catch (e) {
    console.error('Error parsing spell:', name, e.message);
  }
}

console.log(`Parsed ${spellList.length} spells`);

// Assign classes to each spell
const classSpellLists = parseClassSpellLists(rawLists);
const allClasses = Object.keys(classSpellLists);

for (const [name, s] of Object.entries(spells)) {
  const cls = [];
  for (const c of allClasses) {
    const lists = classSpellLists[c];
    for (let lvl = 0; lvl <= 9; lvl++) {
      if (lists[lvl] && lists[lvl].includes(name)) {
        cls.push(c);
        break;
      }
    }
  }
  s.cl = cls;
}

// Compact format for inline embedding
const spellsMin = {};
for (const [name, s] of Object.entries(spells)) {
  spellsMin[name] = {
    l: s.l, sc: s.sc, ct: s.ct, r: s.r,
    c: s.c, m: s.m, d: s.d, rt: s.rt, cn: s.cn,
    desc: s.desc, hl: s.hl, sv: s.sv, dt: s.dt, cl: s.cl
  };
}

// ============================================================
// 6.5. ITALIAN DESCRIPTIONS
// ============================================================
let DESC_IT = {};
let DESC_HL_IT = {};
try {
  const itJSON = JSON.parse(fs.readFileSync('spells_it.json', 'utf8'));

  // Build Italian index by signature
  const itByName = {};
  const itBySig = {};
  const schoolMap = { Abiurazione:'Abjuration', Evocazione:'Conjuration', Divinazione:'Divination', Ammaliamento:'Enchantment', Invocazione:'Evocation', Illusione:'Illusion', Necromanzia:'Necromancy', Trasmutazione:'Transmutation' };
  const classMap = { bardo:'Bard', chierico:'Cleric', druido:'Druid', paladino:'Paladin', ranger:'Ranger', stregone:'Sorcerer', warlock:'Warlock', mago:'Wizard' };

  for (const s of itJSON) {
    const norm = s.name.toLowerCase().replace(/[^a-z0-9 ]/g, '');
    itByName[norm] = s;
    const school = schoolMap[s.school] || s.school;
    const classes = (s.classes||[]).map(c => classMap[c.toLowerCase()] || c).sort();
    const sig = s.level + '|' + school + '|' + classes.join(',');
    if (!itBySig[sig]) itBySig[sig] = s;
  }

  for (const [enName, itName] of Object.entries(I18N.spellNames)) {
    const norm = itName.toLowerCase().replace(/[^a-z0-9 ]/g, '');
    let spell = itByName[norm];

    if (!spell) {
      // Try by (level, school, classes) signature
      const s = spells[enName];
      if (s) {
        const sig = s.l + '|' + (SCHOOL_FULL[s.sc] || s.sc) + '|' + (s.cl||[]).sort().join(',');
        spell = itBySig[sig];
      }
    }

    if (!spell) continue;

    // Italian description
    let desc = '';
    if (spell.description && Array.isArray(spell.description)) {
      desc = spell.description.map(d => d.text || '').join('');
    }
    desc = desc.replace(/Systems Reference Document 5\.1 \d+/g, '').trim();
    desc = desc.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
               .replace(/\*([^*]+)\*/g, '<em>$1</em>')
               .replace(/\n/g, '<br>').trim();
    if (desc) DESC_IT[enName] = desc;

    // Italian higher level
    let hl = '';
    if (spell.at_higher_levels && Array.isArray(spell.at_higher_levels)) {
      hl = spell.at_higher_levels.map(d => d.text || '').join('');
    }
    hl = hl.replace(/Systems Reference Document 5\.1 \d+/g, '').trim();
    if (hl) {
      hl = hl.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
              .replace(/\*([^*]+)\*/g, '<em>$1</em>')
              .replace(/\n/g, '<br>').trim();
      DESC_HL_IT[enName] = hl;
    }
  }
  console.log(`Italian descriptions: ${Object.keys(DESC_IT).length} spells`);
} catch (e) {
  console.log('No Italian descriptions loaded:', e.message);
}

// ============================================================
// 7. CLASS INFO (hardcoded from SRD)
// ============================================================
const classInfo = {
  Barbarian: { hitDie: 12, saves: ['forza', 'costituzione'], spellAbility: '', armorProfs: 'armature leggere, medie, scudi', weaponProfs: 'armi semplici, marziali' },
  Bard: { hitDie: 8, saves: ['destrezza', 'carisma'], spellAbility: 'CAR', armorProfs: 'armature leggere', weaponProfs: 'armi semplici, balestre a mano, spade lunghe, stocchi, spade corte' },
  Cleric: { hitDie: 8, saves: ['saggezza', 'carisma'], spellAbility: 'SAG', armorProfs: 'armature leggere, medie, scudi', weaponProfs: 'armi semplici' },
  Druid: { hitDie: 8, saves: ['intelligenza', 'saggezza'], spellAbility: 'SAG', armorProfs: 'armature leggere, medie, scudi (non metallici)', weaponProfs: ' clave, daghe, dardi, giavellotti, mazze, bastoni ferali, scimitarre, falci, fionde, lance' },
  Paladin: { hitDie: 10, saves: ['saggezza', 'carisma'], spellAbility: 'CAR', armorProfs: 'tutte le armature, scudi', weaponProfs: 'armi semplici, marziali' },
  Ranger: { hitDie: 10, saves: ['forza', 'destrezza'], spellAbility: 'SAG', armorProfs: 'armature leggere, medie, scudi', weaponProfs: 'armi semplici, marziali' },
  Sorcerer: { hitDie: 6, saves: ['costituzione', 'carisma'], spellAbility: 'CAR', armorProfs: 'nessuna', weaponProfs: 'daghe, dardi, fionde, bastoni ferali, balestre leggere' },
  Warlock: { hitDie: 8, saves: ['saggezza', 'carisma'], spellAbility: 'CAR', armorProfs: 'armature leggere', weaponProfs: 'armi semplici' },
  Wizard: { hitDie: 6, saves: ['intelligenza', 'saggezza'], spellAbility: 'INT', armorProfs: 'nessuna', weaponProfs: 'daghe, dardi, fionde, bastoni ferali, balestre leggere' }
};

const raceInfo = {
  Dwarf: { asi: 'Costituzione +2', speed: 25, size: 'Media', languages: 'Comune, Nanico', subraces: { 'Nano delle Colline': { asi: 'Saggezza +1', traits: ['Robustezza Nanica: +1 PF per livello'] } } },
  Elf: { asi: 'Destrezza +2', speed: 30, size: 'Media', languages: 'Comune, Elfico', subraces: { 'Alto Elfo': { asi: 'Intelligenza +1', traits: ['Addestramento alle Armi Elfiche', 'Un trucchetto a scelta dalla lista del mago'] } } },
  Halfling: { asi: 'Destrezza +2', speed: 25, size: 'Piccola', languages: 'Comune, Halfling', subraces: { 'Halfling Piedelesto': { asi: 'Carisma +1', traits: ['Furtività Naturale'] } } },
  Human: { asi: 'Tutti +1', speed: 30, size: 'Media', languages: 'Comune, una lingua extra', subraces: {} },
  Dragonborn: { asi: 'Forza +2, Carisma +1', speed: 30, size: 'Media', languages: 'Comune, Draconico', subraces: {} },
  Gnome: { asi: 'Intelligenza +2', speed: 25, size: 'Piccola', languages: 'Comune, Gnomesco', subraces: { 'Gnomo delle Rocce': { asi: 'Costituzione +1', traits: ['Lore dell\'Artigiano', 'Cianfrusaglie'] } } },
  'Half-Elf': { asi: 'Carisma +2, due a scelta +1', speed: 30, size: 'Media', languages: 'Comune, Elfico, una lingua extra', subraces: {} },
  'Half-Orc': { asi: 'Forza +2, Costituzione +1', speed: 30, size: 'Media', languages: 'Comune, Orchesco', subraces: {} },
  Tiefling: { asi: 'Intelligenza +1, Carisma +2', speed: 30, size: 'Media', languages: 'Comune, Infernale', subraces: {} }
};

// ============================================================
// 7. GENERATE HTML
// ============================================================
const html = `<!DOCTYPE html>
<html lang="it">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>D&D 5e - Tool da Tavolo</title>
<style>
* { margin: 0; padding: 0; box-sizing: border-box; }
:root {
  --bg: #1a1a2e;
  --bg2: #16213e;
  --bg3: #0f3460;
  --accent: #e94560;
  --accent2: #f5a623;
  --text: #eee;
  --text2: #aaa;
  --border: #2a2a4a;
  --success: #4ecca3;
  --danger: #e94560;
}
body { font-family: 'Segoe UI', system-ui, sans-serif; background: var(--bg); color: var(--text); min-height: 100vh; }
.tabs { display: flex; background: var(--bg2); border-bottom: 2px solid var(--accent); position: sticky; top: 0; z-index: 100; }
.tab { padding: 12px 24px; cursor: pointer; border: none; background: none; color: var(--text2); font-size: 14px; font-weight: 600; transition: all .2s; }
.tab:hover { color: var(--text); background: rgba(255,255,255,0.05); }
.tab.active { color: var(--accent); border-bottom: 2px solid var(--accent); margin-bottom: -2px; }
.container { max-width: 1400px; margin: 0 auto; padding: 20px; }
.tab-content { display: none; }
.tab-content.active { display: block; }

.lang-toggle { margin-left: auto; padding: 6px 12px; border: none; background: var(--bg3); color: var(--accent2); cursor: pointer; font-size: 12px; border-radius: 4px; font-weight: 600; }
.lang-toggle:hover { background: #134580; }

/* Character Sheet */
.cs-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
.cs-full { grid-column: 1 / -1; }
.card { background: var(--bg2); border: 1px solid var(--border); border-radius: 8px; padding: 16px; }
.card-title { font-size: 13px; text-transform: uppercase; letter-spacing: 1px; color: var(--accent2); margin-bottom: 12px; font-weight: 700; }
.row { display: flex; gap: 8px; margin-bottom: 8px; flex-wrap: wrap; align-items: center; }
.field { flex: 1; min-width: 120px; }
.field label { display: block; font-size: 11px; text-transform: uppercase; color: var(--text2); margin-bottom: 2px; }
.field input, .field select, .field textarea { width: 100%; padding: 6px 8px; background: var(--bg); border: 1px solid var(--border); border-radius: 4px; color: var(--text); font-size: 14px; }
.field textarea { resize: vertical; min-height: 40px; font-family: inherit; }

.abilities { display: grid; grid-template-columns: repeat(6, 1fr); gap: 8px; }
.ability-card { text-align: center; background: var(--bg); border: 1px solid var(--border); border-radius: 6px; padding: 8px; }
.ability-card .label { font-size: 11px; text-transform: uppercase; color: var(--text2); font-weight: 700; }
.ability-card .score { font-size: 24px; font-weight: 700; color: var(--text); margin: 4px 0; }
.ability-card .score input { width: 60px; text-align: center; font-size: 24px; font-weight: 700; background: transparent; border: none; color: var(--text); }
.ability-card .mod { font-size: 16px; color: var(--accent2); }
.ability-card .mod.neg { color: var(--danger); }

.skills-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 4px; }
.skill-row { display: flex; align-items: center; gap: 6px; padding: 3px 6px; border-radius: 4px; cursor: pointer; font-size: 13px; }
.skill-row:hover { background: rgba(255,255,255,0.05); }
.skill-row input[type="checkbox"] { accent-color: var(--accent); }
.skill-row .skill-name { flex: 1; }
.skill-row .skill-total { font-weight: 700; width: 24px; text-align: center; color: var(--accent2); }
.skill-row.proficient { background: rgba(78, 204, 163, 0.1); }
.skill-row.expertise { background: rgba(78, 204, 163, 0.2); }

.combat-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 8px; text-align: center; }
.combat-stat { background: var(--bg); border: 1px solid var(--border); border-radius: 6px; padding: 10px; }
.combat-stat .label { font-size: 10px; text-transform: uppercase; color: var(--text2); }
.combat-stat .value { font-size: 22px; font-weight: 700; }
.combat-stat .value input { width: 60px; text-align: center; font-size: 22px; background: transparent; border: none; color: var(--text); font-weight: 700; }

.saves-grid { display: grid; gap: 4px; }
.save-row { display: flex; align-items: center; gap: 6px; padding: 3px 6px; border-radius: 4px; cursor: pointer; font-size: 13px; }
.save-row:hover { background: rgba(255,255,255,0.05); }
.save-row input[type="checkbox"] { accent-color: var(--accent); }
.save-row .save-name { flex: 1; }
.save-row .save-total { font-weight: 700; width: 24px; text-align: center; color: var(--accent2); }

.attack-entry { display: grid; grid-template-columns: 2fr 1fr 1fr 1fr 1fr auto; gap: 6px; align-items: center; margin-bottom: 6px; padding: 6px; background: var(--bg); border-radius: 4px; font-size: 13px; }
.attack-entry input { padding: 4px 6px; background: var(--bg2); border: 1px solid var(--border); border-radius: 3px; color: var(--text); font-size: 12px; }
.attack-entry input[type="text"] { width: 100%; }
.btn { padding: 6px 12px; border: none; border-radius: 4px; cursor: pointer; font-size: 13px; transition: all .2s; }
.btn-primary { background: var(--accent); color: white; }
.btn-primary:hover { background: #d63850; }
.btn-sm { padding: 4px 8px; font-size: 11px; }
.btn-danger { background: var(--danger); color: white; }
.btn-danger:hover { background: #c73a52; }

.equip-text { width: 100%; min-height: 80px; padding: 8px; background: var(--bg); border: 1px solid var(--border); border-radius: 4px; color: var(--text); font-size: 13px; resize: vertical; font-family: inherit; }
.features-text { width: 100%; min-height: 80px; padding: 8px; background: var(--bg); border: 1px solid var(--border); border-radius: 4px; color: var(--text); font-size: 13px; resize: vertical; font-family: inherit; }

.slots-grid { display: grid; grid-template-columns: repeat(9, 1fr); gap: 6px; }
.slot-level { text-align: center; background: var(--bg); border: 1px solid var(--border); border-radius: 6px; padding: 8px; }
.slot-level .lbl { font-size: 11px; color: var(--text2); }
.slot-level input { width: 40px; text-align: center; font-size: 18px; font-weight: 700; background: transparent; border: none; color: var(--text); }

/* Spell Table */
.spell-controls { display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 16px; align-items: end; }
.spell-controls .filter-group { display: flex; flex-direction: column; gap: 2px; }
.spell-controls label { font-size: 10px; text-transform: uppercase; color: var(--text2); letter-spacing: 0.5px; }
.spell-controls input, .spell-controls select { padding: 6px 8px; background: var(--bg); border: 1px solid var(--border); border-radius: 4px; color: var(--text); font-size: 13px; }
.spell-controls input:focus, .spell-controls select:focus { outline: none; border-color: var(--accent); }
.spell-controls .btn { height: 32px; }

.spell-count { font-size: 13px; color: var(--text2); margin-bottom: 8px; }
.spell-table { width: 100%; border-collapse: collapse; font-size: 13px; }
.spell-table th { text-align: left; padding: 8px 10px; background: var(--bg3); color: var(--accent2); font-size: 11px; text-transform: uppercase; letter-spacing: 0.5px; cursor: pointer; position: sticky; top: 48px; z-index: 10; }
.spell-table th:hover { background: #134580; }
.spell-table td { padding: 6px 10px; border-bottom: 1px solid var(--border); vertical-align: middle; }
.spell-table th::after { content: ''; position: absolute; left: 0; right: 0; bottom: 0; height: 2px; background: var(--accent); pointer-events: none; }
.spell-table tr:hover { background: rgba(255,255,255,0.03); }
.spell-table .tag { display: inline-block; padding: 1px 6px; border-radius: 3px; font-size: 10px; font-weight: 600; margin-right: 2px; white-space: nowrap; }
.tag-conc { background: #e94560; color: white; }
.tag-ritual { background: #4ecca3; color: #1a1a2e; }
.tag-school { display: inline-block; padding: 1px 6px; border-radius: 3px; font-size: 10px; font-weight: 600; color: white; }

.spell-detail-overlay { position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0,0,0,0.7); z-index: 1000; display: none; justify-content: center; align-items: center; }
.spell-detail-overlay.active { display: flex; }
.spell-detail { background: var(--bg2); border: 1px solid var(--border); border-radius: 8px; padding: 24px; max-width: 600px; width: 90%; max-height: 80vh; overflow-y: auto; }
.spell-detail h2 { font-size: 20px; margin-bottom: 4px; }
.spell-detail .subtitle { font-size: 13px; color: var(--text2); margin-bottom: 16px; }
.spell-detail .meta-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; margin-bottom: 16px; }
.spell-detail .meta-item .ml { font-size: 10px; text-transform: uppercase; color: var(--text2); }
.spell-detail .meta-item .mv { font-size: 14px; color: var(--text); }
.spell-detail .desc { font-size: 14px; line-height: 1.6; }
.spell-detail .hl { margin-top: 12px; padding: 8px; background: var(--bg); border-radius: 4px; font-size: 13px; color: var(--accent2); }

/* Spellbook */
.spellbook-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 4px; }
.spellbook-item { display: flex; align-items: center; gap: 6px; padding: 4px 8px; font-size: 12px; cursor: pointer; border-radius: 4px; }
.spellbook-item:hover { background: rgba(255,255,255,0.05); }
.spellbook-item .scheck { accent-color: var(--accent); }
.spellbook-item .sname { flex: 1; }
.spellbook-item .stags { display: flex; gap: 2px; }

.save-bar { display: flex; gap: 8px; margin-top: 16px; padding: 12px; background: var(--bg3); border-radius: 8px; align-items: center; }
.save-bar input { flex: 1; padding: 6px 8px; background: var(--bg); border: 1px solid var(--border); border-radius: 4px; color: var(--text); font-size: 13px; }

@media (max-width: 768px) {
  .cs-grid { grid-template-columns: 1fr; }
  .abilities { grid-template-columns: repeat(3, 1fr); }
  .combat-grid { grid-template-columns: repeat(2, 1fr); }
  .spell-controls { flex-direction: column; }
  .skills-grid { grid-template-columns: 1fr; }
  .slots-grid { grid-template-columns: repeat(5, 1fr); }
}
</style>
</head>
<body>

<div class="tabs">
  <button class="tab active" data-tab="sheet" data-en="Character Sheet" data-it="Scheda Personaggio">Scheda Personaggio</button>
  <button class="tab" data-tab="spells" data-en="Spells" data-it="Incantesimi">Incantesimi</button>
  <button class="lang-toggle" id="langToggle" onclick="toggleLang()" data-en="IT" data-it="EN">EN</button>
</div>

<div class="container">
  <div class="tab-content active" id="tab-sheet">
    <div class="save-bar">
      <button class="btn btn-primary" onclick="saveChar()" data-en="Save" data-it="Salva">Salva</button>
      <button class="btn btn-primary" onclick="loadChar()" data-en="Load" data-it="Carica">Carica</button>
      <button class="btn btn-danger" onclick="resetChar()" data-en="Reset" data-it="Reset">Reset</button>
      <input type="text" id="charName_save" data-en-placeholder="Character name..." data-it-placeholder="Nome personaggio..." placeholder="Nome personaggio..." style="flex:1">
    </div>

    <div class="cs-grid">
      <div class="card cs-full">
        <div class="card-title" data-en="Character" data-it="Personaggio">Personaggio</div>
        <div class="row">
          <div class="field"><label data-en="Name" data-it="Nome">Nome</label><input type="text" id="pcName" oninput="autoSave()"></div>
          <div class="field"><label data-en="Race" data-it="Razza">Razza</label>
            <select id="pcRace" onchange="autoSave()">${Object.keys(raceInfo).map(r => '<option value="'+r+'">'+r+'</option>').join('')}</select>
          </div>
          <div class="field"><label data-en="Class" data-it="Classe">Classe</label>
            <select id="pcClass" onchange="onClassChange(); autoSave()">${Object.keys(classInfo).map(c => '<option value="'+c+'">'+c+'</option>').join('')}</select>
          </div>
          <div class="field"><label data-en="Level" data-it="Livello">Livello</label><input type="number" id="pcLevel" min="1" max="20" value="1" onchange="onClassChange(); autoSave()"></div>
          <div class="field"><label data-en="Background" data-it="Background">Background</label><input type="text" id="pcBg" oninput="autoSave()"></div>
          <div class="field"><label data-en="Alignment" data-it="Allineamento">Allineamento</label><input type="text" id="pcAlignment" oninput="autoSave()"></div>
          <div class="field"><label data-en="XP" data-it="PX">PX</label><input type="number" id="pcXP" value="0" oninput="autoSave()"></div>
        </div>
      </div>

      <div class="card">
        <div class="card-title" data-en="Ability Scores" data-it="Caratteristiche">Caratteristiche</div>
        <div class="abilities" id="abilities"></div>
        <div style="margin-top:8px;text-align:center;font-size:12px;color:var(--text2)"><span data-en="PB" data-it="PB">PB</span>: <span id="pbDisplay">+2</span></div>
      </div>

      <div class="card">
        <div class="card-title" data-en="Combat" data-it="Combattimento">Combattimento</div>
        <div class="combat-grid">
          <div class="combat-stat"><div class="label" data-en="HP Max" data-it="HP Max">HP Max</div><div class="value"><input type="number" id="hpMax" value="10" oninput="autoSave()"></div></div>
          <div class="combat-stat"><div class="label" data-en="Current HP" data-it="HP Attuali">HP Attuali</div><div class="value"><input type="number" id="hpCurrent" value="10" oninput="autoSave()"></div></div>
          <div class="combat-stat"><div class="label" data-en="AC" data-it="CA">CA</div><div class="value"><input type="number" id="ac" value="10" oninput="autoSave()"></div></div>
          <div class="combat-stat"><div class="label" data-en="Initiative" data-it="Iniziativa">Iniziativa</div><div class="value"><span id="initDisplay">+0</span></div></div>
          <div class="combat-stat"><div class="label" data-en="Speed" data-it="Velocità">Velocità</div><div class="value"><input type="number" id="speed" value="30" oninput="autoSave()"></div></div>
          <div class="combat-stat"><div class="label" data-en="Hit Dice" data-it="Dadi Vita">Dadi Vita</div><div class="value"><input type="text" id="hitDice" value="1d8" style="font-size:14px" oninput="autoSave()"></div></div>
          <div class="combat-stat"><div class="label" data-en="HD Used" data-it="DV Usati">DV Usati</div><div class="value"><input type="number" id="hdUsed" value="0" style="font-size:18px" oninput="autoSave()"></div></div>
          <div class="combat-stat"><div class="label" data-en="Death Saves" data-it="Tiri Salvezza Morte">Tiri Salvezza Morte</div>
            <div class="value" style="font-size:16px">
              <label style="font-size:11px"><input type="checkbox" id="dsS1" onchange="autoSave()"> S</label>
              <label style="font-size:11px"><input type="checkbox" id="dsS2" onchange="autoSave()"> S</label>
              <label style="font-size:11px"><input type="checkbox" id="dsS3" onchange="autoSave()"> S</label>
              <span style="color:var(--text2)">|</span>
              <label style="font-size:11px"><input type="checkbox" id="dsF1" onchange="autoSave()"> F</label>
              <label style="font-size:11px"><input type="checkbox" id="dsF2" onchange="autoSave()"> F</label>
              <label style="font-size:11px"><input type="checkbox" id="dsF3" onchange="autoSave()"> F</label>
            </div>
          </div>
        </div>
      </div>

      <div class="card">
        <div class="card-title" data-en="Saving Throws" data-it="Tiri Salvezza">Tiri Salvezza</div>
        <div class="saves-grid" id="saves"></div>
      </div>

      <div class="card cs-full">
        <div class="card-title" data-en="Skills" data-it="Abilità">Abilità</div>
        <div class="skills-grid" id="skills"></div>
      </div>

      <div class="card cs-full">
        <div class="card-title" data-en="Attacks & Spells" data-it="Attacchi & Incantesimi">Attacchi & Incantesimi</div>
        <div id="attacks"></div>
        <button class="btn btn-primary btn-sm" onclick="addAttack()" data-en="+ Add Attack" data-it="+ Aggiungi Attacco">+ Aggiungi Attacco</button>
      </div>

      <div class="card cs-full">
        <div class="card-title" data-en="Spell Slots" data-it="Slot Incantesimi">Slot Incantesimi</div>
        <div class="slots-grid" id="spellSlots"></div>
      </div>

      <div class="card cs-full">
        <div class="card-title"><span data-en="Spellbook" data-it="Grimorio">Grimorio</span> <span style="font-weight:400;color:var(--text2);font-size:11px" id="spellbookCount"></span></div>
        <div id="spellbookContainer"></div>
      </div>

      <div class="card">
        <div class="card-title" data-en="Features & Traits" data-it="Caratteristiche & Talenti">Caratteristiche & Talenti</div>
        <textarea class="features-text" id="features" data-en-placeholder="Class features, racial traits, feats..." data-it-placeholder="Elenco caratteristiche di classe, tratti razziali, talenti..." placeholder="Elenco caratteristiche di classe, tratti razziali, talenti..." oninput="autoSave()"></textarea>
      </div>
      <div class="card">
        <div class="card-title" data-en="Equipment" data-it="Equipaggiamento">Equipaggiamento</div>
        <textarea class="equip-text" id="equipment" data-en-placeholder="Weapons, armor, items..." data-it-placeholder="Armi, armature, oggetti..." placeholder="Armi, armature, oggetti..." oninput="autoSave()"></textarea>
      </div>
    </div>
  </div>

  <div class="tab-content" id="tab-spells">
    <div class="card">
      <div class="card-title" data-en="Spell Filters" data-it="Filtri Incantesimi">Filtri Incantesimi</div>
      <div class="spell-controls">
        <div class="filter-group"><label data-en="Search" data-it="Cerca">Cerca</label>
          <div style="display:flex;gap:4px;align-items:center">
            <input type="text" id="filterName" data-en-placeholder="Spell name..." data-it-placeholder="Nome incantesimo..." placeholder="Nome incantesimo..." oninput="filterSpells()" style="flex:1">
            <select id="filterSearchMode" onchange="filterSpells()" style="width:auto;font-size:11px;padding:4px 6px">
              <option value="name" data-en="Name" data-it="Nome">Nome</option>
              <option value="desc" data-en="Description" data-it="Descrizione">Descrizione</option>
            </select>
          </div>
        <div class="filter-group"><label data-en="Class" data-it="Classe">Classe</label><select id="filterClass" onchange="filterSpells()"><option value="" data-en="All" data-it="Tutte">Tutte</option></select></div>
        <div class="filter-group"><label data-en="Level" data-it="Livello">Livello</label><select id="filterLevel" onchange="filterSpells()"><option value="" data-en="All" data-it="Tutti">Tutti</option><option value="0" data-en="Cantrip" data-it="Cantrip">Cantrip</option><option value="1" data-en-opt="1st" data-it-opt="1°">1°</option><option value="2" data-en-opt="2nd" data-it-opt="2°">2°</option><option value="3" data-en-opt="3rd" data-it-opt="3°">3°</option><option value="4" data-en-opt="4th" data-it-opt="4°">4°</option><option value="5" data-en-opt="5th" data-it-opt="5°">5°</option><option value="6" data-en-opt="6th" data-it-opt="6°">6°</option><option value="7" data-en-opt="7th" data-it-opt="7°">7°</option><option value="8" data-en-opt="8th" data-it-opt="8°">8°</option><option value="9" data-en-opt="9th" data-it-opt="9°">9°</option></select></div>
        <div class="filter-group"><label data-en="School" data-it="Scuola">Scuola</label><select id="filterSchool" onchange="filterSpells()"><option value="" data-en="All" data-it="Tutte">Tutte</option></select></div>
        <div class="filter-group"><label data-en="Components" data-it="Componenti">Componenti</label><select id="filterComponents" onchange="filterSpells()"><option value="" data-en="Any" data-it="Qualsiasi">Qualsiasi</option><option value="V" data-en="V (Verbal)" data-it="V (Verbale)">V (Verbale)</option><option value="S" data-en="S (Somatic)" data-it="S (Somatica)">S (Somatica)</option><option value="M" data-en="M (Material)" data-it="M (Materiale)">M (Materiale)</option></select></div>
        <div class="filter-group" style="flex-direction:row;align-items:center;gap:8px"><label><input type="checkbox" id="filterConc" onchange="filterSpells()"> <span data-en="Concentration" data-it="Concentrazione">Concentrazione</span></label></div>
        <div class="filter-group" style="flex-direction:row;align-items:center;gap:8px"><label><input type="checkbox" id="filterRitual" onchange="filterSpells()"> <span data-en="Ritual" data-it="Rituale">Rituale</span></label></div>
        <div class="filter-group"><label data-en="Damage" data-it="Danno">Danno</label><select id="filterDamage" onchange="filterSpells()"><option value="" data-en="Any" data-it="Qualsiasi">Qualsiasi</option></select></div>
        <div class="filter-group"><label data-en="Save" data-it="Tiro Salvezza">Tiro Salvezza</label><select id="filterSave" onchange="filterSpells()"><option value="" data-en="Any" data-it="Qualsiasi">Qualsiasi</option></select></div>
        <button class="btn btn-primary" onclick="resetFilters()" data-en="Reset Filters" data-it="Reset Filtri">Reset Filtri</button>
      </div>
    </div>
    <div class="card" style="margin-top:12px">
      <div class="spell-count" id="spellCount"></div>
      <div style="overflow-x:auto">
        <table class="spell-table">
          <thead><tr>
            <th onclick="sortSpells('name')" data-en="Name" data-it="Nome">Nome</th>
            <th onclick="sortSpells('level')" data-en="Lvl" data-it="Liv">Liv</th>
            <th onclick="sortSpells('school')" data-en="School" data-it="Scuola">Scuola</th>
            <th onclick="sortSpells('castingTime')" data-en="Time" data-it="Tempo">Tempo</th>
            <th onclick="sortSpells('range')" data-en="Range" data-it="Gittata">Gittata</th>
            <th onclick="sortSpells('components')" data-en="Comp" data-it="Comp">Comp</th>
            <th onclick="sortSpells('duration')" data-en="Duration" data-it="Durata">Durata</th>
            <th data-en="Tags" data-it="Tag">Tag</th>
            <th onclick="sortSpells('classes')" data-en="Classes" data-it="Classi">Classi</th>
          </tr></thead>
          <tbody id="spellTableBody"></tbody>
        </table>
      </div>
    </div>
  </div>
</div>

<div class="spell-detail-overlay" id="spellDetail" onclick="if(event.target===this)closeSpellDetail()">
  <div class="spell-detail" id="spellDetailContent"></div>
</div>

<script>
// ===================== I18N DATA =====================
const I18N_DATA = ${JSON.stringify(I18N)};

// ===================== SPELL DATA =====================
const SPELLS = ${JSON.stringify(spellsMin)};
const CLASS_SPELLS = ${JSON.stringify(classSpellLists)};
const DESC_IT = ${JSON.stringify(DESC_IT)};
const DESC_HL_IT = ${JSON.stringify(DESC_HL_IT)};
const CLASS_INFO = ${JSON.stringify(classInfo)};
const RACE_INFO = ${JSON.stringify(raceInfo)};

const SCHOOL_COLORS = ${JSON.stringify(I18N.schoolColors)};
const SCHOOLS_EN = ${JSON.stringify(I18N.schoolsEN)};
const SCHOOLS_IT = ${JSON.stringify(I18N.schoolsIT)};
const SPELL_NAMES_IT = ${JSON.stringify(I18N.spellNames)};
const CLASS_IT = ${JSON.stringify(I18N.classIT)};
const CLASS_EN = ${JSON.stringify(I18N.classEN)};
const DMG_IT = ${JSON.stringify(I18N.damageIT)};
const SV_IT = ${JSON.stringify(I18N.svIT)};
const SV_EN = ${JSON.stringify(I18N.svEN)};
const SKILLS_IT = ${JSON.stringify(I18N.skillsIT)};
const SKILLS_EN = ${JSON.stringify(I18N.skillsEN)};
const ABBRS_IT = ${JSON.stringify(I18N.abbrIT)};
const ABBRS_EN = ${JSON.stringify(I18N.abbrEN)};
const ABILITIES_IT = ['Forza','Destrezza','Costituzione','Intelligenza','Saggezza','Carisma'];
const ABILITIES_EN = ['Strength','Dexterity','Constitution','Intelligence','Wisdom','Charisma'];
const LEVEL_PREFIX_IT = ${JSON.stringify(I18N.levelPrefix)};
const LEVEL_PREFIX_EN = ['Cantrips (0)','1st Level','2nd Level','3rd Level','4th Level','5th Level','6th Level','7th Level','8th Level','9th Level'];

// ===================== LANGUAGE STATE =====================
let currentLang = 'it';

function toggleLang() {
  currentLang = currentLang === 'it' ? 'en' : 'it';
  document.getElementById('langToggle').textContent = currentLang === 'it' ? 'EN' : 'IT';
  renderUI();
  onAbiChange();
  filterSpells();
}

function t(en, it) {
  return currentLang === 'it' ? it : en;
}

function spellName(name) {
  if (currentLang === 'it' && SPELL_NAMES_IT[name]) return SPELL_NAMES_IT[name];
  return name;
}

function spellDescription(name) {
  if (currentLang === 'it' && DESC_IT[name]) return DESC_IT[name];
  return SPELLS[name] ? SPELLS[name].desc : '';
}

function spellHigherLevel(name) {
  if (currentLang === 'it' && DESC_HL_IT[name]) return DESC_HL_IT[name];
  return SPELLS[name] ? SPELLS[name].hl : '';
}

function schoolName(code) {
  return currentLang === 'it' ? (SCHOOLS_IT[code] || code) : (SCHOOLS_EN[code] || code);
}

function className(c) {
  return currentLang === 'it' ? (CLASS_IT[c] || c) : (CLASS_EN[c] || c);
}

function damageName(code) {
  if (!code) return '';
  if (currentLang === 'en') return code;
  return DMG_IT[code] || code;
}

function saveName(code) {
  if (!code) return '';
  if (currentLang === 'en') return SV_EN[code] || code;
  return SV_IT[code] || code;
}

function abbrArr() {
  return currentLang === 'it' ? ABBRS_IT : ABBRS_EN;
}

function abilArr() {
  return currentLang === 'it' ? ABILITIES_IT : ABILITIES_EN;
}

function skillsArr() {
  return currentLang === 'it' ? SKILLS_IT : SKILLS_EN;
}

// Update text content and placeholders based on lang
function renderUI() {
    // Update all data-en/data-it attributes
    document.querySelectorAll('[data-en][data-it]').forEach(el => {
      const key = currentLang === 'it' ? 'it' : 'en';
      if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
        const ph = el.getAttribute('data-' + key + '-placeholder');
        if (ph !== null) el.placeholder = ph;
      } else {
        const txt = el.getAttribute('data-' + key);
        if (txt !== null) {
          if (el.tagName === 'OPTION') {
            // Handle option special: check for data-en-opt / data-it-opt
            const optTxt = el.getAttribute('data-' + key + '-opt');
            if (optTxt !== null) el.textContent = optTxt;
            else el.textContent = txt;
          } else {
            el.textContent = txt;
          }
        }
      }
    });
    // Update select options with data-xx-opt
    document.querySelectorAll('select').forEach(sel => {
      Array.from(sel.options).forEach(opt => {
        const key = currentLang === 'it' ? 'it' : 'en';
        const optTxt = opt.getAttribute('data-' + key + '-opt');
        if (optTxt !== null) opt.textContent = optTxt;
      });
    });
  }

  // ===================== ABILITY CONSTANTS =====================
  // Always English for stable element IDs; display text uses data-en/data-it
  const ABILITIES = ABILITIES_EN;
  const ABBRS = ABBRS_EN;
  const SKILLS = SKILLS_EN;

  // ===================== STATE =====================
  let charState = loadState();

  function getState() {
    return {
      name: val('pcName'), race: val('pcRace'), cls: val('pcClass'), level: int('pcLevel'),
      bg: val('pcBg'), alignment: val('pcAlignment'), xp: int('pcXP'),
      abilities: ABBRS.map(a => int('abi_'+a)),
      profSaves: [0,1,2,3,4,5].map(i => document.getElementById('save_'+i)?.checked || false),
      profSkills: SKILLS.map((_,i) => {
        const cb = document.getElementById('skill_cb_'+i);
        return cb ? (cb.checked ? (cb.dataset.expertise === 'true' ? 2 : 1) : 0) : 0;
      }),
      hpMax: int('hpMax'), hpCurrent: int('hpCurrent'), ac: int('ac'), speed: int('speed'),
      hitDice: val('hitDice'), hdUsed: int('hdUsed'),
      dsS1: document.getElementById('dsS1')?.checked||false, dsS2: document.getElementById('dsS2')?.checked||false, dsS3: document.getElementById('dsS3')?.checked||false,
      dsF1: document.getElementById('dsF1')?.checked||false, dsF2: document.getElementById('dsF2')?.checked||false, dsF3: document.getElementById('dsF3')?.checked||false,
      attacks: getAttacks(),
      spellsPrepared: getPreparedSpells(),
      spellSlots: getSpellSlots(),
      features: val('features'), equipment: val('equipment'),
      lang: currentLang
    };
  }

  function applyState(s) {
    if (!s) return;
    setVal('pcName', s.name); setVal('pcRace', s.race); setVal('pcClass', s.cls); setVal('pcLevel', s.level||1);
    setVal('pcBg', s.bg); setVal('pcAlignment', s.alignment); setVal('pcXP', s.xp||0);
    if (s.abilities) s.abilities.forEach((v,i) => setVal('abi_'+ABBRS[i], v));
    if (s.profSaves) s.profSaves.forEach((v,i) => { const cb=document.getElementById('save_'+i); if(cb)cb.checked=v; });
    if (s.profSkills) s.profSkills.forEach((v,i) => {
      const cb=document.getElementById('skill_cb_'+i);
      if(cb){ cb.checked=v>0; cb.dataset.expertise=v>1?'true':'false'; }
    });
    setVal('hpMax', s.hpMax||10); setVal('hpCurrent', s.hpCurrent||10); setVal('ac', s.ac||10); setVal('speed', s.speed||30);
    setVal('hitDice', s.hitDice||'1d8'); setVal('hdUsed', s.hdUsed||0);
    ['dsS1','dsS2','dsS3','dsF1','dsF2','dsF3'].forEach(k => { const cb=document.getElementById(k); if(cb&&s[k]!==undefined)cb.checked=s[k]; });
    if (s.attacks) setAttacks(s.attacks);
    if (s.spellsPrepared) setPreparedSpells(s.spellsPrepared);
    if (s.spellSlots) setSpellSlots(s.spellSlots);
    setVal('features', s.features); setVal('equipment', s.equipment);
    if (s.lang) currentLang = s.lang;
    document.getElementById('langToggle').textContent = currentLang === 'it' ? 'EN' : 'IT';
  }

  // ===================== INIT =====================
  function init() {
    renderUI();

    const abiDiv = document.getElementById('abilities');
    ABBRS.forEach((a,i) => {
      const d = document.createElement('div');
      d.className = 'ability-card';
      d.innerHTML = '<div class="label"><span data-en="'+ABBRS_EN[i]+'" data-it="'+ABBRS_IT[i]+'">'+ABBRS_IT[i]+'</span></div><div class="score"><input type="number" id="abi_'+a+'" value="10" min="1" max="30" oninput="onAbiChange(); autoSave()"></div><div class="mod" id="mod_'+a+'">+0</div>';
      abiDiv.appendChild(d);
    });

    const savesDiv = document.getElementById('saves');
    ABBRS.forEach((a,i) => {
      const d = document.createElement('div');
      d.className = 'save-row';
      d.innerHTML = '<input type="checkbox" id="save_'+i+'" onchange="onAbiChange(); autoSave()"><span class="save-name"><span data-en="'+ABBRS_EN[i]+'" data-it="'+ABBRS_IT[i]+'">'+ABBRS_IT[i]+'</span></span> <span style="font-size:11px;color:var(--text2)" data-en="('+ABILITIES_EN[i]+')" data-it="('+ABILITIES_IT[i]+')">('+ABILITIES_IT[i]+')</span><span class="save-total" id="saveTotal_'+i+'">+0</span>';
      savesDiv.appendChild(d);
    });

    const skillsDiv = document.getElementById('skills');
    SKILLS.forEach((sk,i) => {
      const d = document.createElement('div');
      d.className = 'skill-row';
      const skEN = SKILLS_EN[i];
      const skIT = SKILLS_IT[i];
      d.innerHTML = '<input type="checkbox" id="skill_cb_'+i+'" onchange="toggleExpertise('+i+'); onAbiChange(); autoSave()"><span class="skill-name"><span data-en="'+skEN.name+'" data-it="'+skIT.name+'">'+skIT.name+'</span> <span style="font-size:10px;color:var(--text2)" data-en="('+ABBRS_EN[skEN.ab]+')" data-it="('+ABBRS_IT[skIT.ab]+')">('+ABBRS_IT[skIT.ab]+')</span></span><span class="skill-total" id="skillTotal_'+i+'">+0</span>';
      d.onclick = function(e) { if(e.target.tagName!=='INPUT') { const cb=document.getElementById('skill_cb_'+i); cb.checked=!cb.checked; toggleExpertise(i); onAbiChange(); autoSave(); } };
      skillsDiv.appendChild(d);
    });

    const slotsDiv = document.getElementById('spellSlots');
    for (let i = 1; i <= 9; i++) {
      const d = document.createElement('div');
      d.className = 'slot-level';
      d.innerHTML = '<div class="lbl">'+i+'°</div><div><input type="number" id="slotMax_'+i+'" value="0" min="0" max="9" style="width:36px;font-size:16px" oninput="autoSave()" data-en-placeholder="Max" data-it-placeholder="Max" placeholder="Max"></div><div style="font-size:10px;color:var(--text2);margin-top:2px"><span data-en="Used" data-it="Usati">Usati</span>: <input type="number" id="slotUsed_'+i+'" value="0" min="0" max="9" style="width:30px;font-size:12px" oninput="autoSave()"></div>';
      slotsDiv.appendChild(d);
    }

    const classes = Object.keys(CLASS_SPELLS);
    const fc = document.getElementById('filterClass');
    classes.forEach(c => { const o = document.createElement('option'); o.value = c; o.setAttribute('data-en', c); o.setAttribute('data-it', CLASS_IT[c] || c); o.textContent = className(c); fc.appendChild(o); });

    const schools = [...new Set(Object.values(SPELLS).map(s => s.sc))].filter(Boolean).sort();
    const fs = document.getElementById('filterSchool');
    schools.forEach(c => { const o = document.createElement('option'); o.value = c; o.setAttribute('data-en', SCHOOLS_EN[c] || c); o.setAttribute('data-it', SCHOOLS_IT[c] || c); o.textContent = schoolName(c); fs.appendChild(o); });

    const dmgTypes = [...new Set(Object.values(SPELLS).map(s => s.dt))].filter(Boolean).sort();
    const fd = document.getElementById('filterDamage');
    dmgTypes.forEach(c => { const o = document.createElement('option'); o.value = c; o.setAttribute('data-en', c); o.setAttribute('data-it', DMG_IT[c] || c); o.textContent = damageName(c); fd.appendChild(o); });

    const saveTypes = [...new Set(Object.values(SPELLS).map(s => s.sv))].filter(Boolean).sort();
    const fsv = document.getElementById('filterSave');
    saveTypes.forEach(c => { const o = document.createElement('option'); o.value = c; o.setAttribute('data-en', SV_EN[c] || c); o.setAttribute('data-it', SV_IT[c] || c); o.textContent = saveName(c); fsv.appendChild(o); });

    applyState(charState);
    renderUI();
    onAbiChange();
    onClassChange();
    filterSpells();

    document.querySelectorAll('.tab').forEach(t => {
      t.onclick = function() {
        document.querySelectorAll('.tab, .tab-content').forEach(el => el.classList.remove('active'));
        this.classList.add('active');
        document.getElementById('tab-'+this.dataset.tab).classList.add('active');
        if (this.dataset.tab === 'spells') filterSpells();
      };
    });
  }

  function mod(score) { return Math.floor((score-10)/2); }

  function onAbiChange() {
    const scores = ABBRS.map(a => int('abi_'+a));
    const pb = getPB();

    scores.forEach((s,i) => {
      const m = mod(s);
      const el = document.getElementById('mod_'+ABBRS[i]);
      el.textContent = (m>=0?'+':'')+m;
      el.className = 'mod'+(m<0?' neg':'');
    });

    [0,1,2,3,4,5].forEach(i => {
      const m = mod(scores[i]);
      const cb = document.getElementById('save_'+i);
      const total = (cb?.checked) ? m + pb : m;
      document.getElementById('saveTotal_'+i).textContent = (total>=0?'+':'')+total;
    });

    SKILLS.forEach((sk,i) => {
      const m = mod(scores[sk.ab]);
      const cb = document.getElementById('skill_cb_'+i);
      let p = 0;
      if (cb) {
        if (cb.checked) p = cb.dataset.expertise === 'true' ? 2 : 1;
      }
      const total = m + (p === 2 ? pb*2 : p === 1 ? pb : 0);
      document.getElementById('skillTotal_'+i).textContent = (total>=0?'+':'')+total;
      const row = document.getElementById('skill_cb_'+i).closest('.skill-row');
      if (row) row.className = 'skill-row' + (p===2?' expertise':p===1?' proficient':'');
    });

    const dexMod = mod(scores[1]);
    document.getElementById('initDisplay').textContent = (dexMod>=0?'+':'')+dexMod;
    document.getElementById('pbDisplay').textContent = (pb>=0?'+':'')+pb;
    updateSpellbook();
  }

  function getPB() {
    const lvl = int('pcLevel');
    if (lvl <= 4) return 2;
    if (lvl <= 8) return 3;
    if (lvl <= 12) return 4;
    if (lvl <= 16) return 5;
    return 6;
  }

  function toggleExpertise(i) {
    const cb = document.getElementById('skill_cb_'+i);
    if (!cb.checked) { cb.dataset.expertise = 'false'; return; }
    cb.dataset.expertise = cb.dataset.expertise === 'true' ? 'false' : 'true';
  }

  function onClassChange() {
    const cls = val('pcClass');
    const lvl = int('pcLevel');
    const info = CLASS_INFO[cls];
    if (!info) return;
    document.getElementById('hitDice').value = lvl + 'd' + info.hitDie;
    const conScore = int('abi_'+ABBRS[2]);
    const conMod = mod(conScore);
    const hp = info.hitDie + conMod + (lvl-1) * (Math.floor(info.hitDie/2) + 1 + conMod);
    if (hp > 0 && (!document.getElementById('hpMax').value || parseInt(document.getElementById('hpMax').value) === 0)) {
      document.getElementById('hpMax').value = hp;
      document.getElementById('hpCurrent').value = hp;
    }
    updateSpellSlots();
    updateSpellbook();
  }

  function updateSpellSlots() {
    const cls = val('pcClass');
    const lvl = int('pcLevel');
    const fullCasters = ['Bard', 'Cleric', 'Druid', 'Sorcerer', 'Wizard'];
    const halfCasters = ['Paladin', 'Ranger'];

    let slots = [0,0,0,0,0,0,0,0,0,0];
    if (fullCasters.includes(cls)) {
      const table = [
        [2,0,0,0,0,0,0,0,0],[3,0,0,0,0,0,0,0,0],[4,2,0,0,0,0,0,0,0],[4,3,0,0,0,0,0,0,0],[4,3,2,0,0,0,0,0,0],
        [4,3,3,0,0,0,0,0,0],[4,3,3,1,0,0,0,0,0],[4,3,3,2,0,0,0,0,0],[4,3,3,3,1,0,0,0,0],[4,3,3,3,2,0,0,0,0],
        [4,3,3,3,2,1,0,0,0],[4,3,3,3,2,1,0,0,0],[4,3,3,3,2,1,1,0,0],[4,3,3,3,2,1,1,0,0],[4,3,3,3,2,1,1,1,0],
        [4,3,3,3,2,1,1,1,0],[4,3,3,3,2,1,1,1,1],[4,3,3,3,2,1,1,1,1],[4,3,3,3,2,1,1,1,1],[4,3,3,3,2,1,1,1,1]
      ];
      slots = [0].concat(table[lvl-1] || []);
    } else if (halfCasters.includes(cls)) {
      const table = [
        [0,0,0,0,0],[0,0,0,0,0],[2,0,0,0,0],[3,0,0,0,0],[4,2,0,0,0],[4,2,0,0,0],[4,3,0,0,0],[4,3,0,0,0],
        [4,3,2,0,0],[4,3,2,0,0],[4,3,3,0,0],[4,3,3,0,0],[4,3,3,1,0],[4,3,3,1,0],[4,3,3,2,0],[4,3,3,2,0],
        [4,3,3,3,1],[4,3,3,3,1],[4,3,3,3,2],[4,3,3,3,2]
      ];
      const t = table[lvl-1] || [];
      slots = [0, ...t.slice(0,5), 0,0,0,0];
    } else {
      for (let i = 1; i <= 9; i++) document.getElementById('slotMax_'+i).value = 0;
      return;
    }
    for (let i = 1; i <= 9; i++) document.getElementById('slotMax_'+i).value = slots[i] || 0;
  }

  function updateSpellbook() {
    const cls = val('pcClass');
    const lvl = int('pcLevel');
    const container = document.getElementById('spellbookContainer');
    const classSpells = CLASS_SPELLS[cls];
    if (!classSpells) {
      container.innerHTML = '<div style="font-size:13px;color:var(--text2)">'+t('No spells available for this class.','Nessun incantesimo disponibile per questa classe.')+'</div>';
      return;
    }
    const spellbook = getPreparedSpells();
    const html = [];
    for (let l = 0; l <= 9; l++) {
      const spells = classSpells[l];
      if (!spells || spells.length === 0) continue;
      const lvlName = currentLang === 'it' ? LEVEL_PREFIX_IT[l] : LEVEL_PREFIX_EN[l];
      html.push('<div style="margin-top:8px;font-size:12px;font-weight:600;color:var(--accent2)">' + lvlName + '</div>');
      spells.forEach(name => {
        const s = SPELLS[name];
        if (!s) return;
        const isPrepared = spellbook.includes(name);
        const displayName = spellName(name);
        html.push('<div class="spellbook-item" data-spell="' + name.replace(/"/g, '&quot;') + '" onclick="togglePrepared(this.dataset.spell)">');
        html.push('<input type="checkbox" class="scheck"' + (isPrepared ? ' checked' : '') + '>');
        html.push('<span class="sname">' + displayName + '</span>');
        html.push('<span class="stags">');
        if (s.cn) html.push('<span class="tag tag-conc">C</span>');
        if (s.rt) html.push('<span class="tag tag-ritual">R</span>');
        html.push('</span></div>');
      });
    }
    container.innerHTML = html.join('');
    document.getElementById('spellbookCount').textContent = '(' + spellbook.length + ' ' + t('prepared', 'preparati') + ')';
    updateSpellSlots();
  }

  function togglePrepared(name) {
    const spellbook = getPreparedSpells();
    const idx = spellbook.indexOf(name);
    if (idx >= 0) spellbook.splice(idx, 1);
    else spellbook.push(name);
    setPreparedSpells(spellbook);
    updateSpellbook();
    autoSave();
  }

  function getPreparedSpells() {
    try { return JSON.parse(localStorage.getItem('dnd_prepared') || '[]'); } catch { return []; }
  }

  function setPreparedSpells(arr) {
    localStorage.setItem('dnd_prepared', JSON.stringify(arr));
  }

  function getAttacks() {
    try { return JSON.parse(localStorage.getItem('dnd_attacks') || '[]'); } catch { return []; }
  }

  function setAttacks(arr) {
    localStorage.setItem('dnd_attacks', JSON.stringify(arr));
  }

  function renderAttacks() {
    const div = document.getElementById('attacks');
    const attacks = getAttacks();
    if (attacks.length === 0) {
      div.innerHTML = '<div style="font-size:13px;color:var(--text2);padding:8px">'+t('No attacks. Add one!','Nessun attacco. Aggiungine uno!')+'</div>';
      return;
    }
    div.innerHTML = attacks.map((a,i) =>
      '<div class="attack-entry">' +
      '<input type="text" value="'+(a.name||'')+'" placeholder="'+t('Name','Nome')+'" onchange="updateAttack('+i+',\\'name\\',this.value)">' +
      '<input type="text" value="'+(a.bonus||'')+'" placeholder="'+t('Bonus','Bonus')+'" onchange="updateAttack('+i+',\\'bonus\\',this.value)">' +
      '<input type="text" value="'+(a.damage||'')+'" placeholder="'+t('Damage','Danno')+'" onchange="updateAttack('+i+',\\'damage\\',this.value)">' +
      '<input type="text" value="'+(a.type||'')+'" placeholder="'+t('Type','Tipo')+'" onchange="updateAttack('+i+',\\'type\\',this.value)" style="max-width:80px">' +
      '<input type="text" value="'+(a.notes||'')+'" placeholder="'+t('Notes','Note')+'" onchange="updateAttack('+i+',\\'notes\\',this.value)">' +
      '<button class="btn btn-danger btn-sm" onclick="removeAttack('+i+')">X</button></div>'
    ).join('');
  }

  function addAttack() {
    const attacks = getAttacks();
    attacks.push({name:'',bonus:'',damage:'',type:'',notes:''});
    setAttacks(attacks);
    renderAttacks();
  }

  function updateAttack(i, field, value) {
    const attacks = getAttacks();
    attacks[i] = attacks[i] || {};
    attacks[i][field] = value;
    setAttacks(attacks);
  }

  function removeAttack(i) {
    const attacks = getAttacks();
    attacks.splice(i, 1);
    setAttacks(attacks);
    renderAttacks();
  }

  function getSpellSlots() {
    const slots = {};
    for (let i = 1; i <= 9; i++) {
      slots[i] = { max: int('slotMax_'+i), used: int('slotUsed_'+i) };
    }
    return slots;
  }

  function setSpellSlots(slots) {
    for (let i = 1; i <= 9; i++) {
      if (slots[i]) {
        setVal('slotMax_'+i, slots[i].max || 0);
        setVal('slotUsed_'+i, slots[i].used || 0);
      }
    }
  }

  // ===================== SPELL TABLE =====================
  let spellSortField = 'name';
  let spellSortDir = 1;

  function filterSpells() {
    const query = (document.getElementById('filterName').value || '').toLowerCase();
    const mode = document.getElementById('filterSearchMode').value;
    const cls = document.getElementById('filterClass').value;
    const level = document.getElementById('filterLevel').value;
    const school = document.getElementById('filterSchool').value;
    const comp = document.getElementById('filterComponents').value;
    const conc = document.getElementById('filterConc').checked;
    const ritual = document.getElementById('filterRitual').checked;
    const damage = document.getElementById('filterDamage').value;
    const save = document.getElementById('filterSave').value;

    const results = [];
    for (const [n, s] of Object.entries(SPELLS)) {
      if (query) {
        const enName = n.toLowerCase();
        const itName = (SPELL_NAMES_IT[n] || '').toLowerCase();
        if (mode === 'name') {
          if (!enName.includes(query) && !itName.includes(query)) continue;
        } else {
          const enDesc = (s.desc || '').toLowerCase().replace(/<[^>]+>/g, '');
          const itDesc = (DESC_IT[n] || '').toLowerCase().replace(/<[^>]+>/g, '');
          if (!enDesc.includes(query) && !itDesc.includes(query)) continue;
        }
      }
      if (cls && (!s.cl || !s.cl.includes(cls))) continue;
      if (level !== '' && s.l !== parseInt(level)) continue;
      if (school && s.sc !== school) continue;
      if (comp) {
        const comps = [s.c[0]?'V':'', s.c[1]?'S':'', s.c[2]?'M':''].filter(Boolean);
        if (!comps.includes(comp)) continue;
      }
      if (conc && !s.cn) continue;
      if (ritual && !s.rt) continue;
      if (damage && s.dt !== damage) continue;
      if (save && s.sv !== save) continue;
      results.push({name:n, ...s});
    }

    document.getElementById('spellCount').textContent = results.length + ' ' + t('spells found', 'incantesimi trovati');
    renderSpellTable(results);
  }

  function renderSpellTable(results) {
    const compStr = (s) => [s.c[0]?'V':'', s.c[1]?'S':'', s.c[2]?'M':''].filter(Boolean).join(',');

    results.sort((a,b) => {
      let va = a[spellSortField], vb = b[spellSortField];
      if (spellSortField === 'level' || spellSortField === 'l') { va = a.l; vb = b.l; }
      if (spellSortField === 'name') { va = spellName(a.name).toLowerCase(); vb = spellName(b.name).toLowerCase(); }
      if (spellSortField === 'components') { va = compStr(a); vb = compStr(b); }
      if (spellSortField === 'school') { va = schoolName(a.sc); vb = schoolName(b.sc); }
      if (spellSortField === 'classes') { va = (a.cl||[]).map(c=>className(c)).join(','); vb = (b.cl||[]).map(c=>className(c)).join(','); }
      if (typeof va === 'string') return spellSortDir * va.localeCompare(vb);
      return spellSortDir * (va - vb);
    });

    const tbody = document.getElementById('spellTableBody');
    tbody.innerHTML = results.map(s => {
      const lvlStr = s.l === 0 ? t('Cantrip','Cantrip') : s.l + '°';
      const schoolFull = schoolName(s.sc);
      const schoolColor = SCHOOL_COLORS[s.sc] || '#666';
      const tags = [];
      if (s.cn) tags.push('<span class="tag tag-conc">C</span>');
      if (s.rt) tags.push('<span class="tag tag-ritual">R</span>');
      tags.push('<span class="tag-school" style="background:'+schoolColor+'">' + schoolFull + '</span>');
      const classStr = (s.cl || []).map(c => className(c)).join(', ');
      const displayName = spellName(s.name);
      return '<tr data-spell="' + s.name.replace(/"/g, '&quot;') + '" onclick="showSpellDetail(this.dataset.spell)" style="cursor:pointer">' +
        '<td>' + displayName + '</td>' +
        '<td>' + lvlStr + '</td>' +
        '<td><span class="tag-school" style="background:'+schoolColor+'">' + schoolFull + '</span></td>' +
        '<td>' + s.ct + '</td>' +
        '<td>' + s.r + '</td>' +
        '<td>' + compStr(s) + '</td>' +
        '<td>' + s.d + '</td>' +
        '<td>' + tags.join(' ') + '</td>' +
        '<td>' + classStr + '</td>' +
        '</tr>';
    }).join('');
  }

  function sortSpells(field) {
    if (spellSortField === field) spellSortDir *= -1;
    else { spellSortField = field; spellSortDir = 1; }
    filterSpells();
  }

  function resetFilters() {
    document.getElementById('filterName').value = '';
    document.getElementById('filterClass').value = '';
    document.getElementById('filterLevel').value = '';
    document.getElementById('filterSchool').value = '';
    document.getElementById('filterComponents').value = '';
    document.getElementById('filterConc').checked = false;
    document.getElementById('filterRitual').checked = false;
    document.getElementById('filterDamage').value = '';
    document.getElementById('filterSave').value = '';
    filterSpells();
  }

  // ===================== SPELL DETAIL =====================
  function showSpellDetail(name) {
    const s = SPELLS[name];
    if (!s) return;
    const schoolFull = schoolName(s.sc);
    const lvlStr = s.l === 0 ? t('Cantrip','Cantrip') + ' (' + schoolFull + ')' : s.l + '° ' + t('level','livello') + ' - ' + schoolFull;
    const comps = [s.c[0]?t('Verbal','Verbale'):'', s.c[1]?t('Somatic','Somatica'):'', s.c[2]?t('Material','Materiale')+(s.m?' ('+s.m+')':''):''].filter(Boolean).join(', ');
    const tags = [];
    if (s.rt) tags.push(t('Ritual','Rituale'));
    if (s.cn) tags.push(t('Concentration','Concentrazione'));

    document.getElementById('spellDetailContent').innerHTML =
      '<h2>' + spellName(name) + '</h2>' +
      '<div class="subtitle">' + lvlStr + '</div>' +
      '<div class="meta-grid">' +
      '<div class="meta-item"><div class="ml">' + t('Casting Time','Tempo di lancio') + '</div><div class="mv">' + s.ct + '</div></div>' +
      '<div class="meta-item"><div class="ml">' + t('Range','Gittata') + '</div><div class="mv">' + s.r + '</div></div>' +
      '<div class="meta-item"><div class="ml">' + t('Components','Componenti') + '</div><div class="mv">' + comps + '</div></div>' +
      '<div class="meta-item"><div class="ml">' + t('Duration','Durata') + '</div><div class="mv">' + s.d + '</div></div>' +
      (tags.length ? '<div class="meta-item"><div class="ml">' + t('Tags','Tag') + '</div><div class="mv">' + tags.join(', ') + '</div></div>' : '') +
      (s.sv ? '<div class="meta-item"><div class="ml">' + t('Save','Tiro Salvezza') + '</div><div class="mv">' + saveName(s.sv) + '</div></div>' : '') +
      (s.dt ? '<div class="meta-item"><div class="ml">' + t('Damage Type','Tipo Danno') + '</div><div class="mv">' + damageName(s.dt) + '</div></div>' : '') +
      ((s.cl||[]).length ? '<div class="meta-item"><div class="ml">' + t('Classes','Classi') + '</div><div class="mv">' + s.cl.map(c=>className(c)).join(', ') + '</div></div>' : '') +
      '</div>' +
      '<div class="desc">' + spellDescription(name) + '</div>' +
      (s.hl || DESC_HL_IT[name] ? '<div class="hl"><strong>' + t('At Higher Levels','A livelli superiori') + ':</strong> ' + spellHigherLevel(name) + '</div>' : '');
    document.getElementById('spellDetail').classList.add('active');
  }

  function closeSpellDetail() {
    document.getElementById('spellDetail').classList.remove('active');
  }

  // ===================== SAVE/LOAD =====================
  function autoSave() {
    clearTimeout(autoSave._timer);
    autoSave._timer = setTimeout(() => {
      const s = getState();
      localStorage.setItem('dnd_char', JSON.stringify(s));
    }, 500);
  }

  function loadState() {
    try {
      const raw = localStorage.getItem('dnd_char');
      return raw ? JSON.parse(raw) : null;
    } catch { return null; }
  }

  function saveChar() {
    const s = getState();
    localStorage.setItem('dnd_char', JSON.stringify(s));
    const name = val('charName_save') || s.name || 'character';
    const blob = new Blob([JSON.stringify(s, null, 2)], {type:'application/json'});
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = name.replace(/[^a-zA-Z0-9]/g,'_') + '.json';
    a.click();
    URL.revokeObjectURL(a.href);
  }

  function loadChar() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    input.onchange = function(e) {
      const file = e.target.files[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = function(ev) {
        try {
          const s = JSON.parse(ev.target.result);
          applyState(s);
          localStorage.setItem('dnd_char', JSON.stringify(s));
          renderUI();
          onAbiChange();
          onClassChange();
          renderAttacks();
        } catch(err) { alert(t('Error loading file: ','Errore nel caricamento del file: ') + err.message); }
      };
      reader.readAsText(file);
    };
    input.click();
  }

  function resetChar() {
    if (!confirm(t('Delete all character data?','Cancellare tutti i dati del personaggio?'))) return;
    localStorage.removeItem('dnd_char');
    location.reload();
  }

  function val(id) { return document.getElementById(id)?.value || ''; }
  function int(id) { const v = parseInt(document.getElementById(id)?.value); return isNaN(v) ? 0 : v; }
  function setVal(id, v) { const el = document.getElementById(id); if (el) el.value = v !== undefined && v !== null ? v : ''; }

window.toggleLang = toggleLang;
window.addAttack = addAttack;
window.removeAttack = removeAttack;
window.updateAttack = updateAttack;
window.saveChar = saveChar;
window.loadChar = loadChar;
window.resetChar = resetChar;
window.togglePrepared = togglePrepared;
window.filterSpells = filterSpells;
window.resetFilters = resetFilters;
window.sortSpells = sortSpells;
window.showSpellDetail = showSpellDetail;
window.closeSpellDetail = closeSpellDetail;
window.onAbiChange = onAbiChange;
window.onClassChange = onClassChange;
window.autoSave = autoSave;
window.toggleExpertise = toggleExpertise;
window.init = init;

document.addEventListener('DOMContentLoaded', init);
document.addEventListener('keydown', function(e) { if (e.key === 'Escape') closeSpellDetail(); });
</script>
</body>
</html>`;

fs.writeFileSync('index.html', html, 'utf8');
console.log('Generated index.html - size: ' + (html.length / 1024).toFixed(1) + ' KB');
console.log('Parsed ' + spellList.length + ' spells successfully');
