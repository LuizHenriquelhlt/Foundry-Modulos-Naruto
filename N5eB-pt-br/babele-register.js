const MODULE_ID = "N5eB-pt-br";

const ACTIVITY_FIELDS = {
	name: "name",
	condition: "activation.condition",
	chatFlavor: "description.chatFlavor",
	rollName: "roll.name",
	durationSpecial: "duration.special",
	affectsSpecial: "target.affects.special",
	rangeSpecial: "range.special"
};

const ADVANCEMENT_FIELDS = {
	title: "title",
	hint: "hint"
};

/**
 * Translate a collection of sub-objects (activities, advancement) keyed by id.
 * Accepts both shapes used by dnd5e-based systems: an array of objects with `_id`
 * or an object keyed by id. Returns a copy; the compendium source data is never mutated,
 * so Babele can still show/restore the original text.
 */
function translateById(collection, translations, fields) {
	if (!collection || !translations) return collection;
	const apply = (doc, id) => {
		const t = translations[id ?? doc?._id];
		if (!t || (typeof doc !== "object")) return doc;
		const copy = foundry.utils.deepClone(doc);
		for (const [key, path] of Object.entries(fields)) {
			if (t[key] !== undefined && foundry.utils.hasProperty(copy, path)) foundry.utils.setProperty(copy, path, t[key]);
		}
		return copy;
	};
	if (Array.isArray(collection)) return collection.map(doc => apply(doc));
	return Object.fromEntries(Object.entries(collection).map(([id, doc]) => [id, apply(doc, id)]));
}

Hooks.once("babele.init", (babele) => {
	// Register the translation folder first so an error in the optional extras below can't block it.
	babele.register({
		module: MODULE_ID,
		lang: "pt-BR",
		dir: "compendium"
	});
	console.log(`${MODULE_ID} | traduções registradas no Babele (idioma do cliente: ${game.i18n?.lang})`);
	try {
		babele.registerConverters({
			n5ebActivities: (activities, translations) => translateById(activities, translations, ACTIVITY_FIELDS),
			n5ebAdvancement: (advancement, translations) => translateById(advancement, translations, ADVANCEMENT_FIELDS)
		});
		babele.registerMapping({
			Item: {
				chat: "system.description.chat",
				condition: "system.activation.condition",
				chakraSpecial: "system.chakra.special",
				materials: "system.materials.value",
				completion: "system.completion",
				activities: { path: "system.activities", converter: "n5ebActivities" },
				advancement: { path: "system.advancement", converter: "n5ebAdvancement" }
			},
			Actor: {
				biographyPublic: "system.details.biography.public"
			},
			JournalEntryPage: {
				tooltip: "system.tooltip"
			}
		});
	} catch ( err ) {
		console.error(`${MODULE_ID} | falha ao registrar conversores/mapeamentos extras:`, err);
	}
});

Hooks.once("babele.ready", () => console.log(`${MODULE_ID} | Babele pronto; compêndios do n5eb traduzidos.`));
