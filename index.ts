interface Difference {
	type: "CREATE" | "REMOVE" | "CHANGE";
	path: (string | number)[];
	value?: any;
	oldValue?: any;
}
export default function patch(
	obj: Record<string, any> | any[],
	diffs: Difference[]
): Record<string, any> | any[] {
	let arrayDelQueue = [];
	const removeSymbol = Symbol("micropatch-delete");

	for (const diff of diffs) {
		if (!diff.path || diff.path.length === 0) continue;

		let currObj = obj;
		let diffPathLength = diff.path.length;
		let lastPathElement = diff.path[diffPathLength - 1];
		let secondLastPathElement = diff.path[diffPathLength - 2];
		for (let i = 0; i < diffPathLength - 1; i++) {
			currObj = currObj[diff.path[i]];
		}

		switch (diff.type) {
			case "CREATE":
			case "CHANGE":
				currObj[lastPathElement] = diff.value;
				break;
			case "REMOVE":
				if (Array.isArray(currObj)) {
					(currObj as any)[lastPathElement] = removeSymbol;
					arrayDelQueue.push(() => {
						if (secondLastPathElement !== undefined) {
							(currObj as any)[secondLastPathElement] = (currObj as any)[
								secondLastPathElement
							].filter((e: any) => e !== removeSymbol);
						} else {
							obj = obj.filter((e: any) => e !== removeSymbol);
						}
					});
				} else {
					delete currObj[lastPathElement];
				}
				break;
		}
	}

	arrayDelQueue.forEach((arrayDeletion) => arrayDeletion());

	return obj;
}
