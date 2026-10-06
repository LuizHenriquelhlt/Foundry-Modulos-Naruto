const ACTIVITY_FIELDS = {
	name: "name",
	condition: "activation.condition",
	chatFlavor: "description.chatFlavor",
	rollName: "roll.name",
	durationSpecial: "duration.special",
	affectsSpecial: "target.affects.special",
	rangeSpecial: "range.special"
};

function translateById(collection, translations, fields) {
	if (!collection || !translations) return collection;
	const apply = (doc, id) => {
		const t = translations[id ?? doc?._id];
		if (!t) return doc;
		for (const [key, path] of Object.entries(fields)) {
			if (t[key] !== undefined && foundry.utils.hasProperty(doc, path)) foundry.utils.setProperty(doc, path, t[key]);
		}
		return doc;
	};
	if (Array.isArray(collection)) return collection.map(doc => apply(doc));
	for (const [id, doc] of Object.entries(collection)) apply(doc, id);
	return collection;
}

Hooks.once("babele.init", (babele) => {
	// Register the translation folder first so an error in the optional extras below can't block it.
	babele.register({
		module: "N5eB-pt-br",
		lang: "pt-BR",
		dir: "compendium"
	});
	console.log("N5eB-pt-br | traduções registradas no Babele (idioma do cliente:", game.settings.get("core", "language"), ")");
	try {
		babele.registerConverters({
			n5ebActivities: (activities, translations) => translateById(activities, translations, ACTIVITY_FIELDS),
			n5ebAdvancement: (advancement, translations) => translateById(advancement, translations, { title: "title", hint: "hint" })
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
		console.error("N5eB-pt-br | falha ao registrar conversores/mapeamentos extras:", err);
	}
});

Hooks.once("babele.ready", () => console.log("N5eB-pt-br | Babele pronto; compêndios do n5eb traduzidos."));
