import { ArcanaColor } from "@prisma/client";

export const ARCANAS = [
    { id: 1, name: "Reencarnación", color: ArcanaColor.Blue },
    { id: 2, name: "Sigilo", color: ArcanaColor.Blue },
    { id: 3, name: "Avaricia", color: ArcanaColor.Blue },
    { id: 4, name: "Prosperidad", color: ArcanaColor.Blue },
    { id: 5, name: "Saqueador", color: ArcanaColor.Blue },
    { id: 6, name: "Armonía", color: ArcanaColor.Blue },
    { id: 7, name: "Cazar", color: ArcanaColor.Blue },
    { id: 8, name: "Cicatriz de la bestia", color: ArcanaColor.Blue },
    { id: 9, name: "Meditación", color: ArcanaColor.Blue },
    { id: 10, name: "Longevidad", color: ArcanaColor.Blue },

    { id: 11, name: "Reverencia", color: ArcanaColor.Green },
    { id: 12, name: "Fortificar", color: ArcanaColor.Green },
    { id: 13, name: "Ojo de la mente", color: ArcanaColor.Green },
    { id: 14, name: "Vista de halcón", color: ArcanaColor.Green },
    { id: 15, name: "Vacío", color: ArcanaColor.Green },
    { id: 16, name: "Tributo", color: ArcanaColor.Green },
    { id: 17, name: "Compasión", color: ArcanaColor.Green },
    { id: 18, name: "Bastión", color: ArcanaColor.Green },
    { id: 19, name: "Conocimiento", color: ArcanaColor.Green },
    { id: 20, name: "Reverberación", color: ArcanaColor.Green },

    { id: 21, name: "Santo", color: ArcanaColor.Red },
    { id: 22, name: "Mutación", color: ArcanaColor.Red },
    { id: 23, name: "Pesadilla", color: ArcanaColor.Red },
    { id: 24, name: "Luna roja", color: ArcanaColor.Red },
    { id: 25, name: "Sin igual", color: ArcanaColor.Red },
    { id: 26, name: "Conflicto", color: ArcanaColor.Red },
    { id: 27, name: "Destino", color: ArcanaColor.Red },
    { id: 28, name: "Calamidad", color: ArcanaColor.Red },
    { id: 29, name: "Herencia", color: ArcanaColor.Red },
    { id: 30, name: "Presagio", color: ArcanaColor.Red },
];

export const ARCANA_STATS = [
    { arcanaId: 1, statCode: "MagicAttack", value: 2.4 },
    { arcanaId: 1, statCode: "MagicLifesteal", value: 1 },

    { arcanaId: 2, statCode: "PhysicalAttack", value: 1.6 },
    { arcanaId: 2, statCode: "MoveSpeed", value: 1 },

    { arcanaId: 3, statCode: "MagicLifesteal", value: 1.6 },

    { arcanaId: 4, statCode: "PhysicalLifesteal", value: 1 },
    { arcanaId: 4, statCode: "MagicDefense", value: 4.1 },

    { arcanaId: 5, statCode: "PhysicalLifesteal", value: 1.6 },

    { arcanaId: 6, statCode: "MaxHP", value: 45 },
    { arcanaId: 6, statCode: "HP5S", value: 5.2 },
    { arcanaId: 6, statCode: "MoveSpeed", value: 0.4 },

    { arcanaId: 7, statCode: "AttackSpeed", value: 1 },
    { arcanaId: 7, statCode: "MoveSpeed", value: 1 },

    { arcanaId: 8, statCode: "MaxHP", value: 60 },
    { arcanaId: 8, statCode: "CritRate", value: 0.5 },

    { arcanaId: 9, statCode: "MaxHP", value: 60 },
    { arcanaId: 9, statCode: "HP5S", value: 4.5 },

    { arcanaId: 10, statCode: "MaxHP", value: 75 },

    { arcanaId: 11, statCode: "MagicLifesteal", value: 0.7 },
    { arcanaId: 11, statCode: "PhysicalDefense", value: 5.9 },

    { arcanaId: 12, statCode: "PhysicalDefense", value: 5 },
    { arcanaId: 12, statCode: "MagicDefense", value: 5 },

    { arcanaId: 13, statCode: "AttackSpeed", value: 0.6 },
    { arcanaId: 13, statCode: "PhysicalPenetration", value: 6.4 },

    { arcanaId: 14, statCode: "PhysicalAttack", value: 0.9 },
    { arcanaId: 14, statCode: "PhysicalPenetration", value: 6.4 },

    { arcanaId: 15, statCode: "MaxHP", value: 37.5 },
    { arcanaId: 15, statCode: "CooldownReduction", value: 0.6 },

    { arcanaId: 16, statCode: "MagicAttack", value: 2.4 },
    { arcanaId: 16, statCode: "CooldownReduction", value: 0.7 },

    { arcanaId: 17, statCode: "CooldownReduction", value: 1 },

    { arcanaId: 18, statCode: "PhysicalDefense", value: 9 },

    { arcanaId: 19, statCode: "MagicDefense", value: 9 },

    { arcanaId: 20, statCode: "PhysicalDefense", value: 2.7 },
    { arcanaId: 20, statCode: "MagicDefense", value: 2.7 },
    { arcanaId: 20, statCode: "CooldownReduction", value: 0.6 },

    { arcanaId: 21, statCode: "MagicAttack", value: 5.3 },

    { arcanaId: 22, statCode: "PhysicalAttack", value: 2 },
    { arcanaId: 22, statCode: "PhysicalPenetration", value: 3.6 },

    { arcanaId: 23, statCode: "MagicAttack", value: 4.2 },
    { arcanaId: 23, statCode: "MagicPenetration", value: 2.4 },

    { arcanaId: 24, statCode: "AttackSpeed", value: 1.6 },
    { arcanaId: 24, statCode: "CritRate", value: 0.5 },

    { arcanaId: 25, statCode: "CritRate", value: 0.7 },
    { arcanaId: 25, statCode: "CritDamage", value: 3.6 },

    { arcanaId: 26, statCode: "PhysicalAttack", value: 2.5 },
    { arcanaId: 26, statCode: "PhysicalLifesteal", value: 0.5 },

    { arcanaId: 27, statCode: "AttackSpeed", value: 1 },
    { arcanaId: 27, statCode: "MaxHP", value: 33.7 },
    { arcanaId: 27, statCode: "PhysicalDefense", value: 2.3 },

    { arcanaId: 28, statCode: "CritRate", value: 1.6 },

    { arcanaId: 29, statCode: "PhysicalAttack", value: 3.2 },

    { arcanaId: 30, statCode: "MagicAttack", value: 4.2 },
    { arcanaId: 30, statCode: "AttackSpeed", value: 0.6 },
];
